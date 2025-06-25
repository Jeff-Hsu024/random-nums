import React, { useState, useEffect } from 'react';
import { fetchAllLotteryRecords, type LotteryRecord } from '../services/PowerLottoService';

const PowerLotto = () => {
  const [originalNumbers, setOriginalNumbers] = useState<{ firstArea: number[]; secondArea: number | null }>({ firstArea: [], secondArea: null });
  const [uniqueNumbers, setUniqueNumbers] = useState<{ firstArea: number[]; secondArea: number | null }>({ firstArea: [], secondArea: null });
  const [frequentNumbers, setFrequentNumbers] = useState<{ firstArea: number[]; secondArea: number | null }>({ firstArea: [], secondArea: null });
  const [historicalRecords, setHistoricalRecords] = useState<LotteryRecord[]>([]);
  const [filterRecords, setFilterRecords] = useState<LotteryRecord[]>([]);

  useEffect(() => {
    const getHistoricalRecords = async () => {
      const records = await fetchAllLotteryRecords();
      setHistoricalRecords(records);

      const currentYear = new Date().getFullYear();
      const filterRecords = records.filter(record => {
        const recordYear = new Date(record.lotteryDate).getFullYear();
        return currentYear === recordYear
      })
      setFilterRecords(filterRecords)
    };

    getHistoricalRecords();
  }, []);

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
      secondArea: secondAreaNumber as number | null,
    };
  };

  const handleGenerate = () => {
    setOriginalNumbers(generateLottoNumbers());
  };

  const generateUniqueNumbers = () => {
    let newNumbers = generateLottoNumbers();
    while (historicalRecords.some(record =>
      record.numbers.every((num, index) => num === newNumbers.firstArea[index])
    )) {
      newNumbers = generateLottoNumbers();
    }
    return newNumbers;
  };

  const getMostFrequentSpecialNumber = () => {
    const counts: { [key: number]: number } = {};
    filterRecords.forEach(record => {
      const specialNumber = record.specialNumber;
      counts[specialNumber] = (counts[specialNumber] || 0) + 1;
    });

    let mostFrequentNumber: number | null = null;
    let maxCount = 0;

    for (const number in counts) {
      if (counts[number] > maxCount) {
        mostFrequentNumber = parseInt(number);
        maxCount = counts[number];
      }
    }

    return mostFrequentNumber;
  };

  const handleGenerateUnique = () => {
    setUniqueNumbers(generateUniqueNumbers());
  };

  const handleGenerateFrequent = () => {
    const frequentNumber = getMostFrequentSpecialNumber();
    setFrequentNumbers({
      firstArea: generateUniqueNumbers().firstArea,
      secondArea: frequentNumber,
    });
  };

  return (
    <div>
      <h2>威力彩選號</h2>

      {/* Row 1: Original Random */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ marginRight: '10px' }}>
          第一區: {originalNumbers.firstArea.join(', ')}
        </div>
        <div style={{ marginRight: '10px' }}>
          第二區: {originalNumbers.secondArea}
        </div>
        <button onClick={() => handleGenerate()}>隨機選號</button>
      </div>

      {/* Row 2: Unique Random */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ marginRight: '10px' }}>
          第一區: {uniqueNumbers.firstArea.join(', ')}
        </div>
        <div style={{ marginRight: '10px' }}>
          第二區: {uniqueNumbers.secondArea}
        </div>
        <button onClick={() => handleGenerateUnique()}>第一區隨機 (不與歷史重複)</button>
      </div>

      {/* Row 3: Unique Random + Frequent Special */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ marginRight: '10px' }}>
          第一區: {frequentNumbers.firstArea.join(', ')}
        </div>
        <div style={{ marginRight: '10px' }}>
          第二區: {frequentNumbers.secondArea}
        </div>
        <button onClick={() => handleGenerateFrequent()}>第一區隨機 (不與歷史重複) + 第二區年度熱門號碼</button>
      </div>
    </div>
  );
};

export default PowerLotto;
