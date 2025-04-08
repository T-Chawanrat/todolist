import { create } from "zustand";

export const useTodoStore = create((set) => ({
  todos: JSON.parse(localStorage.getItem("todos")) || [],
  addTodo: (text) =>
    set((state) => {
      const newTodos = [
        ...state.todos,
        { id: Date.now(), text, completed: false },
      ];
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return { todos: newTodos };
    }),
  deleteTodo: (id) =>
    set((state) => {
      const newTodos = state.todos.filter((todo) => todo.id !== id);
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return { todos: newTodos };
    }),
  toggleComplete: (id) =>
    set((state) => {
      const newTodos = state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return { todos: newTodos };
    }),
  updateTodo: (id, newText) =>
    set((state) => {
      const newTodos = state.todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      );
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return { todos: newTodos };
    }),
}));

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("theme") || "dark",
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      document.documentElement.classList.toggle("dark", newTheme === "dark");
      return { theme: newTheme };
    }),
}));
