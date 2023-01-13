import { sortArrayAlphabetically } from 'shared/utils/sortArrayAlphabetically';
import type { FilterOptionsState } from '@mui/base/AutocompleteUnstyled/useAutocomplete';

export const createSorting = (
  options: string[],
  state: FilterOptionsState<string>,
): string[] => {
  const newOptions: string[] = [];
  options.forEach((element) => {
    if (
      element
        .replace(',', '')
        .toLowerCase()
        .includes(state.inputValue.toLowerCase())
    )
      newOptions.push(element);
  });
  return ['Select All', ...newOptions.sort(sortArrayAlphabetically)];
};
