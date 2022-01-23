import {Action} from '@ngrx/store'
import {ListOfStocksItem, StockItem, SearchItem} from '../../http.service'

export enum EStocksActions {
  GetListOfStocks = '[ListOfStocks] Get ListOfStocks',
  GetListOfStocksSuccess = '[ListOfStocks] Get ListOfStocks Success',
  GetStockItem = '[StockItem] Get StockItem',
  GetStockItemSuccess = '[StockItem] StockItem Success',
  GetSearchStocks = '[SearchStock] Get SearchStock',
  GetSearchStocksSuccess = '[SearchStock] Get SearchStock Success',
}

export class GetListOfStocks implements Action {
  public readonly type = EStocksActions.GetListOfStocks;
}

export class GetListOfStocksSuccess implements Action {
  public readonly type = EStocksActions.GetListOfStocksSuccess;

  constructor(public payload: ListOfStocksItem[]) {
  }
}

export class GetStockItem implements Action {
  public readonly type = EStocksActions.GetStockItem;

  constructor(public payload: string) {
  }
}

export class GetStockItemSuccess implements Action {
  public readonly type = EStocksActions.GetStockItemSuccess;

  constructor(public payload: StockItem[]) {
  }
}

export class GetSearchStocks implements Action {
  public readonly type = EStocksActions.GetSearchStocks;

  constructor(public payload: string) {
  }
}

export class GetSearchStocksSuccess implements Action {
  public readonly type = EStocksActions.GetSearchStocksSuccess;

  constructor(public payload: SearchItem[]) {
  }
}

export type ListOfStocksActions =
  GetListOfStocks
  | GetListOfStocksSuccess
  | GetStockItem
  | GetStockItemSuccess
  | GetSearchStocks
  | GetSearchStocksSuccess
