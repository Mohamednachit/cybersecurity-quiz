import React, { useState } from "react";
import { FaTrophy, FaShieldAlt, FaExclamationTriangle, FaRedo, FaInfoCircle } from "react-icons/fa";
import './styles.css';

// Import des sons
const successSound = new Audio("/sounds/success.mp3");
const errorSound = new Audio("/sounds/error.mp3");
const adviceSound = new Audio("/sounds/advice.mp3");
const restartSound = new Audio("/sounds/button.mp3");

const questions = [
  {
    question: "Quel est un bon mot de passe sécurisé ?",
    options: ["123456", "Password", "Gk!9v#pLx"],
    answer: "Gk!9v#pLx",
    advice: "Utilisez des mots de passe longs, complexes et uniques pour chaque compte. Évitez les informations personnelles comme votre date de naissance.",
  },
  {
    question: "Que faire si vous recevez un email suspect ?",
    options: ["Cliquer sur le lien", "Signaler le phishing", "Ne rien faire"],
    answer: "Signaler le phishing",
    advice: "Ne cliquez jamais sur des liens suspects et vérifiez l’expéditeur avant d’ouvrir un email. Signalez les emails suspects à un adulte ou à votre école.",
  },
  {
    question: "Quelle est la meilleure méthode pour gérer vos mots de passe ?",
    options: [ "Utiliser un gestionnaire de mots de passe", "Les écrire sur un papier", "Utiliser le même mot de passe partout"],
    answer: "Utiliser un gestionnaire de mots de passe",
    advice: "Un gestionnaire de mots de passe vous permet de créer et de stocker des mots de passe complexes et sécurisés sans avoir à les mémoriser.",
  },
  {
    question: "Que signifie le HTTPS dans l'URL d'un site web ?",
    options: ["Hyper Text Transfer Protocol Simple", "Hyper Transfer Protocol Secure", "Hyper Text Transfer Protocol Secure"],
    answer: "Hyper Text Transfer Protocol Secure",
    advice: "Le HTTPS garantit que la connexion entre votre navigateur et le site est sécurisée. Vérifiez toujours que l'URL commence par 'https://' avant de saisir des informations personnelles.",
  },
  {
    question: "Que faire si vous pensez que votre compte en ligne a été piraté ?",
    options: ["Ignorer", "Changer immédiatement le mot de passe", "Continuer à l'utiliser comme avant"],
    answer: "Changer immédiatement le mot de passe",
    advice: "Il est essentiel de changer votre mot de passe et d’activer la vérification en deux étapes pour protéger votre compte.",
  },
  {
    question: "Quelle est la fonction d'un antivirus ?",
    options: ["Protéger votre appareil contre les malwares", "Bloquer les publicités",  "Augmenter la vitesse de votre appareil"],
    answer: "Protéger votre appareil contre les malwares",
    advice: "Un antivirus vous aide à détecter et à supprimer les virus et autres logiciels malveillants. Assurez-vous de toujours en avoir un installé.",
  },
  {
    question: "Pourquoi est-il important de mettre à jour régulièrement ses logiciels ?",
    options: ["Pour avoir les dernières fonctionnalités", "Pour améliorer les performances", "Pour corriger les vulnérabilités de sécurité"],
    answer: "Pour corriger les vulnérabilités de sécurité",
    advice: "Les mises à jour corrigent les failles de sécurité qui peuvent être exploitées par des cybercriminels. Ne retardez jamais les mises à jour.",
  },
  {
    question: "Qu'est-ce que le phishing ?",
    options: ["Un type de virus", "Une tentative de vol de données personnelles via un email frauduleux", "Un outil de cybersécurité"],
    answer: "Une tentative de vol de données personnelles via un email frauduleux",
    advice: "Le phishing utilise des emails ou des messages trompeurs pour obtenir vos informations personnelles. Méfiez-vous des messages non sollicités.",
  },
  {
    question: "Que faire si vous êtes victime de cyberharcèlement ?",
    options: ["Signaler à la plateforme et aux autorités", "Ignorer les messages", "Répondre à l'harceleur"],
    answer: "Signaler à la plateforme et aux autorités",
    advice: "Le cyberharcèlement doit être pris au sérieux. Parlez-en à un adulte de confiance et signalez-le aux autorités compétentes.",
  },
  {
    question: "Que signifie l'authentification à deux facteurs (2FA) ?",
    options: ["Une vérification de votre mot de passe", "Un système de cryptage de vos fichiers", "Une méthode de sécurisation supplémentaire pour votre compte"],
    answer: "Une méthode de sécurisation supplémentaire pour votre compte",
    advice: "L'authentification à deux facteurs ajoute une couche de sécurité en demandant une deuxième vérification, comme un code envoyé par SMS.",
  },
  {
    question: "Pourquoi devez-vous vous méfier des réseaux Wi-Fi publics ?",
    options: ["Parce qu'ils sont trop lents", "Parce qu'ils peuvent être utilisés pour voler vos données", "Parce qu'ils offrent trop de sécurité"],
    answer: "Parce qu'ils peuvent être utilisés pour voler vos données",
    advice: "Les réseaux Wi-Fi publics sont souvent non sécurisés. Évitez d’y accéder à des informations sensibles comme vos comptes bancaires.",
  },
  {
    question: "Que faire si vous recevez un message étrange sur les réseaux sociaux ?",
    options: ["Ignorer et bloquer l'expéditeur", "Répondre immédiatement", "Partager le message avec vos amis"],
    answer: "Ignorer et bloquer l'expéditeur",
    advice: "Ne répondez jamais à des messages suspects. Bloquez l'expéditeur et signalez-le à la plateforme.",
  },
  {
    question: "Pourquoi ne devriez-vous pas partager votre localisation en temps réel sur les réseaux sociaux ?",
    options: ["Cela ralentit votre téléphone", "Cela consomme trop de batterie", "Cela peut exposer votre sécurité"],
    answer: "Cela peut exposer votre sécurité",
    advice: "Partager votre localisation en temps réel peut permettre à des inconnus de savoir où vous êtes. Limitez cette fonctionnalité à vos proches.",
  },
  {
    question: "Que faire si vous trouvez un USB inconnu ?",
    options: ["Le brancher pour voir ce qu'il contient", "Le donner à un adulte ou à un expert en sécurité", "Le jeter à la poubelle"],
    answer: "Le donner à un adulte ou à un expert en sécurité",
    advice: "Ne branchez jamais un USB inconnu à votre ordinateur. Il pourrait contenir des logiciels malveillants.",
  },
  {
    question: "Que faire si vous voyez une publication inappropriée sur les réseaux sociaux ?",
    options: ["La signaler à la plateforme", "La partager avec vos amis", "Ne rien faire"],
    answer: "La signaler à la plateforme",
    advice: "Signalez tout contenu inapproprié ou dangereux aux modérateurs de la plateforme pour protéger les autres utilisateurs.",
  },
];

