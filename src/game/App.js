import React, { useState, useEffect } from "react";
import Game from "./Game";
import { FaPlay, FaMoon, FaSun, FaVolumeUp, FaVolumeMute } from "react-icons/fa"; // Icônes pour le mode sombre, clair et le son
import './styles.css';

// Création de la musique de fond (hors composant pour éviter la réinitialisation)
let backgroundMusic = new Audio("/sounds/background1.mp3");
backgroundMusic.loop = true;
backgroundMusic.volume = 0.03;

// Son pour les boutons
const buttonSound = new Audio("/sounds/button.mp3");

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Récupérer l'état du mode sombre depuis localStorage
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode ? JSON.parse(savedDarkMode) : false; // Par défaut, false (mode clair)
  });
  const [soundEnabled, setSoundEnabled] = useState(true); // État pour activer/désactiver les sons

  // Sauvegarder l'état du mode sombre dans localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // Fonction pour basculer entre le mode clair et sombre
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Fonction pour activer/désactiver les sons
  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    if (!soundEnabled) {
      backgroundMusic.volume = 0.03; // Réactiver le volume
    } else {
      backgroundMusic.volume = 0; // Couper le volume
    }
  };

  // Fonction pour démarrer la musique de fond
  const startMusic = () => {
    if (backgroundMusic.paused) {
      backgroundMusic.play().catch(err => console.log("Autoplay bloqué :", err));
    }
  };

  // Fonction pour arrêter la musique de fond
  const stopMusic = () => {
    if (!backgroundMusic.paused) {
      backgroundMusic.pause();
      backgroundMusic.currentTime = 0; // Réinitialiser la musique
    }
  };

  const handleStart = () => {
    if (soundEnabled) {
      buttonSound.play(); // Joue le son du bouton si le son est activé
    }
    startMusic(); // Démarrer la musique de fond
    setGameStarted(true);
  };

  const handleQuit = () => {
    stopMusic(); // Arrêter la musique de fond
    setGameStarted(false); // Revenir à la page d'accueil
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <div className="controls">
        <button onClick={toggleDarkMode} className="dark-mode-toggle">
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
        <button onClick={toggleSound} className="sound-toggle">
          {soundEnabled ? <FaVolumeUp /> : <FaVolumeMute />}
        </button>
      </div>
      {!gameStarted ? (
        <div className="home">
          <h1>Bienvenue dans le jeu de Cybersécurité</h1>
          <button onClick={handleStart} className="commencer">
            <FaPlay /> Commencer
          </button>
        </div>
      ) : (
        <Game onQuit={handleQuit} darkMode={darkMode} soundEnabled={soundEnabled} /> // Passer soundEnabled à Game
      )}
    </div>
  );
}

export default App;