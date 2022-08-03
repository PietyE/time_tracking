import { useHistory, useLocation } from 'react-router-dom'
import { useLayoutEffect } from 'react'

export const useCheckStateAfterRedirect = (stateFrom) => {
  const history = useHistory()
  const location = useLocation()

  //use layout because we need to reload page before see error page for a while
  useLayoutEffect(() => {
    if (location.state.from === stateFrom) {
      history.replace({
        state: {},
      })
      window.location.reload()
    }
  }, [])
}
