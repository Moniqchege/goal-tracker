import { Component } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { v4 as uuidv4 } from 'uuid';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-task-list',
  imports: [FormsModule, CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {
  tasks: Task[] = [];
  newTask: Partial<Task> = {
    frequency: 'daily',
  };

  constructor(private taskService: TaskService) {
    this.tasks = this.taskService.getTasks();
  }

  getTasksByFrequency(frequency: string): Task[] {
    return this.tasks.filter((task) => task.frequency === frequency);
  }

  createTask() {
    if (!this.newTask.title || !this.newTask.frequency) return;

    const task: Task = {
      id: uuidv4(),
      title: this.newTask.title,
      frequency: this.newTask.frequency as 'daily' | 'weekly' | 'monthly',
      dueDate: this.newTask.dueDate || '',
      completed: false,
    };

    this.taskService.addTask(task);
    this.newTask = { frequency: 'daily' };
    this.tasks = this.taskService.getTasks();

    const modalEl = document.getElementById('taskModal');
    if (modalEl) {
      const modalInstance =
        bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
      modalInstance.hide();
    }

    document.body.classList.remove('modal-open');
    const backdrops = document.querySelectorAll('.modal-backdrop');
    backdrops.forEach((backdrop) => backdrop.remove());
  }

  toggleCompleted(id: string): void {
    this.taskService.toggleTaskCompletion(id);
  }
}
