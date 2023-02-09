import type { TableTitle } from '../FilterTable';

interface ReturnType {
  sortingObject: {};

  sortingKeys: string[];
}

export const useTableSorting = (titles: TableTitle[]): ReturnType => {
  const sortingParams = titles.filter((title) => title.shouldSort);
  const sortingKeys = sortingParams.map(
    (sortParam) => sortParam.sortingParamName,
  );

  const sortingObject = sortingParams.reduce((acc, nextValue) => {
    const objValue = {
      order: nextValue.sortParamOrder,
    };
    return { ...acc, [nextValue.sortingParamName]: objValue };
  }, {});

  return { sortingObject, sortingKeys };
};
