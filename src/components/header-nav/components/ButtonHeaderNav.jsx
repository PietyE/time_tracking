import React from 'react'

export default function ButtonHeaderNav({
  handlerOpenMenu,
  classWhenOpenMenu,
}) {
  return (
    <button
      className={`mobile_open_btn ${classWhenOpenMenu}`}
      onClick={handlerOpenMenu}
    >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </button>
  )
}
