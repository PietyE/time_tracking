import type { RootState } from 'redux/store';

export type CallBack<T> = (state: RootState) => T;

export const createTypedSelector = <T>(callback: CallBack<T>): CallBack<T> => {
  return callback;
};
