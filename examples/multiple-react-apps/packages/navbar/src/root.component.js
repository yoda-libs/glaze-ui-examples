import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useEffect } from 'react';

const Root = props => {
  const { glaze, name } = props;
  const { router } = glaze.router;
  useEffect(() => {
    // subscribe to messages from glaze framework
    var sub = glaze.subscribe(msg => {
      console.log(`[${name} recv]`, msg);
    });
    console.log(`[${name}] subscribed to glaze`);

    return function unsubscribe() {
        // unsubscribe when not needed anymore
        sub.unsubscribe();
        console.log(`[${name}] unsubscribed from glaze`);
    }

  });
  return (
    <Navbar bg="light" expand="sm">
      <Container>
        <img className="logo" src="https://i.imgur.com/IKLECXW.jpg" width="40" />
        <Navbar.Brand href="/">Glaze UI</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Todo List</Nav.Link>
            <Nav.Link href="/invalid">Page Not Found</Nav.Link>
            <Nav.Link href="/logout">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


export default Root;