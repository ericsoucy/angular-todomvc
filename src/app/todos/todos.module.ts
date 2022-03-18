import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosComponent } from './components/todos/todos.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: TodosComponent }];

@NgModule({
  declarations: [TodosComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodosModule {}
