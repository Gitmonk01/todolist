// src/components/TodoForm.js
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const TodoForm = ({ addTask }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim()) { // Ensure input is not just whitespace
            addTask(inputValue);
            setInputValue(''); // Clear input after adding
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
                <Form.Control 
                    type="text" 
                    value={inputValue} 
                    onChange={(e) => setInputValue(e.target.value)} 
                    placeholder="Add a new task"
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Add Task
            </Button>
        </Form>
    );
};

export default TodoForm;