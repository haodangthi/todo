import { Component, OnInit, Input } from '@angular/core';
import { Todo } from '../todo';
import { TodosService } from '../todos.service';

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
  completed: boolean;
  created: any = ''
  deadline: any = ''

  constructor(private todoService: TodosService) { }

  ngOnInit(): void {
    this.initTodo(this.todo);
  }
  initTodo(todo: Todo) {
    this.id = todo.id;
    this.userId = todo.userId;
    this.title = todo.title;
    this.completed = todo.completed;
    this.created = todo.created;
    this.deadline = todo.deadline;
  
  }
  editTitle() {
    this.edit = !this.edit;
    return this.edit ? true : this.saveTitle();
  }
  saveTitle() {
    this.todoService.editTodo(this.todo, this.inputTitle, this.id).subscribe()
    this.todoService.todos$.subscribe(res =>
      res.map(todo => {
        if (todo.id === this.id) {
          this.title = todo.title
        }
      }))
  }
  deleteTodo = () =>
    this.todoService.delete(this.id).subscribe()

  check = (value) =>
    this.todoService.check(this.todo, this.id, value).subscribe();

}