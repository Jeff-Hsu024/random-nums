import React from 'react';

const PowerLotto = () => {
  const generateLottoNumbers = () => {
    const firstAreaNumbers: number[] = [];
    while (firstAreaNumbers.length < 6) {
      const randomNumber = Math.floor(Math.random() * 38) + 1;
      if (!firstAreaNumbers.includes(randomNumber)) {
        firstAreaNumbers.push(randomNumber);
      }
    }
    firstAreaNumbers.sort((a, b) => a - b);

    const secondAreaNumber = Math.floor(Math.random() * 8) + 1;

    return {
      firstArea: firstAreaNumbers,
      secondArea: secondAreaNumber,
    };
  };

  const [lottoNumbers, setLottoNumbers] = React.useState(generateLottoNumbers());

  const handleGenerate = () => {
    setLottoNumbers(generateLottoNumbers());
  };

  return (
    <div>
      <h2>威力彩選號</h2>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ marginRight: '10px' }}>
          第一區: {lottoNumbers.firstArea.join(', ')}
        </div>
        <div style={{ marginRight: '10px' }}>
          第二區: {lottoNumbers.secondArea}
        </div>
        <button onClick={handleGenerate}>重新產生</button>
      </div>
    </div>
  );
};

export default PowerLotto;
