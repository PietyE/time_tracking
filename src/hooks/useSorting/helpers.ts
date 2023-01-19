// Type guard if we use sorting with hours sorting ( total minutes field ) we will set it on toggle desc by default
export const isTotalMinutes = (sortKey: string): sortKey is 'total_minutes' =>
  sortKey === 'total_minutes';
