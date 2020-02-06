export const getTokenKeyFromLocalStorage = () => {
  const user_auth_data = localStorage.getItem('user_auth_data')
  const data_user = JSON.parse(user_auth_data)
  return data_user.key
}
