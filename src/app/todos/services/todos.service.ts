import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Filter } from '../types/filter';
import { Todo } from '../types/todo';

@Injectable()
export class TodosService {
  changeFilter(filterName: Filter): void {
    this.filter$.next(filterName);
  }

  todos$ = new BehaviorSubject<Todo[]>([]);
  filter$ = new BehaviorSubject<Filter>(Filter.all);

  constructor() {}

  toggleAll(isCompleted: boolean): void {
    console.log('toggleAll-isCompleted', isCompleted);
    const updatedTodos = this.todos$.getValue().map((todo) => {
      return {
        ...todo,
        isCompleted,
      };
    });
    this.todos$.next(updatedTodos);
    console.log('updatedTodos ', updatedTodos);
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
}
