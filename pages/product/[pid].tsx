import { useEffect, useState } from "react";
import Breadcrumb from "../../components/breadcrumb";
import Footer from "../../components/footer";
import Content from "../../components/product-single/content";
import Description from "../../components/product-single/description";
import Gallery from "../../components/product-single/gallery";
import Reviews from "../../components/product-single/reviews";
import ProductsFeatured from "../../components/products-featured";
import Layout from "../../layouts/Main";
// import { server } from "../../utils/server";
// types
import { getproductIdApi } from "utils/data/products";

import { useRouter } from "next/router";
// type ProductPageType = {
//   product: ProductType;
// };

const Product = ({}) => {
  const [product, setProduct] = useState<any>([]);
  const [showBlock, setShowBlock] = useState("description");
  const router = useRouter();
  const id = router.query.pid;

  const getproductId = async () => {
    try {
      const res = await getproductIdApi(id as string);
      const products = res.product;
      setProduct(products);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("product", product);
  useEffect(() => {
    getproductId();
  }, [id]);
  // call với tham số nào thi truyền vào mảng emty

  return (
    <Layout>
      <Breadcrumb />

      <section className="product-single">
        <div className="container">
          <div className="product-single__content">
            <Gallery images={product} />
            <Content product={product} />
          </div>

          <div className="product-single__info">
            <div className="product-single__info-btns">
              <button
                type="button"
                onClick={() => setShowBlock("description")}
                className={`btn btn--rounded ${
                  showBlock === "description" ? "btn--active" : ""
                }`}
              >
                Mô tả
              </button>
              <button
                type="button"
                onClick={() => setShowBlock("reviews")}
                className={`btn btn--rounded ${
                  showBlock === "reviews" ? "btn--active" : ""
                }`}
              >
                Đánh giá
              </button>
            </div>

            <Description
              show={showBlock === "description"}
              detail={product?.description}
            />
            <Reviews show={showBlock === "reviews"} />
          </div>
        </div>
      </section>

      <div className="product-single-page">
        <ProductsFeatured />
      </div>
      <Footer />
    </Layout>
  );
};

export default Product;

