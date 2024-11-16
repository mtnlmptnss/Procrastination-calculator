import { ProcrastinationCalculator } from './calculator.js';


window.addEventListener('load', () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    const minDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
    document.getElementById('deadline').min = minDateTime;

    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowFormatted = tomorrow.toISOString().slice(0, 16);
    document.getElementById('deadline').value = tomorrowFormatted;
});


document.getElementById('taskForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const task = {
        title: document.getElementById('title').value,
        complexity: document.getElementById('complexity').value,
        deadline: new Date(document.getElementById('deadline').value),
        estimatedTime: parseFloat(document.getElementById('estimatedTime').value),
        priority: document.getElementById('priority').value,
        isInteresting: document.getElementById('isInteresting').checked
    };

    const calculator = new ProcrastinationCalculator();
    const result = calculator.calculateProcrastination(task);

    document.getElementById('procrastinationTime').textContent = `${result.procrastinationTime.toFixed(1)} hours`;
    document.getElementById('panicTime').textContent = `${result.panicTime.toFixed(1)} hours`;
    document.getElementById('actualWorkTime').textContent = `${result.actualWorkTime.toFixed(1)} hours`;
    document.getElementById('efficiency').textContent = `${result.efficiency.toFixed(1)}%`;
    document.getElementById('stressLevel').textContent = result.stressLevel;

    addTaskToHistory({ ...task, ...result });
});

const taskHistory = [];


const addTaskToHistory = ({ title, procrastinationTime, panicTime, actualWorkTime, efficiency, stressLevel }) => {
    const taskHistoryList = document.getElementById('taskHistory');

    const listItem = document.createElement('li');
    listItem.className = 'task-item';

    const span = document.createElement('span');
    span.className = 'task-title';
    span.textContent = title;

    const resultsSpan = document.createElement('span');
    resultsSpan.className = 'task-results';
    resultsSpan.textContent = ` | Proc: ${procrastinationTime.toFixed(1)}h | Panic: ${panicTime.toFixed(1)}h | Work: ${actualWorkTime.toFixed(1)}h | Eff: ${efficiency.toFixed(1)}% | Stress: ${stressLevel}`;

    listItem.appendChild(span);  
    listItem.appendChild(resultsSpan);

    taskHistoryList.prepend(listItem);
}