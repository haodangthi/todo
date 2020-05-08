import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TodosService } from '../todos.service';
import { Subject } from 'rxjs';
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
      title: new FormControl(null,[Validators.required]),
      userId: new FormControl(1),
      completed: new FormControl(false),
      created: new FormControl(null),
      deadline: new FormControl(null,[Validators.required]),
    });

    this.search$.subscribe((input) => {
      this.todoService.search(input);
    });

  }
  ngOnDestroy(){
    this.search$.unsubscribe()
    

  }
  onSubmit() {
    let val = this.createTodoForm.value;
    val.created = new Date();
    this.createTodoForm.reset();
    this.todoService.create(val).subscribe(res => {this.todoService.loading$.next(false); console.log(res); val.id = res.name; this.todoService.addTodo(val) }, error => console.error(error))
    
  }

  input(value) {
    this.search$.next(value);
  }
}
