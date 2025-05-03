import './App.css';
import AddTodo from './components/AddTodo';
import Todo from "./components/Todo";
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import React, { useState, useEffect } from "react";

// Базова URL-адреса API на Heroku
const apiUrl = 'https://backend-todo-list-19d05a62b7ba.herokuapp.com/';

function App() {
    const [todos, setTodos] = useState([]);

    const getTodos = async () => {
        try {
            const response = await axios.get(`${apiUrl}api/v1/todo/`);  // використовуємо apiUrl
            const { data } = response;
            setTodos(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getTodos();
    }, []);

    const addTodo = async newTodo => {
        try {
            console.log(newTodo);
            await axios.post(`${apiUrl}api/v1/todo/`, newTodo);  // використовуємо apiUrl
            getTodos();
        } catch (err) {
            console.log(err);
        }
    };

    const completeTodo = async id => {
        try {
            const todo = todos.filter(todo => todo.id === id)[0];
            todo.completed = true;
            await axios.put(`${apiUrl}api/v1/todo/${id}/`, todo);  // використовуємо apiUrl
            getTodos();
        } catch (err) {
            console.log(err);
        }
    };

    const editTodo = async todo => {
        try {
            await axios.put(`${apiUrl}api/v1/todo/${todo.id}/`, todo);  // використовуємо apiUrl
            getTodos();
        } catch (err) {
            console.log(err);
        }
    };

    const deleteTodo = async id => {
        try {
            await axios.delete(`${apiUrl}api/v1/todo/${id}/`);  // використовуємо apiUrl
            getTodos();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='wrapper'>
            <Container>
                <Row className='justify-content-center pt-5'>
                    <Col>
                        <Card className='p-5'>
                            <h3>My Todos</h3>
                            <AddTodo addTodo={addTodo} />
                            {todos.map((todo, index) => (
                                !todo.completed && <Todo key={index} id={todo.id} title={todo.title} description={todo.description} completeTodo={completeTodo} editTodo={editTodo} deleteTodo={deleteTodo} />
                            ))}
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
