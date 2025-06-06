import { z } from "zod";

/* ----------  Sub-esquemas reutilizables  ---------- */

export const NameSchema = z.object({
  common: z.string(),
  official: z.string(),
  nativeName: z
    .record(
      z.object({
        official: z.string(),
        common: z.string(),
      }),
    )
    .optional(),
});

export const FlagsSchema = z.object({
  png: z.string().url(),
  svg: z.string().url(),
  alt: z.string().optional(),
});

const UrlLike = z.string().refine(
  v => /^https?:\/\//.test(v) || v.startsWith("openstreetmap.org/"),
  { message: "Must be a URL or OSM path" }
);

export const MapsSchema = z.object({
  googleMaps: z.string().url(),
  openStreetMaps: UrlLike,
});

/* ----------  Lote 1 : campos “core” (máx. 10)  ---------- */

export const CountryCoreSchema = z.object({
  /** Identificadores y nombre */
  name: NameSchema,
  cca2: z.string().length(2),
  cca3: z.string().length(3),

  /** Banderas */
  flag: z.string().min(1), // emoji
  flags: FlagsSchema,

  /** Datos principales para la lista */
  capital: z.array(z.string()).optional(),
  region: z.string(),
  population: z.number().int().nonnegative(),
});

/* ----------  Lote 2 : campos “extra” (máx. 10)  ---------- */

export const CountryExtraSchema = z.object({
  /** Clave para fusionar con el core */
  cca3: z.string().length(3),
  area: z.number().nonnegative().optional(),
  languages: z.record(z.string()).optional(),
  currencies: z
    .record(
      z.object({
        name: z.string(),
        symbol: z.string().optional(),
      }),
    )
    .optional(),
  independent: z.boolean().optional(),
  unMember: z.boolean().optional(),
  landlocked: z.boolean().optional(),
  maps: MapsSchema.optional(),
  continents: z.array(z.string()).optional(),
});

/* ----------  Esquema global fusionado  ---------- */

export const CountrySchema = CountryCoreSchema.merge(CountryExtraSchema).passthrough();

/* ----------  Tipos generados a partir de los esquemas  ---------- */

export type CountryCore   = z.infer<typeof CountryCoreSchema>;
export type CountryExtra  = z.infer<typeof CountryExtraSchema>;
export type Country      = z.infer<typeof CountrySchema>;