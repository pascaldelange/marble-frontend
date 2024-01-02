import { CollapsiblePaper, Page } from '@app-builder/components';
import { isAdmin } from '@app-builder/models';
import { CreateTag } from '@app-builder/routes/ressources+/settings+/tags+/create';
import { DeleteTag } from '@app-builder/routes/ressources+/settings+/tags+/delete';
import { UpdateTag } from '@app-builder/routes/ressources+/settings+/tags+/update';
import { serverServices } from '@app-builder/services/init.server';
import { getRoute } from '@app-builder/utils/routes';
import { json, type LoaderFunctionArgs, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { createColumnHelper, getCoreRowModel } from '@tanstack/react-table';
import clsx from 'clsx';
import { type Tag } from 'marble-api';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Table, useTable } from 'ui-design-system';

export async function loader({ request }: LoaderFunctionArgs) {
  const { authService } = serverServices;
  const { organization, user } = await authService.isAuthenticated(request, {
    failureRedirect: '/login',
  });
  if (!isAdmin(user)) {
    return redirect(getRoute('/'));
  }

  const tags = await organization.listTags({ withCaseCount: true });

  return json({ tags });
}

const columnHelper = createColumnHelper<Tag>();

export default function Tags() {
  const { t } = useTranslation(['settings']);
  const { tags } = useLoaderData<typeof loader>();

  const columns = useMemo(() => {
    return [
      columnHelper.accessor((row) => row.name, {
        id: 'name',
        header: t('settings:tags.name'),
        size: 100,
      }),
      columnHelper.accessor((row) => row.color, {
        id: 'color',
        header: t('settings:tags.color'),
        size: 50,
        cell: ({ getValue }) => (
          <div
            className="h-4 w-4 rounded-full"
            style={{ backgroundColor: getValue() }}
          ></div>
        ),
      }),
      columnHelper.accessor((row) => row.cases_count, {
        id: 'cases',
        header: t('settings:tags.cases'),
        size: 100,
      }),
      columnHelper.display({
        id: 'actions',
        size: 50,
        cell: ({ cell }) => {
          return (
            <div className="text-grey-00 group-hover:text-grey-100 flex gap-2">
              <UpdateTag tag={cell.row.original} />
              <DeleteTag tag={cell.row.original} />
            </div>
          );
        },
      }),
    ];
  }, [t]);

  const { table, getBodyProps, rows, getContainerProps } = useTable({
    data: tags,
    columns,
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
  });

  return (
    <Page.Container>
      <Page.Content>
        <CollapsiblePaper.Container>
          <CollapsiblePaper.Title>
            <span className="flex-1">{t('settings:tags')}</span>
            <CreateTag />
          </CollapsiblePaper.Title>
          <CollapsiblePaper.Content>
            <Table.Container {...getContainerProps()}>
              <Table.Header headerGroups={table.getHeaderGroups()} />
              <Table.Body {...getBodyProps()}>
                {rows.map((row) => {
                  return (
                    <Table.Row
                      key={row.id}
                      tabIndex={0}
                      className={clsx('hover:bg-grey-02 cursor-pointer')}
                      row={row}
                    />
                  );
                })}
              </Table.Body>
            </Table.Container>
          </CollapsiblePaper.Content>
        </CollapsiblePaper.Container>
      </Page.Content>
    </Page.Container>
  );
}