function Quiz({ onQuit, darkMode, soundEnabled }) { // Ajouter soundEnabled comme prop
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showAdvice, setShowAdvice] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const playSound = (sound) => {
    if (soundEnabled) {
      sound.currentTime = 0;
      sound.play();
    }
  };

  const handleAnswer = (option) => {
    setSelectedAnswer(option); // Enregistrer la réponse sélectionnée

    // Jouer le son de réussite ou d'erreur
    if (option === questions[index].answer) {
      playSound(successSound); // Son de réussite
    } else {
      playSound(errorSound); // Son d'erreur
    }
  };

  const handleNext = () => {
    playSound(restartSound); // Jouer le son "button-click"

    // Enregistrer la réponse de l'utilisateur
    setUserAnswers([...userAnswers, selectedAnswer]);

    // Mettre à jour le score si la réponse est correcte
    if (selectedAnswer === questions[index].answer) {
      setScore(score + 1);
    }

    // Passer à la question suivante
    if (index + 1 < questions.length) {
      setIndex(index + 1);
      setSelectedAnswer(null); // Réinitialiser la réponse sélectionnée
      setShowAdvice(false);
    } else {
      setShowResult(true);
    }
  };

  const restartGame = () => {
    playSound(restartSound);
    setIndex(0);
    setScore(0);
    setShowResult(false);
    setShowAdvice(false);
    setUserAnswers([]); // Réinitialiser les réponses de l'utilisateur
    setSelectedAnswer(null); // Réinitialiser la réponse sélectionnée
  };

  return (
    <div className={`quiz ${darkMode ? 'dark-mode' : ''}`}>
      {showResult ? (
        <div className="result">
          <h3>
            <FaTrophy /> Bravo ! Votre score : {score} / {questions.length}
          </h3>
          {score >= 10 ? (
            <p>
              <FaShieldAlt /> Excellent niveau de cybersécurité !
            </p>
          ) : (
            <p>
              <FaExclamationTriangle /> Continuez à apprendre !
            </p>
          )}

          <button onClick={restartGame}>
            <FaRedo /> Rejouer
          </button>
          <button onClick={onQuit} className="quit-btn" style={{ marginTop: "10px" }}> {/* Bouton Quitter */}
            Quitter
          </button>
        </div>
      ) : (
        <div className="question">
          <h3>{questions[index].question}</h3>
          {questions[index].options.map((option, i) => {
            // Déterminer la classe CSS en fonction de la réponse sélectionnée
            let buttonClass = "";
            if (selectedAnswer !== null) {
              if (option === selectedAnswer) {
                buttonClass = option === questions[index].answer ? "correct" : "incorrect";
              }
            } else if (option === selectedAnswer) {
              buttonClass = "selected"; // Réponse sélectionnée (avant validation)
            }

            return (
              <button
                key={i}
                onClick={() => handleAnswer(option)}
                disabled={selectedAnswer !== null} // Désactiver les boutons après sélection
                className={buttonClass} // Appliquer la classe CSS
              >
                {option}
                {selectedAnswer !== null && option === selectedAnswer && (
                  <>
                    {option === questions[index].answer && <span> ✅</span>}
                    {option !== questions[index].answer && <span> ❌</span>}
                  </>
                )}
              </button>
            );
          })}
          <button
            className="suivant"
            onClick={handleNext}
            disabled={selectedAnswer === null} // Désactiver si aucune réponse n'est sélectionnée
          >
            Suivant
          </button>
          <button className="advice-btn" onClick={() => { 
            playSound(adviceSound); 
            setShowAdvice(!showAdvice); 
          }}>
            <FaInfoCircle /> Demander conseil
          </button>
          {showAdvice && <p className="advice">{questions[index].advice}</p>}
          <p>Question {index + 1} / {questions.length}</p>
        </div>
      )}
    </div>
  );
}

export default Quiz;