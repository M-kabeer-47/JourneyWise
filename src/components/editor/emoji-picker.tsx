"use client"

import data from "@emoji-mart/data"
import Picker from "@emoji-mart/react"

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void
}

export function EmojiPicker({ onEmojiSelect }: EmojiPickerProps) {
  return (
    <div className="w-full border rounded-lg overflow-hidden">
      <Picker
        data={data}
        onEmojiSelect={(emoji: any) => onEmojiSelect(emoji.native)}
        theme="light"
        previewPosition="none"
        skinTonePosition="none"
        searchPosition="top"
        navPosition="bottom"
        perLine={9}
        maxFrequentRows={0}
        width="100%"
      />
    </div>
  )
}

