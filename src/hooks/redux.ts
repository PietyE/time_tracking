import {
  useDispatch,
  type TypedUseSelectorHook,
  useSelector,
} from 'react-redux';
import isEqual from 'lodash/isEqual';
import type { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from 'store';

export const useAppDispatch = (): ThunkDispatch<{}, undefined, AnyAction> =>
  useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppShallowSelector: TypedUseSelectorHook<RootState> = (
  selector,
) => useAppSelector(selector, isEqual);
