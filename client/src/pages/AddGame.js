import React, { useState } from 'react';
import Header from '../components/Header';
import './../AddGame.css';
import { Button, Col, Form, Image, Row, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import serverUrl from '../serverUrl';

const baseURL = serverUrl.baseUrl;


const  AddGame = () => {
    const navigate = useNavigate();
    const [ gameImage, setGameImage ] = useState("");
    const [ gameName, setGameName ] = useState("");
    const [ gameGenre, setGameGenre ] = useState("");
    const [ gamePrice, setGamePrice ] = useState("$");
    const [ gameDescription, setGameDescription ] = useState("");
    const [ canIPublish, setCanIPublish ] = useState(true);
console.log("Hi There"+gameImage);

    const publishGame = (event) => {
        event.preventDefault();
        console.log("test");
        if(gamePrice === "$") {
            return;
        }
        
        const game = {
            gameName,
            gamePrice: parseFloat(gamePrice.slice(1, gamePrice.length)),
            gameDescription,
            gameGenre,
            gameImage
        }

        axios.post(baseURL + "/game/createNewGame", { game })
        .then(results => {
            console.log(results.data);
            const { status, message } = results.data;

            if(!status) {
                toast.error(message);
            } else {
                toast.success(message);
                navigate('/dashboard')
            }
        })
        .catch(error => {
            console.error(error);
        })
    }

    return (  
        <div>
            <Header/>
            
            <div style={{
                display:"flex",
                flexDirection:"column",
                alignItems:"center"
            }}>
                <Form onSubmit={publishGame} style={{ width:"1000px" }}>
                    <Row>
                        <Form.Group>
                            <Form.Label style={{ color:'#EE621A' }}>
                                Game name
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="gameName"
                                size='lg'
                                required
                                value={gameName}
                                onChange={(e) => setGameName(e.target.value)}
                            />
                            <Form.Label style={{ color:'#EE621A' }}>
                                Image
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="gameImage"
                                size='lg'
                                required
                                value={gameImage}
                                onChange={(e) => setGameImage(e.target.value)}
                                
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label style={{ color:'#EE621A' }}>
                                Game genre
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="gameGenre"
                                required
                                value={gameGenre}
                                onChange={(e) => setGameGenre(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                        <Form.Label style={{ color:'#EE621A' }}>
                            Game price
                        </Form.Label>
                            <Form.Control
                                type='text'
                                name='gamePrice'
                                required
                                value={gamePrice === "" ? "$" : gamePrice}
                                onChange={(e) => setGamePrice(isNaN(e.target.value.slice(1, e.target.value.length)) ? gamePrice + "" : e.target.value)}
                            />
                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group as={Col}>
                            <Form.Label style={{ color:'#EE621A' }}>
                                Game Description
                            </Form.Label>
                            <Form.Control
                                name="gameDescription"
                                multiple={true}
                                required
                                as="textarea" 
                                rows={3}
                                value={gameDescription}
                                onChange={(e) => setGameDescription(e.target.value)}
                            />
                        </Form.Group>
                    </Row>
                    <Row 
                        style={{ 
                            display:"flex",
                            flexDirection:"column",
                            alignItems:"center",
                            marginTop:"20px"
                        }}>
                        <Button 
                            size='lg'
                            variant='dark'
                            type="submit"
                            style={{ width:"60%", marginBottom:"20px" }}
                            onClick={publishGame}
                            disabled={!canIPublish}
                        >
                            Publish It!
                        </Button>
                    </Row>
                </Form>
            </div>
        </div>
    );
}

export default AddGame;


