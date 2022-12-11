import {Product} from "./product";

export interface Orders {
  id?: number
  userId?: number
  products: Product
}
