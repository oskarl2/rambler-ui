import React from 'react'
import SvgIcon from '../../SvgIcon'

export default function PersonIcon(props) {
  return (
    <SvgIcon viewBox="0 0 15 15" {...props}>
      <path
        d="M7.5 8C4.832 8 2.426 9.104.702 10.877.248 11.343 0 11.973 0 12.623V14c0 .552.448 1 1 1h13c.552 0 1-.448 1-1v-1.377c0-.65-.248-1.28-.702-1.746C12.574 9.104 10.168 8 7.5 8m0 1.2c2.252 0 4.361.893 5.938 2.513.23.237.362.568.362.91V13.8H1.2v-1.177c0-.342.132-.673.362-.909C3.139 10.093 5.248 9.2 7.5 9.2m0-9.2C5.567 0 4 1.567 4 3.5S5.567 7 7.5 7 11 5.433 11 3.5 9.433 0 7.5 0m0 1.2c1.268 0 2.3 1.032 2.3 2.3 0 1.268-1.032 2.3-2.3 2.3-1.268 0-2.3-1.032-2.3-2.3 0-1.268 1.032-2.3 2.3-2.3M0 15V0m15 0v15"
        fillRule="evenodd"
      />
    </SvgIcon>
  )
}

PersonIcon.displayName = 'PersonIcon'

PersonIcon.alias = ['UserIcon']
