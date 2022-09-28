import { isNumber } from 'lodash'

export const validateDate = (month, year) => {
  const date = new Date()
  const currentYear = date.getFullYear()
  const currentMonth = date.getMonth() + 1

  if (!isNumber(month) || !isNumber(year) || isNaN(month) || isNaN(year)) {
    return false
  }
  if (month < 1 || month > 12) {
    return false
  }
  if (year < 2010 || year > currentYear) {
    return false
  }
  if (year === currentYear && month > currentMonth) {
    return false
  }
  return true
}
