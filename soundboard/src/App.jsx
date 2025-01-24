import React, { useRef } from 'react';

const sounds = [
  { id: 1, label: 'WelcomeToTheMato', src: '/sounds/mato.m4a' },
  { id: 2, label: 'Booyah', src: '/sounds/booyah.mp3' },
  { id: 3, label: 'Cachorro', src: '/sounds/cachorross.mp3' },
  { id: 4, label: 'BençaPai', src: '/sounds/bencapai.mp3' },
  { id: 5, label: 'Dolly', src: '/sounds/dolly.mp3' },
  { id: 6, label: 'Flamengo', src: '/sounds/flamengo.mp3' },
  { id: 7, label: 'Hospital', src: '/sounds/hospital.mp3' },
  { id: 8, label: 'Crente', src: '/sounds/naohaferrolhos.mp3' },
  { id: 9, label: 'Secreto', src: '/sounds/secret.mp3' },
];


const SoundBoard = () => {
  const audioRefs = useRef([]); // Armazena as referências de áudio

  const playSound = (src, index) => {
    stopAllSounds(); // Para todos os sons antes de iniciar outro
    const audio = new Audio(src);
    audioRefs.current[index] = audio;
    audio.play();
  };

  const stopAllSounds = () => {
    // Percorre todas as referências de áudio e pausa as músicas
    audioRefs.current.forEach((audio) => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0; // Reinicia o som
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-dark-gray text-neon-purple">
      <h1 className="text-4xl md:text-6xl font-extrabold mt-10 neon-title text-center border-b-4 border-white pb-4">
        SISTEMAS DISTRIBUÍDOS SOUNDBOARD
      </h1>
      <div className="keyboard-container grid grid-cols-3 gap-6 p-10">
        {sounds.map((sound, index) => (
          <button
            key={sound.id}
            onClick={() => playSound(sound.src, index)}
            className="keyboard-key border-2 border-white text-white"
          >
            {sound.label}
          </button>
        ))}
      </div>
      <div className="mt-8">
        <button
          onClick={stopAllSounds}
          className="stop-button bg-red-600 text-white px-6 py-3 rounded-lg text-lg font-bold hover:bg-red-700 transition"
        >
          Parar
        </button>
      </div>
      <footer className="w-full text-center py-4 bg-footer-dark">
        <p className="text-sm text-footer-neon border-t-2 border-white pt-2">
          © 2025 <span className="font-bold">@jhoandev</span>
        </p>
      </footer>
    </div>
  );
};

export default SoundBoard;

