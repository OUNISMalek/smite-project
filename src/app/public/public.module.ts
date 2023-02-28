import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChargeComponent } from './components/charge/charge.component';
import { Charge1DialogComponent } from './components/charge1-dialog/charge1-dialog.component';
import { Charge1Component } from './components/charge1/charge1.component';
import { Charge2DialogComponent } from './components/charge2-dialog/charge2-dialog.component';
import { Charge2Component } from './components/charge2/charge2.component';
import { Charge3DialogComponent } from './components/charge3-dialog/charge3-dialog.component';
import { Charge3Component } from './components/charge3/charge3.component';
import { Charge4DialogComponent } from './components/charge4-dialog/charge4-dialog.component';
import { Charge4Component } from './components/charge4/charge4.component';
import { ClientComponent } from './components/client/client.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { Dashboard1Component } from './components/dashboard1/dashboard1.component';
import { DialogChargeComponent } from './components/dialog-charge/dialog-charge.component';
import { DialogClientComponent } from './components/dialog-client/dialog-client.component';
import { DialogConfirmationComponent } from './components/dialog-confirmation/dialog-confirmation.component';
import { DialogFactureComponent } from './components/dialog-facture/dialog-facture.component';
import { DialogFournisseurComponent } from './components/dialog-fournisseur/dialog-fournisseur.component';
import { DialogProductComponent } from './components/dialogs/dialog-product/dialog-product.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { FactureLoaderComponent } from './components/facture-loader/facture.loader.component';
import { FactureComponent } from './components/facture/facture.component';
import { Facture1Component } from './components/facture1/facture1.component';
import { FournisseurComponent } from './components/fournisseur/fournisseur.component';
import { InitialFactureDialogComponent } from './components/initial.facture.dialog/initial.facture.dialog.component';
import { InventaireComponent } from './components/inventaire/inventaire.component';
import { StockComponent } from './components/stock/stock.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



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
    Dashboard1Component,
    Facture1Component,
    ClientComponent,
    FournisseurComponent,
    InventaireComponent,
    InitialFactureDialogComponent,
    DialogProductComponent,
    DialogConfirmationComponent,
    DialogFournisseurComponent,
    DialogClientComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class PublicModule { }
