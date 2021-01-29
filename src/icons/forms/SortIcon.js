import React from 'react'
import SvgIcon from '../../SvgIcon'

export default function SortIcon(props) {
  return (
    <SvgIcon
      viewBox={size => (size < 20 ? '0 0 15 15' : '0 0 20 20')}
      {...props}>
      {size =>
        size < 20 ? (
          <path
            d="M13.5 5.1h-12c-.276 0-.5-.224-.5-.5v-.2c0-.276.224-.5.5-.5h12c.276 0 .5.224.5.5v.2c0 .276-.224.5-.5.5m-3 3h-9c-.276 0-.5-.224-.5-.5v-.2c0-.276.224-.5.5-.5h9c.276 0 .5.224.5.5v.2c0 .276-.224.5-.5.5m-3 3h-6c-.276 0-.5-.224-.5-.5v-.2c0-.276.224-.5.5-.5h6c.276 0 .5.224.5.5v.2c0 .276-.224.5-.5.5M0 0v15m15 0V0"
            fillRule="evenodd"
          />
        ) : (
          <path
            d="M0 20V0m20 0v20m-6-9.75v-.5c0-.276-.224-.5-.5-.5h-11c-.276 0-.5.224-.5.5v.5c0 .276.224.5.5.5h11c.276 0 .5-.224.5-.5m-4 5v-.5c0-.276-.224-.5-.5-.5h-7c-.276 0-.5.224-.5.5v.5c0 .276.224.5.5.5h7c.276 0 .5-.224.5-.5m7.5-9.5h-15c-.276 0-.5-.224-.5-.5v-.5c0-.276.224-.5.5-.5h15c.276 0 .5.224.5.5v.5c0 .276-.224.5-.5.5"
            fillRule="evenodd"
          />
        )
      }
    </SvgIcon>
  )
}

SortIcon.displayName = 'SortIcon'
