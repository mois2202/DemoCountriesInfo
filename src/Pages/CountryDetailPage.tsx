import { Link, useParams } from "react-router-dom"
import { useCountryDetail } from "../Hooks/useCountryDetail"
import { Header } from "../Components/organisms/Header"
import { Buttom } from "../Components/atoms/Buttom"
import { LoadingSpinner } from "../Components/atoms/LoadingSpinner"
import { Card, CardContent, CardHeader, CardTitle } from "../Components/ui/card"
import { ArrowLeft, ExternalLink } from "lucide-react"

export const CountryDetailPage: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const { country, loading, error } = useCountryDetail(code|| "");

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        </main>
      </div>
    )
  }

  if (error || !country) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-destructive text-lg">{error || "País no encontrado"}</p>
            <Link to="/countries" className="mt-4 inline-block">
              <Buttom variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver a la lista
              </Buttom>
            </Link>
          </div>
        </main>
      </div>
    )
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num)
  }

  const density = country.area && country.population 
    ? (country.population / country.area).toFixed(2) 
    : "N/A"

  const languages = country.languages ? Object.values(country.languages).join(", ") : "N/A"

  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((curr) => {
          const currency = curr as { name: string; symbol?: string };
          return `${currency.name} (${currency.symbol || "N/A"})`;
        })
        .join(", ")
    : "N/A"

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <Link to="/countries">
              <Buttom variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Buttom>
            </Link>
          </div>

          <div className="text-center space-y-4">
            <div className="text-6xl">{country.flag}</div>
            <h1 className="text-4xl md:text-5xl font-bold">{country.name.common}</h1>
            <p className="text-xl text-muted-foreground">{country.name.official}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Información General</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="font-medium">Capital:</span> {country.capital?.[0] || "N/A"}
                </div>
                <div>
                  <span className="font-medium">Región:</span> {country.region}
                </div>
                <div>
                  <span className="font-medium">Subregión:</span> {typeof country.subregion === 'string' ? country.subregion : "N/A"}
                </div>
                <div>
                  <span className="font-medium">Continentes:</span> {country.continents?.join(", ") || "N/A"}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Demografía</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="font-medium">Población:</span> {formatNumber(country.population)}
                </div>
                <div>
                  <span className="font-medium">Área:</span> {country.area ? formatNumber(country.area) : "N/A"} km²
                </div>
                <div>
                  <span className="font-medium">Densidad:</span> {density} personas/km²
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cultura e Idiomas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="font-medium">Idiomas:</span> {languages}
                </div>
                <div>
                  <span className="font-medium">Monedas:</span> {currencies}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Estado Político</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="font-medium">Independiente:</span> {country.independent ? "Sí" : "No"}
                </div>
                <div>
                  <span className="font-medium">Miembro de la ONU:</span> {country.unMember ? "Sí" : "No"}
                </div>
                <div>
                  <span className="font-medium">Sin litoral:</span> {country.landlocked ? "Sí" : "No"}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Códigos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="font-medium">Código Alpha-2:</span> {country.cca2}
                </div>
                <div>
                  <span className="font-medium">Código Alpha-3:</span> {country.cca3}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mapas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {country.maps?.googleMaps && (
                  <a
                    href={country.maps.googleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                  >
                    Google Maps <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {country.maps?.openStreetMaps && (
                  <a
                    href={country.maps.openStreetMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                  >
                    OpenStreetMap <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
