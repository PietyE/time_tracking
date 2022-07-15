import React from 'react'

const REGEXP_FOR_LINK =
  /^(https?:\/\/)?(www\.)?([a-zA-Z0-9]+(-?[a-zA-Z0-9])*\.)+[\w]{2,}(\/\S*)?$/gi

function Linking({ text }) {
  const result = text.split(/\s/)
  const arrString = []
  let index = 0
  result.forEach((word) => {
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
      {arrString.map((item) => {
        if (item.search(REGEXP_FOR_LINK) !== -1) {
          const link =
            item.startsWith('http') || item.startsWith('https')
              ? item
              : `//${item}`
          return (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              key={Math.random(2).toString(16).substring(2)}
            >
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
