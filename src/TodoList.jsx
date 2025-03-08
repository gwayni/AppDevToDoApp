import { useState, useEffect } from "react";

export default function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState("");
    const [editingIndex, setEditingIndex] = useState(null);
    const [editText, setEditText] = useState("");
    const [filter, setFilter] = useState("all");
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("darkMode") === "true"
    );

    useEffect(() => {
        localStorage.setItem("darkMode", darkMode);
        document.body.className = darkMode ? "dark" : "";
    }, [darkMode]);

    const addTask = () => {
        if (task.trim() === "") return;
        setTasks([...tasks, { text: task, completed: false }]);
        setTask("");
    };

    const removeTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    const toggleCompletion = (index) => {
        setTasks(
            tasks.map((t, i) =>
                i === index ? { ...t, completed: !t.completed } : t
            )
        );
    };

    const startEditing = (index, text) => {
        setEditingIndex(index);
        setEditText(text);
    };

    const saveEdit = (index) => {
        setTasks(
            tasks.map((t, i) =>
                i === index ? { ...t, text: editText } : t
            )
        );
        setEditingIndex(null);
    };

    const filteredTasks = tasks.filter((task) => {
        if (filter === "completed") return task.completed;
        if (filter === "pending") return !task.completed;
        return true;
    });

    return (
        <div className={`app-container ${darkMode ? "dark-mode" : ""}`}>
            <h2>To-Do List</h2>

            <button className="dark-mode-btn" onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
            </button>

            <div className="task-input">
                <input
                    type="text"
                    placeholder="Add a new task..."
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
                <button onClick={addTask}>Add Task</button>
            </div>

            <div className="filters">
                <button onClick={() => setFilter("all")}>All</button>
                <button onClick={() => setFilter("completed")}>Completed</button>
                <button onClick={() => setFilter("pending")}>Pending</button>
            </div>

            <ul>
                {filteredTasks.map((t, index) => (
                    <li key={index} className={t.completed ? "completed" : ""}>
                        <input
                            type="checkbox"
                            checked={t.completed}
                            onChange={() => toggleCompletion(index)}
                        />
                        {editingIndex === index ? (
                            <input
                                type="text"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                            />
                        ) : (
                            <span>{t.text}</span>
                        )}

                        {editingIndex === index ? (
                            <button onClick={() => saveEdit(index)}>✅ Save</button>
                        ) : (
                            <button onClick={() => startEditing(index, t.text)}>✏️ Edit</button>
                        )}
                        <button onClick={() => removeTask(index)}>🗑 Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}