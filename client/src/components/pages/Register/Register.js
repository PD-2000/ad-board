import {Alert, Button, Form, Spinner} from 'react-bootstrap';
import {useState} from 'react';
import {API_URL} from '../../../config';
import {useForm} from 'react-hook-form';

const Register = () => {
  const {register, handleSubmit: validate, formState: {errors}} = useForm();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [status, setStatus] = useState(null); // null, 'loading', 'success', 'serverError', 'clientError', 'loginError'

  const handleSubmit = () => {
    // e.preventDefault();

    const fd = new FormData();
    fd.append('login', login);
    fd.append('password', password);
    fd.append('phoneNumber', phoneNumber);
    fd.append('avatar', avatar);

    const options = {
      method: 'POST',
      body: fd
    }

    setStatus('loading');
    fetch(`${API_URL}/auth/register`, options)
      .then(res => {
        if(res.status === 200) {
          setStatus('success');
        } else if(res.status === 400) {
          setStatus('clientError');
        } else if(res.status === 409) {
          setStatus('loginError');
        } else {
          setStatus('serverError');
        }
      })
      .catch(err => {
        setStatus('serverError');
      });
  }

  return (
    <Form className="col-12 col-sm-3 mx-auto" onSubmit={validate(handleSubmit)}>
      <h1 className="my-4">Sign up</h1>

      {status === "success" && (
        <Alert variant="success">
          <Alert.Heading>Success!</Alert.Heading>
          <p>You have been successfully registered!</p>
          <p>You will be redirected to a sign in page shortly...</p>
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
          <Alert.Heading>Incorrect/missing login credentials</Alert.Heading>
          <p>Make sure you've filled each field correctly.</p>
        </Alert>
      )}
      {status === "loginError" && (
        <Alert variant="warning">
          <Alert.Heading>Login already in use</Alert.Heading>
          <p>Try a different login.</p>
        </Alert>
      )}
      {status === "loading" && (
        <Spinner animation="border" role="status" className="d-block mx-auto">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}

      <Form.Group className="mb-3" controlId="formLogin">
        <Form.Label>Login</Form.Label>
        <Form.Control {...register("login", {required: true, minLength: 6})} type="text" value={login} onChange={e => setLogin(e.target.value)} placeholder="Login" />
        {errors.login && <small className="d-block text-danger mt-1">Your login must be at least 6 characters long.</small>}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control {...register("password", {required: true, minLength: 8})} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
        {errors.password && <small className="d-block text-danger mt-1">Your password must be at least 8 characters long.</small>}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPhoneNumber">
        <Form.Label>Phone number</Form.Label>
        <Form.Control {...register("phoneNumber", {required: true, minLength: 9, maxLength: 9})} type="tel" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} placeholder="Phone number" />
        {errors.phoneNumber && <small className="d-block text-danger mt-1">You must enter a correct phone number &#40;9 digits, no spaces&#41;.</small>}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formFile">
        <Form.Label>Avatar</Form.Label>
        <Form.Control {...register("avatar", {required: true})} type="file" onChange={e => setAvatar(e.target.files[0])} />
        {errors.avatar && <small className="d-block text-danger mt-1">You must attach an image, which will serve as your avatar.</small>}
      </Form.Group>
      <Button variant="primary" type="submit">Register</Button>
    </Form>
  );
}

export default Register;