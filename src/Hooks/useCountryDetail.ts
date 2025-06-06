import { useState, useEffect } from "react"
import type { Country } from "../Domain/Country/countrySchemas"
import { countriesApi } from "../Infraestructure/RestCountry/countriesApi"

export const useCountryDetail = (code: string) => {
  const [country, setCountry] = useState<Country | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await countriesApi.getCountryByCode(code)
        setCountry(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    if (code) {
      fetchCountry()
    }
  }, [code])

  return { country, loading, error }
}
