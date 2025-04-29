import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Reminder } from '../models/reminder.model';

const STORAGE_KEY = 'reminders';

@Injectable({
  providedIn: 'root',
})
export class ReminderService {
  private reminders: Reminder[] = [];

  constructor() {
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage() {
    const data = localStorage.getItem(STORAGE_KEY);
    this.reminders = data ? JSON.parse(data) : [];
  }

  private saveToLocalStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.reminders));
  }

  getReminders(): Reminder[] {
    return [...this.reminders];
  }

  addReminder(reminder: Omit<Reminder, 'id'>) {
    this.reminders.push({ ...reminder, id: uuidv4() });
    this.saveToLocalStorage();
  }

  deleteReminder(id: string) {
    this.reminders = this.reminders.filter(r => r.id !== id);
    this.saveToLocalStorage();
  }

  updateReminder(updated: Reminder) {
    const index = this.reminders.findIndex(r => r.id === updated.id);
    if (index > -1) {
      this.reminders[index] = updated;
      this.saveToLocalStorage();
    }
  }
}
