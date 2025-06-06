import type { FilterOptions } from "../../Types/Countries/countryValidator"
import { Buttom } from "../atoms/Buttom"
import { Input } from "../atoms/Input"
import { Select } from "../atoms/Select"

interface FilterPanelProps {
  filters: FilterOptions
  onFilterChange: (key: keyof FilterOptions, value: any) => void
  onReset: () => void
}

export const FilterPanel = ({ filters, onFilterChange, onReset }: FilterPanelProps) => {
  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"]

  return (
    <div className="bg-card p-6 rounded-lg border space-y-4 dark:bg-gray-800 dark:border-gray-600">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold dark:text-white">Filtros</h2>
        <Buttom variant="outline" size="sm" onClick={onReset}>
          Limpiar
        </Buttom>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2 dark:text-gray-200">Región</label>
          <Select value={filters.region || ""} onChange={(e) => onFilterChange("region", e.target.value || undefined)}>
            <option value="">Todas las regiones</option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 dark:text-gray-200">Idioma</label>
          <Input
            type="text"
            placeholder="Buscar por idioma..."
            value={filters.language || ""}
            onChange={(e) => onFilterChange("language", e.target.value || undefined)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 dark:text-gray-200">Ordenar por</label>
          <Select value={filters.sortBy} onChange={(e) => onFilterChange("sortBy", e.target.value)}>
            <option value="name">Nombre</option>
            <option value="population">Población</option>
            <option value="area">Área</option>
            <option value="density">Densidad</option>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 dark:text-gray-200">Orden</label>
          <Select value={filters.sortOrder} onChange={(e) => onFilterChange("sortOrder", e.target.value)}>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 dark:text-gray-200">Independiente</label>
          <Select
            value={filters.independent?.toString() || ""}
            onChange={(e) =>
              onFilterChange("independent", e.target.value === "" ? undefined : e.target.value === "true")
            }
          >
            <option value="">Todos</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 dark:text-gray-200">Miembro ONU</label>
          <Select
            value={filters.unMember?.toString() || ""}
            onChange={(e) => onFilterChange("unMember", e.target.value === "" ? undefined : e.target.value === "true")}
          >
            <option value="">Todos</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 dark:text-gray-200">Sin litoral</label>
          <Select
            value={filters.landlocked?.toString() || ""}
            onChange={(e) =>
              onFilterChange("landlocked", e.target.value === "" ? undefined : e.target.value === "true")
            }
          >
            <option value="">Todos</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </Select>
        </div>
      </div>
    </div>
  )
}
