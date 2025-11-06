import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthContext";
import Swal from "sweetalert2";

const MyBids = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const [bids, setBids] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/bids?email=${user.email}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setBids(data);
        });
    }
  }, [user]);


  // useEffect(() => {
  //   if (user?.email) {
  //     fetch(`http://localhost:3000/bids?email=${user.email}`, {
  //       headers: {
  //         authorization: `Bearer ${user.accessToken}`,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);
  //         setBids(data);
  //       });
  //   }
  // }, [user]);

  const handleDeleteBid = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/bids/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your Bid has been deleted.",
                icon: "success",
              });
              const remainingBids = bids.filter((bid) => bid._id !== _id);
              setBids(remainingBids);
            }
          });
      }
    });
  };

  return (
    <div>
      <h3 className="text-3xl font-bold text-center my-10">
        My Bids: <span className="text-primary">{bids.length}</span>
      </h3>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>SL No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Bid Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
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
                <td>
                  {bid.status === "pending" ? (
                    <div className="badge badge-warning p-4">{bid.status}</div>
                  ) : (
                    <div className="badge badge-success p-4">{bid.status}</div>
                  )}
                </td>
                <th>
                  <button
                    onClick={() => handleDeleteBid(bid._id)}
                    className="btn btn-outline btn-error"
                  >
                    Remove Bid
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBids;
