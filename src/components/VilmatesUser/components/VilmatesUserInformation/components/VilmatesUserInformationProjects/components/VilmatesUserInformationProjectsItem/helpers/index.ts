import { useMemo, useState } from 'react';
import { Occupation } from 'constants/occupation';

interface ReturnType {
  isOccupationHovered: boolean;
  isFullTime: boolean;
  isDeleteButtonDisabled: boolean;
  occupationLabel: Occupation;
  hoverOccupationHandler: () => void;
  blurOccupationHandler: () => void;
  setIsFullTime: (value: ((prevState: boolean) => boolean) | boolean) => void;
  setIsDeleteButtonDisabled: (
    value: ((prevState: boolean) => boolean) | boolean,
  ) => void;
}

export const useProjectSection = (_isFullTime: boolean): ReturnType => {
  const [isOccupationHovered, setIsOccupationHovered] =
    useState<boolean>(false);
  const [isFullTime, setIsFullTime] = useState(_isFullTime);
  const [isDeleteButtonDisabled, setIsDeleteButtonDisabled] =
    useState<boolean>(false);

  const occupationLabel = useMemo(
    () => (!isFullTime ? Occupation.PART_TIME : Occupation.FULL_TIME),
    [isFullTime],
  );

  const hoverOccupationHandler = (): void => {
    setIsOccupationHovered(true);
  };

  const blurOccupationHandler = (): void => {
    setIsOccupationHovered(false);
  };

  return {
    isDeleteButtonDisabled,
    isFullTime,
    isOccupationHovered,
    occupationLabel,
    hoverOccupationHandler,
    blurOccupationHandler,
    setIsFullTime,
    setIsDeleteButtonDisabled,
  };
};
