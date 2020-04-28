import { Component, OnInit } from '@angular/core';
import {TodosService} from '../todos.service'
import { Todo } from '../todo';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})

export class TodoListComponent implements OnInit {
  todos:Todo[]=[]
  constructor(private todoService:TodosService) { }

  ngOnInit(): void {
    this.getTodos()
    
  }
  getTodos(){
    this.todoService.getTodos()
    .subscribe((res: Todo[]) => {
      //this.todos = [...this.todoService.todos, ...res];
      this.todos=this.todoService.todos;
      console.log(this.todos)
    });

}
}