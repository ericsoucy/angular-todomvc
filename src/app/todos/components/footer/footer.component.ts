import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { TodosService } from '../../services/todos.service';
import { Filter } from '../../types/filter';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  noTodoClass$!: Observable<boolean>;
  activeCount$!: Observable<number>;
  itemsLeftText$: Observable<string>;

  filter = Filter;
  filter$: Observable<Filter>;

  constructor(private todosService: TodosService) {
    this.filter$ = this.todosService.filter$;

    this.activeCount$ = this.todosService.todos$.pipe(
      map((todos) => todos.filter((todo) => !todo.isCompleted).length)
    );
    this.itemsLeftText$ = this.activeCount$.pipe(
      map((activeCount) => `item${activeCount !== 1 ? 's' : ''} left`)
    );
    this.noTodoClass$ = this.todosService.todos$.pipe(
      map((todos) => todos.length === 0)
    );
  }

  changeFilter(event: Event, filterName: Filter): void {
    event.preventDefault();
    this.todosService.changeFilter(filterName);
  }
  ngOnInit(): void {}
}
