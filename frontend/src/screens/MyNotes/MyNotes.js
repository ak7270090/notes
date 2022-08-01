import { useEffect } from "react";
import {  Badge, Button, Card } from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';
import { Link,useNavigate } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
// import notes from '../../data/notes';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNoteAction, listNotes } from "../../actions/notesAction";
import Loading from "../../components/loading";
import ErrorMessage from "../../components/errorMessage";
import ReactMarkdown from "react-markdown";

const MyNotes = ({search}) => {

    const navigate = useNavigate();
const dispatch=useDispatch();
const noteList =useSelector((state)=>state.noteList);
const {notes,loading,error}=noteList;

//bcos sometimes you have created notes successfully and when go to mynotes page it shows nothing therefore
//we createSuccess in useEffect
const noteCreate = useSelector((state) => state.noteCreate);
        const { success:successCreate } = noteCreate;

        const noteUpdate = useSelector((state) => state.noteUpdate);
    const {  success:successUpdate} = noteUpdate;
  
    const noteDelete = useSelector((state) => state.noteDelete);
    const { success:successDelete } = noteDelete;

const userLogin=useSelector((state)=>state.userLogin);
const {userInfo}=userLogin;

    const deleteHandler = (id) => {
        if (window.confirm("are you sure ")) {

            dispatch(deleteNoteAction(id));
        }
        navigate("/mynotes");
    };

// const fetchnotes= async()=>{
//      const {data}=await axios.get('/api/notes');
//     console.log(data);

// };

    useEffect(()=>{
// fetchnotes();

    dispatch(listNotes())
    if(!userInfo){
        navigate('/');
    }
     },[dispatch,userInfo,successCreate,successDelete,successUpdate]);


    return (
        <MainScreen title=
        //'welcome back piyush agg' 
         {userInfo ? `welcome ${userInfo?.name}`:null}
        >
            <Link to="/createnote">
                <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
                    Create new Note
                </Button>
            </Link>
            {/* here we put question mark because in previous we use await but in new one may be the page is gonna render before we get data  */}
           {loading && <Loading />}
           {error && <ErrorMessage variant="danger" >{error}</ErrorMessage>}
            {notes && notes
            .filter((filteredNote) =>{
            return filteredNote.title.toLowerCase().includes(search.toLowerCase())}
           ).reverse()
           .map((note) => (
                <Accordion key={note._id}>
                    <Card style={{ margin: 10 }} key={note._id}>
                        <Card.Header style={{ display: "flex" }}>
                            <span style={{
                                color: "black",
                                textDecoration: "none",
                                flex: 1,
                                cursor: "pointer",
                                alignSelf: "center",
                                fontSize: 18,
                            }}> <Accordion.Toggle
                                as={Card.Text}
                                variant="link"
                                eventKey="0"
                            >{note.title} </Accordion.Toggle>

                            </span>
                               <div>
                            <Button href={`/note/${note._id}`} >edit</Button>
                            <Button variant="danger"
                                className="mx-2"
                                onClick={() => deleteHandler(note._id)}>delete</Button>
                                </div>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <h4>
                                    <Badge variant="success">category - {note.category}</Badge>
                                </h4>
                                <blockquote className="blockquote mb-0">
                                <ReactMarkdown>{note.content}</ReactMarkdown>
                                    <footer className="blockquote-footer">
                                        created on date{note.createdAt.substring(0,10)}
                                    </footer>
                                </blockquote>
                            </Card.Body>
                        </Accordion.Collapse >
                    </Card>
                </Accordion>
               
                ))}


        </MainScreen>

    );
}

export default MyNotes;