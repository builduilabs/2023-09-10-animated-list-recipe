"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

let initialTodos = [
  { id: 3, text: "Todo 3" },
  { id: 2, text: "Todo 2" },
  { id: 1, text: "Todo 1" },
];
type Todo = (typeof initialTodos)[number];

export default function SimpleList() {
  let [todos, setTodos] = useState(initialTodos);

  function addTodo() {
    let newId = Math.max(...todos.map((t) => t.id)) + 1;
    setTodos([{ id: newId, text: `Todo ${newId}` }, ...todos]);
  }

  function removeTodo(todo: Todo) {
    setTodos((todos) => todos.filter((t) => t.id !== todo.id));
  }

  return (
    <div>
      <button onClick={addTodo}>Add todo</button>
      <ul>
        <AnimatePresence initial={false}>
          {todos.map((todo) => (
            <motion.li
              key={todo.id}
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              style={{ overflow: "hidden" }}
            >
              <button onClick={() => removeTodo(todo)}>{todo.text}</button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
