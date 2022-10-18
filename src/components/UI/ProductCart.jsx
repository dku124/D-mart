import React from 'react';
import { motion } from 'framer-motion';
import '../../styles/product-card.css';
import { Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../redux/slices/cartSlice';
import { toast } from 'react-toastify';

const ProductCart = ({ item }) => {
  const dispatch = useDispatch();
  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id: item.id,
        productName: item.productName,
        price: item.price,
        imgUrl: item.imgUrl,
      }),
    );
    toast.success('Item added to cart', { theme: 'colored' });
    // console.log(item);
  };

  const addToFavorite = () => {
    dispatch(
      cartActions.favoriteItem({
        id: item.id,
        productName: item.productName,
        price: item.price,
        imgUrl: item.imgUrl,
      }),
    );
    toast.info('Item added to favorite', { theme: 'colored' });
  };

  return (
    <Col lg="3" md="4">
      <div className="product__item my-3">
        <Link to={`/shop/${item.id}`}>
          <div className="product__img">
            <motion.img whileTap={{ scale: 1.1 }} whileHover={{ scale: 1.1 }} src={item.imgUrl} alt="" />
          </div>
          <div className="product__info p-2">
            <h3 className="product__name">{item.productName}</h3>
            <span className="d-block">{item.category}</span>
          </div>
        </Link>
        <div className="product__card-bottom d-flex aligh-item-center justify-content-between p-2">
          <span className="price">${item.price}</span>
          <div className="">
            <motion.span whileTap={{ scale: 1.2 }} className="me-1" onClick={addToFavorite}>
              <i class="ri-heart-3-line"></i>
            </motion.span>
            <motion.span whileTap={{ scale: 1.2 }} onClick={addToCart}>
              <i class="ri-add-line"></i>
            </motion.span>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default ProductCart;
