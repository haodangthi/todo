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
  todos: Todo[] = []
  todos$: BehaviorSubject<Todo[]> = new BehaviorSubject(this.todos);
  //todoUrl = 'https://jsonplaceholder.typicode.com/todos';
  databaseURL = 'https://todo-app-9a673.firebaseio.com/todos'
  constructor(private http: HttpClient) { }

  create(todo: Todo): Observable<any> {
    return this.http.post<any>(this.databaseURL + '.json', todo).pipe(res => {
      console.log(res);
      return res
    })
  }
  delete(id) {
    this.deleteTodo(id)
    return this.http.delete<void>(`${this.databaseURL}/${id}.json`)
  }
  loadTodos() {
    return this.http.get<Todo[]>(this.databaseURL + '.json').pipe(
      map(res => {
        return res ? Object.keys(res).map(key => ({ ...res[key], id: key })) : []
      }),
      map((res: Todo[]) => { this.todos$.next(res); return res })
    )
  }
  addTodo(todo: Todo) {
    todo.completed = false;
    todo.userId = 1;
    this.todos.unshift(todo);
    this.updateTodos(this.todos);
   
  }
  deleteTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this.updateTodos(this.todos);
    
  }
  editTodo(todo, title, id) {
    this.todos.map((todo) => changeValue(todo, id, 'title', title));
    this.updateTodos(this.todos);
    return this.http.put(`${this.databaseURL}/${id}.json`, { ...todo, title })
  }
  check(todo, id, completed) {
    this.todos.map((todo) => changeValue(todo, id, 'completed', completed));
    this.updateTodos(this.todos);
    return this.http.put(`${this.databaseURL}/${todo.id}.json`, { ...todo, completed })
  }

  search = (input) =>
    this.todos$.next(this.todos.filter((todo) => contains(todo, input)));

  searchFiltered = (input) =>
    this.todos$.next(this.todos$.value.filter((todo) => contains(todo, input)));

  sort = (completed) =>
    completed == null
      ? true
      : this.todos$.next(
        this.todos.filter((todo) => todo.completed === completed)
      );

  sortByCreated = (recent) =>
    recent === null ? true : this.showAscending(recent, 'created');
  sortByDeadline = (latest) =>
    latest === null ? true : this.showAscending(latest, 'deadline');

  showAscending(ascending, key) {
    ascending
      ? this.todos$.value.sort((todo1, todo2) =>
        dateDifference(todo2, todo1, key)
      )
      : this.todos$.value.sort((todo1, todo2) =>
        dateDifference(todo1, todo2, key)
      );
    this.todos$.next(this.todos$.value);
  }

  reset=()=> this.todos$.next(this.todos);
  

  updateTodos=(res) =>this.todos$.next(res);
  
 
}

const getDate = (todo, key) => new Date(todo[key]).getTime();
const dateDifference = (todo1, todo2, key) =>
  getDate(todo1, key) - getDate(todo2, key);
const contains = (todo, input) =>
  todo.title.toUpperCase().indexOf(input.toUpperCase()) > -1;

const changeValue = (item, id, key, value) => {
  console.log(id, item.id)

  if (item.id === id) {
    item[key] = value;
   } return item;
};