import React from 'react'
import SvgIcon from '../../SvgIcon'

export default function ClosedEyeIcon(props) {
  return (
    <SvgIcon
      viewBox={size => (size < 20 ? '0 0 15 15' : '0 0 20 20')}
      {...props}>
      {size =>
        size < 20 ? (
          <path
            d="M7.5 8.8c-.358 0-.683-.146-.919-.381l1.838-1.838c.235.236.381.561.381.919 0 .717-.583 1.3-1.3 1.3M14.57.57l-.141-.141c-.195-.195-.511-.195-.707.001L8.786 5.366c-.504-.304-1.115-.449-1.774-.317-.984.197-1.766.979-1.963 1.963-.132.659.013 1.27.317 1.774L.429 13.722c-.195.196-.195.513.001.708l.141.141c.195.195.511.195.707-.001l4.936-4.936c.504.304 1.115.449 1.774.317.984-.197 1.766-.979 1.963-1.963.132-.659-.013-1.27-.317-1.774l4.937-4.936c.195-.196.195-.512-.001-.708M7.5 13c-.818 0-1.634-.187-2.434-.52l.924-.925c.497.156 1.001.245 1.51.245 2.228 0 4.379-1.521 6.106-4.3-.483-.777-1.001-1.444-1.542-2.018l.84-.84c.627.659 1.228 1.427 1.784 2.33.197.32.205.724.009 1.044C12.668 11.339 10.084 13 7.5 13m0-11c.818 0 1.634.187 2.434.52l-.924.925C8.513 3.289 8.009 3.2 7.5 3.2c-2.228 0-4.379 1.521-6.106 4.3.483.777 1.001 1.444 1.542 2.018l-.84.84C1.469 9.699.868 8.931.312 8.028.115 7.709.107 7.304.303 6.984 2.332 3.661 4.916 2 7.5 2M0 0v15m15 0V0"
            fillRule="evenodd"
          />
        ) : (
          <path
            d="M0 20V0v20zM20 0v20V0zm-7.204 6.143C11.889 5.734 10.953 5.5 10 5.5c-2.632 0-5.165 1.59-7.204 4.5.924 1.319 1.953 2.35 3.044 3.1l1.583-1.584c-.676-1.15-.532-2.65.456-3.637C8.464 7.293 9.232 7 10 7c.526 0 1.048.148 1.516.423l1.28-1.28zm4.381-2.259l-4.6 4.6c.676 1.15.532 2.65-.456 3.637-.585.586-1.353.879-2.121.879-.526 0-1.048-.148-1.516-.423l-4.6 4.6c-.195.195-.512.195-.707 0l-.354-.354c-.195-.195-.195-.512 0-.707l1.943-1.942c-1.221-.882-2.373-2.082-3.405-3.616-.223-.332-.224-.784-.001-1.116C3.796 5.814 6.898 4 10 4c1.327 0 2.651.346 3.924 1.016l2.192-2.193c.195-.195.512-.195.707 0l.354.354c.195.195.195.512 0 .707zm-6.116 5.055c-.284-.283-.66-.439-1.061-.439-.401 0-.777.156-1.061.439-.585.585-.585 1.537 0 2.122l2.122-2.122zM10 16c-.817 0-1.635-.127-2.44-.378l1.244-1.245c.396.074.794.123 1.196.123 2.632 0 5.165-1.59 7.204-4.5-.584-.833-1.212-1.545-1.867-2.155l1.053-1.053c.793.742 1.551 1.617 2.251 2.653.223.331.222.78 0 1.111C16.205 14.185 13.103 16 10 16z"
            fillRule="evenodd"
          />
        )
      }
    </SvgIcon>
  )
}

ClosedEyeIcon.displayName = 'ClosedEyeIcon'
