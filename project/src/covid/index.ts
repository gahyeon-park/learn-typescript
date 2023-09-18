// covid API와 관련된 타입들을 모아놓기

export interface ICountry {
  Country: string;
  CountryCode: string;
  Date: string;
  NewConfirmed: number;
  NewDeaths: number;
  NewRecovered: number;
  Premium: object;
  Slug: string;
  TotalConfirmed: number;
  TotalDeaths: number;
  TotalRecovered: number;
}

interface IGlobal {
  NewConfirmed: number;
  NewDeaths: number;
  NewRecovered: number;
  TotalConfirmed: number;
  TotalDeaths: number;
  TotalRecovered: number;
}

export interface ICovidSummary {
  Countries: ICountry[];
  Date: string;
  Global: IGlobal;
  Message: string;
}

export interface ICountryInfo {
  Cases: number;
  City: string;
  CityCode: string;
  Country: string;
  CountryCode: string;
  Date: string;
  Lat: string;
  Lon: string;
  Province: string;
  Status: string;
}

export type TCountrySummaryResponse = ICountryInfo[];
