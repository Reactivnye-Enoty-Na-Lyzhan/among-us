import { createSelector } from '@reduxjs/toolkit';
import { authApi } from './auth.slice';
import type { User } from './auth.types';
import type {
  NestedKeysArrayLikePaths,
  NestedPropertyType,
} from '@/utils/objects-handle/types/nestedProperty';
import { getNestedPropertyByPath } from '@/utils/objects-handle/get-nested-property';

const getUserQuerySelector = authApi.endpoints.getUser.select();

export function makeUserDataSelector<
  ArrayLikePath extends NestedKeysArrayLikePaths<User>
>(dataPath: ArrayLikePath) {
  const userDataSelector = createSelector(
    getUserQuerySelector,
    function (userQuery): NestedPropertyType<User, ArrayLikePath> | undefined {
      const { data } = userQuery;

      if (!data) {
        return data;
      }

      const dataByPath = getNestedPropertyByPath<User, ArrayLikePath>({
        object: data,
        pathArray: dataPath,
      });

      return dataByPath;
    }
  );

  return userDataSelector;
}

export const selectUserID = makeUserDataSelector(['id']);
export const selectUserLogin = makeUserDataSelector(['login']);
