import { listScenarioIterations } from '@marble-front/api/marble';
import { setToastMessage } from '@marble-front/builder/components/MarbleToaster';
import { authenticator } from '@marble-front/builder/services/auth/auth.server';
import {
  commitSession,
  getSession,
} from '@marble-front/builder/services/auth/session.server';
import { getRoute } from '@marble-front/builder/services/routes';
import { fromParams, fromUUID } from '@marble-front/builder/utils/short-uuid';
import { type LoaderArgs, redirect } from '@remix-run/node';
import { type Namespace } from 'i18next';
import * as R from 'remeda';

export const handle = {
  i18n: ['scenarios'] satisfies Namespace,
};

export async function loader({ request, params }: LoaderArgs) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  });

  const scenarioId = fromParams(params, 'scenarioId');

  const scenarioIterations = await listScenarioIterations({ scenarioId });

  //TODO(CatchBoundary): replace this with according CatchBoundary
  if (scenarioIterations.length === 0) {
    const session = await getSession(request.headers.get('cookie'));
    setToastMessage(session, {
      type: 'error',
      messageKey: 'common:empty_scenario_iteration_list',
    });

    return redirect(getRoute('/scenarios'), {
      headers: { 'Set-Cookie': await commitSession(session) },
    });
  }

  const lastScenarioIteration = R.sortBy(scenarioIterations, [
    ({ createdAt }) => createdAt,
    'desc',
  ])[0];

  return redirect(
    getRoute('/scenarios/:scenarioId/i/:iterationId', {
      scenarioId: fromUUID(lastScenarioIteration.scenarioId),
      iterationId: fromUUID(lastScenarioIteration.id),
    })
  );
}