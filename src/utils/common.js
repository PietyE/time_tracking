export const getTokenKeyFromLocalStorage = () => {
  const user_auth_data = localStorage.getItem('user_auth_data')
  const data_user = JSON.parse(user_auth_data)
  return data_user.key
}

export const parseMinToHoursAndMin = (min, Hformat = false) => {
  const HOUR = 60
  let minToNumber = +min
  let strHours = '0'
  let strMin = '00'

  if (minToNumber < HOUR) {
    strMin = minToNumber < 10 ? `0${minToNumber}` : `${minToNumber}`
  } else {
    const hours = Math.floor(minToNumber / HOUR)

    strHours = `${hours}`
    const minutes = minToNumber % HOUR
    strMin = minutes < 10 ? `0${minutes}` : `${minutes}`
  }

  return Hformat ? `${strHours}h ${strMin}m` : `${strHours}:${strMin}`
}

export const getUrlParams = (search) => {
  let newStr = search
  let hashes = newStr.slice(newStr.indexOf('?') + 1).split('&')
  return hashes.reduce((params, hash) => {
    let [key, val] = hash.split('=')
    return Object.assign(params, { [key]: decodeURIComponent(val) })
  }, {})
}

export const convertHours = (data) => {
  if (data) {
    const hours = Math.floor(data)
    let minutes = Math.round((data - hours) * 60)
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    return `${hours}:${minutes}`
  } else {
    return 0
  }
}
export const convertMinutesToHours = (data) => {
  if (data) {
    const hours = Math.floor(data / 60)
    let minutes = data - hours * 60
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    return `${hours}:${minutes}`
  } else {
    return 0
  }
}

export const currentItemsGets = (pageSize, currentPage, totalItems) => {
  let from
  let to
  if (currentPage > 1) {
    from = (currentPage - 1) * pageSize
    to = currentPage * pageSize
  } else {
    from = 0
    to = currentPage * pageSize
  }

  let res = totalItems.slice(from, to)
  return res
}

export function paginationWithDots(c, m) {
  var current = c,
    last = m,
    delta = 2,
    left = current - delta,
    right = current + delta + 1,
    range = [],
    rangeWithDots = [],
    l

  for (let i = 1; i <= last; i++) {
    if (i === 1 || i === last || (i >= left && i < right)) {
      range.push(i)
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1)
      } else if (i - l !== 1) {
        rangeWithDots.push('...')
      }
    }
    rangeWithDots.push(i)
    l = i
  }

  return rangeWithDots
}

export function setElementTop(element) {
  let top
  if (window.pageYOffset < 100) {
    if (document.documentElement.clientWidth < 990) {
      top = window.pageYOffset + document.documentElement.clientHeight / 3 + 100
    } else {
      top = window.pageYOffset + document.documentElement.clientHeight / 3
    }
  } else {
    top = window.pageYOffset + document.documentElement.clientHeight / 4
  }
  element.style.top = top + 'px'
}

export const sortUserProjectReport = (a, b) => {
  return b.active_project - a.active_project
}

export const compareForTimeColumns = (a, b) => {
  if (typeof a !== 'string' || typeof b !== 'string') {
    return 0
  }
  const first = formatTimeToNumber(a)
  const second = formatTimeToNumber(b)

  if (first === second) {
    return 0
  }

  return first < second ? -1 : 1
}

export const getDeveloperProjectsName = (projects) => {
  const allProjectsName = projects.map((project) => project.name).join(', ')
  return allProjectsName
}

export const setHeight = (elem) => {
  let vh = window.innerHeight * 0.01
  elem.style.setProperty('--vh', `${vh}px`)
}

const formatTimeToNumber = (timeStr) => {
  const result = timeStr.replace('h ', '').replace('m', '')

  return parseInt(result)
}

export const sortArrayOfObjectsAlphabetically = (a, b, sortingField) => {
  if (a[sortingField].toUpperCase() < b[sortingField].toUpperCase()) {
    return -1
  }
  if (a[sortingField].toUpperCase() > b[sortingField].toUpperCase()) {
    return 1
  }
  return 0
}

export const sortProjectsByName = (project1, project2) =>
  sortArrayOfObjectsAlphabetically(project1, project2, 'name')

export const sortAndParseByDate = (comments) =>
  comments
    .filter((comment) => comment.is_active)
    .sort(
      (comment1, comment2) =>
        Date.parse(comment1.date_create) - Date.parse(comment2.date_create)
    )
    .reverse()

export const findListItemById = (list, itemId) =>
  list.find((listItem) => listItem.id === itemId)
