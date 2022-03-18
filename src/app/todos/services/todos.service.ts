import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from '../types/todo';

@Injectable()
export class TodosService {
  todos$ = new BehaviorSubject<Todo[]>([]);
  constructor() {}

  addTodo(text: string): void {
    const newTodo: Todo = {
      id: Math.random().toString(16),
      text: text,
      isCompleted: false,
    };
    const updatedTodos = [...this.todos$.getValue(), newTodo];
    this.todos$.next(updatedTodos);
  }
}
