import { Component, OnInit,  OnDestroy } from '@angular/core';
import { Subject} from 'rxjs';
import { TodosService } from '../todos.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit,OnDestroy {
  selectedValue: boolean;
  selectedDate: boolean;
  selectedDeadline: boolean;
  searchFiltered$ = new Subject();
  sort$ = new Subject();
  sortByDate$ = new Subject();
  sortByDeadline$ = new Subject();

  constructor(private todoService: TodosService) { }

  todos = [
    { value: true, viewValue: 'Completed' },
    { value: false, viewValue: 'Not Completed' },
    { value: null, viewValue: 'All' }
  ];
  sortByDate = [
    { value: true, viewValue: 'Recent first' },
    { value: false, viewValue: 'Older first' },
    { value: null, viewValue: 'All' }
  ];
  sortDueDate = [
    { value: false, viewValue: 'Earliest deadline' },
    { value: true, viewValue: 'Latest deadline' },
    { value: null, viewValue: 'All' }
  ]

  ngOnInit(): void {
    this.sort$.subscribe((value) =>
      this.todoService.sort(value)
    );
    this.sortByDate$.subscribe((value) =>
      this.todoService.sortByCreated(value)
    );
    this.sortByDeadline$.subscribe((value) =>
      this.todoService.sortByDeadline(value)
    );
    this.searchFiltered$.subscribe((value) =>
      this.todoService.searchFiltered(value)
    );
  }
  ngOnDestroy(){
    this.sort$.unsubscribe()
    this.sortByDate$.unsubscribe()
    this.sortByDeadline$.unsubscribe()
    this.searchFiltered$.unsubscribe()

  }

  
  filterInput = (value) =>
    this.searchFiltered$.next(value)


  sort = () => this.sort$.next(this.selectedValue);
  sortDate() {
    this.sortByDate$.next(this.selectedDate);
    this.sortByDeadline$.next(this.selectedDeadline)
 }

  reset = () =>
    this.todoService.reset();

}
