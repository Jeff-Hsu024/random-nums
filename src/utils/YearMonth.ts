export class YearMonth {
  private year: number;
  private month: number;

  private constructor(year: number, month: number) {
    this.year = year;
    this.month = month;
  }

  static of(year: number, month: number): YearMonth {
    return new YearMonth(year, month);
  }

  getYear(): number {
    return this.year;
  }

  getMonth(): number {
    return this.month;
  }

  isBefore(other: YearMonth): boolean {
    if (this.year < other.year) {
      return true;
    }
    if (this.year === other.year && this.month < other.month) {
      return true;
    }
    return false;
  }

  isAfter(other: YearMonth): boolean {
    if (this.year > other.year) {
      return true;
    }
    if (this.year === other.year && this.month > other.month) {
      return true;
    }
    return false;
  }

  plusMonths(months: number): YearMonth {
    let newMonth = this.month + months;
    let newYear = this.year;
    while (newMonth > 12) {
      newMonth -= 12;
      newYear++;
    }
    return YearMonth.of(newYear, newMonth);
  }

  toString(): string {
    return `${this.year}-${this.month.toString().padStart(2, '0')}`;
  }
}
