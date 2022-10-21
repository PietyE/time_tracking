import { useEffect } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom'
import { useDispatch } from 'react-redux'
import useEqualSelector from 'custom-hook/useEqualSelector'

export default function useFetchUserDataById(action, selector, isUserUpdated) {
  const data = useEqualSelector(selector)
  const { userId } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(action(userId))
  }, [userId, isUserUpdated])

  return data
}
