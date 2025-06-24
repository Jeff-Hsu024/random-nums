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
    <div>
      <h2>大樂透選號</h2>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ marginRight: '10px' }}>
          {lottoNumbers.join(', ')}
        </div>
        <button onClick={handleGenerate}>重新產生</button>
      </div>
    </div>
  );
};

export default Lotto649;
