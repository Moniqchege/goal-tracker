import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GoalsService } from '../../services/goals.service';
import { Goal } from '../../models/goal.model';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-goal-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './goal-list.component.html',
  styleUrls: ['./goal-list.component.css'],
})
export class GoalListComponent {
  goals: Goal[] = [];
  @ViewChild('goalModal') goalModal!: ElementRef;

  newGoal: Goal = {
    title: '',
    startDate: '',
    targetDate: '',
    description: '',
    progress: 0,
    milestones: [],
    status: 'Pending',
  };

  constructor(private goalsService: GoalsService) {}

  ngOnInit(): void {
    this.goals = this.goalsService.getGoals();
  }

  addGoal() {
    this.newGoal.progress = this.calculateProgress(this.newGoal);
    console.log('New Goal Status:', this.newGoal.status);
    this.goalsService.addGoal({ ...this.newGoal });
    this.goals = this.goalsService.getGoals();
    this.resetForm();

    const modalElement = this.goalModal.nativeElement;
    const modalInstance =
      Modal.getInstance(modalElement) || new Modal(modalElement);
    modalInstance.hide();
  }

  deleteGoal(goalToDelete: Goal) {
    const index = this.goals.findIndex((goal) => goal === goalToDelete);
    if (index !== -1) {
      this.goalsService.deleteGoal(index);
      this.goals = this.goalsService.getGoals();
    }
  }

  openModal() {
    const modalElement = this.goalModal.nativeElement;
    const modalInstance = new Modal(modalElement, {
      backdrop: 'static',
      keyboard: true,
    });
    modalInstance.show();
  }

  calculateProgress(goal: Goal): number {
    if (goal.status === 'Completed') return 100;
    if (goal.status === 'In Progress') {
      const totalDays = this.getDaysBetween(goal.startDate, goal.targetDate);
      const elapsedDays = this.getDaysBetween(
        goal.startDate,
        new Date().toISOString().split('T')[0]
      );
      return Math.min(100, Math.round((elapsedDays / totalDays) * 100));
    }
    return 0;
  }

  getDaysBetween(start: string, end: string): number {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diff = endDate.getTime() - startDate.getTime();
    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }

  getStatusStyle(status: string): any {
    switch (status?.trim()) {
      case 'Pending':
        return { backgroundColor: '#6c757d', color: '#fff' }; 
      case 'Completed':
        return { backgroundColor: '#28a745', color: '#fff' }; 
      case 'In Progress':
        return {
          background: 'linear-gradient(45deg, #FFA500, #FF8C00)', 
          color: '#fff',
        };
      default:
        return { backgroundColor: '#dc3545', color: '#fff' }; 
    }
  }
  

  resetForm() {
    this.newGoal = {
      title: '',
      startDate: '',
      targetDate: '',
      description: '',
      progress: 0,
      milestones: [],
      status: 'Pending',
    };
  }
}
