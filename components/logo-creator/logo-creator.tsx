'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useFonts } from '@/hooks/use-fonts'
import { LogoPreview } from './logo-preview'
import { FontControls } from './controls/font-controls'
import { IconControls } from './controls/icon-controls'
import { BorderControls } from './controls/border-controls'
import { toPng, toSvg } from 'html-to-image'
import type { IconPosition } from '@/types/logo'

export default function LogoCreator() {
  const [name, setName] = useState('LOGO MARK')
  const [font, setFont] = useState('Poppins')
  const [fontWeight, setFontWeight] = useState(700)
  const [fontSize, setFontSize] = useState(30)
  const [letterSpacing, setLetterSpacing] = useState(0)
  const [lineHeight, setLineHeight] = useState(1.2)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  const [iconPosition, setIconPosition] = useState<IconPosition>('before')
  const [selectedIcon, setSelectedIcon] = useState('Box')
  const [showIcon, setShowIcon] = useState(true)
  const [showBorder, setShowBorder] = useState(false)
  const [borderThickness, setBorderThickness] = useState(2)
  const [borderRadius, setBorderRadius] = useState(0)
  const [fontColor, setFontColor] = useState('#0ae6cc')
  const [iconColor, setIconColor] = useState('#0ae6cc')
  const [iconSize, setIconSize] = useState(58)
  const [iconSearch, setIconSearch] = useState('')
  const [borderColor, setBorderColor] = useState('#000000')

  const fontsLoaded = useFonts()

  const logoStyle = {
    fontFamily: `"${font}", sans-serif`,
    fontWeight: fontWeight.toString(),
    fontSize: `${fontSize}px`,
    fontStyle: isItalic ? 'italic' : 'normal',
    letterSpacing: `${letterSpacing}px`,
    lineHeight: `${lineHeight}`,
    color: fontColor,
    margin: 0,
    padding: 0,
    textDecoration: isUnderline ? 'underline' : 'none',
  }

  const iconStyle = {
    color: iconColor,
    width: `${iconSize}px`,
    height: `${iconSize}px`,
  }

  const containerStyle = {
    borderColor: showBorder ? borderColor : 'transparent',
    borderWidth: showBorder ? `${borderThickness}px` : '0',
    borderStyle: showBorder ? 'solid' : 'none',
    borderRadius: `${borderRadius}px`,
    padding: showBorder ? '20px' : '0',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  }

  const exportLogo = async (format: 'png' | 'svg') => {
    const element = document.querySelector('[data-logo-preview]')
    if (!element) return

    const options = {
      quality: 1,
      width: element.clientWidth + 40,
      height: element.clientHeight + 40,
      style: {
        margin: '20px',
        padding: '20px',
        background: 'transparent',
      },
    }

    try {
      const dataUrl = format === 'png' 
        ? await toPng(element, options)
        : await toSvg(element, options)

      const link = document.createElement('a')
      link.download = `logo-${Date.now()}.${format}`
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error('Error exporting logo:', err)
    }
  }

  if (!fontsLoaded) {
    return <div>Loading fonts...</div>
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/2 p-8 flex items-center justify-center bg-gray-100">
        <div data-logo-preview>
          <LogoPreview
            name={name}
            showIcon={showIcon}
            iconPosition={iconPosition}
            selectedIcon={selectedIcon}
            logoStyle={logoStyle}
            iconStyle={iconStyle}
            containerStyle={containerStyle}
          />
        </div>
      </div>

      <div className="w-full md:w-1/2 p-8 space-y-6 overflow-y-auto">
        <FontControls
          name={name}
          setName={setName}
          font={font}
          setFont={setFont}
          fontWeight={fontWeight}
          setFontWeight={setFontWeight}
          fontSize={fontSize}
          setFontSize={setFontSize}
          letterSpacing={letterSpacing}
          setLetterSpacing={setLetterSpacing}
          lineHeight={lineHeight}
          setLineHeight={setLineHeight}
          isItalic={isItalic}
          setIsItalic={setIsItalic}
          isUnderline={isUnderline}
          setIsUnderline={setIsUnderline}
          fontColor={fontColor}
          setFontColor={setFontColor}
        />

        <IconControls
          showIcon={showIcon}
          setShowIcon={setShowIcon}
          iconPosition={iconPosition}
          setIconPosition={setIconPosition}
          iconSize={iconSize}
          setIconSize={setIconSize}
          iconSearch={iconSearch}
          setIconSearch={setIconSearch}
          selectedIcon={selectedIcon}
          setSelectedIcon={setSelectedIcon}
          iconColor={iconColor}
          setIconColor={setIconColor}
        />

        <BorderControls
          showBorder={showBorder}
          setShowBorder={setShowBorder}
          borderThickness={borderThickness}
          setBorderThickness={setBorderThickness}
          borderRadius={borderRadius}
          setBorderRadius={setBorderRadius}
          borderColor={borderColor}
          setBorderColor={setBorderColor}
        />

        <div className="flex space-x-2">
          <Button onClick={() => exportLogo('png')}>
            Export PNG
          </Button>
          <Button onClick={() => exportLogo('svg')}>
            Export SVG
          </Button>
        </div>
      </div>
    </div>
  )
}