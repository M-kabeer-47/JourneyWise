"use client"

import { useState } from "react"
import { Check, Share } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {toast} from "@/components/ui/Toast"

export default function ShareButton() {
  const [copied, setCopied] = useState(false)

  const handleCopyUrl = () => {
    toast.success("URL copied to clipboard")
    // Copy the current URL to clipboard
    navigator.clipboard.writeText(window.location.href)

    // Change icon to check mark
    setCopied(true)

    // Revert back to share icon after 2 seconds
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <TooltipProvider delayDuration={50}>
      <Tooltip >
        <TooltipTrigger asChild >
          <button
            aria-label={copied ? "URL copied" : "Copy URL"}
            onClick={handleCopyUrl}
            className="p-2 rounded-full bg-white text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            {copied ? <Check className="h-5 w-5 text-black" /> : <Share className="h-5 w-5" />}
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="">
          <p>{copied ? "URL copied!" : "Copy URL"}</p>
        </TooltipContent>
      </Tooltip>
      
    </TooltipProvider>
  )
}

