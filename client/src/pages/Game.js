import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import ScreenActivityIndicator from "../components/ScreenActivityIndicator";
import { Image } from "react-bootstrap";
import { HiShoppingCart } from 'react-icons/hi';

import { Button, Container, Row, Col } from 'react-bootstrap';


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
                <input
                    type="text"
                    name="gameName"
                    value={updatedGame.gameName || ""}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="gamePrice"
                    value={updatedGame.gamePrice || ""}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="gameDescription"
                    value={updatedGame.gameDescription || ""}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="gameImage"
                    value={updatedGame.gameImage || ""}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="gameGenre"
                    value={updatedGame.gameGenre || ""}
                    onChange={handleInputChange}
                />
                
                <button onClick={handleSaveClick}>Save</button>
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
                            zIndex: 1,
                            objectFit: "fill",
                            width: "550px",
                            height: "550px",
                            borderRadius: "15px",
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
                                display: "flex",
                                flexDirection: "row",
                                backgroundColor: "#4287f5",
                                justifyContent: "space-evenly",
                                alignItems: "center",
                                width: "140px",
                                padding: "10px",
                                borderRadius: "50px",
                                margin: "5px",
                                opacity: isAvailable ? 1 : 0.5,
                                cursor: "pointer"
                            }}
                            onClick={isAvailable && addToCart}
                        >
                            <HiShoppingCart
                                color="#FFFFFF"
                                size={"25px"}
                            />
                            <label style={{
                                color: "#FFFFFF"
                            }}>
                                Add To Cart
                            </label>
                        </div>
                        <Container>
                            <Row>
                                <Col>
                                    <Button variant="info" onClick={handleEditClick} >Edit</Button>
                                </Col>
                                <Col>
                                    <Button variant="danger" onClick={deleteGame}>Delete</Button>
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