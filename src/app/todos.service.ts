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
  createdNumber: number = JSON.parse(localStorage.getItem('totalCreated')) || 1;
  todoUrl = 'https://jsonplaceholder.typicode.com/todos';
  databaseURL='https://todo-app-9a673.firebaseio.com/todos'
  constructor(private http: HttpClient) {}

create(todo:Todo):Observable<any>{
  return this.http.post<any>(this.databaseURL+'.json',todo).pipe(res=>{
    console.log(res);
    return res
  })
}
loadTodos(){
  return this.http.get<Todo[]>(this.databaseURL+'.json').pipe(
    map(res=>Object.keys(res).map(key=>({...res[key],id:key})))
  )
}



  addTodo(todo: Todo) {
    //todo.id = this.createdNumber;
    todo.completed = false;
    todo.userId = 1;
    
    this.todos.unshift(todo);
    

    this.updateTodos(this.todos);
    this.updateNumberCreated(this.createdNumber++);
  }
  deleteTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this.updateTodos(this.todos);
  }
  editTodo(title, id) {
    this.todos.map((todo) => changeValue(todo, id, 'title', title));
    this.updateTodos(this.todos);
  }
  check(id, value) {
    this.todos.map((todo) => changeValue(todo, id, 'completed', value));
    this.updateTodos(this.todos);
  }

  search = (input) =>
    this.todos$.next(this.todos.filter((todo) => contains(todo, input)));

  searchFiltered = (input) =>
    this.todos$.next(this.todos$.value.filter((todo) => contains(todo, input)));

  sort = (completed) =>
    completed == undefined
      ? true
      : this.todos$.next(
          this.todos.filter((todo) => todo.completed === completed)
        );

  sortByCreated = (recent) =>
    recent === undefined ? true : this.showAscending(recent, 'created');
  sortByDeadline = (latest) =>
    latest === undefined ? true : this.showAscending(latest, 'deadline');

  showAscending(ascending, key) {
    ascending
      ? this.todos$.value.sort((todo1, todo2) =>
          dateDifference(todo2, todo1, key)
        )
      : this.todos$.value.sort((todo1, todo2) =>
          dateDifference(todo1, todo2, key)
        );

    console.log('sorting');
    this.todos$.next(this.todos$.value);
  }

  reset() {
    this.todos$.next(this.todos);
  }
  getHttp() {
    let url = this.todoUrl;
    return this.http.get<Todo[]>(url);
  }

  updateTodos(res) {
    this.todos$.next(res);
    localStorage.setItem('todos', JSON.stringify(res));
  }
  updateNumberCreated = (createdNumber) =>
    localStorage.setItem('totalCreated', JSON.stringify(createdNumber));
}

const getDate = (todo, key) => new Date(todo[key]).getTime();
const dateDifference = (todo1, todo2, key) =>
  getDate(todo1, key) - getDate(todo2, key);
const contains = (todo, input) =>
  todo.title.toUpperCase().indexOf(input.toUpperCase()) > -1;

const changeValue = (item, id, key, value) => {
  if (item.id === id) {
    item[key] = value;
    return item;
  }
};
