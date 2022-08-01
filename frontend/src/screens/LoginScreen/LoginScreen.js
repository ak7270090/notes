




import axios from "axios";
//import {useHistory} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ErrorMessage from "../../components/errorMessage";
import Loading from "../../components/loading";
import MainScreen from "../../components/MainScreen";
import './LoginScreen.css';
import { useDispatch, useSelector } from 'react-redux'
import { login } from "../../actions/userAction";
//const history =useHistory();



const LoginScreen = () => {
 
  
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //const[error,setError]=useState(false);
  //const[loading,setLoading]=useState(false);


  // useEffect(()=>{
  //   const userInfo=localStorage.getItem("userInfo");
  //   if(userInfo){
  //     //history.push("/mynotes");
  //     navigate('/mynotes');
  //   }
  // },[navigate])


//new
const dispatch=useDispatch();

const userLogin=useSelector((state)=>state.userLogin);
const {loading,userInfo,error}=userLogin;


// working well history
useEffect(()=>{
      
  if(userInfo){
    
    navigate('/mynotes');
  }
},[navigate,userInfo])

const submitHandler= async(e)=>{
  e.preventDefault();

  dispatch(login(email,password));

//   try {
//       const config={
//           headers:{
//               "Content-type":"application/json",
//           },
//       };
//       setLoading(true);

//       const { data } = await axios.post("/api/users/login",{
//           email,
//           password
//       },config);
// console.log(data);
// localStorage.setItem("userInfo",JSON.stringify(data));
// //local storage cannot store the object data we need to convert ot into string
//       setLoading(false);
//   } catch (error) {
//       setError(error.response.data.message);
//       setLoading(false);
//   }


};

    return ( 
        <MainScreen title='Login'>

<div className="loginContainer">
  {error && <ErrorMessage variant="danger" children={error}></ErrorMessage>}
  {/* {error && <ErrorMessage variant="danger">{error}</ErrorMessage>} */}
{loading && <Loading />}
    <Form onSubmit={submitHandler}> 
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
         />
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        />
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Submit
      </Button>

      <Row>
        <Col>
        New customer?<Link to="/register">Register here</Link>
        </Col>
      </Row>
    </Form>

    </div>

        </MainScreen>
     );
}
 
export default LoginScreen;