export const getTokenKeyFromLocalStorage = () => {
  const user_auth_data = localStorage.getItem('user_auth_data')
  const data_user = JSON.parse(user_auth_data)
  return data_user.key
}

export const parseMinToHoursAndMin = (min, Hformat=false) => {
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

  return Hformat?`${strHours}h ${strMin}m`:`${strHours}:${strMin}`
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

export const  currentItemsGets =(pageSize, currentPage, totalItems)=>{
  let from ;
  let to ;
  if(currentPage>1){
    from = (currentPage-1) * pageSize;
    to = currentPage * pageSize;
  }else {
    from = 0;
    to = currentPage * pageSize;
  }

  let res = totalItems.slice(from, to);
  return res;
}

export const closeEditMenu = (editMenu, setEditMenu)=>{
  window.addEventListener('click', (event)=>{
    if(editMenu){
      if(event.target.parentNode?.classList.contains('edit_dots')
          || event.target.parentNode.classList.contains('time_report_day_menu')
          || event.target.parentNode.classList.contains('time_report_day_edit')
          || event.target.classList.contains('time_report_day_menu')
          || event.target.parentNode.classList.contains('svg-inline--fa')){
        return
      }
      setEditMenu(false)
    }
  })
}


export  function paginationWithDots(c, m) {
  var current = c,
      last = m,
      delta = 2,
      left = current - delta,
      right = current + delta + 1,
      range = [],
      rangeWithDots = [],
      l;

  for (let i = 1; i <= last; i++) {
    if (i == 1 || i == last || i >= left && i < right) {
      range.push(i);
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
}
