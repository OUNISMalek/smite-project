import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChargeComponent } from './components/charge/charge.component';
import { Charge1Component } from './components/charge1/charge1.component';
import { Charge2Component } from './components/charge2/charge2.component';
import { Charge3Component } from './components/charge3/charge3.component';
import { Charge4Component } from './components/charge4/charge4.component';
import { ClientComponent } from './components/client/client.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { Dashboard1Component } from './components/dashboard1/dashboard1.component';
import { FactureLoaderComponent } from './components/facture-loader/facture.loader.component';
import { FactureComponent } from './components/facture/facture.component';
import { Facture1Component } from './components/facture1/facture1.component';
import { FournisseurComponent } from './components/fournisseur/fournisseur.component';
import { StockComponent } from './components/stock/stock.component';

const routes: Routes = [
  { path: '', redirectTo: 'stock', pathMatch: 'full' },
  { path: 'stock', component: StockComponent },
  { path: 'charge', component: ChargeComponent },
  { path: 'factureloader', component: FactureLoaderComponent },
  { path: 'facture', component: FactureComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'charge1', component: Charge1Component },
  { path: 'charge2', component: Charge2Component },
  { path: 'charge3', component: Charge3Component },
  { path: 'charge4', component: Charge4Component },
  { path: 'dashboard1', component: Dashboard1Component },
  { path: 'facture1', component: Facture1Component },
  { path: 'fournisseur', component: FournisseurComponent },
  { path: 'client', component: ClientComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
