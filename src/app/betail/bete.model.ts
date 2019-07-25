import { PlaceLocation } from "./location.model";
export class Bete {
  constructor(
    public reference: string,
    public categorie: string,
    public origine: string,
    public age: string,
    public poids: string,
    public race: string,
    public proprietaire: string,
    public imgURL: string,
    public location: PlaceLocation
  ) {}
}
