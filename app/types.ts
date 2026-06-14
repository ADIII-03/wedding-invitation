export interface Ceremony {
  id: string;
  nameHindi: string;
  nameEnglish: string;
  dateEnglish: string;
  dateHindi: string;
  dayHindi: string;
  descriptionHindi?: string;
  descriptionEnglish?: string;
  time?: string;
  bgDecorativeSymbol?: string;
}

export interface Blessing {
  id: string;
  name: string;
  relation: string;
  message: string;
  timestamp: string;
  isCustom?: boolean;
}

export interface FamilyMember {
  role: string;
  names: string[];
}
