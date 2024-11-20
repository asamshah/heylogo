'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { fonts } from '@/lib/constants'

interface FontControlsProps {
  name: string
  setName: (name: string) => void
  font: string
  setFont: (font: string) => void
  fontWeight: number
  setFontWeight: (weight: number) => void
  fontSize: number
  setFontSize: (size: number) => void
  letterSpacing: number
  setLetterSpacing: (spacing: number) => void
  lineHeight: number
  setLineHeight: (height: number) => void
  isItalic: boolean
  setIsItalic: (italic: boolean) => void
  isUnderline: boolean
  setIsUnderline: (underline: boolean) => void
  fontColor: string
  setFontColor: (color: string) => void
}

export function FontControls({
  name,
  setName,
  font,
  setFont,
  fontWeight,
  setFontWeight,
  fontSize,
  setFontSize,
  letterSpacing,
  setLetterSpacing,
  lineHeight,
  setLineHeight,
  isItalic,
  setIsItalic,
  isUnderline,
  setIsUnderline,
  fontColor,
  setFontColor
}: FontControlsProps) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="font">Font</Label>
        <Select value={font} onValueChange={(newFont) => {
          setFont(newFont)
          const link = document.createElement('link')
          link.href = `https://fonts.googleapis.com/css2?family=${newFont.replace(' ', '+')}&display=swap`
          link.rel = 'stylesheet'
          document.head.appendChild(link)
        }}>
          <SelectTrigger>
            <SelectValue placeholder="Select font" />
          </SelectTrigger>
          <SelectContent>
            {fonts.map((f) => (
              <SelectItem key={f} value={f}>
                <span style={{ fontFamily: f, fontSize: '16px', fontWeight: fontWeight.toString() }}>{f}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="fontWeight">Font Weight</Label>
        <Slider
          id="fontWeight"
          min={100}
          max={900}
          step={100}
          value={[fontWeight]}
          onValueChange={([value]) => setFontWeight(value)}
        />
        <div className="text-sm text-muted-foreground mt-1">
          Current weight: {fontWeight}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Font Style</Label>
        <div className="flex space-x-2">
          <Button
            variant={isItalic ? 'default' : 'outline'}
            onClick={() => setIsItalic(!isItalic)}
          >
            Italic
          </Button>
          <Button
            variant={isUnderline ? 'default' : 'outline'}
            onClick={() => setIsUnderline(!isUnderline)}
          >
            Underline
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="fontSize">Font Size</Label>
        <Slider
          id="fontSize"
          min={12}
          max={72}
          step={1}
          value={[fontSize]}
          onValueChange={([value]) => setFontSize(value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="letterSpacing">Letter Spacing</Label>
        <Slider
          id="letterSpacing"
          min={-5}
          max={10}
          step={1}
          value={[letterSpacing]}
          onValueChange={([value]) => setLetterSpacing(value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="lineHeight">Line Height</Label>
        <Slider
          id="lineHeight"
          min={0.2}
          max={8}
          step={0.1}
          value={[lineHeight]}
          onValueChange={([value]) => setLineHeight(value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="fontColor">Font Color</Label>
        <div className="flex items-center space-x-2">
          <input
            type="color"
            id="fontColor"
            value={fontColor}
            onChange={(e) => setFontColor(e.target.value)}
            className="w-10 h-10 border-none cursor-pointer"
          />
          <Input
            type="text"
            value={fontColor}
            onChange={(e) => setFontColor(e.target.value)}
            className="w-28"
          />
        </div>
      </div>
    </>
  )
}