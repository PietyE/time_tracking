import React, { Children } from 'react'

function Linking({ children }) {
  const REGEXP_FOR_LINK = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9]+(-?[a-zA-Z0-9])*\.)+[\w]{2,}(\/\S*)?$/gi
  return (
    <>
      {Children.map(children, i => {
        return i.split(' ').map(word => {
          if (REGEXP_FOR_LINK.test(word)) {
            return (
              <a href={word} target="_blank">
                {word}{' '}
              </a>
            )
          }
          return `${word} `
        })
      })}
    </>
  )
}

export default Linking
