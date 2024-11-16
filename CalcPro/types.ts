export enum TaskComplexity {
    Easy = 'Easy',
    Medium = 'Medium',
    Hard = 'Hard',
    Impossible = 'Impossible'
}

export enum Priority {
    Low = 'Low',
    Normal = 'Normal',
    High = 'High',
    Urgent = 'Urgent'
}

export enum StressLevel {
    Low = 'Low',
    Medium = 'Medium',
    High = 'High',
    Critical = 'Critical'
}

export interface Task {
    title: string;
    complexity: TaskComplexity;
    deadline: Date;
    estimatedTime: number;
    priority: Priority;
    isInteresting: boolean;
}

export interface ProcrastinationResult {
    procrastinationTime: number;
    panicTime: number;
    actualWorkTime: number;
    efficiency: number;
    stressLevel: StressLevel;
}