import { ASCEND } from '../constants/order-constant'
import { isArray, sortBy } from 'lodash'

export const getTokenKeyFromLocalStorage = () => {
  const user_auth_data = localStorage.getItem('user_auth_data')
  const data_user = JSON.parse(user_auth_data)
  return data_user.key
}

export const parseMinToHoursAndMin = (min) => {
  const HOUR = 60
  let minToNumber = +min
  let strHours = '00'
  let strMin = '00'

  if (minToNumber < HOUR) {
    strMin = minToNumber < 10 ? `0${minToNumber}` : `${minToNumber}`
  } else {
    const hours = Math.floor(minToNumber / HOUR)

    strHours = `${hours}`
    const minutes = minToNumber % HOUR
    strMin = minutes < 10 ? `0${minutes}` : `${minutes}`
  }

  return `${strHours}:${strMin}`
}

export const getUrlParams = (search) => {
  let newStr = search
  let hashes = newStr.slice(newStr.indexOf('?') + 1).split('&')
  return hashes.reduce((params, hash) => {
    let [key, val] = hash.split('=')
    return Object.assign(params, { [key]: decodeURIComponent(val) })
  }, {})
}

export const convertHours = (data) =>{
  if(data){
    const hours = Math.floor(data);
    let minutes = Math.round((data - hours)*60);
    if(minutes < 10){
      minutes = `0${minutes}`
    }
    return `${hours}:${minutes}`
  }else{
    return 0
  }
}
export const convertMinutesToHours = (data) => {
  if(data){
    const hours = Math.floor(data/60);
    let minutes = data - (hours*60);
    if(minutes < 10){
      minutes = `0${minutes}`
    }
    return `${hours}:${minutes}`
  }else{
    return 0
  }
}

export const getSortedUsers = (users, key, order) => {
  if (!users || !isArray(users)) return [];

  if (!key || !order) return users;

  const numericKeys = [
    'rate_uah',
    'salary_uah',
    'total_expenses',
    'total_overtimes',
    'total',
    'total_uah',
  ];
  const isNumericKey = numericKeys.some(item => item === key);

  const sortedData = sortBy(
    users,
    isNumericKey ? (item) => parseFloat(item[key]) : key,
    );

  return order === ASCEND ? sortedData :sortedData.reverse();
}
