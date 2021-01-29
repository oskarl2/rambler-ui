import React from 'react'
import SvgIcon from '../../SvgIcon'

export default function SearchIcon(props) {
  return (
    <SvgIcon
      viewBox={size => (size < 20 ? '0 0 15 15' : '0 0 20 20')}
      {...props}>
      {size =>
        size < 20 ? (
          <path
            d="M0 15V0m15 0v15m-.929-1.778l-3.447-3.446c1.925-2.357 1.817-5.821-.381-8.019C9.071.586 7.536 0 6 0 4.404 0 2.808.633 1.621 1.898c-2.151 2.293-2.151 5.911 0 8.204C2.808 11.367 4.404 12 6 12c1.345 0 2.675-.477 3.776-1.376l3.446 3.447c.195.195.512.195.707 0l.142-.142c.195-.195.195-.512 0-.707M6 1.2c1.282 0 2.488.499 3.394 1.406 1.872 1.871 1.872 4.917 0 6.788C8.488 10.301 7.282 10.8 6 10.8s-2.487-.499-3.394-1.406c-1.872-1.871-1.872-4.917 0-6.788C3.512 1.699 4.718 1.2 6 1.2"
            fillRule="evenodd"
          />
        ) : (
          <path
            d="M0 20V0m20 0v20m-2.823-3.884l-2.728-2.727c1.208-1.498 1.815-3.5 1.441-5.644-.489-2.806-2.728-5.089-5.527-5.616C5.437 1.2 1.2 5.437 2.129 10.363c.527 2.799 2.81 5.038 5.616 5.527 2.144.374 4.146-.233 5.644-1.441l2.727 2.728c.195.195.512.195.707 0l.354-.354c.195-.195.195-.512 0-.707M9 3.5c3.033 0 5.5 2.467 5.5 5.5s-2.467 5.5-5.5 5.5S3.5 12.033 3.5 9 5.967 3.5 9 3.5"
            fillRule="evenodd"
          />
        )
      }
    </SvgIcon>
  )
}

SearchIcon.displayName = 'SearchIcon'
