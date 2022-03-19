import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { Todo } from '../../types/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit, OnChanges {
  @Input()
  todo!: Todo;

  @Input()
  isEditing!: boolean;

  @Output('setEditingId')
  setEditingIdEvent: EventEmitter<string | null> = new EventEmitter();

  @ViewChild('textInput')
  textInput!: ElementRef;

  editingText: string = '';

  constructor(private todosService: TodosService) {}

  ngOnInit(): void {
    this.editingText = this.todo.text;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isEditing'].currentValue) {
      setTimeout(() => {
        this.textInput.nativeElement.focus();
      }, 0);
    }
  }

  setTodoInEditMode(): void {
    this.setEditingIdEvent.emit(this.todo.id);
  }

  removeTodo(): void {
    this.todosService.removeTodo(this.todo.id);
  }

  toggleTodo(): void {
    this.todosService.toggleTodo(this.todo.id);
  }

  changeText(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.editingText = value;
  }
  changeTodo(): void {
    console.log('changeTodo', this.editingText);
    this.todosService.changeTodo(this.todo.id, this.editingText);
    this.setEditingIdEvent.emit(null); // closes edit mode
  }
}
