'use client'

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { TodoItem } from "../_model"
import { useState } from "react"


interface TodoFormProps {
  onAddTodo(content: TodoItem['content']): void
}

export default function TodoForm ({onAddTodo}: TodoFormProps) {
  const [todoContent, setTodoContent] = useState<string>('')

  const handleAddTodo = () => {

    if (!todoContent) {
      return
    }

    onAddTodo(todoContent)
    setTodoContent('')
  }

  return <div className="flex flex-col gap-4">
    <Textarea value={todoContent} placeholder="Todo content type here..." onChange={(e) => setTodoContent(e.target.value) } />

    <Button onClick={handleAddTodo} disabled={!todoContent}>Add New Todo</Button>
  </div>
}