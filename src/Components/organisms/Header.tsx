import { useLocation, Link } from "react-router-dom"
import { Buttom } from "../atoms/Buttom"
import { ThemeToggle } from "../atoms/ThemeToggle"

export const Header = () => {
  const location = useLocation()
  const pathname = location.pathname

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:bg-gray-900/95 dark:border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary dark:text-white">
            Countries App
          </Link>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            {pathname !== "/" && (
              <Link to="/">
                <Buttom variant="outline" size="sm">
                  Inicio
                </Buttom>
              </Link>
            )}
            {pathname !== "/countries" && (
              <Link to="/countries">
                <Buttom variant="outline" size="sm">
                  Países
                </Buttom>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}