# TaskFlow Suite - Web Applications

A collection of beautiful, responsive web applications built with vanilla JavaScript and local storage.

## 📱 Applications Included

### 1. **Work Diary** (`index.html`)
A comprehensive work tracking application for logging daily tasks and activities.

#### Features:
- 📝 Add/edit/delete work entries with full details
- 🏷️ Categories (Development, Meetings, Planning, Design, Testing, Documentation, etc.)
- ⏱️ Track hours spent on each task
- 🏷️ Status tags (✅ Complete, 🔄 In Progress, ⏸️ Waiting, 🐛 Bug, 🚀 Deployment, 📝 Draft)
- 🔍 Search and filter by category or date
- 📊 Real-time statistics (total entries, today's count, weekly count, total hours)
- 📅 View by date ranges (All, Today, This Week)
- ☁️ Cloud sync integration with API
- 📤 Export/Import data as JSON
- 👤 User authentication with PIN
- 🌍 Thai language support

#### Usage:
1. Open `index.html` in your browser
2. Create account with username & 4-8 digit PIN
3. Add work entries with details
4. Track productivity with built-in statistics
5. Data syncs across devices via cloud storage

---

### 2. **TaskFlow To-Do List** (`todo.html`)
A lightweight, feature-rich to-do list application for personal task management.

#### Features:
- ✅ Quick task entry with Enter key support
- 📋 Full task details (title, category, priority, due date, notes)
- 🎯 Priority levels (High, Medium, Low) with color coding
- 📂 Categories (Work, Personal, Shopping, Health, Other)
- 📅 Due date picker with smart date formatting (Today, Tomorrow, etc.)
- 🚨 Overdue task highlighting
- 🔍 Advanced filtering (All, Active, Completed, High Priority)
- 📊 Dashboard stats (Total, Active, Completed, Progress %)
- 🔀 Smart sorting (by priority, by due date)
- 👁️ Hide completed tasks option
- 💾 Local storage with auto-save
- 📤 Export tasks as JSON
- 🎨 Theme support
- 📱 Fully responsive design

#### Usage:
1. Open `todo.html` in your browser
2. Type task name and click "Add" (or press Enter)
3. Click ⚙️ for advanced options:
   - Edit tasks with full details
   - Change priority and category
   - Set due dates
   - Add notes
4. Use filters to organize view
5. All changes saved automatically!

---

## 🎨 Design Features

Both applications include:
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Modern UI** - Clean, professional interface with smooth animations
- **Dark Mode Support** - Eye-friendly themes
- **Toast Notifications** - Instant feedback on actions
- **Keyboard Shortcuts**:
  - Enter key to quickly add items
  - Escape to close modals
- **Accessibility** - Semantic HTML, proper labels, keyboard navigation

---

## 💾 Local Storage

### Work Diary Storage:
```javascript
localStorage.wd_[username] = JSON.stringify([
  {
    id: 123456,
    date: "2024-01-15",
    title: "Fix login bug",
    cat: "Development",
    project: "Web App",
    hours: 2.5,
    note: "Fixed authentication issue",
    tags: ["✅ Complete"]
  }
])
```

### To-Do List Storage:
```javascript
localStorage.taskflow_todos = JSON.stringify([
  {
    id: 123456,
    text: "Buy groceries",
    completed: false,
    category: "shopping",
    priority: "high",
    dueDate: "2024-01-20",
    notes: "Milk, bread, eggs",
    createdAt: "2024-01-15T10:30:00Z"
  }
])
```

---

## 🚀 How to Get Started

### Option 1: Use from GitHub (Easiest)
1. Visit your repository: `https://github.com/jwwonderlife/new`
2. Open `index.html` or `todo.html` directly in browser
3. Or download and open locally

### Option 2: Enable GitHub Pages
1. Go to Repository Settings → Pages
2. Select `main` branch as source
3. Access via: `https://jwwonderlife.github.io/new/`
4. Direct links:
   - Work Diary: `.../index.html`
   - TaskFlow: `.../todo.html`

### Option 3: Run Locally
1. Clone or download the repository
2. Open `index.html` or `todo.html` in any modern browser
3. No installation or build process needed!

---

## 📋 Browser Compatibility

- ✅ Chrome/Chromium (v90+)
- ✅ Firefox (v88+)
- ✅ Safari (v14+)
- ✅ Edge (v90+)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile, etc.)

