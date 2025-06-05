 import { useState, useEffect } from "react"
import { Buttom } from "./Buttom"
import { Moon, Sun } from "lucide-react"

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [mounted, setMounted] = useState(false)

  // Efecto para inicializar el tema
  useEffect(() => {
    setMounted(true)
    // Obtener tema del localStorage o usar preferencia del sistema
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"

    setTheme(savedTheme || systemTheme)
  }, [])

  // Efecto para aplicar el tema al DOM
  useEffect(() => {
    if (!mounted) return

    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(theme)
    localStorage.setItem("theme", theme)
  }, [theme, mounted])

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
  }

  // Prevenir problemas de hidratación
  if (!mounted) {
    return <Buttom variant="outline" size="sm" className="w-9 px-0" children={undefined} />
  }

  return (
    <Buttom
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="relative w-9 px-0"
      aria-label={`Cambiar a modo ${theme === "light" ? "oscuro" : "claro"}`}
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Alternar tema</span>
    </Buttom>
  )
}
