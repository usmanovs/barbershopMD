export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
}

export interface Barber {
  id: string;
  name: string;
  specialty: string;
  image: string;
}

export interface StyleRecommendation {
  name: string;
  description: string;
  stylingTips: string;
  suitability: string;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
}

export enum FaceShape {
  OVAL = 'Oval',
  ROUND = 'Round',
  SQUARE = 'Square',
  DIAMOND = 'Diamond',
  TRIANGLE = 'Triangle',
  OBLONG = 'Oblong'
}

export enum HairType {
  STRAIGHT = 'Straight',
  WAVY = 'Wavy',
  CURLY = 'Curly',
  COILY = 'Coily',
  THIN = 'Thinning'
}