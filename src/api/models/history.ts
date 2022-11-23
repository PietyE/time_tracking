export interface HistoryQueryParams {
  ordering: string;
  search: string;
  date_from: string;
  date_to: string;
  page: number;
  page_size: number;
}

export interface HistoryField {
  field: string;
  old_value: string;
  new_value: string;
}

export interface HistoryItem {
  id: string;
  date_create: Date;
  content_type: number;
  object_id: string;
  status: string;
  initiator: string;
  history_fields: HistoryField[];
}

export interface HistoryResponse {
  items: HistoryItem[];
  count_pages: number;
  page_size: number;
  page: number;
  count_results: number;
}

export interface HistoryFieldResponse extends HistoryField {
  id: string;
}
