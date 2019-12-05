import React from 'react'
import SvgIcon from '../SvgIcon'

export default function BlockIcon(props) {
  return (
    <SvgIcon viewBox="0 0 15 15" {...props}>
      <path
        d="M4.086 12.435a6 6 0 0 0 8.349-8.349l-8.349 8.349zm-1.118-1.003l8.464-8.464a6 6 0 0 0-8.464 8.464zM7.5 15a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"
        fillRule="evenodd"
      />
    </SvgIcon>
  )
}

BlockIcon.displayName = 'BlockIcon'
