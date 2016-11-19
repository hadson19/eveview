import {Component, OnInit} from '@angular/core';
import {BitService} from './bitservice';
import {IData} from "./bit";
import 'rxjs/add/observable/interval';
import {Observable} from "rxjs";

@Component({
    selector: 'as-home',
    templateUrl: 'app/home/home.html',
    styleUrls: [
        'app/home/home.css'
    ],
    providers: [BitService]
})

export class HomeComponent  implements OnInit {
    constructor(bs: BitService){
        this.bitService = bs;
    }
    private bitService;
    public obj;
    public cryptice: IData;
    public BTC;
    public USD;
    public EUR;
    public xs;
    //private datatimer: Observable<Object>;
    public test(){
        let t = this.cryptice;
        this.BTC = this.cryptice.BTC;
        this.USD = this.cryptice.USD;
        this.EUR = this.cryptice.EUR;

        this.xs = 'test me';

    }
    private getData(){



            this.bitService.getData().subscribe(res2 => {
                this.cryptice = res2;
                this.BTC = this.cryptice.BTC;
                this.USD = this.cryptice.USD;
                this.EUR = this.cryptice.EUR;
            }, err => console.log('Something went wrong: ' + err.message));

    }
    ngOnInit()
    {
        this.getData();
        //Observable.interval(1000).subscribe(data => { this.getData();});
        let obs = Observable.interval(500).take(5)
            .do(i => console.log("obs value "+ i) );

        obs.subscribe(value => console.log("observer 1 received " + value));

        obs.subscribe(value => console.log("observer 2 received " + value));
    }
}
