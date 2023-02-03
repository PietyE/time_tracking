export const useScrollLock = (condition: boolean): void => {
  if (condition) {
    document.body.style.overflow = 'hidden';
  } else document.body.style.overflow = 'auto';
};
