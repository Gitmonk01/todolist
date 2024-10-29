// src/components/TodoItem.js
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const TodoItem = ({ task, editTask, toggleComplete, deleteTask }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(task.name);

    const handleEditSubmit = (e) => {
        e.preventDefault();
        editTask(task.id, newName);
        setIsEditing(false);
    };

    // Define a common width for buttons
    const buttonStyle = { width: '100px' }; // Set desired width here

    return (
        <tr>
            <td>
                {isEditing ? (
                    <form onSubmit={handleEditSubmit}>
                        <input 
                            type="text" 
                            value={newName} 
                            onChange={(e) => setNewName(e.target.value)} 
                        />
                    </form>
                ) : (
                    task.name
                )}
            </td>
            <td>
                {task.completed ? (
                    <span className="text-success">Completed</span>
                ) : (
                    <span className="text-danger">Pending</span>
                )}
            </td>
            <td>
                {isEditing ? (
                    <>
                        <Button variant="success" style={buttonStyle} onClick={handleEditSubmit}>Save</Button>{' '}
                        <Button variant="secondary" style={buttonStyle} onClick={() => setIsEditing(false)}>Cancel</Button>
                    </>
                ) : (
                    <>
                        <Button variant="primary" style={buttonStyle} onClick={() => toggleComplete(task.id)}>
                            {task.completed ? 'Undo' : 'Complete'}
                        </Button>{' '}
                        <Button variant="warning" style={buttonStyle} onClick={() => setIsEditing(true)}>Edit</Button>{' '}
                        <Button variant="danger" style={buttonStyle} onClick={() => deleteTask(task.id)}>Delete</Button>
                    </>
                )}
            </td>
        </tr>
    );
};

export default TodoItem;