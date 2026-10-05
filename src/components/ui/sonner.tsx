"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          // Base
          toast: "bg-popover shadow-lg",

          // Success
          success:
            "border-primary! text-primary! [&_[data-icon]]:text-primary! [&_[data-title]]:text-primary! [&_[data-description]]:text-primary/80!",

          // Info
          info:
            "border-blue-500! text-blue-500! [&_[data-icon]]:text-blue-500! [&_[data-title]]:text-blue-500! [&_[data-description]]:text-blue-500/80!",

          // Warning
          warning:
            "border-yellow-500! text-yellow-500! [&_[data-icon]]:text-yellow-500! [&_[data-title]]:text-yellow-500! [&_[data-description]]:text-yellow-500/80!",

          // Error
          error:
            "border-red-500! text-red-500! [&_[data-icon]]:text-red-500! [&_[data-title]]:text-red-500! [&_[data-description]]:text-red-500/80!",

          // Loading
          loading:
            "border-primary! text-primary! [&_[data-icon]]:text-primary! [&_[data-title]]:text-primary! [&_[data-description]]:text-primary/80!",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }