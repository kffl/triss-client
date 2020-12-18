import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RequestDataService {

  formatDate(date: Date): string {
    return date ?
      `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}` : null;
  }

  formatSelect(value: number): number {
    if (value == null) {
      return null;
    }
    return value;
  }

  formatInput(str: string): string {
    const trimmed = str.trim();
    if (trimmed === '') {
      return null;
    }
    return trimmed;
  }

  getNumberFromInput(str: string): number {
    let num: number;
    if (!str || str.length === 0) {
      return null;
    }
    if (str.includes(',') || str.includes('.')) {
      num = parseFloat(str.replace(',', '.'));
    } else {
      num = parseInt(str, 10);
    }
    if (isNaN(num)) {
      return null;
    }
    return num;
  }

  getNumberLimited(str: string, maxValue: number): string {
    const num = this.getNumberFromInput(str);
    return num == null ? '' : String(num > maxValue ? maxValue : num);
  }
}
