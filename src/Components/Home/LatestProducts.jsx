import React, { use } from "react";
import ProductCard from "./ProductCard";


const LatestProducts = ({latestProductsPromise}) => {

    const pruducts = use(latestProductsPromise);
    // console.log(pruducts);

  return (
    <div>
      <h3 className="text-center font-bold text-3xl mb-5">Recent <span className="text-primary">Products</span></h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-5">
        {
        pruducts.map(product=> <ProductCard key={product._id} product={product}></ProductCard>)
      }
      </div>
    </div>
  );
};

export default LatestProducts;
