import React from "react";
import { Link } from "react-router";

const ProductCard = ({ product }) => {
  const { _id, image, title, price_min, price_max, status } = product;

  return (
    <div className="card w-full max-w-sm bg-base-100 shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300">
      <figure>
        <img src={image} alt={title} className="rounded-2xl h-48 w-full object-cover" />
      </figure>

      <div className="card-body">
        <h2 className="card-title text-lg font-semibold">{title}</h2>
        <p className="text-primary font-semibold">
          ${price_min} - ${price_max}
        </p>
        <div
          className={`badge mt-2 ${
            status === "pending" ? "badge-warning" : "badge-success"
          } text-white`}
        >
          {status}
        </div>

        <div className="card-actions mt-4">
          <Link to={`/product-details/${_id}`}
            className="btn w-full btn-primary" >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
