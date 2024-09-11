export interface ReportCardProps {
  title: string;
  description: string;
  species: string;
  sex: string;
  location: string /* {
    street: string;
    number: number;
    province: string;
    city: string;
    postalCode: number;
  } */;
  animalType: string;
  imageUrl: string;
}
