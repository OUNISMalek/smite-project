import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog/dialog.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChargeComponent } from './charge/charge.component';
import { FactureComponent } from './facture/facture.component';
import { FactureLoaderComponent } from './facture/facture.loader.component';
import { DialogChargeComponent } from './dialog-charge/dialog-charge.component';
import { StockComponent } from './stock/stock.component';
import { DialogFactureComponent } from './dialog-facture/dialog-facture.component';
import { Charge1Component } from './charge1/charge1.component';
import { Charge2Component } from './charge2/charge2.component';
import { Charge3Component } from './charge3/charge3.component';
import { Charge4Component } from './charge4/charge4.component';
import { Charge1DialogComponent } from './charge1-dialog/charge1-dialog.component';
import { Charge2DialogComponent } from './charge2-dialog/charge2-dialog.component';
import { Charge3DialogComponent } from './charge3-dialog/charge3-dialog.component';
import { Charge4DialogComponent } from './charge4-dialog/charge4-dialog.component';
import { MaterialModule } from '../material/material.module';
import { PublicRoutingModule } from './public-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DialogComponent,
    DashboardComponent,
    ChargeComponent,
    FactureComponent,
    FactureLoaderComponent,
    DialogChargeComponent,
    StockComponent,
    DialogFactureComponent,
    Charge1Component,
    Charge2Component,
    Charge3Component,
    Charge4Component,
    Charge1DialogComponent,
    Charge2DialogComponent,
    Charge3DialogComponent,
    Charge4DialogComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PublicRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class PublicModule { }
