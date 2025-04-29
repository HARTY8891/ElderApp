// Tab Navigation
document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('tab-active'));
        button.classList.add('tab-active');
        
        document.querySelectorAll('.tab-content').forEach(content => content.classList.add('hidden'));
        const tabId = button.getAttribute('data-tab') + '-tab';
        document.getElementById(tabId).classList.remove('hidden');
    });
});

// Time and Date
function updateTime() {
    const now = new Date();
    const timeElement = document.getElementById('current-time');
    const dateElement = document.getElementById('current-date');
    
    let hours = now.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const minutes = now.getMinutes().toString().padStart(2, '0');
    timeElement.textContent = `${hours}:${minutes} ${ampm}`;
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = now.toLocaleDateString('en-US', options);
}

updateTime();
setInterval(updateTime, 60000);

// Task Management
function setupTaskToggle(container) {
    container.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function() {
            const taskItem = this.closest('.flex.items-center');
            const textElement = taskItem.querySelector('.font-medium');
            
            if (this.innerHTML.includes('far')) {
                this.innerHTML = '<i class="fas fa-check-circle text-xl"></i>';
                this.classList.replace('text-gray-400', 'text-green-600');
                textElement.classList.add('task-completed');
            } else {
                this.innerHTML = '<i class="far fa-check-circle text-xl"></i>';
                this.classList.replace('text-green-600', 'text-gray-400');
                textElement.classList.remove('task-completed');
            }
        });
    });
}

// Initialize task toggles
setupTaskToggle(document.getElementById('today-tasks'));
setupTaskToggle(document.getElementById('shopping-tab'));

// Accessibility Features
document.getElementById('fontIncrease').addEventListener('click', () => {
    const html = document.documentElement;
    const currentSize = parseFloat(getComputedStyle(html).fontSize);
    html.style.fontSize = (currentSize + 2) + 'px';
});

document.getElementById('contrastToggle').addEventListener('click', () => {
    document.body.classList.toggle('high-contrast');
});

// Modal Handling
const modalToggle = (modalId, show) => {
    document.getElementById(modalId).classList.toggle('hidden', !show);
};

document.getElementById('helpBtn').addEventListener('click', () => modalToggle('helpModal', true));
document.querySelectorAll('[data-modal-close]').forEach(btn => {
    btn.addEventListener('click', () => modalToggle(btn.dataset.modalClose, false));
});

// Close modals on outside click
window.addEventListener('click', (event) => {
    if (event.target.matches('#eventModal, #helpModal')) {
        event.target.classList.add('hidden');
    }
});