---

## 🔒 Data Security

- **All data stored locally** in browser's localStorage
- **No personal information** sent to external servers (except optional cloud sync in Work Diary)
- **Data persists** across browser sessions
- **Can export** anytime as JSON backup
- **Can import** from previous backups

---

## ⚙️ Keyboard Shortcuts

### Work Diary:
- `Enter` - Add new work entry
- `Esc` - Close modals

### TaskFlow To-Do:
- `Enter` - Add new task (or save when editing)
- `Esc` - Close modals/cancel

---

## 📊 Storage Limits

- **localStorage limit**: ~5-10MB per domain
- **Both apps use minimal space** - can store 1000+ items easily

---

## 🛠️ Customization

### Adding New Categories (To-Do):
Edit `todo.html` line ~300:
```html
<select id="modalCategorySelect">
    <option value="">No Category</option>
    <option value="work">Work</option>
    <option value="personal">Personal</option>
    <!-- Add your categories here -->
</select>
```

### Adding New Task Tags (Work Diary):
Edit `app.js` line ~6:
```javascript
const TAGS = ['✅ Complete', '🔄 In Progress', '...add more tags'];
```

### Changing Colors:
Edit CSS variables in each HTML file:
```css
:root {
    --primary: #6366f1; /* Change main color */
    --success: #10b981;
    --danger: #ef4444;
    /* ... more colors ... */
}
```

---

## 🐛 Troubleshooting

### Tasks not saving?
- Check browser's localStorage is enabled
- Clear browser cache and try again
- Check browser console (F12) for errors

### App looks broken?
- Refresh page (Ctrl+F5 or Cmd+Shift+R)
- Clear browser cache
- Try different browser
- Disable browser extensions

### Data disappeared?
- Check if using private/incognito mode (data not saved there)
- Check localStorage settings in browser
- Try restoring from exported JSON backup

---

## 📝 File Structure

```
/
├── index.html          # Work Diary application
├── app.js              # Work Diary logic
├── todo.html           # TaskFlow To-Do List
├── todo.js             # TaskFlow logic
└── README.md           # This file
```

---

## 📱 Mobile Optimizations

Both apps feature:
- Touch-friendly button sizes
- Optimized layouts for small screens
- Responsive grids and typography
- Bottom navigation on mobile (Work Diary)
- Floating action buttons for quick access
- Safe area padding for notched devices

---

## 🎯 Features Roadmap

### Planned Features:
- [ ] Cloud sync across devices (Work Diary)
- [ ] Recurring tasks (To-Do)
- [ ] Calendar view
- [ ] Notifications/Reminders
- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] Habit tracking
- [ ] Time tracking integration

---

## 💡 Tips & Tricks

### Work Diary:
1. Use tags to quickly identify task status
2. Set projects to group related work
3. Export weekly reports for review
4. Use cloud sync to access from multiple devices

### TaskFlow To-Do:
1. Set high priority for urgent tasks
2. Use due dates to plan your week
3. Enable "Sort by Due Date" for deadline view
4. Export data monthly as backup
5. Clear completed tasks periodically

---

## 📧 Support

Having issues? Try:
1. Check browser console (F12) for errors
2. Clear localStorage and start fresh
3. Try a different browser
4. Download latest version from repository

---

## 📄 License

These applications are free to use and modify for personal or commercial use.

---

## 🙏 Credits

Built with:
- **Vanilla JavaScript** - No dependencies!
- **Tabler Icons** - Beautiful icon library
- **Google Fonts** - Inter typeface
- **HTML5/CSS3** - Modern web standards

---

**Enjoy organizing your tasks and tracking your work! 🚀**

Last Updated: June 2026
