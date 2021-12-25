import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {MatTableModule} from '@angular/material/table';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {ListOfStocksModule} from './list-of-stocks/list-of-stocks.module';
import {ListOfStocksComponent} from './list-of-stocks/list-of-stocks.component';
import {StockComponent} from './stock/stock.component';
import {StockModule} from "./stock/stock.module";


const appRoutes: Routes = [
  {path: '', component: ListOfStocksComponent},
  {path: 'stock/:ticker', component: StockComponent},
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    MatTableModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ListOfStocksModule,
    StockModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
