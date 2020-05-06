import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TodosService } from '../todos.service';
import { Todo } from '../todo';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss'],
})
export class CreateTodoComponent implements OnInit {
  inputVal: string;
  createTodoForm: FormGroup;
  todoLength = this.todoService.todos$.value.length;
  search$ = new Subject();

  constructor(private todoService: TodosService) { }

  ngOnInit(): void {
    this.createTodoForm = new FormGroup({
      id: new FormControl(null),
      title: new FormControl(null),
      userId: new FormControl(1),
      completed: new FormControl(false),
      created: new FormControl(null),
      deadline: new FormControl(null),
    });

    this.search$.subscribe((input) => {
      this.todoService.search(input);
    });

  }
  onSubmit() {
    let val = this.createTodoForm.value;
    val.created = new Date();
    this.createTodoForm.reset();
    this.todoService.create(val).subscribe(res => { console.log(res); val.id = res.name; this.todoService.addTodo(val) }, error => console.error(error))

  }

  input(value) {
    this.search$.next(value);
  }
}
