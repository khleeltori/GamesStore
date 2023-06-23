import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import ScreenActivityIndicator from "../components/ScreenActivityIndicator";
import { Image } from "react-bootstrap";
import { HiShoppingCart } from 'react-icons/hi';

import { Button, Container, Row, Col, Form } from 'react-bootstrap';


import '../index.css';
import serverUrl from "../serverUrl";
import { useDispatch } from "react-redux";
import { getUserCartDispatch } from "../store/actions";
const baseURL = serverUrl.baseUrl;

const Game = props => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { gameId } = useParams();
    const [game, setGame] = useState(null);
    const [updatedGame, setUpdatedGame] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const isAvailable = game?.isAvailable;
    const gamePrice = game?.gamePrice;
    const gameDescription = game?.gameDescription;
    const gameGenre = game?.gameGenre


    const addToCart = () => {
        axios.put(baseURL + "/account/addToCart", { gameId }, { headers: { 'authorization': 'Bearer ' + JSON.parse(localStorage.getItem("token")) } })
            .then(results => {
                try {
                    dispatch(getUserCartDispatch(results.data.cart));
                } catch (error) {
                    console.error(error);
                }
            })
            .catch(error => {
                console.error(error.message);
            })
    }
    const deleteGame = () => {
        axios
            .delete(`${serverUrl.baseUrl}/game/deleteGame/${gameId}`, {
                headers: {
                    authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
                },
            })
            .then((response) => {
                console.log(response.data.message);
                navigate("/");
            })
            .catch((error) => {
                console.error(error.message);
            });
    };
    const handleInputChange = (e) => {
        setUpdatedGame({
            ...updatedGame,
            [e.target.name]: e.target.value,
        });
    };

    const handleEditClick = () => {
        setIsEditing(true);
        setUpdatedGame(game);
    };

    const handleSaveClick = () => {
        axios
            .put(`${serverUrl.baseUrl}/game/editGame`, {
                game: {
                    gameId: game._id,
                    gameName: updatedGame.gameName,
                    gamePrice: updatedGame.gamePrice,
                    gameDescription: updatedGame.gameDescription,
                    gameImage: updatedGame.gameImage,
                    gameGenre: updatedGame.gameGenre,
                },
            })
            .then((response) => {
                console.log(response.data.message);
                setGame(response.data.game);
                navigate("/");
                setIsEditing(false);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    useEffect(() => {
        axios.get(baseURL + "/game/getGameById/" + gameId)
            .then(results => {
                setGame(results.data.game);
            })
            .catch(error => {
                console.error(error.message)
            })
    }, [gameId])

    if (!game) {
        return <ScreenActivityIndicator />
    }

    return (
        <div>
            {isEditing ? (
                <>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginTop: '40px',

                    }}>
                        <Form style={{ width: "1000px" }}>
                            <Row>
                                <Form.Group>
                                    <Form.Label style={{ color: '#EE621A' }}>
                                        Game name
                                    </Form.Label>
                                    <Form.Control
                                        style={{ marginBottom: '40px' }}
                                        type="text"
                                        name="gameName"
                                        size='lg'
                                        required
                                        value={updatedGame.gameName || ""}
                                        onChange={handleInputChange}
                                    />
                                    <Form.Label style={{ color: '#EE621A' }}>
                                        Image
                                    </Form.Label>
                                    <Form.Control
                                        style={{ marginBottom: '40px' }}

                                        type="text"
                                        name="gameImage"
                                        size='lg'
                                        required
                                        value={updatedGame.gameImage || ""}
                                        onChange={handleInputChange}

                                    />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label style={{ color: '#EE621A' }}>
                                        Game genre
                                    </Form.Label>
                                    <Form.Control
                                        style={{ marginBottom: '40px' }}

                                        type="text"
                                        name="gameGenre"
                                        required
                                        value={updatedGame.gameGenre || ""}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label style={{ color: '#EE621A' }}>
                                        Game price
                                    </Form.Label>
                                    <Form.Control
                                        style={{ marginBottom: '40px' }}
                                        type='text'
                                        name='gamePrice'
                                        required
                                        value={updatedGame.gamePrice || ""}
                                        onChange={handleInputChange} />
                                </Form.Group>
                            </Row>

                            <Row>
                                <Form.Group as={Col}>
                                    <Form.Label style={{ color: '#EE621A' }}>
                                        Game Description
                                    </Form.Label>
                                    <Form.Control
                                        style={{ marginBottom: '40px' }}
                                        name="gameDescription"
                                        multiple={true}
                                        required
                                        as="textarea"
                                        rows={3}
                                        value={updatedGame.gameDescription || ""}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </Row>
                            <Row
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    marginTop: "20px"
                                }}>
                                <button onClick={handleSaveClick}>Save</button>
                            </Row>
                        </Form>
                    </div>
                </>
            ) : (
                <>
                    <Header />
                    <div style={{
                        display: "grid",
                    }}>
                        <h1 style={{
                            margin: "0 auto",
                            color: "#EE621A",
                            marginTop: "20px",
                            marginBottom: "20px"
                        }}>
                            {game?.gameName}
                        </h1>
                        <Image
                            src={game?.gameImage}
                            style={{
                                width: "550px",
                                height: "550px",
                                marginLeft: '660px',

                            }}
                        />
                    </div>
                    <div style={{ border: "1px solid #bfbfbd", margin: "25px" }} />
                    <div style={{
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}>
                        <div style={{
                            position: "absolute",
                            top: 10,
                            right: 20,
                            display: "flex",
                            flexDirection: "row"
                        }}>
                            <div
                                style={{
                                    marginTop: -8,
                                    display: "flex",
                                    backgroundColor: "#4287f5",
                                    justifyContent: "space-evenly",
                                    cursor: 'pointer',
                                    alignItems: "center",
                                    width: "140px",
                                    padding: "10px",
                                    borderRadius: "50px",
                                }}
                                onClick={isAvailable && addToCart}
                            >
                                <HiShoppingCart
                                    color="#FFFFFF"
                                    size={"45px"}
                                />
                                <label style={{
                                    color: "#FFFFFF",
                                    width: '200px',
                                }}>
                                    Add To Cart
                                </label>
                            </div>
                            <Container>
                                <Row>
                                    <Col>
                                        <Button style={{ borderStyle: 'none', height: '50px', width: '70px' }} onClick={handleEditClick} >Edit</Button>
                                    </Col>
                                    <Col>
                                        <Button style={{ backgroundColor: 'red', borderStyle: 'none', height: '50px', width: '70px' }} onClick={deleteGame}>Delete</Button>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                        <h2 style={{
                            fontStyle: "italic",
                            marginTop: "80px"
                        }}>
                            ${gamePrice}
                        </h2>
                        <label style={{
                            fontSize: "30px",
                            textAlign: "center",
                            marginTop: "10px",
                            padding: "20px",
                            width: "80%"
                        }}>
                            {gameDescription}
                        </label>
                    </div>
                </>
            )

            }
        </div>
    )
}

export default Game;