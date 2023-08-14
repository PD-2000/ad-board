import {Container, Nav, Navbar} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';

const NavBar = () => {
  return (
    <Navbar
      bg="primary"
      variant="dark"
      expand="sm"
      className="justify-content-between mt-4 mb-4 rounded px-3"
    >
      <Container>
        <Navbar.Brand>AdBoard</Navbar.Brand>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/logout">Log out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;