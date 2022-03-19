import { Component, OnInit } from '@angular/core';
import { combineLatest, filter, map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { TodosService } from '../../services/todos.service';
import { Filter } from '../../types/filter';
import { Todo } from '../../types/todo';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  visibleTodos$!: Observable<Todo[]>;

  constructor(private todosService: TodosService) {
    this.visibleTodos$ = combineLatest([
      this.todosService.todos$,
      this.todosService.filter$,
    ]).pipe(
      map(([todos, filter]: [Todo[], Filter]) => {
        console.log('combine', todos, filter);
        if (filter === Filter.active) {
          return todos.filter((todo) => !todo.isCompleted);
        } else if (filter === Filter.completed) {
          return todos.filter((todo) => todo.isCompleted);
        }
        return todos;
      })
    );
  }

  ngOnInit(): void {}
}
