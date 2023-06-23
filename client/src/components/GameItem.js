import React from 'react';
import { Image } from 'react-bootstrap';
import '../index.css'
import { useNavigate } from 'react-router-dom';

function GameItem({ game }) {
    const {
        _id,
        gameName,
        gamePrice,
        gameDescription,
        gameGenre,
        gameImage
    } = game;
    const navigate = useNavigate();
    return (  
        <div  className='game-item-container' onClick={() => navigate("/review-details/" + _id)}>
            <div style={{
                display:"flex",
                flexDirection:"column",
                alignItems:"center",                 
            }}>
                <div style={{ width:"450px", height:"210px" }}>
                    <Image
                        src={gameImage}
                        style={{ width:"100%", height:"100%"}}
                    />
                </div>

                <div style={{ 
                    width:"180px",
                    display:"flex",
                    flexDirection:"column",
                    alignItems:"center"
                }}>
                    <label style={{
                        textAlign:"center",
                        fontSize:"18px",
                        fontWeight:"bold"
                    }}>
                        {gameName}
                    </label>

                    <label style={{
                        textAlign:"center",
                        fontSize:"14px",
                        fontWeight:"bold"
                    }}>
                        {gameGenre}
                    </label>
                    <label style={{
                        textAlign:"center",
                        color:"darkgreen",
                        fontSize:"14px",
                        fontWeight:"bold",
                        
                        
                    }}>
                        {"$ " + gamePrice}
                    </label>
                </div>
            </div>
        </div>
    );
}

export default GameItem;