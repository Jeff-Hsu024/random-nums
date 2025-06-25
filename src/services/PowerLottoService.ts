import { YearMonth } from '../utils/YearMonth';

interface SuperLotto638Res {
  lotteryDate: string;
  drawNumberSize: number[];
}

interface Content {
  superLotto638Res: SuperLotto638Res[];
  totalSize: number;
}

interface Result {
  content: Content;
  rtnCode: number;
  rtnMessage: string;
}

export interface LotteryRecord {
  lotteryDate: string;
  numbers: number[];
  specialNumber: number;
}

const convertToLotteryRecord = (superLotto638Res: SuperLotto638Res): LotteryRecord => {
  const drawNumberSize = superLotto638Res.drawNumberSize;
  const numbers = drawNumberSize.slice(0, drawNumberSize.length - 1);
  const specialNumber = drawNumberSize[drawNumberSize.length - 1];

  return {
    lotteryDate: superLotto638Res.lotteryDate,
    numbers: numbers,
    specialNumber: specialNumber,
  };
};

const fetchLottery = async (yearMonth: YearMonth): Promise<Result> => {
  const url = "https://api.taiwanlottery.com/TLCAPIWeB/Lottery/SuperLotto638Result";
  const param = `?period&month=${yearMonth.toString()}&pageNum=1&pageSize=100`;
  const fetchUrl = url + param;

  const response = await fetch(fetchUrl);
  const result: Result = await response.json();
  return result;
};

const buildYearMonths = (begin: YearMonth, end: YearMonth): YearMonth[] => {
  const yearMonths: YearMonth[] = [];

  if (begin.isAfter(end)) {
    return [];
  }

  let yearMonth = begin;
  while (yearMonth.isBefore(end)) {
    yearMonths.push(yearMonth);
    yearMonth = yearMonth.plusMonths(1);
  }
  yearMonths.push(end);

  return yearMonths;
};

export const fetchAllLotteryRecords = async (): Promise<LotteryRecord[]> => {
  const begin = YearMonth.of(2008, 1);
  const end = YearMonth.of(2025, 6);
  const yearMonths = buildYearMonths(begin, end);

  const totalLotteryRecords: LotteryRecord[] = [];

  for (const yearMonth of yearMonths) {
    const result = await fetchLottery(yearMonth);

    const totalSize = result.content.totalSize;
    if (0 === totalSize) {
      console.error(`The ${yearMonth}: no result`);
    }

    const lotteryRecords = result.content.superLotto638Res.map(convertToLotteryRecord);
    totalLotteryRecords.push(...lotteryRecords);
  }

  return totalLotteryRecords;
};