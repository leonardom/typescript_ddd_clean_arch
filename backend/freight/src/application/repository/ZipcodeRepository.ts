import { Zipcode } from "../../domain/entity/Zipcode";

export interface ZipcodeRepository {
  get(code: string): Promise<Zipcode | undefined>
}