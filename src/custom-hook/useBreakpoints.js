import { BREAKPOINTS } from 'material-ui/constants'
import useMediaQuery from './useMediaQuery'

const useBreakpoints = () => {
  const isMobile = useMediaQuery(`(min-width: ${BREAKPOINTS.mobile})`)
  const isTablet = useMediaQuery(`(min-width: ${BREAKPOINTS.tablet})`)
  const isLaptop = useMediaQuery(`(min-width: ${BREAKPOINTS.laptop})`)
  const isDesktop = useMediaQuery(`(min-width: ${BREAKPOINTS.desktop})`)

  return {
    isMobile,
    isTablet,
    isLaptop,
    isDesktop,
  }
}

export default useBreakpoints
