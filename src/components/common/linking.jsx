import React, { Children } from 'react'

function Linking({ children, text }) {
  const REGEXP_FOR_LINK = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9]+(-?[a-zA-Z0-9])*\.)+[\w]{2,}(\/\S*)?$/gi

  const result = text.split(/\s/)
  const arrString = []
  let index = 0
  result.forEach(word => {
    const test = REGEXP_FOR_LINK.test(word)
    if (arrString[index] === undefined) {
      arrString.push(word)
    } else {
      if (test) {
        arrString.push(word)
        index = index + 2
      } else {
        arrString[0] = arrString[0] + ' ' + word
      }
    }
  })

  return (
    <>
      {arrString.map(item => {
        if (REGEXP_FOR_LINK.test(item)) {
          return (
            <a href={item} target="_blank" key={item}>
              {item}{' '}
            </a>
          )
        }
        return <span key={item}>{item} </span>
      })}
    </>
  )
}

export default Linking
