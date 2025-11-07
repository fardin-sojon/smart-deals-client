import React from "react";
import LatestProducts from "./LatestProducts";

const latestProductsPromise = fetch(
  "https://smart-deals-api-server-mocha.vercel.app/latest-products"
).then((res) => res.json());

const Home = () => {
  return (
    <div>
      <h3>Home Pages</h3>
      <LatestProducts
        latestProductsPromise={latestProductsPromise}
      ></LatestProducts>
    </div>
  );
};

export default Home;
