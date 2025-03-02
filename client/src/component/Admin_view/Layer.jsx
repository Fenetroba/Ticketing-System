import React, { useState } from "react";
import "../Admin_view/styles/layer.css";
import topArrow from "../../assets/upload.png";
import bottomArrow from "../../assets/down.png";
import { RiDeleteBack2Fill, RiMenu3Fill } from "react-icons/ri";
import ProductsImageUploder from "./productsImageUploder";
const Layer = () => {
  // this state uses to handele for the add product page
  const [AddProductPage, setProductPage] = useState(false);
  const AddProductHadler = () => {
    setProductPage(!AddProductPage);
  };
  //to use uploade the image for cloudnary

  const [ImageFile, setImageFile] = useState(null);
  const [UploadImageUrl, setUploadImageUrl] = useState("");
  const [productTitle, setProductTitle] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [category, setCategory] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [totalStock, setTotalStock] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      productTitle,
      productDescription,
      category,
      salePrice,
      totalStock,
    };
  };

  const [dropdown, setdropdown] = useState(true);

  const DropdownHandler = () => {
    setdropdown(!dropdown);
  };
  return (
    <div className="adminlayer">
      <div className={dropdown ? "active" : "inactive"}>
        <div
          className="displayTopSide"
          style={dropdown ? {} : { backgroundColor: "#c0e4a454" }}
        >
          <div className="right_side_Arrow" onClick={DropdownHandler}>
            {dropdown ? (
              <img
                src={bottomArrow}
                alt="bottomArrow"
                style={{ width: "30px" }}
              />
            ) : (
              <img src={topArrow} alt="topArrow" style={{ width: "20px" }} />
            )}
          </div>
          <div className="Admin_tasks">
            <button className="addproduct_button" onClick={AddProductHadler}>
              ADD Products{" "}
            </button>

            {/* //the form that the admin add the products */}
            <div
              className={
                AddProductPage
                  ? "addProducts activeAddProdactPage"
                  : "addProducts"
              }
            >
              <div>
                <p onClick={AddProductHadler}>
                  <RiDeleteBack2Fill
                    style={{
                      fontSize: "30px",
                      fontWeight: "900",
                      cursor: "pointer",
                    }}
                  />
                </p>
                <h1>Add New Product</h1>
                <form onSubmit={handleSubmit}>
                  <ProductsImageUploder
                    ImageFile={ImageFile}
                    setImageFile={setImageFile}
                    UploadImageUrl={UploadImageUrl}
                    setUploadImageUrl={setUploadImageUrl}
                  />
                  <label htmlFor="product-title">Product Title</label>
                  <input
                    type="text"
                    id="product-title"
                    value={productTitle}
                    onChange={(e) => setProductTitle(e.target.value)}
                    placeholder="Enter product title"
                    required
                  />

                  <label htmlFor="product-description">Description</label>
                  <input
                    type="text"
                    id="product-description"
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    placeholder="Enter product description"
                    required
                  />

                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="kids">Kids</option>
                    <option value="accessories">Accessories</option>
                    <option value="footwear">Footwear</option>
                  </select>

                  <label htmlFor="sale-price">Sale Price (optional)</label>
                  <input
                    type="text"
                    id="sale-price"
                    value={salePrice}
                    onChange={(e) => setSalePrice(e.target.value)}
                    placeholder="Enter sale price (optional)"
                  />

                  <label htmlFor="total-stock">Total Stock</label>
                  <input
                    type="number"
                    id="total-stock"
                    value={totalStock}
                    onChange={(e) => setTotalStock(e.target.value)}
                    placeholder="Enter total stock"
                    required
                  />

                  <button type="submit">Add Product</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layer;
