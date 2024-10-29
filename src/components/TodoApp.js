// src/components/TodoApp.js
import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import { Table } from 'react-bootstrap';

const TodoApp = () => {
    const [tasks, setTasks] = useState(() => {
        // Load tasks from local storage on initial render
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    
    // Effect to save tasks to local storage whenever they change
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (task) => {
        setTasks([...tasks, { id: Date.now(), name: task, completed: false }]);
    };

    const editTask = (id, newName) => {
        setTasks(tasks.map(task => (task.id === id ? { ...task, name: newName } : task)));
    };

    const toggleComplete = (id) => {
        setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">To-Do List</h1>
            <TodoForm addTask={addTask} />
            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th style={{ width: '300px' }}>Task</th>
                        <th style={{ width: '150px' }}>Status</th>
                        <th style={{ width: '200px' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.length > 0 ? (
                        tasks.map(task => (
                            <TodoItem 
                                key={task.id} 
                                task={task} 
                                editTask={editTask} 
                                toggleComplete={toggleComplete} 
                                deleteTask={deleteTask} 
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center">No tasks available</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default TodoApp;