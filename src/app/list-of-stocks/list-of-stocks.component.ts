import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HttpService, ListOfStocksItem, SearchItem} from "../http.service";
import {PageEvent} from '@angular/material/paginator';
import {FormControl} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {debounceTime} from "rxjs/operators";

@Component({
  selector: 'app-list-of-stocks',
  templateUrl: './list-of-stocks.component.html',
  styleUrls: ['./list-of-stocks.component.css']
})

export class ListOfStocksComponent implements OnInit {
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

  constructor(private httpService: HttpService,
  ) {
    this.searchQueryControlSub = this.searchQueryControl.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(searchQuery => {
        this.httpService.search(searchQuery).subscribe((data) => {
          this.searchList = data;
          console.log(this.searchList);
        });
      });
  }

  ngOnInit(): void {
    this.httpService.getList().subscribe((data) => {
      this.list = data;
      this.length = data.length;
      this.getPaginatedData();
      console.log(this.list[0].ticker);
    });
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
