import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [questions, setQuestions] = useState([]);  // Armazena as perguntas
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);  // Índice da pergunta atual
  const [userAnswer, setUserAnswer] = useState('');  // Resposta do usuário
  const [score, setScore] = useState(0);  // Pontuação
  const [gameOver, setGameOver] = useState(false);  // Fim de jogo
  const [loading, setLoading] = useState(true);  // Status de carregamento
  const [feedback, setFeedback] = useState('');  // Feedback de acerto ou erro
  const [feedbackClass, setFeedbackClass] = useState('');  // Classe para estilizar o feedback
  const [animateQuestion, setAnimateQuestion] = useState(false);  // Estado para animação de transição de pergunta

  // Função para buscar as perguntas da API
  const fetchQuestions = async () => {
    try {
      const response = await axios.get('https://opentdb.com/api.php', {
        params: {
          amount: 5,  // Número de perguntas
          type: 'multiple',  // Perguntas de múltipla escolha
          difficulty: 'easy',  // Dificuldade das perguntas
        },
      });
      setQuestions(response.data.results);  // Armazenar as perguntas na variável de estado
      setLoading(false);  // Mudar status de carregamento
    } catch (error) {
      console.error('Erro ao carregar perguntas:', error);
    }
  };

  // Função para verificar a resposta do usuário
  const handleAnswer = (answer) => {
    const correctAnswer = questions[currentQuestionIndex].correct_answer;

    if (answer === correctAnswer) {
      setScore(score + 1);  // Incrementa a pontuação se a resposta estiver correta
      setFeedback('Você acertou!');
      setFeedbackClass('success');
    } else {
      setFeedback(`Você errou! A resposta correta era: ${correctAnswer}`);
      setFeedbackClass('error');
    }

    setUserAnswer(answer);  // Define a resposta do usuário para permitir o feedback visual

    setAnimateQuestion(true);  // Inicia animação de transição de pergunta

    setTimeout(() => {
      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);  // Avança para a próxima pergunta
        setFeedback('');  // Limpa o feedback
      } else {
        setGameOver(true);  // Se não houver mais perguntas, o jogo acabou
      }
      setAnimateQuestion(false);  // Finaliza animação de transição
    }, 3000);  // Espera 3 segundos antes de passar para a próxima pergunta ou fim do jogo
  };

  // Carregar as perguntas assim que o componente for montado
  useEffect(() => {
    fetchQuestions();
  }, []);

  // Se estiver carregando, exibe "Carregando..."
  if (loading) {
    return <div className="App">Carregando perguntas...</div>;
  }

  return (
    <div className="App">
      <h1 className="title">Jogo de Trivia</h1>

      {/* Se o jogo acabou, exibe a pontuação final */}
      {gameOver ? (
        <div className="game-over">
          <h2>Fim de Jogo!</h2>
          <p>
            Você acertou {score} de {questions.length} perguntas.
          </p>
          <button onClick={() => window.location.reload()}>Jogar novamente</button>
        </div>
      ) : (
        <div className={`question-container ${animateQuestion ? 'animate' : ''}`}>
          {/* Exibe a pergunta */}
          <h2>{decodeHtml(questions[currentQuestionIndex].question)}</h2>

          {/* Feedback de acerto ou erro */}
          {feedback && <div className={`feedback ${feedbackClass}`}>{feedback}</div>}

          {/* Exibe as alternativas de resposta */}
          {questions[currentQuestionIndex].incorrect_answers
            .concat(questions[currentQuestionIndex].correct_answer)
            .sort()
            .map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(answer)}
                className={userAnswer === answer ? 'selected' : ''}
              >
                {decodeHtml(answer)}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}

// Função para decodificar HTML (ex: para tratar caracteres especiais nas perguntas e respostas)
function decodeHtml(html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

export default App;
