import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../task.model';

export type sortField = 'title' | 'unformattedDate' | 'priorityNumber' | 'statusNumber';
export type sortDir = 'asc' | 'desc';

@Pipe({
  name: 'sortTasks'
})
export class SortTasksPipe implements PipeTransform {
  blankTask: Task = new Task(0, '', '', '', '', '', '', 0, 0);
  collator = new Intl.Collator();

  transform(taskArray: Task[], field: sortField, direction: sortDir): Task[] {
    let sortedTaskArray;

    sortedTaskArray = taskArray.sort((a: Task, b: Task) => {
      if (a.id === 0) { return 1; }
      if (b.id === 0) { return -1; }

      if (direction === 'asc') {
        return this.collator.compare(a[field].toString(), b[field].toString());
      } else if (direction === 'desc') {
        return this.collator.compare(b[field].toString(), a[field].toString());
      }
    });

    return sortedTaskArray;
  }
}