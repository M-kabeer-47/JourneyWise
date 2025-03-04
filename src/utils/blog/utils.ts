import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { userAgent } from "next/server"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isMobile = () => {
  const ua = userAgent
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)
}

