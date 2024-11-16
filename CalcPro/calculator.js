import { TaskComplexity, Priority, StressLevel } from './types.js';

export class ProcrastinationCalculator {
    calculateProcrastination(task) {
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

    calculateProcrastinationTime(task) {
        let baseTime = 0;
        
        switch (task.complexity) {
            case TaskComplexity.Easy:
                baseTime = task.isInteresting ? 2 * 0.7 : 2;
                break;
            case TaskComplexity.Medium:
                baseTime = task.isInteresting ? 4 * 0.7 : 4;
                break;
            case TaskComplexity.Hard:
                baseTime = task.isInteresting ? 8 * 0.7 : 8;
                break;
            case TaskComplexity.Impossible:
                baseTime = task.isInteresting ? 16 * 0.7 : 16;
                break;
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

    calculatePanicTime(task) {
        const currentDate = new Date();
        const timeUntilDeadline = task.deadline.getTime() - currentDate.getTime();
        const hoursUntilDeadline = timeUntilDeadline / (1000 * 60 * 60);
        let panicTime = 0;

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

    calculateActualWorkTime(task) {
        let actualTime = task.estimatedTime;
        const procrastinationTime = this.calculateProcrastinationTime(task);
        actualTime += procrastinationTime * 0.2;

        const panicTime = this.calculatePanicTime(task);
        if (panicTime > 5) {
            actualTime *= 1.3;
        } else if (panicTime > 2) {
            actualTime *= 1.1;
        }

        return actualTime;
    }

    calculateEfficiency(procrastinationTime, actualWorkTime) {
        const efficiency = (actualWorkTime / (procrastinationTime + actualWorkTime)) * 100;
        return Math.min(efficiency, 100);
    }

    determineStressLevel(deadline, estimatedTime) {
        const currentDate = new Date();
        const timeUntilDeadline = deadline.getTime() - currentDate.getTime();
        const hoursUntilDeadline = timeUntilDeadline / (1000 * 60 * 60);

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