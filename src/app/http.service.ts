import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
const options = {params: {token:'9ba04d8fae2c55e918dd6a429a9a0ceaa5f82593'}};

export interface ListOfStocksItem {
  ticker: string;
  timestamp: string;
  quoteTimestamp: string;
  lastSaleTimestamp: string;
  last: number | null;
  lastSize: number | null;
  tngoLast: number | null;
  prevClose: number | null;
  open: number | null;
  high: number | null;
  low: number | null;
  mid: number | null;
  volume: number | null;
  bidSize: number | null;
  bidPrice: number | null;
  askSize: number | null;
  askPrice: number | null;
}

export interface StockItem {
  date: string;
  close: number;
  high: number;
  low: number;
  open: number;
}

export interface SearchItem {
  ticker: string;
  name: string;
  assetType: string;
  isActive: boolean;
  permaTicker: string;
  openFIGI: string;
}


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {

  }
  getList(): Observable<ListOfStocksItem[]>{
    return this.http.get<ListOfStocksItem[]>('https://api.tiingo.com/iex/', options );
  }
  getStock(ticker: string): Observable<StockItem[]>{
    return this.http.get<StockItem[]>(`https://api.tiingo.com/iex/${ticker}/prices`, options)
  }
  search(query: string):Observable<SearchItem[]>{
    return this.http.get<SearchItem[]>(`https://api.tiingo.com/tiingo/utilities/search/${query}`, options)
  }
}
