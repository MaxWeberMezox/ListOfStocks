import {initialStocksState, StocksState} from '../states/list-of-stocks.state';
import {ListOfStocksActions, EStocksActions  } from '../actions/list-of-stocks.actions';

export const listOfStocksReducers = (
  state = initialStocksState,
  action: ListOfStocksActions,
): StocksState => {
  switch (action.type) {
    case EStocksActions.GetListOfStocksSuccess: return {
      ...state,
      listOfStocks: action.payload
    };
    case EStocksActions.GetStockItemSuccess: return {
      ...state,
      tickerPrices: action.payload
    };
    case EStocksActions.GetSearchStocksSuccess:
      return {
      ...state,
      searchStocks: action.payload,
    };
    case EStocksActions.GetSearchStocks: return {
      ...state,
      searchStocks: [],
    };

    default: return state;
  }
};
