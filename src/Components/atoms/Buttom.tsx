import type { ButtonHTMLAttributes, ReactNode } from "react"
import { cn } from "../../lib/utils"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
  children: ReactNode
}

export const Buttom = ({ variant = "primary", size = "md", className, children, ...props }: ButtonProps) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"

  const variants = {
    primary:
      "bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90",
    secondary:
      "bg-secondary text-secondary-foreground hover:bg-secondary/80 dark:bg-secondary dark:text-secondary-foreground dark:hover:bg-secondary/80",
    outline:
      "border border-input bg-background hover:bg-accent hover:text-accent-foreground dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200",
  }

  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 py-2",
    lg: "h-11 px-8 text-lg",
  }

  return (
    <button className={cn(baseClasses, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  )
}
