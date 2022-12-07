import {Users} from "./user";
import {Condition} from "./condition";

export interface Product {
  id: number,
  productName: string,
  imageUrl: string,
  description: string,
  price: number,
  productCondition: Condition,
  user: Users

}
