import {Container,Nav, Navbar, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';


function Header(){
  const navigate  = useNavigate ();
  const [searchTerm, setSearchTerm] = useState('');
  let user = JSON.parse(localStorage.getItem('user_info'))
    return (
        <div>
             <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Ecomm Dashboard</Navbar.Brand>
          <Nav className="me-auto wrapper">
            {
              localStorage.getItem('user_info') ?
              <>
              <Link to="/add" >Add Products</Link>
              <Link to="/">List Product</Link>
              </>
              :
              <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
              </>
            }
          
           

          </Nav>
          {localStorage.getItem('user_info') && (
              <Form className="d-flex" onSubmit={handleSearch}>
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="outline-light" type="submit">Search</Button>
              </Form>
            )}
          {
              localStorage.getItem('user_info') ?
          <Nav>
            <NavDropdown title={user && user.name}>
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              <NavDropdown.Item >Profile</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          :null
          }
        </Container>
      </Navbar>
        </div>
    )
 
    function logout(){
      localStorage.clear();
      navigate ("/login")


    }
    async function handleSearch(e) {
      e.preventDefault();       
          navigate(`/search/${searchTerm}`);

    }
};

export default Header