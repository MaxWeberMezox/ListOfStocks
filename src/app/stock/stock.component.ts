import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router'

import {HttpService, StockItem} from "../http.service";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
};

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  tickerPrices: StockItem[] = [];
  routeParams: ParamMap;
  ticker: string;
  options: any;

  constructor(private httpService: HttpService, private route: ActivatedRoute) {
    this.routeParams = route.snapshot.paramMap;
    this.ticker = this.routeParams.get('ticker') as string;
  }

  ngOnInit(): void {
    this.httpService.getStock(this.ticker).subscribe((data) => {
      this.tickerPrices = data.map(item => (
        {
          ...item,
          date: formatDate(item.date)
        }
      ));

      this.options = {
        title: {
          text: `${this.ticker}`
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            animation: false
          }
        },
        xAxis: {
          data: this.tickerPrices.map(item => item.date),
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          splitLine: {
            show: false
          }
        },
        series: [
          {
            name: 'low',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: this.tickerPrices.map(item => item.low)
          },
          {
            name: 'high',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: this.tickerPrices.map(item => item.high)
          },
          {
            name: 'open',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: this.tickerPrices.map(item => item.open)
          },
          {
            name: 'close',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: this.tickerPrices.map(item => item.close)
          }
        ]
      };
    });
  }
}
