import { Component, OnInit,OnDestroy } from '@angular/core';
import { TodosService } from '../todos.service';
import { Todo } from '../todo';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit,OnDestroy {
  todos: Todo[] = [];
  constructor(private todoService: TodosService) { }
  isLoading:boolean=true

  ngOnInit(): void {
    this.todoService.todos$.subscribe((res) => {
      this.todos = res; 
    })
    this.todoService.loadTodos().subscribe((res: Todo[]) => {
      this.isLoading=false
      this.todos = res
      this.todoService.todos = res
    })
    this.todoService.loading$.subscribe(res=>this.isLoading=res)
  }
  ngOnDestroy() {
    this.todoService.todos$.unsubscribe()
    this.todoService.loading$.unsubscribe()
  }
}