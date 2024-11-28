"use client"; // Direciona a execução para o lado do cliente, garantindo que o código será executado no navegador

import "@/styles/globals.css"; // Importa os estilos globais para o aplicativo

import { useEffect, useState } from "react"; // Importa os hooks 'useEffect' e 'useState' do React

const SavedCounter = () => {
  const [count, setCount] = useState<number>(0); // Inicializa o estado 'count' com valor 0, tipo numérico

  // Efeito para carregar o valor salvo no LocalStorage quando o componente for montado
  useEffect(() => {
    // Tenta obter o valor salvo no LocalStorage
    const savedCount = localStorage.getItem("savedCount");
    if (savedCount) {
      // Se o valor existir, converte o valor de string para número e atualiza o estado 'count'
      setCount(parseInt(savedCount));
    }
  }, []); // Array vazio significa que o efeito só será executado uma vez, na montagem do componente

  // Efeito para salvar o valor do contador no LocalStorage sempre que o valor de 'count' mudar
  useEffect(() => {
    // Sempre que 'count' mudar, salva o valor atualizado no LocalStorage
    localStorage.setItem("savedCount", count.toString());
  }, [count]); // O efeito depende de 'count', então será executado sempre que 'count' for alterado

  // Função para resetar o contador
const handleReset = () => {
  setCount(0);
};
 

// Função para incrementar o contador
const handleIncrement = () => {
  if (count >= 10) {
    handleReset(); 
  } else {
    setCount((prev) => prev + 1); // Incrementa o contador
  }
};

  // Função para decrementar o contador
  const handleDecrement = () => {
    if (count <= -10) {
      handleReset();  
    } else {
    setCount((prev) => prev - 1);
  }
};
  
const barWidth = (count + 10) * 5; // A barra começa com 50% quando count é 0


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Contador com Persistência
        </h1>

        <div className="text-center">
          <p className="text-lg mb-2 text-gray-500">Contagem Atual:</p>
          <p
            className={`text-4xl font-bold ${count === 0 ? "text-gray-500" : count <0 ? "text-red-600" : "text-blue-600"}`}
          >
            {count}
          </p>{" "}
        </div>

         {/* Barra de carregamento */}
         <div className="w-full h-6 bg-gray-300 rounded">
          <div
            className="h-full bg-blue-500 rounded"
            style={{
              width: `${barWidth}%`, // Calcula a porcentagem de preenchimento
            }}
          ></div>
        </div>
        
        <div className="flex gap-2 justify-center">
          {/* Botão para decrementar o contador */}
          <button
            onClick={handleDecrement}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            -1
          </button>

          {/* Botão para resetar o contador */}
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            Reset
          </button>

          {/* Botão para incrementar o contador */}
          <button
            onClick={handleIncrement}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            +1
          </button>
        </div>
      </div>
    </div>
  );
};

export default SavedCounter; // Exporta o componente para ser usado em outras partes do app
