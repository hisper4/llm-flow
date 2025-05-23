import TodoList from "./_components/todo-list";

export default function TodoListPage () {
  return <div className="flex flex-col gap-8 min-h-screen px-6 py-8">
      <h2 className="text-xl font-bold text-center">Todo List</h2>

      <TodoList />
  </div>
}