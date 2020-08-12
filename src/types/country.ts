export interface Country {
  name: string;
  capital: string;
  flag: {
    emoji: any;
  };
  population?: number;
  area?: number;
  topLevelDomains?: {
    name: string;
  }[];
}
