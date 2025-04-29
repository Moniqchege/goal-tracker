export interface Milestone {
    name: string;
    status: 'Pending' | 'In Progress' | 'Completed';
}

export interface Goal {
    title: string;
    description: string;
    startDate: string;
    targetDate: string;
    progress: number;
    milestones: Milestone[];
    status: 'Pending' | 'In Progress' | 'Completed';
}