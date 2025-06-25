import React from 'react';

const Lotto39 = () => {
  const generateLottoNumbers = () => {
    const numbers: number[] = [];
    while (numbers.length < 2) {
      const randomNumber = Math.floor(Math.random() * 39) + 1;
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
      <h2 className="text-lg font-semibold mb-2">39樂合彩選號 (二合)</h2>
      <div className="flex items-center mb-2">
        <div className="mr-2">
          {lottoNumbers.join(', ')}
        </div>
        <button className="btn" onClick={handleGenerate}>重新產生</button>
      </div>
    </div>
  );
};

export default Lotto39;
