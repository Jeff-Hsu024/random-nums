import React, { useState, useEffect } from 'react';
import { fetchAllLotteryRecords, type LotteryRecord } from '../services/PowerLottoService';
import Loading from './Loading';

const PowerLotto = () => {
  const [isLoadingOriginal, setIsLoadingOriginal] = useState(false);
  const [isLoadingUnique, setIsLoadingUnique] = useState(true);
  const [isLoadingFrequent, setIsLoadingFrequent] = useState(true);

  const [uniqueNumbers, setUniqueNumbers] = useState<{ firstArea: number[]; secondArea: number | null }>({ firstArea: [], secondArea: null });
  const [frequentNumbers, setFrequentNumbers] = useState<{ firstArea: number[]; secondArea: number | null }>({ firstArea: [], secondArea: null });
  const [historicalRecords, setHistoricalRecords] = useState<LotteryRecord[]>([]);
  const [filterRecords, setFilterRecords] = useState<LotteryRecord[]>([]);

  useEffect(() => {
    const getHistoricalRecords = async () => {
      setIsLoadingUnique(true);
      setIsLoadingFrequent(true);
      const records = await fetchAllLotteryRecords();
      setHistoricalRecords(records);

      const currentYear = new Date().getFullYear();
      const filterRecords = records.filter(record => {
        const recordYear = new Date(record.lotteryDate).getFullYear();
        return currentYear === recordYear
      })
      setFilterRecords(filterRecords)

      setIsLoadingUnique(false);
      setIsLoadingFrequent(false);

      handleGenerateUnique();
      handleGenerateFrequent();
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

  const [originalNumbers, setOriginalNumbers] = useState<{ firstArea: number[]; secondArea: number | null }>(generateLottoNumbers());

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
    if (!filterRecords || !filterRecords.length) {
      const currentYear = new Date().getFullYear();
      const filterRecords = historicalRecords.filter(record => {
        const recordYear = new Date(record.lotteryDate).getFullYear();
        return currentYear === recordYear
      })
      setFilterRecords(filterRecords)
    }

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

      {/* Row 1: Original Random */}
      <div className="flex items-center mb-2">
        <div className="mr-2">
          第一區: {originalNumbers.firstArea.map(num => num < 10 ? '0' + num : num).join(', ')} 第二區: {originalNumbers.secondArea != null ? (originalNumbers.secondArea < 10 ? '0' + originalNumbers.secondArea : originalNumbers.secondArea) : null}
        </div>
        <button className='btn' onClick={() => handleGenerate()}>隨機選號</button>
      </div>

      {/* Row 2: Unique Random */}
      <div className="flex items-center mb-2">
        {!isLoadingUnique &&
          <div className="mr-2">
            第一區: {uniqueNumbers.firstArea.map(num => num < 10 ? '0' + num : num).join(', ')} 第二區: {uniqueNumbers.secondArea != null ? (uniqueNumbers.secondArea < 10 ? '0' + uniqueNumbers.secondArea : uniqueNumbers.secondArea) : null}
          </div>
        }
        <button className='btn' onClick={() => handleGenerateUnique()} disabled={isLoadingUnique}>第一區隨機 (不與歷史重複)</button>
        {isLoadingUnique && <Loading text="載入歷史資料..." />}
      </div>

      {/* Row 3: Unique Random + Frequent Special */}
      <div className="flex items-center mb-2">
        {!isLoadingFrequent &&
          <div className="mr-2">
            第一區: {frequentNumbers.firstArea.map(num => num < 10 ? '0' + num : num).join(', ')} 第二區: {frequentNumbers.secondArea != null ? (frequentNumbers.secondArea < 10 ? '0' + frequentNumbers.secondArea : frequentNumbers.secondArea) : null}
          </div>

        }
        <button className='btn' onClick={() => handleGenerateFrequent()} disabled={isLoadingFrequent}>第一區隨機 (不與歷史重複) + 第二區年度熱門號碼</button>
        {isLoadingFrequent && <Loading text="載入歷史資料..." />}
      </div>
    </div>
  );
};

export default PowerLotto;
