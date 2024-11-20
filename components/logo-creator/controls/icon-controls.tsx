'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import * as LucideIcons from 'lucide-react'
import { IconPosition } from '@/types/logo'

interface IconControlsProps {
  showIcon: boolean
  setShowIcon: (show: boolean) => void
  iconPosition: IconPosition
  setIconPosition: (position: IconPosition) => void
  iconSize: number
  setIconSize: (size: number) => void
  iconSearch: string
  setIconSearch: (search: string) => void
  selectedIcon: string
  setSelectedIcon: (icon: string) => void
  iconColor: string
  setIconColor: (color: string) => void
}

export function IconControls({
  showIcon,
  setShowIcon,
  iconPosition,
  setIconPosition,
  iconSize,
  setIconSize,
  iconSearch,
  setIconSearch,
  selectedIcon,
  setSelectedIcon,
  iconColor,
  setIconColor
}: IconControlsProps) {
  const iconNames = Object.keys(LucideIcons)
  const filteredIcons = iconNames.filter(icon => 
    icon.toLowerCase().includes(iconSearch.toLowerCase())
  )

  return (
    <>
      <div className="flex items-center space-x-2">
        <Switch
          id="showIcon"
          checked={showIcon}
          onCheckedChange={setShowIcon}
        />
        <Label htmlFor="showIcon">Show Icon</Label>
      </div>

      {showIcon && (
        <>
          <div className="space-y-2">
            <Label htmlFor="iconSearch">Search Icons</Label>
            <Input
              id="iconSearch"
              value={iconSearch}
              onChange={(e) => setIconSearch(e.target.value)}
              placeholder="Search icons..."
            />
          </div>

          <div className="space-y-2">
            <Label>Select Icon</Label>
            <div className="grid grid-cols-3 gap-2 mt-2 max-h-40 overflow-y-auto">
              {filteredIcons.map((icon) => {
                const IconPreview = LucideIcons[icon as keyof typeof LucideIcons]
                return (
                  <Button
                    key={icon}
                    variant={selectedIcon === icon ? 'default' : 'outline'}
                    className="p-2"
                    onClick={() => setSelectedIcon(icon)}
                  >
                    <IconPreview className="w-6 h-6" />
                  </Button>
                )
              })}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Icon Position</Label>
            <div className="flex space-x-2">
              <Button
                variant={iconPosition === 'top' ? 'default' : 'outline'}
                onClick={() => setIconPosition('top')}
              >
                Top
              </Button>
              <Button
                variant={iconPosition === 'before' ? 'default' : 'outline'}
                onClick={() => setIconPosition('before')}
              >
                Left
              </Button>
              <Button
                variant={iconPosition === 'after' ? 'default' : 'outline'}
                onClick={() => setIconPosition('after')}
              >
                Right
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="iconSize">Icon Size</Label>
            <Slider
              id="iconSize"
              min={12}
              max={92}
              step={1}
              value={[iconSize]}
              onValueChange={([value]) => setIconSize(value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="iconColor">Icon Color</Label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                id="iconColor"
                value={iconColor}
                onChange={(e) => setIconColor(e.target.value)}
                className="w-10 h-10 border-none cursor-pointer"
              />
              <Input
                type="text"
                value={iconColor}
                onChange={(e) => setIconColor(e.target.value)}
                className="w-28"
              />
            </div>
          </div>
        </>
      )}
    </>
  )
}