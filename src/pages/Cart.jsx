import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Table } from 'reactstrap';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import { motion } from 'framer-motion';
import { cartActions } from '../redux/slices/cartSlice';
import { Link } from 'react-router-dom';

import '../styles/cart.css';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  console.log('cádfks' + cartItems);
  return (
    <Helmet title="cart">
      <CommonSection title="Shopping Cart" />
      <section>
        <Container>
          <Row>
            <Col lg="9">
              {cartItems.length === 0 ? (
                <h3>No item</h3>
              ) : (
                <Table className="table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <Tr item={item} key={index}></Tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Col>
            <Col lg="3">
              <div className="d-flex align-items-center justify-content-between">
                <h6>Total:</h6>
                <span className="fs-bold fs-4">${totalAmount}</span>
              </div>
              <p className="mt-1">Lorem ipsum, dolor</p>
              <div className="">
                <button type="submit" className="buy__btn w-100 mt-3">
                  <Link to="/shop">Continue Shopping</Link>
                </button>
                <button type="submit" className="buy__btn w-100 mt-2">
                  <Link to="/checkout">Checkout</Link>
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

const Tr = ({ item }) => {
  const dispatch = useDispatch();
  const deleteProduct = () => {
    dispatch(cartActions.deleteItem(item.id));
  };
  return (
    <tr>
      <td>
        <img src={item.imgUrl} alt="" />
      </td>
      <td>{item.productName}</td>
      <td>{item.price}</td>
      <td>{item.quantity}</td>
      <td>
        <motion.span whileHover={{ scale: 1.2 }} className="d-inline-block" onClick={deleteProduct}>
          <i class="ri-delete-bin-6-line"></i>
        </motion.span>
      </td>
    </tr>
  );
};

export default Cart;
