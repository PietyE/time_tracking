import get from 'lodash/get';
import { sortArrayAlphabetically } from 'shared/utils/sortArrayAlphabetically';
import type { FilterOptionsState } from '@mui/material';
export const createSortingNames = <T>(
  options: T[],
  state: FilterOptionsState<T>,
  keysToName: string[],
  selectAll = true,
): Array<{ name: 'Select All'; id: 'Select All' } | T> => {
  const newOptions: T[] = [];
  options.forEach((element) => {
    if (
      get(element, keysToName)
        .replace(',', '')
        .toLowerCase()
        .includes(state.inputValue.toLowerCase())
    )
      newOptions.push(element);
  });
  return selectAll
    ? [
        { name: 'Select All', id: 'Select All' },
        ...newOptions.sort((el1, el2) =>
          sortArrayAlphabetically(get(el1, keysToName), get(el2, keysToName)),
        ),
      ]
    : [
        ...newOptions.sort((el1, el2) =>
          sortArrayAlphabetically(get(el1, keysToName), get(el2, keysToName)),
        ),
      ];
};

export const isEqual = <T>(option: T, value: T, keysToId: string[]): boolean =>
  get(option, keysToId) === get(value, keysToId) ||
  get(value, keysToId) === 'Select All';
