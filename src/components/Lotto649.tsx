import React from 'react';

const Lotto649 = () => {
  const generateLottoNumbers = () => {
    const numbers: number[] = [];
    while (numbers.length < 6) {
      const randomNumber = Math.floor(Math.random() * 49) + 1;
      if (!numbers.includes(randomNumber)) {
        numbers.push(randomNumber);
      }
    }
    numbers.sort((a, b) => a - b);
    return numbers;
  };

  const [lottoNumbers, setLottoNumbers] = React.useState(generateLottoNumbers());

  const handleGenerate = () => {
    setLottoNumbers(generateLottoNumbers());
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-2">大樂透選號</h2>
      <div className="flex items-center mb-2">
        <div className="mr-2">
          {lottoNumbers.join(', ')}
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleGenerate}>重新產生</button>
      </div>
    </div>
  );
};

export default Lotto649;
