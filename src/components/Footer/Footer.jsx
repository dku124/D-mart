import React from 'react';
import { Col, Container, ListGroup, ListGroupItem, Row } from 'reactstrap';
import './footer.css';
import logo from '../../assets/images/eco-logo.png';
import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="footer">
      <Container>
        <Row>
          <Col lg="4" className="mb-4">
            <div className="logo">
              <div>
                <h2>D-mart</h2>
              </div>
            </div>
            <p className="footer__text mt-4">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa velit sequi, cum et, unde assumenda ducimus, ut odit libero ipsum beatae doloribus
              porro. Maiores, quod quas magni magnam exercitationem aliquid!
            </p>
          </Col>
          <Col lg="3" className="mb-4">
            <div className="footer__quick-links">
              <h4 className="quick__link-title">Top Categories</h4>
              <ListGroup className="mb-3 mt-4">
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Moblie Phones</Link>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Modern Sofa</Link>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Arm Chair</Link>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Smart Watches</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="2" className="mb-4">
            <div className="footer__quick-links">
              <h4 className="quick__link-title">Useful Links</h4>
              <ListGroup className="mb-3 mt-4">
                <ListGroupItem className="ps-0 border-0">
                  <Link to="/shop">Shop</Link>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0">
                  <Link to="/cart">Cart</Link>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0">
                  <Link to="/login">Login</Link>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Privacy Policy</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="3" className="mb-4">
            <div className="footer__quick-links">
              <h4 className="quick__link-title">Contact</h4>
              <ListGroup className="mb-3 mt-4">
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center">
                  <span>
                    <i class="ri-map-pin-line"></i>
                  </span>
                  <p className="ms-1">123, Ha Noi</p>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0 d-flex align-items-center">
                  <span>
                    <i class="ri-phone-line"></i>
                  </span>
                  <p className="ms-1">0988604702</p>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0 d-flex align-items-center">
                  <span>
                    <i class="ri-mail-line"></i>
                  </span>
                  <p className="ms-1">duongkhanhuyen124@gmail.com</p>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="12">
            <p className="footer__copyright text-center">&#169; Copyright by DKU {year}. All right reserved.</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
