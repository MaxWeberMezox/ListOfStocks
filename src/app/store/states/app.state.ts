import {RouterReducerState} from "@ngrx/router-store"
import {StocksState, initialStocksState, } from './list-of-stocks.state';

export interface AppState {
  router?: RouterReducerState,
  StocksState: StocksState,
}

export const initialAppState: AppState = {
  StocksState: initialStocksState,
};

export function getInitialState(): AppState {
  return initialAppState;
}
