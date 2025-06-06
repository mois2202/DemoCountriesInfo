import axios from "axios";
import type { Country } from "@/Domain/Country/countrySchemas";
import { getCountries, getCountryDetails } from "./countryRepository";


export const countriesApi = {
  async getAllCountries(): Promise<Country[]> {
    try {
      const countries = await getCountries();
      return countries;
    } catch (err) {
      handleError(err);
      throw err;
    }
  },

  async getCountryByCode(code: string): Promise<Country> {
    try {
      const country = await getCountryDetails(code);
      return country;
    } catch (err) {
      handleError(err);
      throw err;
    }
  },
};

export const handleError = (err: unknown) => {
  if (axios.isAxiosError(err)) {
    console.error("API Error:", err.response?.data || err.message);
  } else {
    console.error("Unknown Error:", err);
  }
};
