import { Component, OnInit, Input } from '@angular/core';
import { Todo } from '../todo';
import { TodosService } from '../todos.service';
import { Subject, BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  @Input() todo: Todo;
  @Input() index: number;
  edit: boolean = false;
  inputTitle: string;

  id: number;
  userId: number;
  title: string;
  completed:boolean;
  created:any=''
  deadline:any=''
  //completed$: BehaviorSubject<boolean>=new BahaviorSubject(this.completed)

  constructor(private todoService: TodosService) {}

  ngOnInit(): void {
    this.initTodo(this.todo);
   // this.completed$.subscribe()
  }
  initTodo(todo) {
    this.id = todo.id;
    this.userId = todo.userId;
    this.title = todo.title;
    this.completed = todo.completed;
    this.created=todo.created;
    this.deadline=todo.deadline;
  }
  editTitle() {
    this.edit = !this.edit;
    return this.edit ? true : this.saveTitle();
  }
  saveTitle() {
    this.todoService.editTodo(this.inputTitle, this.id)
    this.todoService.todos$.subscribe(res=>
      res.map(todo=>{
        if(todo.id===this.id){
          this.title=todo.title
        }
      }))
  }
  deleteTodo() {
    console.log(this.id)
    this.todoService.deleteTodo(this.id);
  }
  check(value) {
    console.log(this.id);
    this.todoService.check(this.id,value);
  }
}
