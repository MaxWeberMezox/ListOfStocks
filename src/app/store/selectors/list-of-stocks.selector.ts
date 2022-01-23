import {createSelector} from '@ngrx/store';
import {AppState} from "../states/app.state";
import {StocksState} from "../states/list-of-stocks.state";
import {state} from "@angular/animations";
import {SearchItem} from "../../http.service";

const selectStocksState = (state: AppState) => state.StocksState;


export const selectListOfStocks = createSelector(
  selectStocksState,
  (state: StocksState) => state.listOfStocks
);

export const selectTickerPrices = createSelector(
  selectStocksState,
  (state: StocksState) => state.tickerPrices
);

export const selectSearchStocks = createSelector(
  selectStocksState,
  (state: StocksState) => state.searchStocks
);
