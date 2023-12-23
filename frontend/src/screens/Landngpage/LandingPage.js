import { Button, Container, Row } from "react-bootstrap";
import './LandingPage.css';

const LandingPage = () => {
    return (


        // useEffect(()=>{
        //   const userInfo=localStorage.getItem("userInfo");
        //   if(userInfo){
        //     //history.push("/mynotes");
        //     navigate('/mynotes');
        //   }
        // },[navigate])

        <div className="main">
            <Container>
                <Row>
                    <div className="intro-text">
                        <div>
                            <h1 className="title">Welcome to Notes Saver</h1>
                            <p className="subtitle">One Safe place for all your notes.</p>
                        </div>
                    </div>

                    <div className="buttonContainer">
                        <div><a href='/login'>
                            <Button size="lg" className="landingbutton">
                                Login
                            </Button>
                        </a>
                        </div>
                        <div>
                            <a href='/register'>
                                <Button
                                    variant="outline-primary"
                                    size="lg"
                                    className="landingbutton"
                                >
                                    Signup
                                </Button>
                            </a>
                        </div>
                    </div>

                </Row>
            </Container>

        </div>
    );
};

export default LandingPage;