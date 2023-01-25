export interface WorkItem {
  id: string;
  developer_project: string;
  title: string;
  date: string;
  duration: number;
  date_create: Date;
  date_update: Date;
  project: string;
  is_active: boolean;
}

export interface WorkItemsResponse {
  items: WorkItem[];
  count_pages: number;
  page_size: number;
  page: number;
  count_results: number;
}

export interface WorkItemsQueryParams {
  developer_project?: string;
  year?: number;
  month?: number;
  user_id?: string;
  page?: number;
  page_size?: number;
}

export interface CreateWorkItemData
  extends Pick<WorkItem, 'developer_project' | 'title' | 'date' | 'duration'> {
  is_active?: boolean;
}

export interface DeleteWorkItemResponse extends Omit<WorkItem, 'is_active'> {
  is_active: false;
}

export type UpdateWorkItemData = Pick<
  WorkItem,
  'title' | 'duration' | 'date' | 'id'
>;

export interface WorkItemHistory {
  id: string;
  work_item: string;
  developer_project: string;
  title: string;
  date: string;
  duration: number;
  salary: string;
  rate: string;
  date_create: Date;
}
