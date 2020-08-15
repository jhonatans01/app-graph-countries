export interface Country {
  name: string;
  capital: string;
  alpha2Code?: string;
  flag?: {
    emoji: any;
  };
  population?: number;
  area?: number;
  topLevelDomains?: {
    name: string;
  }[];
}
