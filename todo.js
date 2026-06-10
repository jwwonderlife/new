/* ═══════════════════════════════════════
   TASKFLOW - TO-DO LIST APPLICATION
   Local Storage + Full Feature Set
═══════════════════════════════════════ */

// Constants
const STORAGE_KEY = 'taskflow_todos';
const SETTINGS_KEY = 'taskflow_settings';
const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 };

// State
let todos = [];
let currentFilter = 'all';
let editingId = null;
let settings = {
    sortByPriority: false,
    sortByDueDate: false,
    hideCompleted: false,
    theme: 'light'
};

/* ═══════════════════════════════════════
   INITIALIZATION
═══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    initEventListeners();
    render();
    applyTheme();
});

function initEventListeners() {
    // Enter key on input
    document.getElementById('todoInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTodo();
    });

    // Enter key on modal input
    document.getElementById('modalTaskInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') saveTodoFromModal();
    });

    // Close modal on overlay click
    document.getElementById('todoModalOverlay').addEventListener('click', (e) => {
        if (e.target.id === 'todoModalOverlay') closeModal('todoModal');
    });

    document.getElementById('settingsModalOverlay').addEventListener('click', (e) => {
        if (e.target.id === 'settingsModalOverlay') closeModal('settingsModal');
    });

    // Settings checkboxes
    document.getElementById('sortByPriority').addEventListener('change', (e) => {
        settings.sortByPriority = e.target.checked;
        saveSettings();
        render();
    });

    document.getElementById('sortByDueDate').addEventListener('change', (e) => {
        settings.sortByDueDate = e.target.checked;
        saveSettings();
        render();
    });

    document.getElementById('hideCompleted').addEventListener('change', (e) => {
        settings.hideCompleted = e.target.checked;
        saveSettings();
        render();
    });
}

/* ═══════════════════════════════════════
   STORAGE OPERATIONS
═══════════════════════════════════════ */
function loadData() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        todos = stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error('Failed to load todos:', e);
        todos = [];
    }

    try {
        const storedSettings = localStorage.getItem(SETTINGS_KEY);
        if (storedSettings) {
            settings = { ...settings, ...JSON.parse(storedSettings) };
        }
        updateSettingsUI();
    } catch (e) {
        console.error('Failed to load settings:', e);
    }
}

function saveData() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (e) {
        showToast('Failed to save tasks', 'error');
        console.error('Failed to save todos:', e);
    }
}

function saveSettings() {
    try {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (e) {
        console.error('Failed to save settings:', e);
    }
}

function updateSettingsUI() {
    document.getElementById('sortByPriority').checked = settings.sortByPriority;
    document.getElementById('sortByDueDate').checked = settings.sortByDueDate;
    document.getElementById('hideCompleted').checked = settings.hideCompleted;
    document.getElementById('themeSelect').value = settings.theme;
}

/* ═══════════════════════════════════════
   TODO OPERATIONS
═══════════════════════════════════════ */
function addTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();

    if (!text) {
        showToast('Please enter a task', 'error');
        return;
    }

    const newTodo = {
        id: Date.now(),
        text: text,
        completed: false,
        category: '',
        priority: 'medium',
        dueDate: '',
        notes: '',
        createdAt: new Date().toISOString()
    };

    todos.unshift(newTodo);
    saveData();
    input.value = '';
    input.focus();
    render();
    showToast('Task added!', 'success');
}

function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveData();
        render();
    }
}

function deleteTodo(id) {
    if (confirm('Delete this task?')) {
        todos = todos.filter(t => t.id !== id);
        saveData();
        render();
        showToast('Task deleted', 'success');
    }
}

function editTodo(id) {
    editingId = id;
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    document.getElementById('todoModalTitle').textContent = 'Edit Task';
    document.getElementById('modalTaskInput').value = todo.text;
    document.getElementById('modalCategorySelect').value = todo.category || '';
    document.getElementById('modalPrioritySelect').value = todo.priority;
    document.getElementById('modalDueDateInput').value = todo.dueDate || '';
    document.getElementById('modalNotesInput').value = todo.notes || '';

    openModal('todoModal');
}

function saveTodoFromModal() {
    const text = document.getElementById('modalTaskInput').value.trim();
    if (!text) {
        showToast('Please enter a task', 'error');
        return;
    }

    if (editingId) {
        // Update existing
        const todo = todos.find(t => t.id === editingId);
        if (todo) {
            todo.text = text;
            todo.category = document.getElementById('modalCategorySelect').value;
            todo.priority = document.getElementById('modalPrioritySelect').value;
            todo.dueDate = document.getElementById('modalDueDateInput').value;
            todo.notes = document.getElementById('modalNotesInput').value;
        }
        showToast('Task updated!', 'success');
    } else {
        // Add new with modal
        todos.unshift({
            id: Date.now(),
            text: text,
            completed: false,
            category: document.getElementById('modalCategorySelect').value,
            priority: document.getElementById('modalPrioritySelect').value,
            dueDate: document.getElementById('modalDueDateInput').value,
            notes: document.getElementById('modalNotesInput').value,
            createdAt: new Date().toISOString()
        });
        showToast('Task added!', 'success');
    }

    saveData();
    closeModal('todoModal');
    editingId = null;
    render();
}

function clearCompleted() {
    const completedCount = todos.filter(t => t.completed).length;
    if (completedCount === 0) {
        showToast('No completed tasks', 'error');
        return;
    }

    if (confirm(`Delete ${completedCount} completed task(s)?`)) {
        todos = todos.filter(t => !t.completed);
        saveData();
        render();
        showToast('Completed tasks cleared', 'success');
    }
}

