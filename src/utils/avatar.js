//see example in https://mui.com/material-ui/react-avatar/#main-content

function stringToColor(string) {
  let hash = 0
  let i

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = '#'

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }

  return color
}

const getName = (name) => {
  const fullName = name.split(' ')
  return fullName.length > 1
    ? `${fullName[0][0]}${fullName[1][0]}`
    : `${fullName[0][0]}`
}

export const stringAvatar = (name) => {
  return {
    style: {
      backgroundColor: stringToColor(name),
    },
    children: getName(name),
  }
}
