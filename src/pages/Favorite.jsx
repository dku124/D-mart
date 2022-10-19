import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row, Table } from 'reactstrap';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import { cartActions } from '../redux/slices/cartSlice';
import { motion } from 'framer-motion';

import '../styles/cart.css';

const Favorite = () => {
  const cartItemsFavotite = useSelector((state) => state.cart.cartItemsFavotite);
  const totalAmountFavorite = useSelector((state) => state.cart.totalAmountFavorite);

  console.log(cartItemsFavotite);
  return (
    <Helmet title="Favorite">
      <CommonSection title="My favorite" />
      <section>
        <Container>
          <Row>
            <Col lg="12">
              {cartItemsFavotite.length === 0 ? (
                <h3>No item</h3>
              ) : (
                <Table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Image</th>
                      <th scope="col">Title</th>
                      <th scope="col">Price</th>
                      <th scope="col">Qty</th>
                      <th scope="col">Total Price:</th>
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItemsFavotite.map((item, index) => (
                      <Tr item={item} key={index}></Tr>
                    ))}
                    <tr>
                      <th scope="row">Total</th>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <strong>${totalAmountFavorite}</strong>
                      </td>
                      <td></td>
                    </tr>
                  </tbody>
                </Table>
              )}
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
    dispatch(cartActions.deleteItemFavorite(item.id));
  };

  return (
    <tr>
      <td>
        <img src={item.imgUrl} alt="" />
      </td>
      <td>{item.productName}</td>
      <td>${item.price}</td>
      <td>{item.quantity}</td>
      <td>${item.quantity * item.price}</td>
      <td>
        <motion.span whileHover={{ scale: 1.2 }} className="d-inline-block" onClick={deleteProduct}>
          <i class="ri-delete-bin-6-line"></i>
        </motion.span>
      </td>
    </tr>
  );
};

export default Favorite;
