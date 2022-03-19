import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Filter } from '../types/filter';
import { Todo } from '../types/todo';

@Injectable()
export class TodosService {
  todos$ = new BehaviorSubject<Todo[]>([]);
  filter$ = new BehaviorSubject<Filter>(Filter.all);

  constructor() {}

  toggleAll(isCompleted: boolean): void {
    const updatedTodos = this.todos$.getValue().map((todo) => {
      return {
        ...todo,
        isCompleted,
      };
    });
    this.todos$.next(updatedTodos);
  }

  toggleTodo(id: string) {
    const updatedTodos = this.todos$.getValue().map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }
      return todo;
    });
    this.todos$.next(updatedTodos);
  }

  addTodo(text: string): void {
    const newTodo: Todo = {
      id: Math.random().toString(16),
      text: text,
      isCompleted: false,
    };
    const updatedTodos = [...this.todos$.getValue(), newTodo];
    this.todos$.next(updatedTodos);
  }

  changeFilter(filterName: Filter): void {
    this.filter$.next(filterName);
  }

  removeTodo(id: string): void {
    const updatedTodos = this.todos$
      .getValue()
      .filter((todo) => todo.id !== id);
    this.todos$.next(updatedTodos);
  }

  changeTodo(id: string, text: string): void {
    const updatedTodos = this.todos$.getValue().map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          text,
        };
      }
      return todo;
    });
    this.todos$.next(updatedTodos);
  }
}
