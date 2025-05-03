import './App.css';
import AddTodo from './components/AddTodo';
import Todo from "./components/Todo";
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import React, { useState, useEffect } from "react";

// Базовий URL для запитів (API на Heroku)
const API_URL = "https://backend-todolist-97122956d60d.herokuapp.com/api/v1/";

function App() {
    const [todos, setTodos] = useState([]);

    const getTodos = async () => {
        try {
            // Використовуємо правильний URL
            const response = await axios.get(`${API_URL}todo/`);
            const { data } = response;
            setTodos(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getTodos();
    }, []);

    const addTodo = async (newTodo) => {
        try {
            console.log(newTodo);
            // Використовуємо правильний URL
            await axios.post(`${API_URL}todo/`, newTodo);
            getTodos();
        } catch (err) {
            console.log(err);
        }
    };

    const completeTodo = async (id) => {
        try {
            const todo = todos.filter(todo => todo.id === id)[0];
            todo.completed = true;
            // Використовуємо правильний URL
            await axios.put(`${API_URL}todo/${id}/`, todo);
            getTodos();
        } catch (err) {
            console.log(err);
        }
    };

    const editTodo = async (todo) => {
        try {
            // Використовуємо правильний URL
            await axios.put(`${API_URL}todo/${todo.id}/`, todo);
            getTodos();
        } catch (err) {
            console.log(err);
        }
    };

    const deleteTodo = async (id) => {
        try {
            // Використовуємо правильний URL
            await axios.delete(`${API_URL}todo/${id}/`);
            getTodos();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="wrapper">
            <Container>
                <Row className="justify-content-center pt-5">
                    <Col>
                        <Card className="p-5">
                            <h3>My Todos</h3>
                            <AddTodo addTodo={addTodo} />
                            {todos.map((todo, index) => (
                                !todo.completed && (
                                    <Todo
                                        key={index}
                                        id={todo.id}
                                        title={todo.title}
                                        description={todo.description}
                                        completeTodo={completeTodo}
                                        editTodo={editTodo}
                                        deleteTodo={deleteTodo}
                                    />
                                )
                            ))}
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
