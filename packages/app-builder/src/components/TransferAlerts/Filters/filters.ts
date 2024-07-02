import { assertNever } from 'typescript-utils';
import { type IconName } from 'ui-icons';

export const alertsFilterNames = ['dateRange', 'statuses'] as const;

export type AlertsFilterName = (typeof alertsFilterNames)[number];

export function getFilterIcon(filterName: AlertsFilterName): IconName {
  switch (filterName) {
    case 'dateRange':
      return 'calendar-month';
    case 'statuses':
      return 'category';
    default:
      assertNever('[AlertsFilterName] unknown filter:', filterName);
  }
}

export function getFilterTKey(filterName: AlertsFilterName) {
  switch (filterName) {
    case 'dateRange':
      return 'transfercheck:alerts.list.created_at';
    case 'statuses':
      return 'transfercheck:alerts.list.status';
    default:
      assertNever('[AlertsFilterName] unknown filter:', filterName);
  }
}
