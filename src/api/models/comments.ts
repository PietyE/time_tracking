import type { User } from "./users";

export interface CommentsQueryParams {
  page: number;
  page_size: number;
}

export interface CommentItem {
  id: string;
  user: string;
  text: string;
  reply: string;
  initiator: Pick<User, "id" | "name" | "email">;
  date_create: Date;
  is_updated: string;
  is_active: boolean;
}

export interface CommentsResponse {
  items: CommentItem[];
  count_pages: number;
  page_size: number;
  page: number;
  count_results: number;
}

export interface CreateCommentData {
  user: string;
  text: string;
  reply?: string;
}

export type CreateCommentResponse = Omit<
  CommentItem,
  "date_create" | "is_updated"
>;

export interface UpdateCommentData {
  text: string;
  initiator?: string;
  is_active?: boolean;
}
