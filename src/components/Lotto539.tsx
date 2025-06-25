import React from 'react';

const Lotto539 = () => {
  const generateLottoNumbers = () => {
    const numbers: number[] = [];
    while (numbers.length < 5) {
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
      <h2 className="text-lg font-semibold mb-2">今彩539選號</h2>
      <div className="flex items-center mb-2">
        <div className="mr-2">
          {lottoNumbers.map(num => num < 10 ? '0' + num : num).join(', ')}
        </div>
        <button className="btn" onClick={handleGenerate}>重新產生</button>
      </div>
    </div>
  );
};

export default Lotto539;
