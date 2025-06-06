import { useState, useMemo } from "react"
import type { Country, FilterOptions } from "../Types/Countries/countryValidator"

export const useFilters = (countries: Country[]) => {
  const [filters, setFilters] = useState<FilterOptions>({
    sortBy: "name",
    sortOrder: "asc",
  })

  const filteredCountries = useMemo(() => {
    let filtered = [...countries]

    // Apply filters
    if (filters.region) {
      filtered = filtered.filter((country) => country.region === filters.region)
    }

    if (filters.subregion) {
      filtered = filtered.filter((country) => country.subregion === filters.subregion)
    }

    if (filters.independent !== undefined) {
      filtered = filtered.filter((country) => country.independent === filters.independent)
    }

    if (filters.unMember !== undefined) {
      filtered = filtered.filter((country) => country.unMember === filters.unMember)
    }

    if (filters.landlocked !== undefined) {
      filtered = filtered.filter((country) => country.landlocked === filters.landlocked)
    }

    if (filters.language) {
      filtered = filtered.filter(
        (country) =>
          country.languages &&
          Object.values(country.languages).some((lang) => lang.toLowerCase().includes(filters.language!.toLowerCase())),
      )
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: number | string
      let bValue: number | string

      switch (filters.sortBy) {
        case "population":
          aValue = a.population
          bValue = b.population
          break
        case "area":
          aValue = a.area
          bValue = b.area
          break
        case "density":
          aValue = a.population / a.area
          bValue = b.population / b.area
          break
        default:
          aValue = a.name.common
          bValue = b.name.common
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return filters.sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }

      return filters.sortOrder === "asc"
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number)
    })

    return filtered
  }, [countries, filters])

  const updateFilter = (key: keyof FilterOptions, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const resetFilters = () => {
    setFilters({
      sortBy: "name",
      sortOrder: "asc",
    })
  }

  return {
    filters,
    filteredCountries,
    updateFilter,
    resetFilters,
  }
}
