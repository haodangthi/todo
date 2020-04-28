import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl}   from '@angular/forms';
import {TodosService} from '../todos.service'
import { Todo } from '../todo';
@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss']
})
export class CreateTodoComponent implements OnInit {
  inputVal:string
  createTodoForm:FormGroup
  todoLength=this.todoService.todos.length
  constructor(private todoService:TodosService) { }
  

  ngOnInit(): void {
    this.createTodoForm=new FormGroup({
      'id':new FormControl(null),
      title:new FormControl(null),
      'userId':new FormControl(1),
      'completed':new FormControl(false)
    })
  }
  onSubmit(){
    console.log(this.createTodoForm.value.title.trim())
    let val=this.createTodoForm.value
    return (val.title.trim())?this.todoService.addTodo(val):false
  }
  inputChange(){
    console.log(this.inputVal)
  }
  



}
