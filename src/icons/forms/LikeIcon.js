import React from 'react'
import SvgIcon from '../../SvgIcon'

export default function LikeIcon(props) {
  return (
    <SvgIcon
      viewBox={size => (size < 20 ? '0 0 15 15' : '0 0 20 20')}
      {...props}>
      {size =>
        size < 20 ? (
          <path
            fillRule="evenodd"
            d="M15 0v15V0zM0 0v15V0zm12.8 11.637L11.357 13.8H5V7.14l3.063-3.535.696-2.087 1.041.347v1.852L8.059 7.2H12.8v4.437zM2.2 13.8h1.6V7.2H2.2v6.6zM10 6l.895-1.789c.069-.139.105-.292.105-.447V1.721c0-.431-.275-.813-.684-.949L8.948.316c-.523-.174-1.09.109-1.264.632L7 3 4.4 6H2c-.553 0-1 .447-1 1v7c0 .553.447 1 1 1h9.465c.334 0 .646-.167.832-.445l1.535-2.303c.109-.164.168-.357.168-.555V7c0-.553-.447-1-1-1h-3z"
          />
        ) : (
          <path
            d="M20 0v20V0zM0 0v20V0zm16.5 14.5l-2.25 3H7V9.342l3.288-3.524 1.418-3.545.794.53v2.843L10.573 9.5H16.5v5zm-13 3h2v-8h-2v8zM13 8l1-2V2.535c0-.334-.167-.646-.445-.832L12.025.684c-.528-.353-1.247-.129-1.483.461L9 5 6.2 8H3c-.553 0-1 .447-1 1v9c0 .553.447 1 1 1h11.5c.314 0 .611-.148.8-.4l2.5-3.333c.13-.173.2-.384.2-.6V9c0-.553-.447-1-1-1h-4z"
            fillRule="evenodd"
          />
        )
      }
    </SvgIcon>
  )
}

LikeIcon.displayName = 'LikeIcon'
