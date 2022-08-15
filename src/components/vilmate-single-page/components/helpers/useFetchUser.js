import { useEffect } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom'
import { useDispatch } from 'react-redux'
import useEqualSelector from 'custom-hook/useEqualSelector'

export default function useFetchUserById(
  action,
  userSelector,
  loadingSelector
) {
  const user = useEqualSelector(userSelector)
  const loading = useEqualSelector(loadingSelector)
  const { userId } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(action(userId))
  }, [userId])

  return [user, loading]
}
