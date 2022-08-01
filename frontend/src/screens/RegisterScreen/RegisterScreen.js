import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import ErrorMessage from "../../components/errorMessage";
import Loading from "../../components/loading";
import { useDispatch, useSelector } from 'react-redux';
import { register } from "../../actions/userAction";


const RegisterScreen = () => {

  const navigate=useNavigate();

    const [email,setEmail]=useState("");
    const [name,setName]=useState("");
    const [pic,setPic]=useState("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    );

    const [password,setPassword]=useState("");
    const [confirmpassword,setConfirmPassword]=useState("");
    const [message,setMessage]=useState(null);
    const [picMessage,setPicMessage]=useState(null);

  // const[error,setError]=useState(false);
  // const[loading,setLoading]=useState(false);

  const dispatch=useDispatch();
  const userRegister=useSelector((state)=> state.userRegister);
  const {loading,error,userInfo}=userRegister;
  
// working well history
  useEffect(()=>{
      
      if(userInfo){
        //history.push("/mynotes");
        navigate('/mynotes');
      }
    },[navigate,userInfo])

    const submitHandler=async (e)=>{
        e.preventDefault();

        if(password !== confirmpassword ){
              setMessage('password do not match' );
          }else
          {
dispatch(register(name,email,password,pic));
}

        // if(password !== confirmpassword ){
        //     setMessage('password do not match' );
        // }
        // else{
        //     setMessage(null);
        //     try {
        //         const config={
        //             headers:{
        //                 "Content-type":"application/json",
        //             },

        //         };

        //         setLoading(true);
        //         const {data}= await axios.post("/api/users",
        //         {name,pic,email,password},config);
        //         setLoading(false);
        //         localStorage.setItem("userInfo",JSON.stringify(data));
        //     } catch (error) {
        //         setError(error.response.data.message);
        //         setLoading(false);
        //     }
        // }
    }


    const postDetails=(pics)=>{
        if(!pics){
            return setPicMessage('select an image ');
        }
        setPicMessage(null);

        if(pics.type==='image/jpeg' || pics.type==='image/png'){
            const data=new FormData();
            data.append('file',pics)
            data.append('upload_preset','notezipper')
            data.append('cloud_name','debhhiebz')
            fetch('https://api.cloudinary.com/v1_1/debhhiebz/image/upload',{
                method:'post',
                body:data
            }).then((res)=>res.json())
            .then((data)=>{
                console.log(data);
                setPic(data.url.toString());

            })
            .catch((err)=>{
                console.log(err);
            })
        }else{
            return setPicMessage('select an image ');
        }
    }
    return ( 
        <MainScreen title='register'>


<div className="loginContainer">
  {error && <ErrorMessage variant="danger" >{error}</ErrorMessage>}
  {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
  {loading && <Loading />}

    <Form 
    onSubmit={submitHandler}
    > 


    <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              value={name}
              placeholder="Enter name"
             onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

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

      <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmpassword}
              placeholder="Confirm Password"
             onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          {picMessage && (
            <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
          )}
          <Form.Group controlId="pic">
            <Form.Label>Profile Picture</Form.Label>
            <Form.File
              onChange={(e) => postDetails(e.target.files[0])}
              id="custom-file"
              type="image/png"
              label="Upload Profile Picture"
              custom
            />
          </Form.Group>
      
      {/* <Button variant="primary" type="submit">
        Submit
      </Button>

      <Row>
        <Col>
        New customer?<Link to="/register">Register here</Link>
        </Col>
      </Row> */}


<Button variant="primary" type="submit">
            Register
          </Button>
        </Form>

        <Row className="py-3">
          <Col>
            Have an Account ? <Link to="/login">Login</Link>
          </Col>
        </Row>
    

    </div>
        </MainScreen>
     );
}
 
export default RegisterScreen;