import { useCountries } from "../Hooks/useCountries"
import { useFilters } from "../Hooks/useFilters"
import { Header } from "../Components/organisms/Header"
import { FilterPanel } from "../Components/molecules/FilterPanel"
import { CountriesList } from "../Components/organisms/CountriesList"

export const CountriesPage = () => {
  const { countries, loading, error } = useCountries()
  const { filters, filteredCountries, updateFilter, resetFilters } = useFilters(countries)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold">Países del Mundo</h1>
            <p className="text-muted-foreground">
              {!loading && !error && `Mostrando ${filteredCountries.length} de ${countries.length} países`}
            </p>
          </div>

          <FilterPanel filters={filters} onFilterChange={updateFilter} onReset={resetFilters} />

          <CountriesList countries={filteredCountries} loading={loading} error={error} />
        </div>
      </main>
    </div>
  )
}
