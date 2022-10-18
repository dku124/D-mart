import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Col, Container, Form, FormGroup, Row, Input, Button } from 'reactstrap';
import Helmet from '../components/Helmet/Helmet';

import '../styles/login.css';

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase.config';

import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase.config';
import { db } from '../firebase.config';

import { toast } from 'react-toastify';

import { doc, setDoc } from 'firebase/firestore';
import { async } from '@firebase/util';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // console.log(user);

      const storageRef = ref(storage, `image/${Date.now() + username}`);
      // Upload the file and metadata
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        (error) => {
          toast.error(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(user, {
              displayName: username,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, 'users', user.uid), {
              uid: user.uid,
              displayName: username,
              email,
              photoURL: downloadURL,
            });
          });
        },
      );

      setLoading(false);
      toast.success('Account created');
      navigate('/login');
    } catch (error) {
      // toast.error(error);

      alert(error);
      setLoading(false);
    }
  };

  return (
    <Helmet title="Sign Up">
      <section>
        <Container>
          <Row>
            {loading ? (
              <Col lg="12" className="text-center">
                <h5 className="fw-bold fs-3">Loading...</h5>
              </Col>
            ) : (
              <Col lg="6" className="m-auto text-center">
                <h3 className="fw-bold fs-3 mb-4">Sign Up</h3>
                <Form className="auth__form" onSubmit={signup}>
                  <FormGroup className="form__group">
                    <Input id="username" name="username" placeholder="Name" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                  </FormGroup>
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
                  <FormGroup className="form__group">
                    <Input id="exampleFile" name="file" type="file" onChange={(e) => setFile(e.target.files[0])} />
                  </FormGroup>
                  <Button type="submit" className="auth__btn m-auto text-center">
                    Submit
                  </Button>
                  <p className="mt-3 text-end">
                    Already have an account?{' '}
                    <Link to="/login" className="text-danger text-decoration-underline">
                      Login
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

export default Signup;
