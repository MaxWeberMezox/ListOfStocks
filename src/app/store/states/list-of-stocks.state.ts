import {ListOfStocksItem, SearchItem, StockItem} from "../../http.service";

export interface StocksState {
  listOfStocks: ListOfStocksItem[];
  tickerPrices: StockItem[];
  searchStocks: SearchItem[];
}

export const initialStocksState: StocksState = {
  listOfStocks: [],
  tickerPrices: [],
  searchStocks: []
};
