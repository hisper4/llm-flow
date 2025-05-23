import { TodoItem as TodoItemType } from "../_model";
import TodoItem from './todo-item'

interface TodoItemsProps {
  todoItems: TodoItemType[]
  onDelete(id: TodoItemType['id']): void
  onEdit(id: TodoItemType['id'], content: TodoItemType['content']): void
  onComplete(id: TodoItemType['id'], completed: TodoItemType['completed']): void
}

export default function TodoItems ({todoItems, onDelete, onEdit, onComplete}: TodoItemsProps) {
  return <div className="flex flex-col gap-8">
    {todoItems.length ? todoItems.map((todoItem) => <TodoItem key={todoItem.id}  {...{todoItem, onDelete, onEdit, onComplete}}/>) : <h2 className="font-bold text-center p-4">Not todos found. Use Input to add new todo!</h2> }
  </div>
}