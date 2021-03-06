import React, { useEffect, useState } from "react";
import Sidebar from "components/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, deleteProduct } from "redux/actions/productActions";
import { useHistory } from "react-router-dom";
import DeleteButton from "Common/Buttons/DeleteButton";
import EditButton from "Common/Buttons/EditButton";
export default function GetProducts(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  console.log(useSelector((state) => state));
  const { products } = useSelector((state) => state.products);

  const handleProductDelete = (id) => {
    dispatch(deleteProduct(id));
  };
  const history = useHistory();

  return (
    <div className="row" style={{ width: "100%" }}>
      <Sidebar />
      <div className="col-md-9">
        <div className="d-flex justify-content-end mt-1">
          <button
            className="btn purple-btn"
            onClick={() => props.history.push("/admin/products/create")}
          >
            Create{" "}
          </button>
        </div>
        {/* {products.products.length > 0
          ? products.products.map((product, index) => <p>{product.fileName}</p>)
          : ""} */}
        <div className="row mt-4 mb-4">
          {products.length > 0
            ? products.map((product, index) => (
                <div className="col-md-4 pb-4" key={index}>
                  <div className="card h-100 ">
                    <img
                      className="img-fluid w-100"
                      src={`/uploads/${product.fileName}`}
                      alt="Card image cap"
                    />

                    <div className="card-body text-center">
                      <h5 className="card-title">{product.productName}</h5>
                      <h6 className="mb-3">
                        <span className="text-secondary mr-2">
                          {product.productPrice.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </span>
                      </h6>
                      <p>
                        {product.productDescription.length > 60
                          ? product.productDescription.substring(0, 60) + "..."
                          : product.productDescription.substring(0, 60)}
                      </p>
                      <EditButton
                        onClick={() =>
                          props.history.push({
                            pathname: "/admin/products/update/" + product._id,
                            state: {
                              data: product,
                            },
                          })
                        }
                      >
                        Edit
                      </EditButton>
                      <DeleteButton
                        onClick={() => handleProductDelete(product._id)}
                      >
                        delete
                      </DeleteButton>
                    </div>
                  </div>
                </div>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
}
