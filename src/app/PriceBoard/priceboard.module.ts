import { NgModule } from '@angular/core';
import { moneyPipe } from './moneypipe';
import { volPipe } from './volpipe';
import { PriceBoardComponent } from './index';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
// import { EvePricingService } from './evepricing.service';


@NgModule({
    declarations: [
        moneyPipe,
        volPipe,
        PriceBoardComponent
    ],
    imports: [ HttpModule, CommonModule ],
    exports: [
        PriceBoardComponent,
        moneyPipe
    ]
})
export class PriceBoardModule {
}

/**
 * Created by fox21 on 11/16/2016.
 */
