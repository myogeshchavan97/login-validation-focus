import React, { useState, useEffect, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function App() {
  const [state, setState] = useState({
    email: '',
    password: ''
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateInput = () => {
    const fields = [
      {
        name: 'email',
        value: state.email,
        message: 'Email address should not be blank.'
      },
      {
        name: 'password',
        value: state.password,
        message: 'Password should not be blank.'
      }
    ];
    const isNotFilled = fields.some(field => {
      if (field.value.trim() === '') {
        setErrorMsg(field.message);
        field.name === 'email'
          ? emailRef.current.focus()
          : passwordRef.current.focus();
        return true;
      }
      setErrorMsg('');
      return false;
    });
    return isNotFilled;
  };

  const handleOnSubmit = event => {
    event.preventDefault();
    const isInvalid = validateInput();
    if (!isInvalid) {
      setSuccessMsg("You're good to go!");
    } else {
      setSuccessMsg('');
    }
  };

  return (
    <div className="container">
      <h1>Login Page</h1>
      <div className="col-md-6 offset-md-3">
        {successMsg && <p className="successMsg">{successMsg}</p>}
        {errorMsg && <p className="errorMsg">{errorMsg}</p>}
        <Form onSubmit={handleOnSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              ref={emailRef}
              value={state.username}
              placeholder="Enter your email address"
              autoComplete="off"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="text"
              name="password"
              ref={passwordRef}
              value={state.password}
              placeholder="Enter your password"
              autoComplete="off"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}
