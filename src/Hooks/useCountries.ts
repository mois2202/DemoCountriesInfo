import { useState, useEffect } from "react"
import type { Country } from "../Domain/Country/countrySchemas"
import { countriesApi } from "../Infraestructure/RestCountry/countriesApi"

export const useCountries = () => {
  const [countries, setCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await countriesApi.getAllCountries()
        setCountries(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchCountries()
  }, [])

  return { countries, loading, error }
}
