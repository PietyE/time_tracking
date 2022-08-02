import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Grid } from '@material-ui/core'
import { UserItem } from './components/UserItem'
import useEqualSelector from 'custom-hook/useEqualSelector'
import { getLoading, getUsers } from 'selectors/vilmates-page'
import SpinnerStyled from 'components/ui/spinner'
import { vilmatesPageGetUsersListRequest } from 'actions/vilmates-page'

export const UsersList = () => {
  const dispatch = useDispatch()
  const users = useEqualSelector(getUsers())
  const isLoading = useEqualSelector(getLoading())

  useEffect(() => {
    dispatch(vilmatesPageGetUsersListRequest())
  }, [])

  const renderUsers = () =>
    users.map(({ id, name, position }) => (
      <Grid item key={id} md={3}>
        <UserItem name={name} position={position} />
      </Grid>
    ))

  if (isLoading) return <SpinnerStyled />

  return (
    <Grid container spacing={7}>
      {renderUsers()}
    </Grid>
  )
}
