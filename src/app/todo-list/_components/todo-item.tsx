'use client'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { TodoItem } from "../_model";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox"

import { cn } from "@/lib/utils";

interface TodoItemProps {
  todoItem: TodoItem
  onDelete(id: TodoItem['id']): void
  onEdit?(
  id: TodoItem['id'],
  content: TodoItem['content']
): void
onComplete(id: TodoItem['id'], completed: TodoItem['completed']): void
}

export default function TodoItem({todoItem, onDelete, onEdit, onComplete}: TodoItemProps) {
  const [content, setContent] = useState(todoItem.content)
  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    setContent(todoItem.content)
  }, [todoItem.content])

  const handleEditTodo = () => {
    if (!content) {
      return
    }

    onEdit?.(todoItem.id, content)
    setEditMode(false)
  }

  return <Card className={cn({
    "text-muted": todoItem.completed 
  })}>

     <div className="flex flex-row gap-2 align-center">
      <Checkbox 
        className="w-[22px] h-[22px]" 
        checked={todoItem.completed} 
        id={`todo-${todoItem.id}`} 
        onCheckedChange={(status) => {
          onComplete(todoItem.id, Boolean(status))
        }}
      />

        <CardHeader className={cn("w-full",{
          "text-muted pointer-events-none cursor-none": editMode
        })}>
    
        <CardTitle>
          {todoItem.content}
        </CardTitle>
      </CardHeader>
    </div>
     
    {editMode && <CardContent className="flex flex-col gap-2">
      <Textarea value={content} placeholder="Update todo" onChange={(e) => setContent(e.target.value) } />

      <Button disabled={!content} onClick={handleEditTodo}>Save</Button>
    </CardContent> }
    

    {!editMode && <CardFooter className="flex justify-between">
      <Button variant='destructive' onClick={() => onDelete(todoItem.id)}>Delete</Button>
      <Button onClick={() => {
        setEditMode(true)
      }}>Edit</Button>
    </CardFooter>}
  </Card>
}