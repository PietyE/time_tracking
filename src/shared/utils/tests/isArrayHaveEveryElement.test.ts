import { isArrayHaveEveryElement } from '../isArrayHaveEveryElement';
import {
  UsersPermissions,
  VilmatesCommentsPermissions,
} from 'constants/permissions';

describe('isArrayHaveEveryElement', () => {
  test('right results', () => {
    expect(
      isArrayHaveEveryElement<UsersPermissions | VilmatesCommentsPermissions>(
        [
          UsersPermissions.users_add_commenthistory,
          UsersPermissions.users_add_expensehistory,
          UsersPermissions.users_add_processeduserflag,
          UsersPermissions.users_add_socialaccount,
          UsersPermissions.users_add_user,
        ],
        [
          UsersPermissions.users_add_commenthistory,
          UsersPermissions.users_add_expensehistory,
          UsersPermissions.users_add_processeduserflag,
          UsersPermissions.users_add_socialaccount,
          UsersPermissions.users_add_user,
          VilmatesCommentsPermissions.vilmate_comments_add_vilmatecomment,
          VilmatesCommentsPermissions.vilmate_comments_delete_vilmatecomment,
        ],
      ),
    ).toBeTruthy();
    expect(
      isArrayHaveEveryElement(
        [],
        [VilmatesCommentsPermissions.vilmate_comments_delete_vilmatecomment],
      ),
    ).toBeTruthy();
  });
  test('error result', () => {
    expect(
      isArrayHaveEveryElement<UsersPermissions | VilmatesCommentsPermissions>(
        [
          UsersPermissions.users_add_commenthistory,
          UsersPermissions.users_add_expensehistory,
          UsersPermissions.users_add_processeduserflag,
          UsersPermissions.users_add_socialaccount,
          UsersPermissions.users_add_user,
        ],
        [
          UsersPermissions.users_add_commenthistory,
          UsersPermissions.users_add_expensehistory,
          UsersPermissions.users_add_processeduserflag,
          UsersPermissions.users_add_socialaccount,
          VilmatesCommentsPermissions.vilmate_comments_add_vilmatecomment,
          VilmatesCommentsPermissions.vilmate_comments_delete_vilmatecomment,
        ],
      ),
    ).toBeFalsy();
    expect(
      isArrayHaveEveryElement([UsersPermissions.users_add_commenthistory], []),
    ).toBeFalsy();
  });
});
