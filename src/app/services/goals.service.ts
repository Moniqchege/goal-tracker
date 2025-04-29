import { Injectable } from '@angular/core';
import { Goal } from '../models/goal.model';

@Injectable({
  providedIn: 'root'
})
export class GoalsService {
  private goals: Goal[] = [];
  private storageKey = 'goals';


  constructor() { }

  getGoals(): Goal[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  addGoal(goal: Goal): void {
    const goals = this.getGoals();
    goals.push(goal);
    localStorage.setItem(this.storageKey, JSON.stringify(goals));
  }

  deleteGoal(index: number): void {
    const goals = this.getGoals();
    goals.splice(index, 1);
    localStorage.setItem(this.storageKey, JSON.stringify(goals));
  }

  updateGoal(index: number, updatedGoal: Goal): void {
    const goals = this.getGoals();
    goals[index] = updatedGoal;
    localStorage.setItem(this.storageKey, JSON.stringify(goals));
  }
}
