import { Buttom } from "../Components/atoms/Buttom"
import { Header } from "../Components/organisms/Header"
import { Globe, Users, MapPin } from "lucide-react"

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Header />

      <main className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white">Explora el Mundo</h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Descubre información detallada sobre todos los países del mundo. Datos demográficos, geográficos y
              culturales al alcance de tu mano.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto my-16">
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <Globe className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold">195 Países</h3>
              <p className="text-gray-600 dark:text-gray-400">Información completa de todos los países reconocidos</p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold">Datos Demográficos</h3>
              <p className="text-gray-600 dark:text-gray-400">Población, densidad y estadísticas actualizadas</p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <MapPin className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold">Información Geográfica</h3>
              <p className="text-gray-600 dark:text-gray-400">Ubicación, área, capitales y más detalles</p>
            </div>
          </div>

          <div className="space-y-4">
            <a href="/countries">
              <Buttom size="lg" className="text-lg px-8 py-4">
                Explorar Países
              </Buttom>
            </a>
            <p className="text-sm text-gray-500 dark:text-gray-400">Haz clic para comenzar tu viaje por el mundo</p>
          </div>
        </div>
      </main>
    </div>
  )
}
