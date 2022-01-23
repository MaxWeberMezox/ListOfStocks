import {Component, OnInit} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {FormControl} from '@angular/forms';
import {Store, select} from '@ngrx/store'
import {Subscription} from 'rxjs';
import {debounceTime} from "rxjs/operators";

import {HttpService, ListOfStocksItem, SearchItem} from '../http.service';
import {AppState} from '../store/states/app.state'
import {
  GetListOfStocks,
  GetSearchStocks,
  GetStockItem,
  ListOfStocksActions
} from '../store/actions/list-of-stocks.actions'
import {selectListOfStocks, selectSearchStocks} from '../store/selectors/list-of-stocks.selector'

@Component({
  selector: 'app-list-of-stocks',
  templateUrl: './list-of-stocks.component.html',
  styleUrls: ['./list-of-stocks.component.css']
})

export class ListOfStocksComponent implements OnInit {
  listOfStocks$ = this._store.pipe(select(selectListOfStocks));
  searchStocks$ = this._store.pipe(select(selectSearchStocks));
  pageSize = 15;
  length = 0;
  pageSizeOptions = [this.pageSize];
  paginatedList: ListOfStocksItem[] = [];
  list: ListOfStocksItem[] = [];
  displayedColumns = ['ticker', 'prevClose', 'open', 'high', 'mid', 'low', 'bidSize', 'bidPrice', 'askSize', 'askPrice'];
  searchQuery = '';
  searchQueryControl = new FormControl();
  searchQueryControlSub: Subscription;
  searchList: SearchItem[] = [];

  constructor(private httpService: HttpService, private _store: Store<AppState>) {
    this.searchQueryControlSub = this.searchQueryControl.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(searchQuery => {
        if (searchQuery) this._store.dispatch(new GetSearchStocks(searchQuery));
      });
  }

  ngOnInit(): void {
    this._store.dispatch(new GetListOfStocks());
    this.listOfStocks$.subscribe((data) => {
      this.list = data;
      this.length = data.length;
      this.getPaginatedData()
    })
    // this.httpService.getList().subscribe((data) => {
    //   this.list = data;
    //   this.length = data.length;
    //   this.getPaginatedData();
    // });
  }

  getPaginatedData(event?: PageEvent) {
    if (event) {
      const {pageIndex, pageSize} = event;
      const startIndex = pageIndex * pageSize;
      const endIndex = pageSize + startIndex;
      this.paginatedList = this.list.slice(startIndex, endIndex);
    } else {
      this.paginatedList = this.list.slice(0, this.pageSize);
    }
  }

  ngOnDestroy() {
    this.searchQueryControlSub.unsubscribe();
  }
}
