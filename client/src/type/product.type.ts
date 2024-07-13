import { Base } from "@/types/base.type";

export interface Product extends Base {
    address: string;
    type: string;
    name: string;
    price: number;
    description: string;
    totalFace: number;
  }
  