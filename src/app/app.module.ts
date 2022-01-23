import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

import {AppComponent} from './app.component';
import {ListOfStocksModule} from './list-of-stocks/list-of-stocks.module';
import {ListOfStocksComponent} from './list-of-stocks/list-of-stocks.component';
import {StockComponent} from './stock/stock.component';
import {StockModule} from "./stock/stock.module";
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from './store/reducers';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {AppEffects} from './app.effects';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {appReducers} from "./store/store";
import {ListOfStocksEffects} from "./store/effects/list-of-stocks.effects";

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
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([ListOfStocksEffects]),
    StoreRouterConnectingModule.forRoot({stateKey: 'router'}),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
