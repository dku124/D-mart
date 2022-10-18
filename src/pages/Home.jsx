import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { motion } from 'framer-motion';

import Helmet from '../components/Helmet/Helmet';
import heroImg from '../assets/images/hero-img.png';
import '../styles/home.css';
import { Link } from 'react-router-dom';
import Services from '../services/Services';
import ProductList from '../components/UI/ProductList';

import products from '../assets/data/products';
import { useState } from 'react';
import { useEffect } from 'react';

import countImg from '../assets/images/counter-timer-img.png';
import Clock from '../components/UI/Clock';

const Home = () => {
  const [trendingProduct, setTrendingProduct] = useState([]);
  const [bestSalesProduct, setBestSalesProduct] = useState([]);
  const [mobileProduct, setMobileProduct] = useState([]);
  const [wirelessProduct, setWirelessProduct] = useState([]);
  const [watchProduct, setWatchProduct] = useState([]);

  const year = new Date().getFullYear();

  useEffect(() => {
    const filteredTrendingProduct = products.filter((item) => item.category === 'chair');
    setTrendingProduct(filteredTrendingProduct);

    const filteredBestSalesProduct = products.filter((item) => item.category === 'sofa');
    setBestSalesProduct(filteredBestSalesProduct);

    const filteredMobileProduct = products.filter((item) => item.category === 'mobile');
    setMobileProduct(filteredMobileProduct);

    const filteredWatchProduct = products.filter((item) => item.category === 'watch');
    setWatchProduct(filteredWatchProduct);

    const filteredWirelessProduct = products.filter((item) => item.category === 'wireless');
    setWirelessProduct(filteredWirelessProduct);
  }, []);
  return (
    <Helmet title={'Home'}>
      {/*section hero*/}
      <section className="hero__section">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero__content">
                <p className="hero__subtitle">Trending product in {year}</p>
                <h2>Make your favorite</h2>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero ullam iste commodi sequi consectetur excepturi deleniti dolor quisquam.
                  Mollitia reiciendis iste voluptatum nemo, sapiente similique aperiam non corporis excepturi. Eum.
                </p>
                <motion.button whileTap={{ scale: 1.2 }} className="buy__btn">
                  <Link to="/shop">Shop now</Link>
                </motion.button>
              </div>
            </Col>
            <Col cl="6" md="6">
              <div className="hero__img">
                <img src={heroImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/*section service */}
      <Services />

      {/*section trending */}
      <section className="trending__products">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">Trending Product</h2>
            </Col>
            <ProductList data={trendingProduct} />
          </Row>
        </Container>
      </section>

      {/*section best sale */}
      <section className="best__sales">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">Best Sales</h2>
            </Col>
            <ProductList data={bestSalesProduct} />
          </Row>
        </Container>
      </section>

      {/*section timer count */}
      <section className="timer__count">
        <Container>
          <Row>
            <Col lg="6" md="6" className="count__down-col">
              <div className="clock__top-content">
                <h4 className="text-white fs-6 mb-2">Limited Offer</h4>
                <h3 className="text-white fs-5 mb-3">Quality Armchair</h3>
              </div>
              <Clock />
              <motion.button whileTap={{ scale: 1.2 }} className="buy__btn store__btn">
                <Link to="/shop">Visit Store</Link>
              </motion.button>
            </Col>
            <Col lg="6" md="6" className="count__down-img text-end">
              <img src={countImg} alt="" />
            </Col>
          </Row>
        </Container>
      </section>

      {/*section new arrivals */}
      <section className="new__arrivals">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">New Arrivals</h2>
            </Col>
            <ProductList data={mobileProduct} />
            <ProductList data={wirelessProduct} />
          </Row>
        </Container>
      </section>

      {/*section popular in category */}
      <section className="popular__category">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">Popular in Category</h2>
            </Col>
            <ProductList data={watchProduct} />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
