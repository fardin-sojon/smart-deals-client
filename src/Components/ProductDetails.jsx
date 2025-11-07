import React, { use, useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router";

import detailsImage from "../assets/thumbnail-details.png";
import { AuthContext } from "../Provider/AuthContext";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const { user } = use(AuthContext);
  console.log(user);

  const { _id: ProductId } = useLoaderData();
  const [products, setProducts] = useState([]);
  const [bids, setBids] = useState([]);
  const bidModelRef = useRef(null);

  useEffect(() => {
    fetch("https://smart-deals-api-server-mocha.vercel.app/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  const productData = products.find((product) => product._id === ProductId);

  const {
    image,
    title,
    price_min,
    price_max,
    condition,
    usage,
    description,
    seller_name,
    seller_image,
    seller_contact,
    location,
    status,
  } = productData || {};

  useEffect(() => {
    fetch(
      `https://smart-deals-api-server-mocha.vercel.app/products/bids/${ProductId}`,
      {
        headers: {
          authorization: `Bearer ${user.accessToken}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("bids for product", data);
        setBids(data);
      });
  }, [ProductId, user]);

  const handleBidModalOpen = () => {
    bidModelRef.current.showModal();
  };

  const haldleBidSubmit = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const image = event.target.image.value;
    const bidAmount = event.target.bids.value;
    const contact = event.target.contact.value;

    console.log({ ProductId, name, email, image, bidAmount, contact });
    const newBid = {
      product: ProductId,
      buyer_name: name,
      buyer_email: email,
      buyer_image: image,
      buyer_contact: contact,
      bid_price: bidAmount,
      status: "pending",
    };

    fetch("https://smart-deals-api-server-mocha.vercel.app/bids", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("after placing bid", data);
        if (data.insertedId) {
          bidModelRef.current.close();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your Bid has been placed",
            showConfirmButton: false,
            timer: 1500,
          });
          // add new bid state
          newBid._id = data.insertedId;
          const newBids = [...bids, newBid];
          newBids.sort((a, b) => b.bid_price - a.bid_price);
          setBids(newBids);
          // console.log(newBids);
        }
      });
  };

  return (
    <div>
      {/* Product info */}
      <div className="max-w-6xl mx-auto p-6 mt-10 grid md:grid-cols-3 gap-6 bg-purple-100">
        {/* ===== Left: Product Image ===== */}
        <div className="md:col-span-1 bg-gray-100 rounded-xl flex flex-col tems-center justify-center h-full p-4">
          <img
            src={detailsImage}
            alt={title}
            className="object-cover rounded-xl h-[50%]"
          />
          <p className="h-full text-3xl text-center font-bold">{description}</p>
        </div>

        {/* ===== Right: Product Info ===== */}
        <div className="md:col-span-2 flex flex-col gap-6">
          {/* Back Link */}
          <div>
            <a
              href="/"
              className="text-gray-500 hover:underline hover:text-primary"
            >
              &larr; Back To Products
            </a>
          </div>

          {/* Title & Price */}
          <div>
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-green-500 font-semibold text-lg mt-1">
              ${price_min} - ${price_max}
            </p>
            <p className="text-gray-400 text-sm">Price starts from</p>
          </div>

          {/* Product Details Card */}
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="font-semibold mb-2">Product Details</h2>
            <p className="text-sm text-gray-600">
              Condition: {condition} | Usage: {usage}
            </p>
            <p className="text-sm text-gray-600 mt-2">{description}</p>
          </div>

          {/* Seller Information Card */}
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="font-semibold mb-4">Seller Information</h2>
            <div className="flex items-center gap-4 mb-2">
              <img
                src={seller_image}
                alt={seller_name}
                className="w-12 h-12 rounded-full object-cover border"
              />
              <div>
                <h3 className="font-medium">{seller_name}</h3>
                <p className="text-sm text-gray-500">{seller_contact}</p>
              </div>
            </div>

            <p className="text-sm text-gray-500">Location: {location}</p>
            <p className="text-sm mt-1">
              Status:{" "}
              <span
                className={`font-semibold px-2 py-1 rounded ${
                  status === "pending"
                    ? "bg-yellow-300 text-black"
                    : "bg-green-500 text-white"
                }`}
              >
                {status}
              </span>
            </p>
          </div>

          {/* Action Button */}
          <button
            onClick={handleBidModalOpen}
            className="mt-4 w-full btn-primary py-3 rounded-lg hover:opacity-90 transition"
          >
            I Want Buy This Product
          </button>
          {/* Model */}
          <dialog
            ref={bidModelRef}
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box max-w-md w-full max-h-[90vh] overflow-y-auto rounded-2xl">
              <h3 className="font-bold text-xl text-center mb-6">
                Give Seller Your Offered Price!
              </h3>
              <form onSubmit={haldleBidSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-600 text-sm mb-1">
                    Buyer Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    readOnly
                    defaultValue={user?.displayName}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-600 text-sm mb-1">
                    Buyer Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    readOnly
                    defaultValue={user?.email}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-600 text-sm mb-1">
                    Buyer Image URL
                  </label>
                  <input
                    type="url"
                    name="image"
                    defaultValue={user?.photoURL}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-600 text-sm mb-1">
                    Place Your Price
                  </label>
                  <input
                    type="text"
                    name="bids"
                    placeholder="Enter your offered price"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-600 text-sm mb-1">
                    Contact Info
                  </label>
                  <input
                    type="text"
                    name="contact"
                    placeholder="e.g. +1-555-1234"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => bidModelRef.current.close()}
                    className="btn px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
                  >
                    Submit Bid
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        </div>
      </div>
      {/* bids for this product */}
      <div>
        <h3 className="text-3xl text-center font-bold my-10">
          Bids for this Product:{" "}
          <span className="text-primary">{bids.length}</span>
        </h3>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>SL No.</th>
                <th>Buyer Name</th>
                <th>Buyer Email</th>
                <th>Bid Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* row  */}
              {bids.map((bid, index) => (
                <tr key={bid._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={bid.buyer_image} alt="Image" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{bid.buyer_name}</div>
                        <div className="text-sm opacity-50">Bangladesh</div>
                      </div>
                    </div>
                  </td>
                  <td>{bid.buyer_email}</td>
                  <td>{bid.bid_price}</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
