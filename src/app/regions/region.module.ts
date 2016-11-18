import { NgModule } from '@angular/core';
import { RegionComponent } from './region.component';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';


@NgModule({
    declarations: [
        RegionComponent
    ],
    imports: [ HttpModule, CommonModule ],
    exports: [
        RegionComponent
    ]
})
export class RegionModule {
}

/**
 * Created by fox21 on 11/16/2016.
 */
/**
 * Created by fox21 on 11/16/2016.
 */
