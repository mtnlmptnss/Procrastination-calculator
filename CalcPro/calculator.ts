import { Task, TaskComplexity, Priority, StressLevel, ProcrastinationResult } from './types';

export class ProcrastinationCalculator {
    calculateProcrastination(task: Task): ProcrastinationResult {
        const procrastinationTime = this.calculateProcrastinationTime(task);
        const panicTime = this.calculatePanicTime(task);
        const actualWorkTime = this.calculateActualWorkTime(task);
        const efficiency = this.calculateEfficiency(procrastinationTime, actualWorkTime);
        const stressLevel = this.determineStressLevel(task.deadline, task.estimatedTime);
    
        return {
            procrastinationTime,
            panicTime,
            actualWorkTime,
            efficiency,
            stressLevel
        };
    }
    private calculateProcrastinationTime(task: Task): number {
        let baseTime: number = 0;
        switch (task.complexity) {
            case TaskComplexity.Easy:
                baseTime =  task.isInteresting === true? 2 * 0.7 : 2;
            case TaskComplexity.Medium:
                baseTime = task.isInteresting === true? 4 * 0.7 : 4;
            case TaskComplexity.Hard:
                baseTime = task.isInteresting === true? 8 * 0.7 : 8;
            case TaskComplexity.Impossible:
                baseTime = task.isInteresting === true? 16 * 0.7 : 16;
        }
        switch (task.priority) {
            case Priority.Low:
                baseTime += 4;
                break;
            case Priority.Normal:
                baseTime += 2;
                break;
            case Priority.High:
                baseTime += 1;
                break;
            case Priority.Urgent:
                baseTime += 0;
                break;
        }
        return baseTime;
    }

    private calculatePanicTime(task: Task): number {
        let currentDate: Date = new Date();
        const timeUntilDeadline: number = task.deadline.getTime() - currentDate.getTime();
        const hoursUntilDeadline: number = timeUntilDeadline / (1000 * 60 * 60);
        let panicTime: number = 0;

        if (hoursUntilDeadline < task.estimatedTime) {
            panicTime += 8;
        } else if (hoursUntilDeadline < 2 * task.estimatedTime) {
            panicTime += 4;
        } else if (hoursUntilDeadline < 3 * task.estimatedTime) {
            panicTime += 2;
        } else {
            panicTime += 1;
        }

        switch (task.complexity) {
            case TaskComplexity.Easy:
                panicTime *= 1;
                break;
            case TaskComplexity.Medium:
                panicTime *= 1.5;
                break;
            case TaskComplexity.Hard:
                panicTime *= 2;
                break;
            case TaskComplexity.Impossible:
                panicTime *= 3;
                break;
        }

        switch (task.priority) {
            case Priority.Low:
                panicTime *= 1;
                break;
            case Priority.Normal:
                panicTime *= 1.2;
                break;
            case Priority.High:
                panicTime *= 1.5;
                break;
            case Priority.Urgent:
                panicTime *= 2;
                break;
        }
        return panicTime;
    }
    

    private calculateActualWorkTime(task: Task): number {
        let actualTime: number = task.estimatedTime;
        let procrastinationTime = this.calculateProcrastinationTime(task);
        actualTime += procrastinationTime * 0.2;
        let panicTime =  this.calculatePanicTime(task);
        if (panicTime > 5) {
            actualTime *= 1.3;
        } else if (panicTime > 2) {
            actualTime *= 1.1;
        } 
        return actualTime;
    }
    

    private calculateEfficiency(procrastinationTime: number, actualWorkTime: number): number {
        const efficiency = (actualWorkTime / (procrastinationTime + actualWorkTime)) * 100;

        return Math.min(efficiency, 100);
    }
    

    private determineStressLevel(deadline: Date, estimatedTime: number): StressLevel {
        let currentDate: Date = new Date();
        const timeUntilDeadline: number = deadline.getTime() - currentDate.getTime();
        const hoursUntilDeadline: number = timeUntilDeadline / (1000 * 60 * 60);

        if (hoursUntilDeadline > estimatedTime * 3) {
            return StressLevel.Low;
        } else if (hoursUntilDeadline > estimatedTime * 2) {
            return StressLevel.Medium;
        } else if (hoursUntilDeadline > estimatedTime) {
            return StressLevel.High;
        } else {
            return StressLevel.Critical;
        }
    }
}
