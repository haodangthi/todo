import { Component, OnInit, Input } from '@angular/core';
import { Todo } from '../todo';
import {TodosService} from '../todos.service'
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  @Input() todo: Todo;
  @Input() index: number;
  edit: boolean = false;
  inputTitle:string;
  // editBtn:string=this.edit?'Save':'Edit'
  id: number;
  userId: number;
  title: string;
  completed: boolean;
  

  constructor(private todoService:TodosService) {}

  ngOnInit(): void {
    this.initTodo(this.todo);
  }
  initTodo(todo) {
    this.id = todo.id;
    this.userId = todo.userId;
    this.title = todo.title;
    this.completed = todo.completed;
  }
  editTitle() {
    this.edit = !this.edit;
    return this.edit?true:this.saveTitle(this.inputTitle)
    
  }
  saveTitle(title){
    this.title=title
  }
  deleteTodo(){
    this.todoService.deleteTodo(this.id)
  }
}
