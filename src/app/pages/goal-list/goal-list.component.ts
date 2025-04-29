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
  };

  newMilestone = '';

  constructor(private goalsService: GoalsService) {}

  ngOnInit(): void {
    this.goals = this.goalsService.getGoals();
  }

  addMilestone() {
    if (this.newMilestone.trim()) {
      this.newGoal.milestones.push({
        name: this.newMilestone,
        status: 'Pending',
      });
      this.newMilestone = '';
    }
  }

  removeMilestone(index: number) {
    this.newGoal.milestones.splice(index, 1);
  }

  addGoal() {
    this.newGoal.progress = this.calculateProgress(this.newGoal);
    this.goalsService.addGoal({ ...this.newGoal });
    this.goals = this.goalsService.getGoals();
    this.resetForm();

    const modalElement = this.goalModal.nativeElement;
    const modalInstance =
      Modal.getInstance(modalElement) || new Modal(modalElement);
    modalInstance.hide();

    this.newGoal.progress = this.calculateProgress(this.newGoal);
  }

  deleteGoal(goalToDelete: Goal) {
    const index = this.goals.findIndex(goal => goal === goalToDelete);
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
    const { milestones, startDate, targetDate } = goal;

    if (!milestones.length || milestones.every((m) => m.status === 'Pending')) {
      return 0;
    }

    let total = 0;

    const totalDays = this.getDaysBetween(startDate, targetDate);

    milestones.forEach((m) => {
      if (m.status === 'Completed') {
        total += 1;
      } else if (m.status === 'In Progress') {
        const elapsedDays = this.getDaysBetween(
          startDate,
          new Date().toISOString().split('T')[0]
        );
        total += elapsedDays / totalDays;
      }
    });

    return Math.round((total / milestones.length) * 100);
  }

  getDaysBetween(start: string, end: string): number {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diff = endDate.getTime() - startDate.getTime();
    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }

  getProgressColor(startDate: string, targetDate: string): any {
    const totalDays = this.getDaysBetween(startDate, targetDate);
    const elapsedDays = this.getDaysBetween(
      startDate,
      new Date().toISOString().split('T')[0]
    );

    const ratio = Math.min(1, elapsedDays / totalDays);

    const r = 255;
    const g = Math.round(200 - 100 * ratio);
    const b = 0;

    const color = `rgb(${r}, ${g}, ${b})`;

    return {
      backgroundColor: color,
      color: '#fff',
    };
  }

  resetForm() {
    this.newGoal = {
      title: '',
      startDate: '',
      targetDate: '',
      description: '',
      progress: 0,
      milestones: [],
    };
    this.newMilestone = '';
  }
}
