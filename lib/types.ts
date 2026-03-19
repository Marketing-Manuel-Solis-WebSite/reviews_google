export type OfficeRegion = "houston" | "texas" | "national";

export interface Office {
  id: string;
  slug: string;
  name: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  hours: string;
  lat: number;
  lng: number;
  region: OfficeRegion;
}

export interface Review {
  id: string;
  author: string;
  officeId: string;
  language: "es" | "en";
  rating: number;
  datePublished: string;
  text: string;
  googleUrl: string;
  featured?: boolean;
}

export interface SuccessStory {
  id: string;
  title: string;
  subtitle: string;
  reviewId: string;
  officeId: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
  display?: string;
  decimal?: boolean;
}

export type OfficeFilter = "all" | string;
export type LanguageFilter = "all" | "es" | "en";
