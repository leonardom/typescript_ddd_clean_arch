import { Zipcode } from "../../domain/entity/Zipcode";
import { ZipcodeRepository } from "../../application/repository";

const data: ZipcodeData[] = [
  {code: "22060030", street: "Rua A", neighborhood: "Bairro A", lat: -27.5945, lng: -48.5477},
  {code: "13873501", street: "Rua B", neighborhood: "Bairro B", lat: -22.9129, lng: -43.2003},
]

export class ZipcodeRepositoryInMemory implements ZipcodeRepository {
  async get(code: string): Promise<Zipcode | undefined> {
    const zipcodeData = data.find((p) => p.code === code);
    if (!zipcodeData) return Promise.resolve(undefined);
    const product = new Zipcode(
      zipcodeData.code, 
      zipcodeData.street, 
      zipcodeData.neighborhood,
      zipcodeData.lat,
      zipcodeData.lng,
    )
    return Promise.resolve(product);
  }
}

type ZipcodeData = {
  code: string;
  street: string;
  neighborhood: string;
  lat: number;
  lng: number;
}