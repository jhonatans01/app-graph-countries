import { makeVar } from "@apollo/client";
import { Country } from "../types/country";

export const countriesVar = makeVar<Country[]>([{} as never]);
