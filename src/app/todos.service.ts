import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from './todo';
@Injectable({
  providedIn: 'root',
})
export class TodosService {
  todo: Todo = {
    completed: false,
    id: 1,
    title: 'read a book',
    userId: 1,
  };
  todos: Todo[] = [this.todo];
  todoUrl = 'https://jsonplaceholder.typicode.com/todos';
  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    let url = this.todoUrl;
    return this.http.get<Todo[]>(url);
    // .subscribe((res: Todo[]) => {
    //   this.todos = [...this.todos, ...res];
    //   console.log(this.todos);
    // });
  }

  addTodo(todo: Todo) {
    this.todos.unshift(todo);
    console.log(this.todos)
  }
  deleteTodo(id) {
    this.todos=this.todos.filter(todo=>todo.id!==id)
    console.log(this.todos)

  }
}
