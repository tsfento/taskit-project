export class Task {
  constructor(
    public id: number,
    public title: string,
    public details: string,
    public dueDate: string,
    public priority: string,
    public status: string,
    public unformattedDate: string,
    public priorityNumber: number,
    public statusNumber: number,
    ) {
  }
}