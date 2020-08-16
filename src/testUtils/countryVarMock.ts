import { makeVar } from "@apollo/client";
import { Country } from "../types/country";

export const countriesVarMock = makeVar<Country[]>([] as never);
