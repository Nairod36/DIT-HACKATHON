import { NavLink } from "react-router-dom";
import { Product } from "../type/product.type";
import Cube from "./Cube/Cube";

// components/Product.js
export function ProductComponent({
  id,
  address,
  type,
  name,
  price,
  description,
}: Product) {
  return (
    <div className="group cursor-pointer bg-white transition-all duration-500 w-48">
      <NavLink to={`/product/${id}`}>
        {/* To add your cube @Mathieu */}
        <div className="w-32 h-32">
          <Cube id={id}/>
        </div>
        <div className="mt-5">
          <div className="">
            <h6 className="font-semibold text-md leading-8 text-black transition-all duration-500 group-hover:text-indigo-600">
              {name}
            </h6>
            <h6 className="font-light text-xl leading-8 ">{price} ETH</h6>
          </div>
          <p className="mt-2 font-normal text-sm leading-6 text-gray-500">
            {description}
          </p>
        </div>
      </NavLink>
    </div>
  );
}
