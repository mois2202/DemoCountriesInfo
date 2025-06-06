import type { CountryCore, CountryExtra } from "./countrySchemas";
  
  /* ----------  Listas de campos para la query  ---------- */
  export const coreFields  = [
    "name",
    "cca2",
    "cca3",
    "flag",
    "flags",
    "capital",
    "region",
    "population",
  ] as const satisfies readonly (keyof CountryCore)[];
  
  export const extraFields = [
    "cca3",
    "area",
    "languages",
    "currencies",
    "independent",
    "unMember",
    "landlocked",
    "maps",
    "continents",
  ] as const satisfies readonly (keyof CountryExtra)[];