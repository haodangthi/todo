import { Component, OnInit } from '@angular/core';
import { TodosService } from '../todos.service';
import { Todo } from '../todo';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  constructor(private todoService: TodosService) { }

  ngOnInit(): void {
    this.todoService.todos$.subscribe((res) => this.todos = res)
    this.todoService.loadTodos().subscribe((res: Todo[]) => {
      this.todos = res
      this.todoService.todos = res
    })
  }
}