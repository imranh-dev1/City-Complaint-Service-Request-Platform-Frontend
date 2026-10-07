import { cn } from "cn"
import { LoaderIcon } from "lucide-react"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderIcon data-slot="spinner" role="status" aria-label="Loading" className={cn("size-4 animate-spin text-primary", className)} {...props} />
  )
}

export { Spinner }
