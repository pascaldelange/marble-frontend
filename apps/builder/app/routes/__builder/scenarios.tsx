import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { authenticator } from '@marble-front/builder/services/auth/auth.server';
import { scenariosApi } from '@marble-front/builder/services/marble-api/scenarios.server';
import * as R from 'remeda';
import type { RequiredKeys } from '@marble-front/builder/utils/utility-types';
import { createSimpleContext } from '@marble-front/builder/utils/create-context';
import invariant from 'tiny-invariant';

function getLast<T extends { creationDate: string }>(elements: T[]) {
  return elements.reduce(
    (lastDeployment: T | undefined, deployment) =>
      lastDeployment && lastDeployment?.creationDate > deployment.creationDate
        ? lastDeployment
        : deployment,
    undefined
  );
}

export async function loader({ request }: LoaderArgs) {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  });
  const scenarios = await scenariosApi.getScenarios({ userId: user.id });

  return json(scenarios);
}

function useScenariosValue() {
  const scenariosData = useLoaderData<typeof loader>();

  invariant(scenariosData, 'No scenarios data');

  return R.pipe(
    scenariosData,
    R.map((scenarioData) => {
      return {
        id: scenarioData.id,
        creationDate: scenarioData.creationDate,
        authorId: scenarioData.authorId,
        name: scenarioData.name,
        description: scenarioData.description,
        mainTable: scenarioData.mainTable,
        deployments: scenarioData.deployments,
        versions: scenarioData.versions,
        get lastDeployment() {
          return getLast(this.deployments);
        },
        get lastVersion() {
          return getLast(this.versions);
        },
        get lastIncrementId() {
          return this.lastDeployment?.id ?? this.lastVersion?.id;
        },
      };
    }),
    R.filter(
      (
        scenario
      ): scenario is RequiredKeys<typeof scenario, 'lastIncrementId'> => {
        return scenario?.lastIncrementId !== undefined;
      }
    )
  );
}

export type Scenarios = ReturnType<typeof useScenariosValue>;

const { Provider, useValue: useScenarios } =
  createSimpleContext<Scenarios>('Scenarios');

export default function ScenariosPage() {
  const value = useScenariosValue();
  return (
    <Provider value={value}>
      <Outlet />
    </Provider>
  );
}

export { useScenarios };