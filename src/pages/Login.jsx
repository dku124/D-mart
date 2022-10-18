import React from 'react';
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Col, Container, Form, FormGroup, Row, Input, Button } from 'reactstrap';
import Helmet from '../components/Helmet/Helmet';

import '../styles/login.css';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase.config';
import { async } from '@firebase/util';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      setLoading(false);
      toast.success('Login successful!');
      navigate('/checkout');
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <Helmet title="Login">
      <section>
        <Container>
          <Row>
            {loading ? (
              <Col lg="12">
                <h3 className="fs-3 text-center">Loading</h3>
              </Col>
            ) : (
              <Col lg="6" className="m-auto text-center">
                <h3 className="fw-bold fs-3 mb-4">Login</h3>
                <Form className="auth__form" onSubmit={signIn}>
                  <FormGroup className="form__group">
                    <Input id="email" name="email" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      id="password"
                      name="password"
                      placeholder="Password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormGroup>
                  <Button type="submit" className="auth__btn m-auto text-center">
                    Login
                  </Button>
                  <p className="mt-3 text-end">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-danger text-decoration-underline">
                      Create an account
                    </Link>
                  </p>
                </Form>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
