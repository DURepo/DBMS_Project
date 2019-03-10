import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, } from 'react-bootstrap';



/*const Applayout = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  padding: 40px;
`;*/

const NavBarComponent = (props) => {
    //console.log(props);
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Link className="navbar-brand" to="/">I-Data</Link> 
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
                <Link className="nav-link" to="/stats" >Hospitals Stats</Link>
                <Link className="nav-link" to="/propose" >Hospitals-Maps</Link> 
                <Link className="nav-link" to="/view">Prospective Locations</Link>
                <Link className="nav-link" to="/FilterByState">Filter By State</Link>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBarComponent;
