// sfc shortcut //ctrl+space
import { Button, Container, Form, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../actions/userAction';

const Header = ({ setSearch }) => {

const navigate=useNavigate();

const dispatch=useDispatch();
const userLogin=useSelector((state)=>state.userLogin);
const {userInfo}=userLogin;
const logoutHandler=()=>{
  dispatch(logout());
  navigate('/');
};
  return (
    <Navbar bg="primary" expand="lg" variant='dark'>
      <Container>
        <Navbar.Brand >
          <Link to="/">Notes saver</Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className='m-auto'>

            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                onChange={(e) => setSearch(e.target.value)}
              />

            </Form>

          </Nav>
          <Nav >
          { userInfo ? (
            <>
            <Nav.Link ><Link to='/mynotes'>My notes</Link> </Nav.Link>
{/* a very imp point that made always opional as if userInfo gets null title gets error app crashed */}
            <NavDropdown title={userInfo?.name} id="basic-nav-dropdown">
              <NavDropdown.Item href="/profile">my profile</NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item 
              // onClick={()=>{
              //   localStorage.removeItem("userInfo");
              //   navigate('/');
              // }}

              onClick={logoutHandler}
              
              >
                log out
              </NavDropdown.Item>
            </NavDropdown>
            </>
           ) : (<Nav.Link href="/login">Login</Nav.Link>)}
           </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}



export default Header;