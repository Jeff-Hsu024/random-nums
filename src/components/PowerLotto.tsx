import React, { useState, useEffect } from 'react';
import { fetchAllLotteryRecords, type LotteryRecord } from '../services/PowerLottoService';
import Loading from './Loading';

const PowerLotto = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [originalNumbers, setOriginalNumbers] = useState<{ firstArea: number[]; secondArea: number | null }>({ firstArea: [], secondArea: null });
  const [uniqueNumbers, setUniqueNumbers] = useState<{ firstArea: number[]; secondArea: number | null }>({ firstArea: [], secondArea: null });
  const [frequentNumbers, setFrequentNumbers] = useState<{ firstArea: number[]; secondArea: number | null }>({ firstArea: [], secondArea: null });
  const [historicalRecords, setHistoricalRecords] = useState<LotteryRecord[]>([]);
  const [filterRecords, setFilterRecords] = useState<LotteryRecord[]>([]);

  useEffect(() => {
    const getHistoricalRecords = async () => {
      setIsLoading(true);
      const records = await fetchAllLotteryRecords();
      setHistoricalRecords(records);

      const currentYear = new Date().getFullYear();
      const filterRecords = records.filter(record => {
        const recordYear = new Date(record.lotteryDate).getFullYear();
        return currentYear === recordYear
      })
      setFilterRecords(filterRecords)

      setIsLoading(false);

      handleGenerate()
      handleGenerateUnique()
      handleGenerateFrequent()
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
    <div className="bg-white rounded-lg shadow-md p-4 relative">
      <h2 className="text-lg font-semibold mb-2">威力彩選號</h2>
      {!isLoading && (
        <>
          {/* Row 1: Original Random */}
          <div className="flex items-center mb-2">
            <div className="mr-2">
              第一區: {originalNumbers.firstArea.join(', ')} 第二區: {originalNumbers.secondArea}
            </div>
            <button className='btn' onClick={() => handleGenerate()}>隨機選號</button>
          </div>

          {/* Row 2: Unique Random */}
          <div className="flex items-center mb-2">
            <div className="mr-2">
              第一區: {uniqueNumbers.firstArea.join(', ')} 第二區: {uniqueNumbers.secondArea}
            </div>
            <button className='btn' onClick={() => handleGenerateUnique()}>第一區隨機 (不與歷史重複)</button>
          </div>

          {/* Row 3: Unique Random + Frequent Special */}
          <div className="flex items-center mb-2">
            <div className="mr-2">
              第一區: {frequentNumbers.firstArea.join(', ')} 第二區: {frequentNumbers.secondArea}
            </div>
            <button className='btn' onClick={() => handleGenerateFrequent()}>第一區隨機 (不與歷史重複) + 第二區年度熱門號碼</button>
          </div>
        </>
      )}

      {isLoading && (
        <Loading text="載入歷史資料..." />
      )}
    </div>
  );
};

export default PowerLotto;
