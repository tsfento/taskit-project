import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../task.model';

export type sortField = 'title' | 'unformattedDate' | 'priorityNumber' | 'statusNumber';
export type sortDir = 'forward' | 'reverse';

@Pipe({
  name: 'sortTasks',
  pure: false
})
export class SortTasksPipe implements PipeTransform {
  blankTask: Task = new Task(0, '', '', '', '', '', '', 0, 0);

  transform(taskArray: Task[], field: sortField, direction: sortDir): Task[] {
    let sortedTaskArray;

    if (direction === 'forward') {
      sortedTaskArray =  taskArray.sort((a: Task, b: Task) => {
        if (a.id === 0) {
          return 1;
        } else if (a[field].toString().toLowerCase() < b[field].toString().toLowerCase()) {
          return -1;
        } else if (a[field].toString().toLowerCase() > b[field].toString().toLowerCase()) {
          return 1;
        } else {
          return 0;
        }
      });
    } else if (direction === 'reverse') {
      sortedTaskArray =  taskArray.sort((a: Task, b: Task) => {
        if (a.id === 0) {
          return 1;
        } else if (a[field].toString().toLowerCase() < b[field].toString().toLowerCase()) {
          return 1;
        } else if (a[field].toString().toLowerCase() > b[field].toString().toLowerCase()) {
          return -1;
        } else {
          return 0;
        }
      });
    }

    console.log(sortedTaskArray);
    return sortedTaskArray;
  }
}