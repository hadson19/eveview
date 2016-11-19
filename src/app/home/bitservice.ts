/**
 * Created by fox21 on 11/18/2016.
 */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
//import { IRegions, Region, ISystems } from './IRegions';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/interval';
import { IData } from './bit';

@Injectable()
export class BitService {
    private uri = 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR';
    private uriSys: string = '';


    public loading: boolean;

    public e: Array<Object>;
    result: Object;
    constructor(private http: Http) { }

    getData(): Observable<IData> {
        return this.http.get(this.uri)
            .map((res: Response) => res.json());

    }

    //https://crest-tq.eveonline.com/market/10000002/orders/sell/?type=https://crest-tq.eveonline.com/types/34/
}