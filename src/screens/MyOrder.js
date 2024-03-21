import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);

  const fetchMyOrder = async () => {
    const userEmail = localStorage.getItem("userEmail");
    const response = await fetch("http://localhost:5000/api/auth/myOrderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
      }),
    });
    const data = await response.json();
    setOrderData(data.orderData || []);
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          {orderData.map((order, index) => (
            <React.Fragment key={index}>
              {order.order_data
                ? order.order_data
                    .slice(0)
                    .reverse()
                    .map((orderItem, orderIndex) => (
                      <React.Fragment key={orderIndex}>
                        {orderItem.map((item, itemIndex) => (
                          <div
                            key={itemIndex}
                            className="col-12 col-md-6 col-lg-3"
                          >
                            <div
                              className="card mt-3"
                              style={{ width: "16rem", maxHeight: "360px" }}
                            >
                              <img
                                src={item.img}
                                className="card-img-top"
                                alt="..."
                                style={{ height: "120px", objectFit: "fill" }}
                              />
                              <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <div
                                  className="container w-100 p-0"
                                  style={{ height: "38px" }}
                                >
                                  <span className="m-1">{item.qty}</span>
                                  <span className="m-1">{item.size}</span>
                                  <span className="m-1">
                                    {orderItem.Order_date}
                                  </span>
                                  <div className="d-inline ms-2 h-100 w-20 fs-5">
                                    ₹{item.price}/-
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </React.Fragment>
                    ))
                : null}
            </React.Fragment>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
