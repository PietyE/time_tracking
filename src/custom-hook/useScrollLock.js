export const useScrollLock = (condition) => {
  if (condition) {
    document.body.style.overflow = 'hidden'
  } else document.body.style.overflow = 'auto'
}
