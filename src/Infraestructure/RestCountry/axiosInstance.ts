import axios, { AxiosError } from "axios";
import type { InternalAxiosRequestConfig, AxiosResponse } from "axios";

/* -------------------------------------------------------------------------- */
/*  Configuración base                                                        */
/* -------------------------------------------------------------------------- */

const BASE_URL =
  import.meta.env.VITE_RESTCOUNTRIES_API ?? "https://restcountries.com/v3.1/";

/**
 * Instancia global reutilizable
 */
export const api = axios.create({
  baseURL: BASE_URL.endsWith("/") ? BASE_URL : `${BASE_URL}/`,
  timeout: 10_000,
  headers: {
    Accept: "application/json",
  },
});


/* -------------------------------------------------------------------------- */
/*  Interceptores                                                             */
/* -------------------------------------------------------------------------- */

/** 📨  Request – añade timestamp y log en modo dev */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Marcar inicio para medir la latencia en la respuesta
    config.headers["x-request-start"] = String(Date.now());

    if (import.meta.env.DEV) {
      console.info(`[REQ] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

/** 📩  Response – mide latencia y unifica errores */
api.interceptors.response.use(
  (response: AxiosResponse) => {
    const start = Number(response.config.headers["x-request-start"]);
    if (start && import.meta.env.DEV) {
      console.info(
        `[RES] ${response.config.url} – ${response.status} (${Date.now() - start} ms)`,
      );
    }
    return response;
  },
  (error: AxiosError) => {
    // Error de timeout → mensaje amigable
    if (error.code === "ECONNABORTED") {
      error.message = "La petición tardó demasiado. Inténtalo de nuevo en unos minutos.";
    }
    return Promise.reject(error);
  },
);