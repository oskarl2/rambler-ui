import React from 'react'
import PropTypes from 'prop-types'
import SvgIcon from '../SvgIcon'

export default function GoogleIcon(props) {
  const {color} = props
  return (
    <SvgIcon viewBox="0 0 16 16" {...props}>
      <path
        d="M5.504.438A8.132 8.132 0 0 0 .896 4.397a7.8 7.8 0 0 0-.708 2.007 7.873 7.873 0 0 0 .704 5.16 8.083 8.083 0 0 0 2.207 2.664 8.162 8.162 0 0 0 2.956 1.463c1.355.356 2.797.348 4.161.043 1.233-.279 2.4-.858 3.332-1.699a7.227 7.227 0 0 0 2.059-3.311c.406-1.369.459-2.831.205-4.238h-7.65V9.6h4.433a3.753 3.753 0 0 1-1.627 2.466 4.71 4.71 0 0 1-1.792.695 5.465 5.465 0 0 1-1.941-.004 4.862 4.862 0 0 1-1.81-.768 4.943 4.943 0 0 1-1.862-2.45c-.346-.999-.35-2.11 0-3.105a4.969 4.969 0 0 1 1.18-1.883 4.848 4.848 0 0 1 2.43-1.325 4.941 4.941 0 0 1 2.388.094c.655.193 1.259.55 1.753 1.012l1.495-1.467c.262-.261.537-.514.791-.785A7.955 7.955 0 0 0 10.981.49 8.355 8.355 0 0 0 5.504.438z"
        fill={color || '#fff'}
      />
      <path
        d="M5.504.438a8.383 8.383 0 0 1 5.477.047c.97.351 1.858.9 2.619 1.591-.254.27-.529.523-.791.785l-1.495 1.467A4.448 4.448 0 0 0 9.56 3.316a4.89 4.89 0 0 0-2.387-.095 4.936 4.936 0 0 0-3.61 3.209C2.674 5.752 1.787 5.079.895 4.401A8.124 8.124 0 0 1 5.504.438z"
        fill={color || '#ea4335'}
      />
      <path
        d="M.192 6.4c.145-.695.38-1.373.709-2.008.887.678 1.774 1.352 2.666 2.03-.35.999-.35 2.11 0 3.105-.887.678-1.775 1.356-2.662 2.029A7.806 7.806 0 0 1 .192 6.4z"
        fill={color || '#fbbc05'}
      />
      <path
        d="M8.162 6.482h7.65a9.265 9.265 0 0 1-.205 4.238 7.227 7.227 0 0 1-2.06 3.311l-2.583-1.969a3.753 3.753 0 0 0 1.626-2.466H8.157c.005-1.038.005-2.076.005-3.114z"
        fill={color || '#4285f4'}
      />
      <path
        d="M.896 11.56c.888-.673 1.775-1.35 2.662-2.029a4.968 4.968 0 0 0 1.863 2.45c.542.373 1.163.639 1.81.768.638.128 1.298.111 1.94.004a4.71 4.71 0 0 0 1.793-.695l2.584 1.969c-.932.845-2.099 1.42-3.332 1.698-1.364.305-2.806.314-4.161-.042a8.094 8.094 0 0 1-2.956-1.463 8.065 8.065 0 0 1-2.203-2.66z"
        fill={color || '#34a853'}
      />
    </SvgIcon>
  )
}

GoogleIcon.displayName = 'GoogleIcon'

GoogleIcon.defaultProps = {
  color: null
}

GoogleIcon.propTypes = {
  color: PropTypes.string
}
