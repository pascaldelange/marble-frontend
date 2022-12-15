import { Page } from '@marble-front/builder/components/Page';
import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, Outlet, useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';

import type { Scenario } from '@marble-front/api/marble';

import { faker } from '@faker-js/faker';
import type { PlainMessage } from '@bufbuild/protobuf';

function getFakeScenario(id: string): PlainMessage<Scenario> {
  const versions = Array.from({ length: Math.floor(Math.random() * 10) }).map(
    (_) => ({
      id: faker.database.mongodbObjectId(),
      rules: [],
    })
  );

  return {
    id,
    name: faker.name.fullName(),
    description: faker.lorem.sentences(),
    mainTable: faker.name.lastName(),
    versions,
    activeVersion: versions?.[versions?.length - 1],
  };
}

export async function loader({ params }: LoaderArgs) {
  invariant(params.scenarioId, `params.scenarioId is required`);
  /** TODO(data): get scenario from API */
  const scenario = getFakeScenario(params.scenarioId);

  return json(scenario);
}

export default function ScenarioLayout() {
  const data = useLoaderData<typeof loader>();

  return (
    <Page.Container>
      <Page.Header>
        <Link to="./..">
          <Page.BackButton />
        </Link>
        {data.name}
        <select>
          
        </select>
      </Page.Header>
      <Outlet />
    </Page.Container>
  );
}
