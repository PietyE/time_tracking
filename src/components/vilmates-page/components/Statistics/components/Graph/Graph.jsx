import React from 'react'
import { Box } from '@material-ui/core'
import { GraphInfo } from './components/GraphInfo'
import { GraphRating } from './components/GraphRating'
import { getUsers } from 'selectors/vilmates-page'
import useShallowEqualSelector from 'custom-hook/useShallowEqualSelector'

export const Graph = () => {
  const users = useShallowEqualSelector(getUsers)
  return (
    <Box className="vilmates-page-users-statistics-amount-container">
      <GraphInfo amount={users.length} />
      <GraphRating />
    </Box>
  )
}
