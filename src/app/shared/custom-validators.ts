import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";

export class CustomValidators {
  static invalidDueDate(control: FormControl): {[s: string]: boolean} {
    if (control.value === 'Test') {
      return {'invalidProjectName': true};
    }
    return null;
  }
}