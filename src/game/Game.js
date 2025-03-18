import React, { useState } from "react";
import Quiz from "./Quiz";
import { FaGamepad } from "react-icons/fa"; // Icône de jeu
import './styles.css';

// Son pour les boutons
const buttonSound = new Audio("/sounds/button.mp3");

function Game({ onQuit, darkMode, soundEnabled }) { // Ajouter soundEnabled comme prop
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    if (soundEnabled) {
      buttonSound.play(); // Joue le son du bouton si le son est nactivé
    }
    setGameStarted(true);
  };

  return (
    <div className="game">
      <h2>Évitez les cybermenaces !</h2>
      {!gameStarted && (
        <button onClick={startGame} className="demarrer">
          <FaGamepad /> Démarrer
        </button>
      )}
      {gameStarted && <Quiz onQuit={onQuit} darkMode={darkMode} soundEnabled={soundEnabled} />} {/* Passer soundEnabled à Quiz */}
    </div>
  );
}

export default Game;