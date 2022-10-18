import React, { useEffect, useRef, useState } from 'react';
import Helmet from '../components/Helmet/Helmet';

import products from '../assets/data/products';
import CommonSection from '../components/UI/CommonSection';
import { Col, Container, Row } from 'reactstrap';
import { useParams } from 'react-router-dom';

import '../styles/product-detail.css';

import { motion } from 'framer-motion';

import ProductList from '../components/UI/ProductList';
import { useDispatch } from 'react-redux';
import { cartActions } from '../redux/slices/cartSlice';

import { ToastContainer, toast } from 'react-toastify';

const ProductDetails = () => {
  const { id } = useParams();

  const product = products.find((item) => item.id === id);
  const { productName, imgUrl, price, description, reviews, avgRating, category, shortDesc } = product;

  const [tab, setTab] = useState('desc');

  let [rating, setRating] = useState(null);

  const relateProduct = products.filter((item) => item.category === category);

  const reviewUser = useRef('reviewUser');
  const reviewMsg = useRef('reviewMsg');

  const submitHandle = (e) => {
    e.preventDefault();
    const reviewUserName = reviewUser.current.value;
    const reviewUserMsg = reviewMsg.current.value;

    let reviewObj = {
      userName: reviewUserName,
      text: reviewUserMsg,
      rating: rating,
    };
  };

  const dispatch = useDispatch();

  const addToCard = () => {
    dispatch(
      cartActions.addItem({
        id,
        productName,
        price,
        imgUrl: imgUrl,
      }),
    );
    toast.success('Item added to cart', { theme: 'colored' });
    console.log(productName);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  return (
    <Helmet title={productName}>
      <CommonSection title={productName} />
      <section className="pt-0">
        <Container>
          <Row>
            <Col md="6" lg="6">
              <img src={imgUrl} alt={productName} />
            </Col>
            <Col md="6" lg="6">
              <div className="product__detail">
                <h2>{productName}</h2>
                <div className="product__rating">
                  <div className="">
                    <span>
                      <i class="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i class="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i class="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i class="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i class="ri-star-half-s-line"></i>
                    </span>
                  </div>
                  <p>
                    (<span className="rating__color">{avgRating}</span> ratings)
                  </p>
                </div>
                <span className="price mt-4 d-block rating__color">${price}</span>
                <p className="mt-1 text-dark ">
                  Category: <span className="rating__color">{category}</span>
                </p>
                <p className="mt-2">{shortDesc}</p>
                <motion.button whileHover={{ scale: 1.05 }} className="buy__btn" onClick={addToCard}>
                  Add to cart
                </motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="pt-0">
        <Container>
          <Row>
            <Col lg="12">
              <div className="tab__wrapper d-flex alight-items-center gap-5">
                <h6 className={`${tab === 'desc' ? 'active__tab' : ''}`} onClick={() => setTab('desc')}>
                  Description
                </h6>
                <h6 className={`${tab === 'rev' ? 'active__tab' : ''}`} onClick={() => setTab('rev')}>
                  Review({reviews.length})
                </h6>
              </div>
              <div className="tab__content mt-5">
                {tab === 'desc' ? (
                  <p>{description}</p>
                ) : (
                  <div className="review__wrapper">
                    <ul>
                      {reviews.map((item, index) => (
                        <li key={index} className="mt-3">
                          <h6 className="fw-semibold">{item.reviewer}</h6>
                          <span>{item.rating} ratings</span>
                          <p className="mt-2">{item.text}</p>
                        </li>
                      ))}
                      {/* <li className="mt-3">
                        <h6 className="fw-semibold">{reviewObj.userName}</h6>
                        <span>{reviewObj.rating} ratings</span>
                        <p className="mt-2">{reviewObj.text}</p>
                      </li> */}
                    </ul>

                    <div className="review__form">
                      <h4>Leave your experience</h4>
                      <form action="" onSubmit={submitHandle}>
                        <div className="form__group">
                          <input type="text" placeholder="Enter name" ref={reviewUser} />
                        </div>
                        <div className="form__rate">
                          <span onClick={() => setRating(1)}>1</span>
                          <span onClick={() => setRating(2)}>2</span>
                          <span onClick={() => setRating(3)}>3</span>
                          <span onClick={() => setRating(4)}>4</span>
                          <span onClick={() => setRating(5)}>5</span>
                        </div>
                        <div className="form__group">
                          <textarea name="" id="" rows={4} ref={reviewMsg}></textarea>
                        </div>
                        <button type="submit" className="buy__btn">
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </Col>
            <Col lg={12} className="mt-3">
              <h3 className="relate__title">You might also like</h3>
            </Col>
            <ProductList data={relateProduct} />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ProductDetails;
