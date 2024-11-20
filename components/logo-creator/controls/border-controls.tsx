'use client'

import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'

interface BorderControlsProps {
  showBorder: boolean
  setShowBorder: (show: boolean) => void
  borderThickness: number
  setBorderThickness: (thickness: number) => void
  borderRadius: number
  setBorderRadius: (radius: number) => void
  borderColor: string
  setBorderColor: (color: string) => void
}

export function BorderControls({
  showBorder,
  setShowBorder,
  borderThickness,
  setBorderThickness,
  borderRadius,
  setBorderRadius,
  borderColor,
  setBorderColor
}: BorderControlsProps) {
  return (
    <>
      <div className="flex items-center space-x-2">
        <Switch
          id="showBorder"
          checked={showBorder}
          onCheckedChange={setShowBorder}
        />
        <Label htmlFor="showBorder">Show Border</Label>
      </div>

      {showBorder && (
        <>
          <div className="space-y-2">
            <Label htmlFor="borderThickness">Border Thickness</Label>
            <Slider
              id="borderThickness"
              min={1}
              max={10}
              step={1}
              value={[borderThickness]}
              onValueChange={([value]) => setBorderThickness(value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="borderRadius">Border Radius</Label>
            <Slider
              id="borderRadius"
              min={0}
              max={50}
              step={1}
              value={[borderRadius]}
              onValueChange={([value]) => setBorderRadius(value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="borderColor">Border Color</Label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                id="borderColor"
                value={borderColor}
                onChange={(e) => setBorderColor(e.target.value)}
                className="w-10 h-10 border-none cursor-pointer"
              />
              <Input
                type="text"
                value={borderColor}
                onChange={(e) => setBorderColor(e.target.value)}
                className="w-28"
              />
            </div>
          </div>
        </>
      )}
    </>
  )
}