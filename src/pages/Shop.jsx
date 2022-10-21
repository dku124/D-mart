import React from 'react';
import { useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import '../styles/shop.css';

import product from '../assets/data/products';
import ProductList from '../components/UI/ProductList';

const Shop = () => {
  const [productData, setProductData] = useState(product);

  const handleFilter = (e) => {
    const filterValue = e.target.value;
    if (filterValue === 'sofa') {
      const filterProducts = product.filter((item) => item.category === 'sofa');
      setProductData(filterProducts);
    }

    if (filterValue === 'chair') {
      const filterProducts = product.filter((item) => item.category === 'chair');
      setProductData(filterProducts);
    }

    if (filterValue === 'mobile') {
      const filterProducts = product.filter((item) => item.category === 'mobile');
      setProductData(filterProducts);
    }

    if (filterValue === 'wireless') {
      const filterProducts = product.filter((item) => item.category === 'wireless');
      setProductData(filterProducts);
    }

    if (filterValue === 'watch') {
      const filterProducts = product.filter((item) => item.category === 'watch');
      setProductData(filterProducts);
    }
  };

  const handleSearch = (e) => {
    const searchItem = e.target.value;

    const searchedProduct = product.filter((item) => item.productName.toLowerCase().includes(searchItem.toLowerCase()));
    setProductData(searchedProduct);
  };

  return (
    <Helmet title="Shop">
      <CommonSection title="D-Mart" />

      <section className="pb-2">
        <Container>
          <Row>
            <Col lg="3" md="3">
              <div className="filter__widget mt-2">
                <select onChange={handleFilter}>
                  <option>Filter by Category</option>
                  <option value="sofa">Sofa</option>
                  <option value="mobile">Mobile</option>
                  <option value="chair">Chair</option>
                  <option value="watch">Watch</option>
                  <option value="wireless">Wireless</option>
                </select>
              </div>
            </Col>
            <Col lg="3" md="6">
              <div className="filter__widget mt-2">
                <select>
                  <option>Sort by</option>
                  <option value="ascending">Ascending</option>
                  <option value="descending">Descending</option>
                </select>
              </div>
            </Col>
            <Col lg="6" md="6">
              <div className="search__box mt-2">
                <input type="text" placeholder="Search..." onChange={handleSearch} />
                <span>
                  <i class="ri-search-line"></i>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="pt-0">
        <Container>
          <Row>{productData.length === 0 ? <h1 className="my-3 text-center">Item not found!</h1> : <ProductList data={productData} />}</Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Shop;
