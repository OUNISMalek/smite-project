import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { StockComponent } from './stock/stock.component';
import { ChargeComponent } from './charge/charge.component';
import { FactureComponent } from './facture/facture.component';
import { DashboardComponent} from './dashboard/dashboard.component';
const routes: Routes = [
 { path: 'stock', component: StockComponent },
 { path: 'charge', component: ChargeComponent },
 { path: 'facture', component: FactureComponent},
 { path: 'dashboard', component: DashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [StockComponent, ChargeComponent, FactureComponent]