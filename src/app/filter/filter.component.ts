import { Component, OnInit } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { TodosService } from '../todos.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  selectedValue: boolean;
  selectedDate: boolean;
  selectedDeadline:boolean;

  searchFiltered$ = new Subject();
  sort$ = new Subject();
  sortByDate$ = new Subject();
  sortByDeadline$ = new Subject();

  constructor(private todoService: TodosService) {}

  todos = [
    { value: true, viewValue: 'Completed' },
    { value: false, viewValue: 'Not Completed' },
    { value: undefined, viewValue: 'All' }
  ];
  sortByDate = [
    { value: true, viewValue: 'Recent first' },
    { value: false, viewValue: 'Older first' },
    { value: undefined, viewValue: 'All' }
  ];
  sortDueDate=[
    { value: false, viewValue: 'Earliest deadline' },
    { value: true, viewValue: 'Latest deadline' },
    { value: undefined, viewValue: 'All' }
  ]

  ngOnInit(): void {
    this.sort$.subscribe((value) => {
      console.log('select stream', value);
      this.todoService.sort(value);
    });
    this.sortByDate$.subscribe((value) => {
      console.log('date stream', value);
      this.todoService.sortByCreated(value);
    });
    this.sortByDeadline$.subscribe((value) => {
      console.log('deadline stream', value);
      this.todoService.sortByDeadline(value);
    });
    this.searchFiltered$.subscribe((value) =>
      this.todoService.searchFiltered(value)
    );
  }
  filterInput(value) {
    this.searchFiltered$.next(value);
  }

  sort() {
    this.sort$.next(this.selectedValue);
   
  }
 sortDate(){
  this.sortByDate$.next(this.selectedDate);
  this.sortByDeadline$.next(this.selectedDeadline)

 }

  reset() {
    this.todoService.reset();
  }
}
