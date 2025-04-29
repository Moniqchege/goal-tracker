import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];

  constructor() { }

  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(task: Task): void {
    this.tasks.push(task);
  }

  toggleTaskCompletion(taskId: string):void{
    const task = this.tasks.find(t => t.id === taskId);
    if(task){
      task.completed = !task.completed;
    }
  }
}
