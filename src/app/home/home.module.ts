import { NgModule } from '@angular/core';
import { HomeComponent } from './index';
import {HttpModule} from '@angular/http';
import {CommonModule} from '@angular/common';

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [ HttpModule, CommonModule ],
    exports: [
        HomeComponent
    ]
})
export class HomeModule {
}
