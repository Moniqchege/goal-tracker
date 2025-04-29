import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Reminder } from '../models/reminder.model';

@Injectable({
  providedIn: 'root',
})
export class ReminderService {
  private reminders: Reminder[] = [];

  constructor() {
    const stored = localStorage.getItem('reminders');
    if (stored) this.reminders = JSON.parse(stored);
  }

  private saveToLocalStorage() {
    localStorage.setItem('reminders', JSON.stringify(this.reminders));
  }

  getReminders(): Reminder[] {
    return [...this.reminders];
  }

  addReminder(reminder: Omit<Reminder, 'id'>) {
    const newReminder = { ...reminder, id: uuidv4() };
    this.reminders.push(newReminder);
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
