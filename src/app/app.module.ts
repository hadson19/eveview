import { NgModule } from '@angular/core';
import { APP_PROVIDERS } from './app.providers';
import { AppComponent } from './app.component';
import { appRoutingProviders, routing } from './app.routing';
import { NavbarModule } from './shared';
import { HomeModule } from './home/home.module';
import { TodolistModule } from './todolist/todolist.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule }  from '@angular/platform-browser';
import { IbgModule } from './ItemsByGroup/ibg.module';
import { RegionModule } from './regions/region.module';
import { PriceBoardModule } from './priceboard/priceboard.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        NavbarModule,
        HomeModule,
        TodolistModule,
        IbgModule,
        PriceBoardModule,
        routing,
        FormsModule,
        BrowserModule,
        HttpModule,
        RegionModule,
    ],
    providers: [ APP_PROVIDERS, appRoutingProviders ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
