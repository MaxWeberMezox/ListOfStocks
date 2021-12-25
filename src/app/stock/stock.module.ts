import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockComponent } from './stock.component';
import { NgxEchartsModule } from 'ngx-echarts';
import {MatCardModule} from "@angular/material/card";


@NgModule({
  declarations: [
    StockComponent
  ],
  imports: [
    CommonModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    MatCardModule,
  ]
})
export class StockModule { }
