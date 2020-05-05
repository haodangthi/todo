import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from './todo';
import { Subject, BehaviorSubject } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class TodosService {
  todo: Todo = {
    completed: false,
    id: 1,
    title: 'read a book',
    userId: 1,
    created: null,
    deadline: null,
  };
  todos: Todo[] = JSON.parse(localStorage.getItem('todos')) || [];
  todos$: BehaviorSubject<Todo[]> = new BehaviorSubject(this.todos);
  createdNumber: number = JSON.parse(localStorage.getItem('totalCreated')) || 0
  todoUrl = 'https://jsonplaceholder.typicode.com/todos';
  constructor(private http: HttpClient) {}
  getHttp() {
    let url = this.todoUrl;
    return this.http.get<Todo[]>(url);
  }

  getTodos() {
    return this.todos$;
  }
  emit(res) {
    this.todos$.next(res);
    localStorage.setItem('todos', JSON.stringify(res));
  }

  addTodo(todo: Todo) {
    todo.id = this.createdNumber + 1;
    this.createdNumber++;
    todo.completed = false;
    todo.userId = 1;
    todo.created = new Date();
    this.todos.unshift(todo);
    // this.todos$.next(this.todos);
    this.emit(this.todos);
    localStorage.setItem('totalCreated',JSON.stringify(this.createdNumber))
  }
  deleteTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    
    console.log(this.todos);
    //this.todos$.next(this.todos);
    this.emit(this.todos);
  }
  editTodo(title, id) {
    this.todos.map((todo) => {
      if (id === todo.id) {
        console.log(todo.title);
        todo.title = title;
      }
      return todo;
    });
    //this.todos$.next(this.todos);
    this.emit(this.todos);
  }
  check(id, value) {
    this.todos = this.todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = value;
      }
      return todo;
    });
    this.emit(this.todos);
    //this.todos$.next(this.todos);
  }

  search(input) {
    let filtered = this.todos.filter(
      (todo) => todo.title.toUpperCase().indexOf(input.toUpperCase()) > -1
    );
    console.log(filtered);
    this.todos$.next(filtered);
  }

  searchFiltered(input) {
    this.todos$.next(
      this.todos$.value.filter(
        (todo) => todo.title.toUpperCase().indexOf(input.toUpperCase()) > -1
      )
    );
  }
  sort(completed) {
    if (completed == undefined) {
      return;
    }
    this.todos$.next(
      this.todos.filter((todo) => todo.completed === completed)
    );
  }
  sortByCreated(recent) {
    if (recent == undefined) {
      return;
    }
    this.showAscending(recent, 'created');
  }

  sortByDeadline(latest) {
    if (latest == undefined) {
      return;
    }
    this.showAscending(latest, 'deadline');
  }
  showAscending(ascending, key) {
    console.log(Array.isArray(this.todos$.value));
    if (ascending) {
      this.todos$.value.sort((todo1, todo2) => {
        let date1=new Date(todo1[key])
        let date2=new Date(todo2[key])
        
        //return  date2.getDate()- date1.getDate();
        return date2.getTime()- date1.getTime()
      });
      console.log('sorted', this.todos$.value);
    } else {
      this.todos$.value.sort((todo1, todo2) => {
        let date1=new Date(todo1[key])
        let date2=new Date(todo2[key])
        
        //return  date1.getDate()- date2.getDate();
        return date1.getTime()- date2.getTime()
      });
      console.log('sorted2', this.todos$.value);
    }
    this.todos$.next(this.todos$.value);
  }
  reset() {
    this.todos$.next(this.todos);
  }
}
