export interface Task {
    id: string;
    title: string;
    frequency: 'daily' | 'weekly' |'monthly';
    dueDate: string;
    completed: boolean;
}