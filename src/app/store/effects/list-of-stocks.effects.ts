import {Injectable} from "@angular/core";
import {Effect, ofType, Actions} from "@ngrx/effects";
import {Store, select} from "@ngrx/store";
import {of} from "rxjs";
import {switchMap, map, withLatestFrom} from "rxjs/operators";

import {AppState} from "../states/app.state";
import {
  GetListOfStocks,
  EStocksActions,
  GetListOfStocksSuccess,
  GetStockItem,
  GetStockItemSuccess, GetSearchStocks,
  GetSearchStocksSuccess,
} from "../actions/list-of-stocks.actions";
import {ListOfStocksItem, SearchItem, StockItem} from '../../http.service'
import {HttpService} from "../../http.service";

@Injectable()
export class ListOfStocksEffects {
  @Effect()
  getListOfStocks$ = this._actions$.pipe(
    ofType<GetListOfStocks>(EStocksActions.GetListOfStocks),
    switchMap(() => this._httpService.getList()),
    switchMap((listOfStocksHttp: ListOfStocksItem[]) => of(new GetListOfStocksSuccess(listOfStocksHttp)))
  );

  @Effect()
  getStockItem$ = this._actions$.pipe(
    ofType<GetStockItem>(EStocksActions.GetStockItem),
    map(action => action.payload),
    switchMap((ticker) => this._httpService.getStock(ticker)),
    switchMap((stockItem: StockItem[]) => of(new GetStockItemSuccess(stockItem)))
  );

  @Effect()
  getSearchStocks$ = this._actions$.pipe(
    ofType<GetSearchStocks>(EStocksActions.GetSearchStocks),
    map(action => action.payload),
    switchMap((query) => this._httpService.search(query)),
    switchMap((searchItem: SearchItem[]) => of(new GetSearchStocksSuccess(searchItem))
    )
  );

  constructor(
    private _httpService: HttpService,
    private _actions$: Actions,
    private _store: Store<AppState>
  ) {
  }
}
