import { AxiosInstance, AxiosPromise } from "axios";

import CRUD from "../base";
import {
  CommentsQueryParams,
  CommentsResponse,
  CreateCommentData,
  CreateCommentResponse,
  CommentItem,
  UpdateCommentData,
} from "../models/comments";

export class CommentsApi extends CRUD {
  getComments(
    params: Partial<CommentsQueryParams>
  ): AxiosPromise<CommentsResponse> {
    return this.request({
      url: `${this.url}/`,
      params,
    });
  }

  createComments(data: CreateCommentData): AxiosPromise<CreateCommentResponse> {
    return this.request({
      url: `${this.url}/`,
      data,
      method: "POST",
    });
  }

  getCommentById(id: string): AxiosPromise<CommentItem> {
    return this.request({
      url: `${this.url}/${id}/`,
    });
  }

  updateComment(
    id: string,
    data: UpdateCommentData
  ): AxiosPromise<CommentItem> {
    return this.request({
      url: `${this.url}/${id}/`,
      method: "PATCH",
      data,
    });
  }
}

export default function commentsApi(request: AxiosInstance) {
  return new CommentsApi({
    url: "/vilmate-comments",
    request,
  });
}