function clearAllData() {
    if (confirm('Delete ALL tasks? This cannot be undone!')) {
        todos = [];
        saveData();
        render();
        closeModal('settingsModal');
        showToast('All data cleared', 'success');
    }
}

/* ═══════════════════════════════════════
   FILTERING & SORTING
═══════════════════════════════════════ */
function setFilter(filter) {
    currentFilter = filter;
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.closest('.filter-btn').classList.add('active');
    render();
}

function getFilteredTodos() {
    let filtered = todos;

    // Apply filter
    if (currentFilter === 'active') {
        filtered = filtered.filter(t => !t.completed);
    } else if (currentFilter === 'completed') {
        filtered = filtered.filter(t => t.completed);
    } else if (currentFilter === 'high') {
        filtered = filtered.filter(t => t.priority === 'high' && !t.completed);
    }

    // Apply hide completed setting
    if (settings.hideCompleted) {
        filtered = filtered.filter(t => !t.completed);
    }

    // Apply sorting
    if (settings.sortByPriority) {
        filtered.sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]);
    }

    if (settings.sortByDueDate) {
        filtered.sort((a, b) => {
            if (!a.dueDate && !b.dueDate) return 0;
            if (!a.dueDate) return 1;
            if (!b.dueDate) return -1;
            return new Date(a.dueDate) - new Date(b.dueDate);
        });
    }

    return filtered;
}

/* ═══════════════════════════════════════
   STATS & RENDERING
═══════════════════════════════════════ */
function updateStats() {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const active = total - completed;
    const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

    document.getElementById('statTotal').textContent = total;
    document.getElementById('statActive').textContent = active;
    document.getElementById('statCompleted').textContent = completed;
    document.getElementById('statProgress').textContent = progress + '%';
}

function isOverdue(dueDate, completed) {
    if (!dueDate || completed) return false;
    return new Date(dueDate) < new Date();
}

function formatDueDate(dueDate) {
    if (!dueDate) return '';
    const date = new Date(dueDate + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date.toDateString() === today.toDateString()) {
        return 'Today';
    }

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (date.toDateString() === tomorrow.toDateString()) {
        return 'Tomorrow';
    }

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function render() {
    updateStats();
    const filtered = getFilteredTodos();
    const container = document.getElementById('todoList');

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="todo-empty">
                <i class="ti ti-inbox"></i>
                <p>${currentFilter === 'completed' ? 'No completed tasks yet' : 'No tasks yet. Add one to get started!'}</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filtered.map(todo => `
        <div class="todo-item ${todo.completed ? 'completed' : ''}">
            <div class="checkbox-wrapper">
                <input 
                    type="checkbox" 
                    ${todo.completed ? 'checked' : ''}
                    onchange="toggleTodo(${todo.id})"
                >
            </div>
            <div class="todo-content">
                <div class="todo-title">${escapeHtml(todo.text)}</div>
                <div class="todo-meta">
                    ${todo.priority ? `<span class="priority-badge priority-${todo.priority}">${todo.priority}</span>` : ''}
                    ${todo.category ? `<span class="category-badge">${escapeHtml(todo.category)}</span>` : ''}
                    ${todo.dueDate ? `
                        <span class="due-date ${isOverdue(todo.dueDate, todo.completed) ? 'overdue' : ''}">
                            <i class="ti ti-calendar"></i>
                            ${formatDueDate(todo.dueDate)}
                        </span>
                    ` : ''}
                </div>
            </div>
            <div class="todo-actions">
                <button class="btn-todo-action" onclick="editTodo(${todo.id})" title="Edit">
                    <i class="ti ti-pencil"></i>
                </button>
                <button class="btn-todo-action delete" onclick="deleteTodo(${todo.id})" title="Delete">
                    <i class="ti ti-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

/* ═══════════════════════════════════════
   MODAL OPERATIONS
═══════════════════════════════════════ */
function openModal(modalName) {
    if (modalName === 'todoModal') {
        document.getElementById('todoModalOverlay').classList.add('open');
        document.getElementById('modalTaskInput').focus();
    } else if (modalName === 'settingsModal') {
        document.getElementById('settingsModalOverlay').classList.add('open');
    }
}

function closeModal(modalName) {
    if (modalName === 'todoModal') {
        document.getElementById('todoModalOverlay').classList.remove('open');
        editingId = null;
        document.getElementById('todoModalTitle').textContent = 'Add New Task';
        document.getElementById('modalTaskInput').value = '';
        document.getElementById('modalCategorySelect').value = '';
        document.getElementById('modalPrioritySelect').value = 'medium';
        document.getElementById('modalDueDateInput').value = '';
        document.getElementById('modalNotesInput').value = '';
    } else if (modalName === 'settingsModal') {
        document.getElementById('settingsModalOverlay').classList.remove('open');
    }
}

function openSettings() {
    openModal('settingsModal');
}

/* ═══════════════════════════════════════
   THEME MANAGEMENT
═══════════════════════════════════════ */
function changeTheme(theme) {
    settings.theme = theme;
    saveSettings();
    applyTheme();
}

function applyTheme() {
    if (settings.theme === 'auto') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    } else {
        document.documentElement.setAttribute('data-theme', settings.theme);
    }
}

/* ═══════════════════════════════════════
   EXPORT/IMPORT
═══════════════════════════════════════ */
function exportData() {
    const dataStr = JSON.stringify(todos, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `taskflow_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Data exported successfully', 'success');
    closeModal('settingsModal');
}

/* ═══════════════════════════════════════
   UTILITIES
═══════════════════════════════════════ */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s forwards';
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

/* ═══════════════════════════════════════
   ADD SLIDE OUT ANIMATION
═══════════════════════════════════════ */
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
