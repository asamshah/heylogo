'use client'

import { useRef } from 'react'
import * as LucideIcons from 'lucide-react'
import { IconPosition, LogoStyle, IconStyle, ContainerStyle } from '@/types/logo'

interface LogoPreviewProps {
  name: string
  showIcon: boolean
  iconPosition: IconPosition
  selectedIcon: string
  logoStyle: LogoStyle
  iconStyle: IconStyle
  containerStyle: ContainerStyle
}

export function LogoPreview({
  name,
  showIcon,
  iconPosition,
  selectedIcon,
  logoStyle,
  iconStyle,
  containerStyle
}: LogoPreviewProps) {
  const logoRef = useRef<HTMLDivElement>(null)
  const IconComponent = LucideIcons[selectedIcon as keyof typeof LucideIcons]

  return (
    <div 
      ref={logoRef}
      className="flex items-center justify-center"
      style={containerStyle}
    >
      {showIcon && iconPosition === 'top' && (
        <div className="flex flex-col items-center" style={{ gap: '10px' }}>
          <IconComponent style={iconStyle} />
          <h1 style={logoStyle}>{name}</h1>
        </div>
      )}
      {showIcon && iconPosition === 'before' && (
        <div className="flex items-center" style={{ gap: '10px' }}>
          <IconComponent style={iconStyle} />
          <h1 style={logoStyle}>{name}</h1>
        </div>
      )}
      {showIcon && iconPosition === 'after' && (
        <div className="flex items-center" style={{ gap: '10px' }}>
          <h1 style={logoStyle}>{name}</h1>
          <IconComponent style={iconStyle} />
        </div>
      )}
      {!showIcon && <h1 style={logoStyle}>{name}</h1>}
    </div>
  )
}