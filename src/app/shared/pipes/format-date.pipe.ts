import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  transform(date: string): string {
    const dateFormat: string[] = date.split('-');

    const month: string[] = [
      'Jan', 'Feb', 'Mar', 'Apr',
      'Jun', 'May', 'Jul', 'Aug',
      'Sep', 'Oct', 'Nov', 'Dec'
    ];

    if (Number(dateFormat[2]) < 10) {
      const removeZero: string[] = dateFormat[2].split('');
      dateFormat[2] = removeZero[1];
    }

    function addOrdinal(day: string) {
      if (Number(day) >= 11 && Number(day) <= 13) {
        return day + 'th';
      }

      switch(Number(day) % 10) {
        case 1: return day + 'st';
        case 2: return day + 'nd';
        case 3: return day + 'rd';
        default: return day + 'th';
      }
    }

    return `${month[Number(dateFormat[1]) - 1]} ${addOrdinal(dateFormat[2])}, ${dateFormat[0]}`;
  }

}
