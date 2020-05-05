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

  constructor(private todoService: TodosService) {}

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
      console.log('input stream', input);
      this.todoService.search(input);
    });
  }
  onSubmit() {
    let val = this.createTodoForm.value;
    console.log('date', this.createTodoForm.value.deadline);
    this.createTodoForm.reset();
    return val.title.trim() ? this.todoService.addTodo(val) : false;
  }

  input(value) {
    this.search$.next(value);
  }
}
