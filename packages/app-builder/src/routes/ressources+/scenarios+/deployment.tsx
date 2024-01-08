import { navigationI18n } from '@app-builder/components';
import { isStatusBadRequestHttpError } from '@app-builder/models';
import { type SortedScenarioIteration } from '@app-builder/models/scenario-iteration';
import { serverServices } from '@app-builder/services/init.server';
import { parseFormSafe } from '@app-builder/utils/input-validation';
import { getRoute } from '@app-builder/utils/routes';
import { Label } from '@radix-ui/react-label';
import { type ActionFunctionArgs, json } from '@remix-run/node';
import { useFetcher } from '@remix-run/react';
import { type Namespace, type ParseKeys } from 'i18next';
import { useTranslation } from 'react-i18next';
import {
  Button,
  type ButtonProps,
  Checkbox,
  HiddenInputs,
  Modal,
  Tooltip,
} from 'ui-design-system';
import { Icon, type IconName } from 'ui-icons';
import * as z from 'zod';

import { setToastMessage } from '../../../components/MarbleToaster';

export const handle = {
  i18n: [...navigationI18n, 'scenarios', 'common'] satisfies Namespace,
};

/**
 * TODO
 * - Ajouter RHF
 *  - Faire fonctionner les erreurs client side classique RHF
 *  - Regarder remix-form pour trouver un moyen de faire du merge client/serveur
 *
 * - Tenter de factoriser des helpers
 */

const Deployment = ['activate', 'deactivate', 'reactivate'] as const;
type DeploymentType = (typeof Deployment)[number];

const formSchema = z.object({
  deploymentType: z.enum(Deployment),
  iterationId: z.string().uuid(),
  hasLiveVersion: z.coerce.boolean(),
  replaceCurrentLiveVersion: z.coerce.boolean(),
  changeIsImmediate: z.coerce.boolean(),
});

export async function action({ request }: ActionFunctionArgs) {
  const { authService } = serverServices;
  const { apiClient } = await authService.isAuthenticated(request, {
    failureRedirect: '/login',
  });

  type Errors = Record<
    'replaceCurrentLiveVersion' | 'changeIsImmediate',
    boolean
  >;

  const parsedForm = await parseFormSafe(request, formSchema);
  if (!parsedForm.success) {
    parsedForm.error.flatten((issue) => issue);

    const errs = parsedForm.error.format();

    const errors = {
      replaceCurrentLiveVersion: !!errs?.replaceCurrentLiveVersion?._errors[0],
      changeIsImmediate: !!errs?.changeIsImmediate?._errors[0],
    } as Errors;

    return json({
      success: false as const,
      values: parsedForm.formData,
      errors,
    });
  }
  try {
    const {
      iterationId,
      deploymentType,
      hasLiveVersion,
      replaceCurrentLiveVersion,
      changeIsImmediate,
    } = parsedForm.data;

    if (!changeIsImmediate || (hasLiveVersion && !replaceCurrentLiveVersion)) {
      return json({
        success: false as const,
        errors: {
          replaceCurrentLiveVersion:
            hasLiveVersion && !replaceCurrentLiveVersion,
          changeIsImmediate: !changeIsImmediate,
        },
        values: parsedForm.data,
      });
    }

    await apiClient.createScenarioPublication({
      publicationAction:
        deploymentType === 'deactivate' ? 'unpublish' : 'publish',
      scenarioIterationId: iterationId,
    });

    return json({
      success: true as const,
      errors: null,
      values: parsedForm.data,
    });
  } catch (error) {
    const { getSession, commitSession } = serverServices.toastSessionService;
    const session = await getSession(request);

    if (isStatusBadRequestHttpError(error)) {
      setToastMessage(session, {
        type: 'error',
        messageKey: 'common:errors.draft.invalid',
      });
    } else {
      setToastMessage(session, {
        type: 'error',
        messageKey: 'common:errors.unknown',
      });
    }

    return json(
      {
        success: false as const,
        errors: null,
        values: parsedForm.data,
      },
      { headers: { 'Set-Cookie': await commitSession(session) } },
    );
  }
}

