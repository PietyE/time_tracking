import { useSelector} from 'react-redux'
import { isEqual } from 'lodash'

export default function useEqualSelector(selector) {
    return useSelector(selector, isEqual)
}