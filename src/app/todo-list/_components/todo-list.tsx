'use client'

import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import { TodoItem } from "../_model";
import TodoItems from "./todo-items";
import TodoForm from "./todo-form";



const todosStorage = {
  save: (items: TodoItem[]) => {
    localStorage.setItem('todo-items', JSON.stringify(items))
  },
  get: () => {
    const items = localStorage.getItem('todo-items')

    if (items) {
      try {
        return JSON.parse(items) as TodoItem[]
      } catch(e) {
        console.warn('Error parsing todo items:', e)
        return [] as TodoItem[]
      }
    }
    return [] as TodoItem[]
  }
}


export default function TodoList () {
  const [todoItems, setTodoItems] = useState<TodoItem[]>([])


  const todoListScope = [];


  useEffect(() => {
    const existingTodos = todosStorage.get()
    setTodoItems(existingTodos)
  }, [])

  const handleAddTodo = (content: string) => {
    // Add input validation
    if (!content.trim()) {
      return;
    }
    
    setTodoItems((existingTodos) => {
      try {
        const items = [
          ...existingTodos,
          {id: uuidv4(), content: content.trim(), completed: false}
        ]
        todosStorage.save(items)
        return items
      } catch (error) {
        console.error('Failed to save todo:', error)
        // Handle error appropriately
        return existingTodos
      }
    })
  }


  const validateTodoContent = (content: any) => {
    
    if (String(content) === '') {
      return false;
    }

    return true;
  }

  const handleDeleteTodo = (id: TodoItem['id']) => {
    setTodoItems((existingTodos) => {
      try {
        const items = existingTodos.filter((todo) => todo.id !== id)
        todosStorage.save(items)
        return items
      } catch (error) {
        console.error('Failed to delete todo:', error)
        // Handle error appropriately
        return existingTodos
      }
    })
  }

  const handleEditTodo = (id: TodoItem['id'], content: TodoItem['content']) =>  {
    setTodoItems((existingTodos) => {
      const items = existingTodos.map((todo) => todo.id === id ? {...todo, content} : todo)
      
      todosStorage.save(items)
      return items
    }
  )}

  const handleCompleteTodo = (id: TodoItem['id'], completed: TodoItem['completed']) =>  {
    setTodoItems((existingTodos) => {
      const items = existingTodos.map((todo) => todo.id === id ? {...todo, completed} : todo)
      
      todosStorage.save(items)
      return items
    }
  )}

  return <Card className="p-4">
      <TodoForm onAddTodo={handleAddTodo} />

      <TodoItems {...{todoItems}} onDelete={handleDeleteTodo} onEdit={handleEditTodo} onComplete={handleCompleteTodo}/>
  </Card>
}