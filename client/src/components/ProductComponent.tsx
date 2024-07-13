import { Product } from "@/types/product.type";
import { Cube } from "@/components/Cube";
import { Link, useParams } from "react-router-dom";
import React, { Suspense } from "react";

// components/Product.js
export function ProductComponent({
  id,
  address,
  type,
  name,
  price,
  description,
}: Product) {
  const token = useParams<{ token: string }>().token;
  return (
    <div className="group cursor-pointer bg-white transition-all duration-500 w-48">
      <div>
        {type === "CUBE" && (
          <Link to={`/edit/${id}`}>
            <Cube presentationMode />
          </Link>
        )}
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
    </div>
  );
}