function ModalContent({
  scenarioId,
  liveVersionId,
  currentIteration,
}: {
  scenarioId: string;
  liveVersionId?: string;
  currentIteration: SortedScenarioIteration;
}) {
  const { t } = useTranslation(handle.i18n);

  //TODO(transition): add loading during form submission
  const fetcher = useFetcher<typeof action>();

  const hasLiveVersion = !!liveVersionId;
  const deploymentType = getDeploymentType(currentIteration.type);
  const buttonConfig = getButtonConfig(deploymentType);

  const { state, data } = fetcher;
  const isSuccess = state === 'idle' && data?.success === true;
  const errors = data?.errors;

  return isSuccess ? (
    // In success modal, use data.values.deploymentType (action will update deploymentType to the new state)
    <div className="flex flex-col items-center p-6 text-center">
      <Icon
        icon="tick"
        width="108px"
        height="108px"
        className="bg-purple-10 border-purple-10 mb-6 rounded-full border-8 text-purple-100"
      />
      <Modal.Title className="text-l text-grey-100 mb-2 font-semibold">
        {t(
          `scenarios:deployment_modal_success.${data.values.deploymentType}.title`,
        )}
      </Modal.Title>
      <p className="text-s text-grey-100 mb-6 font-normal">
        {t(
          `scenarios:deployment_modal_success.${data.values.deploymentType}.description`,
        )}
      </p>
      <Modal.Close asChild>
        <Button variant="secondary">{t('common:close')}</Button>
      </Modal.Close>
    </div>
  ) : (
    <>
      <Modal.Title>
        {t(`scenarios:deployment_modal.${deploymentType}.title`)}
      </Modal.Title>
      <fetcher.Form
        className="flex-col p-6"
        method="POST"
        action={getRoute('/ressources/scenarios/deployment')}
      >
        <HiddenInputs
          deploymentType={deploymentType}
          scenarioId={scenarioId}
          liveVersionId={liveVersionId}
          iterationId={currentIteration.id}
        />
        <div className="text-s mb-6 flex flex-col gap-6 font-medium">
          <p className="font-semibold">
            {t(`scenarios:deployment_modal.${deploymentType}.confirm`)}
          </p>
          <Checkbox
            name="hasLiveVersion"
            className="hidden"
            defaultChecked={hasLiveVersion}
          />
          {hasLiveVersion ? (
            <div className="flex flex-row items-center gap-2">
              <Checkbox
                id="replaceCurrentLiveVersion"
                name="replaceCurrentLiveVersion"
                color={errors?.replaceCurrentLiveVersion ? 'red' : undefined}
              />

              <Label htmlFor="replaceCurrentLiveVersion">
                {t(
                  `scenarios:deployment_modal.${deploymentType}.replace_current_live_version`,
                )}
              </Label>
            </div>
          ) : null}
          <div className="flex flex-row gap-2">
            <Checkbox
              id="changeIsImmediate"
              name="changeIsImmediate"
              color={errors?.changeIsImmediate ? 'red' : undefined}
            />
            <Label htmlFor="changeIsImmediate">
              {t(
                `scenarios:deployment_modal.${deploymentType}.change_is_immediate`,
              )}
            </Label>
          </div>
        </div>

        {deploymentType === 'deactivate' ? (
          <p className="text-grey-25 mb-4 text-xs font-medium">
            {t(`scenarios:deployment_modal.${deploymentType}.helper`)}
          </p>
        ) : null}

        <div className="flex flex-1 flex-row gap-2">
          <Modal.Close asChild>
            <Button className="flex-1" variant="secondary">
              {t('common:cancel')}
            </Button>
          </Modal.Close>
          <Button
            className="flex-1"
            variant="primary"
            type="submit"
            {...buttonConfig.props}
          >
            <Icon icon={buttonConfig.icon.submit} className="size-6" />
            {t(buttonConfig.label)}
          </Button>
        </div>
      </fetcher.Form>
    </>
  );
}

const DeploymentModal = ({
  scenarioId,
  liveVersionId,
  currentIteration,
  deploymentType,
}: {
  scenarioId: string;
  liveVersionId?: string;
  currentIteration: SortedScenarioIteration;
  deploymentType: DeploymentType;
}) => {
  const { t } = useTranslation(handle.i18n);
  const buttonConfig = getButtonConfig(deploymentType);
  return (
    <Modal.Root>
      <Modal.Trigger asChild>
        <Button {...buttonConfig.props}>
          <Icon icon={buttonConfig.icon.trigger} className="size-6" />
          {t(buttonConfig.label)}
        </Button>
      </Modal.Trigger>
      <Modal.Content className="bg-grey-00">
        <ModalContent
          scenarioId={scenarioId}
          liveVersionId={liveVersionId}
          currentIteration={currentIteration}
        />
      </Modal.Content>
    </Modal.Root>
  );
};

const DisabledDeploymentButton = ({
  deploymentType,
}: {
  deploymentType: DeploymentType;
}) => {
  const { t } = useTranslation(handle.i18n);
  const buttonConfig = getButtonConfig(deploymentType);
  return (
    <Tooltip.Default
      className="text-xs"
      content={t('common:errors.draft.invalid')}
    >
      <Button {...buttonConfig.props} disabled>
        <Icon icon={buttonConfig.icon.trigger} className="size-6" />
        {t(buttonConfig.label)}
      </Button>
    </Tooltip.Default>
  );
};

export function DeploymentActions({
  scenarioId,
  liveVersionId,
  currentIteration,
  hasScenarioErrors,
}: {
  scenarioId: string;
  liveVersionId?: string;
  currentIteration: SortedScenarioIteration;
  hasScenarioErrors: boolean;
}) {
  const deploymentType = getDeploymentType(currentIteration.type);

  return (
    <>
      {hasScenarioErrors &&
      ['activate', 'deactivate'].includes(deploymentType) ? (
        <DisabledDeploymentButton deploymentType={deploymentType} />
      ) : (
        <DeploymentModal
          scenarioId={scenarioId}
          liveVersionId={liveVersionId}
          currentIteration={currentIteration}
          deploymentType={deploymentType}
        />
      )}
    </>
  );
}

function getDeploymentType(
  type: SortedScenarioIteration['type'],
): DeploymentType {
  switch (type) {
    case 'draft':
      return 'activate';
    case 'live version':
      return 'deactivate';
    case 'past version':
      return 'reactivate';
  }
}

function getButtonConfig(type: DeploymentType): {
  props: Pick<ButtonProps, 'color'>;
  icon: {
    trigger: IconName;
    submit: IconName;
  };
  label: ParseKeys<['scenarios']>;
} {
  switch (type) {
    case 'activate':
      return {
        label: 'scenarios:deployment_modal.activate.button',
        props: { color: 'purple' },
        icon: { trigger: 'pushtolive', submit: 'play' },
      };
    case 'deactivate':
      return {
        label: 'scenarios:deployment_modal.deactivate.button',
        props: { color: 'red' },
        icon: { trigger: 'stop', submit: 'stop' },
      };
    case 'reactivate':
      return {
        label: 'scenarios:deployment_modal.reactivate.button',
        props: { color: 'purple' },
        icon: { trigger: 'pushtolive', submit: 'play' },
      };
  }
}
