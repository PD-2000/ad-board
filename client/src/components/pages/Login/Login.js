import {Alert, Button, Form, Spinner} from 'react-bootstrap';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {API_URL} from '../../../config';
import {logIn} from '../../../redux/usersRedux';

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(null); // null, 'loading', 'success', 'serverError', 'clientError'
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({login, password})
    }

    setStatus('loading');
    fetch(`${API_URL}/auth/login`, options)
      .then(res => {
        if(res.status === 201){
          setStatus('success');
          dispatch(logIn({login}));
        } else if(res.status === 400) {
          setStatus('clientError');
        } else {
          setStatus('serverError');
        }
      })
      .catch(err => {
        setStatus('serverError');
      });
  }

  return (
    <Form className="col-12 col-sm-3 mx-auto" onSubmit={handleSubmit}>
      <h1 className="my-4">Sign in</h1>

      {status === "success" && (
        <Alert variant="success">
          <Alert.Heading>Success!</Alert.Heading>
          <p>Welcome back.</p>
        </Alert>
      )}
      {status === "serverError" && (
        <Alert variant="danger">
          <Alert.Heading>Something went wrong</Alert.Heading>
          <p>An unexpected error has occured. Try again later.</p>
        </Alert>
      )}
      {status === "clientError" && (
        <Alert variant="danger">
          <Alert.Heading>Incorrect login credentials</Alert.Heading>
          <p>Make sure you've entered proper login and password.</p>
        </Alert>
      )}
      {status === "loading" && (
        <Spinner animation="border" role="status" className="d-block mx-auto">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}

      <Form.Group className="mb-3" controlId="formLogin">
        <Form.Label>Login</Form.Label>
        <Form.Control type="text" value={login} onChange={e => setLogin(e.target.value)} placeholder="Login" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">Log in</Button>
    </Form>
  );
}

export default Login;