import type { Country } from "../../Types/Countries/countryValidator"
import { CountryCard } from "../molecules/CountryCard"
import { LoadingSpinner } from "../atoms/LoadingSpinner"

interface CountriesListProps {
  countries: Country[]
  loading: boolean
  error: string | null
}

export const CountriesList = ({ countries, loading, error }: CountriesListProps) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive text-lg">{error}</p>
      </div>
    )
  }

  if (countries.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No se encontraron países con los filtros aplicados.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {countries.map((country) => (
        <CountryCard key={country.cca3} country={country} />
      ))}
    </div>
  )
}
