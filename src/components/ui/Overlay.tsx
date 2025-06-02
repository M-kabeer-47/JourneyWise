import type React from "react"
import Spinner from "./Spinner"

interface OverlayProps {
  isVisible: boolean
}

const Overlay: React.FC<OverlayProps> = ({ isVisible }) => {
  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <Spinner size="small" />
    </div>
  )
}

export default Overlay

