import { Link } from "react-router-dom"
import type { Country } from "../../Types/Countries/countryValidator"
import { Buttom } from "../../Components/atoms/Buttom"
import { Card, CardContent, CardFooter, CardHeader } from "../../Components/ui/card"

interface CountryCardProps {
  country: Country
}

export const CountryCard = ({ country }: CountryCardProps) => {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num)
  }

  const density = country.area > 0 ? (country.population / country.area).toFixed(2) : "N/A"

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{country.flag}</span>
          <h3 className="font-semibold text-lg truncate">{country.name.common}</h3>
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="space-y-2 text-sm">
          <p>
            <span className="font-medium">Capital:</span> {country.capital?.[0] || "N/A"}
          </p>
          <p>
            <span className="font-medium">Region:</span> {country.region}
          </p>
          <p>
            <span className="font-medium">Population:</span> {formatNumber(country.population)}
          </p>
          <p>
            <span className="font-medium">Area:</span> {formatNumber(country.area)} km²
          </p>
          <p>
            <span className="font-medium">Density:</span> {density} people/km²
          </p>
        </div>
      </CardContent>

      <CardFooter>
        <Link to={`/country/${country.cca3}`} className="w-full">
          <Buttom className="w-full" size="sm">
            Ver más
          </Buttom>
        </Link>
      </CardFooter>
    </Card>
  )
}
