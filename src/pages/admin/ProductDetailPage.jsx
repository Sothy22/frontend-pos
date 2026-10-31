import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetailPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  // How to fetch api
  useEffect(() => {
    setLoading(true);
    const fetchingData = async () => {
      const api = await fetch("https://dummyjson.com/products");
      const res = await api.json();
      if (res) {
        setLoading(false);
      }
      console.log("API: ", res?.products);
      setData(res?.products);
    };
    fetchingData();
  }, []);
  const { id } = useParams();

  const productDetail = data.find((item) => item?.id == id);
  console.log("Product Detail: ", productDetail);

  if (loading) {
    return (
      <div>
        <h1>Product detail loading</h1>
      </div>
    );
  }
  return (
    <div>
      <h1>Product ID: {id}</h1>
      <h1>Product Title: {productDetail?.title}</h1>
      <p>Product Description: {productDetail?.description}</p>
      <h1>Product detail Page</h1>
    </div>
  );
}
