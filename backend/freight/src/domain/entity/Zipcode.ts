import { Coord } from "./Coord";

export class Zipcode {
  readonly coord: Coord;

  constructor(
    readonly code: string, 
    readonly street: string, 
    readonly neighborhood: string, 
    lat: number, 
    lng: number,
  ) {
    this.coord = new Coord(lat, lng);
  }

}