import { Task, TaskComplexity, Priority } from './types';
import { ProcrastinationCalculator } from './calculator';
const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

if (isBrowser) {
    const taskForm = document.getElementById('taskForm');



    if (taskForm) {
        taskForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const taskTitle = (document.getElementById('title') as HTMLInputElement).value;
            const taskComplexity = (document.getElementById('complexity') as HTMLSelectElement).value as TaskComplexity;
            const taskDeadline = new Date((document.getElementById('deadline') as HTMLInputElement).value);
            const taskEstimatedTime = parseInt((document.getElementById('estimatedTime') as HTMLInputElement).value);
            const taskPriority = (document.getElementById('priority') as HTMLSelectElement).value as Priority;
            const taskIsInteresting = (document.getElementById('isInteresting') as HTMLInputElement).checked;
        
            const task: Task = {
                title: taskTitle,
                complexity: taskComplexity,
                deadline: taskDeadline,
                estimatedTime: taskEstimatedTime,
                priority: taskPriority,
                isInteresting: taskIsInteresting
            };
        
            const calculator = new ProcrastinationCalculator();
            const result = calculator.calculateProcrastination(task);
        
            (document.getElementById('procrastinationTime') as HTMLSpanElement).textContent = `${result.procrastinationTime.toFixed(1)} hours`;
            (document.getElementById('panicTime') as HTMLSpanElement).textContent = `${result.panicTime.toFixed(1)} hours`;
            (document.getElementById('actualWorkTime') as HTMLSpanElement).textContent = `${result.actualWorkTime.toFixed(1)} hours`;
            (document.getElementById('efficiency') as HTMLSpanElement).textContent = `${result.efficiency.toFixed(1)}%`;
            (document.getElementById('stressLevel') as HTMLSpanElement).textContent = result.stressLevel;
        });
    }

    
} else {
    // Handle the case where you're in a Node.js environment
    console.log('This code is running in a Node.js environment, not a browser.');
}