import React from 'react'

const REGEXP_FOR_LINK =
  /^(https?:\/\/)?(www\.)?([a-zA-Z0-9]+(-?[a-zA-Z0-9])*\.)+[\w]{2,}(\/\S*)?$/gi

function Linking({ text }) {
  const result = text.split(/\s/)

  return (
    <>
      {result.map((item) => {
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
              {item}
            </a>
          )
        }
        return (
          <span key={Math.random(2).toString(16).substring(2)}>{item} </span>
        )
      })}
    </>
  )
}

export default Linking
