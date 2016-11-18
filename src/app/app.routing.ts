import { Routes, RouterModule } from '@angular/router';

import { HomeRoutes } from './home/index';
import { IbgRoutes } from './ItemsByGroup/index';
import { RegionRoutes } from './regions/index';
import { PriceBoardRoutes } from './priceboard/index';


const appRoutes: Routes = [
    ...HomeRoutes,
    ...IbgRoutes,
    ...RegionRoutes,
    ...PriceBoardRoutes
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes);
