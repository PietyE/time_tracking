import { useHistory, useLocation } from 'react-router-dom'
import { useLayoutEffect } from 'react'
import { get as lodashGet } from 'lodash'

export const useCheckStateAfterRedirect = (stateFrom) => {
  const history = useHistory()
  const location = useLocation()

  //use layout because we need to reload page before see error page for a while
  useLayoutEffect(() => {
    const fromValue = lodashGet(location.state, 'from', '')
    if (fromValue === stateFrom) {
      history.replace({
        state: {},
      })
      window.location.reload()
    }
  }, [])
}
