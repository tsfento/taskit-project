import { FormControl } from "@angular/forms";

export class CustomValidators {
  static invalidDueDate(control: FormControl): {[s: string]: boolean} {
    let collator = new Intl.Collator();
    const todaysDate: Date = new Date();
    const year: string = todaysDate.getFullYear().toString();
    let month: string = String(todaysDate.getMonth() + 1);
    let day: string = todaysDate.getDate().toString();

    if (Number(month) < 10) {
      month = '0' + month;
    }

    if (Number(day) < 10) {
      day = '0' + day;
    }

    const formattedDate = `${year}-${month}-${day}`;

    if (collator.compare(control.value, formattedDate) === -1) {
      return {'invalidDueDate': true};
    } else {
      return null;
    }
  }
}