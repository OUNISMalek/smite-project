import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { StockComponent } from './stock/stock.component';
import { ChargeComponent } from './charge/charge.component';
import { FactureComponent } from './facture/facture.component';
import { DashboardComponent} from './dashboard/dashboard.component';
import { Charge1Component } from './charge1/charge1.component';
import { Charge2Component } from './charge2/charge2.component';
import { Charge3Component } from './charge3/charge3.component';
import { Charge4Component } from './charge4/charge4.component';
const routes: Routes = [
 { path: 'stock', component: StockComponent },
 { path: 'charge', component: ChargeComponent },
 { path: 'facture', component: FactureComponent},
 { path: 'dashboard', component: DashboardComponent},
 { path: 'charge1', component: Charge1Component},
 { path: 'charge2', component: Charge2Component},
 { path: 'charge3', component: Charge3Component},
 { path: 'charge4', component: Charge4Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [StockComponent, ChargeComponent, FactureComponent, Charge1Component, Charge2Component, Charge3Component, Charge4Component]