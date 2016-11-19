import {Component, OnInit, OnDestroy} from '@angular/core';
import {BitService} from './bitservice';
import {IData} from "./bit";
import 'rxjs/add/observable/interval';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/share';


@Component({
    selector: 'as-home',
    templateUrl: 'app/home/home.html',
    styleUrls: [
        'app/home/home.css'
    ],
    providers: [BitService]
})

export class HomeComponent  implements OnInit, OnDestroy {
    constructor(bs: BitService){
        this.bitService = bs;
        /*Observable.interval(1000)
            .take(17000).map((x) => x+1)
            .subscribe((x) => {
                this.getData();
            }).share();*/
    }
    private bitService;
    public obj;
    public cryptice = {"BTC":0.01292,"USD":1.67,"EUR":1.15};
    private ct;
    public BTC;
    public USD;
    public EUR;
    public xs;
    private keep;
    //private datatimer: Observable<Object>;
    public test(){
        this.getData();

    }
    private getData(){

        this.keep = Observable.timer(0, 2000).flatMap(_ => {
            return this.bitService.getData();
        }).subscribe(res2 => {
            this.ct = res2;
            this.cryptice = res2;
            this.BTC = this.ct.BTC;
            this.USD = this.ct.USD;
            this.EUR = this.ct.EUR;
        }, err => console.log('Something went wrong: ' + err.message));
/*
            this.bitService.getData().subscribe(res2 => {
                this.cryptice = res2;
                this.BTC = this.cryptice.BTC;
                this.USD = this.cryptice.USD;
                this.EUR = this.cryptice.EUR;
            }, err => console.log('Something went wrong: ' + err.message));
*/

    }
    ngOnInit()
    {
        this.getData();
        //Observable.interval(1000).subscribe(data => { this.getData();});
      /*  let obs = Observable.interval(500).take(5)
            .do(i => console.log("obs value "+ i) );

        obs.subscribe(value => console.log("observer 1 received " + value));

        obs.subscribe(value => console.log("observer 2 received " + value));*/
    }
    ngOnDestroy()
    {
        this.keep().unsubscribe();
    }
}
