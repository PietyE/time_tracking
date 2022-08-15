import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import styles from './SliderSelect.module.scss'
import PropTypes from 'prop-types'

export const SliderSelect = ({
  options,
  selectedValue,
  onChange,
  initialSlide = 0,
}) => {
  const slides = options.map((option) => (
    <SwiperSlide
      className={`${styles.slide} ${
        option.value === selectedValue && styles.selected
      }`}
      onClick={() => {
        onChange(option.value)
      }}
      key={option.value}
    >
      <span className={styles.label}>{option.label}</span>
      <span className={styles.value}>{option.value}</span>
    </SwiperSlide>
  ))

  return (
    <Swiper
      slidesPerView={7}
      initialSlide={initialSlide}
      className={styles.container}
    >
      {slides}
    </Swiper>
  )
}

SliderSelect.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
      label: PropTypes.string,
    })
  ).isRequired,
  selectedValue: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  initialSlide: PropTypes.number,
}
