import CRUD from '../base';
import { VilmateCommentsEndpoints } from 'constants/endpoints';
import type { AxiosInstance, AxiosPromise } from 'axios';

import type {
  CommentsQueryParams,
  CommentsResponse,
  CreateCommentData,
  CreateCommentResponse,
  CommentItem,
  UpdateCommentData,
} from '../models/comments';

export class CommentsApi extends CRUD {
  getComments(
    params: Partial<CommentsQueryParams>,
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
      method: 'POST',
    });
  }

  getCommentById(id: string): AxiosPromise<CommentItem> {
    return this.request({
      url: `${this.url}/${id}/`,
    });
  }

  updateComment(
    id: string,
    data: UpdateCommentData,
  ): AxiosPromise<CommentItem> {
    return this.request({
      url: `${this.url}/${id}/`,
      method: 'PATCH',
      data,
    });
  }
}

export default function commentsApi(request: AxiosInstance): CommentsApi {
  return new CommentsApi({
    url: VilmateCommentsEndpoints.VILMATE_COMMENTS,
    request,
  });
}
