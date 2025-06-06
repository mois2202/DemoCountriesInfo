import {coreFields, extraFields } from "../../Domain/Country/countryTypes"
import type { CountryCore, Country, CountryExtra } from "../../Domain/Country/countrySchemas";
import {
  CountryCoreSchema,
  CountryExtraSchema,
} from "../../Domain/Country/countrySchemas"


import { api} from "./axiosInstance";
import { buildQuery } from "./buildQuery";

export const fetchCountries = <T>(
    path: string,
    fields: readonly string[],
  ) => api.get<T>(path + buildQuery(fields)).then(r => r.data);



/** Une dos lotes all → Country[] */
export const getCountries = async (): Promise<Country[]> => {
    const [coreRaw, extraRaw] = await Promise.all([
        fetchCountries("all", coreFields),
        fetchCountries("all", extraFields),
      ]);
      const core = (coreRaw as CountryCore[]).map(c => CountryCoreSchema.parse(c));
      const extra = (extraRaw as CountryExtra[]).map(c => CountryExtraSchema.parse(c));
    
      const extraByCode = new Map(extra.map((e: CountryExtra) => [e.cca3, e]));
      const response = core.map<Country>(c => ({
        ...c,
        ...(extraByCode.get(c.cca3) ?? {}),
      }));
    
      return response;
};

/** Para la vista detalle: una sola pareja de peticiones */
export const getCountryDetails = async (code: string): Promise<Country> => {
  const response = await api.get(`alpha?codes=${code}`).then(r => r.data);
  console.log(JSON.stringify(response))
  return response[0]
};