import {ActionReducerMap} from "@ngrx/store";
import {routerReducer} from "@ngrx/router-store";
import {AppState} from "./states/app.state";
import {listOfStocksReducers} from "./reducers/list-of-stocks.reducers";

export const appReducers: ActionReducerMap<AppState, any> = {
  router: routerReducer,
  StocksState: listOfStocksReducers,
};
