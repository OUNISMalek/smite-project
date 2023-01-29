import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DialogChargeComponent } from './dialog-charge/dialog-charge.component';
import { ChargeComponent } from './charge/charge.component';
import { FactureComponent } from './facture/facture.component';
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
import { FactureLoaderComponent } from './facture-loader/facture.loader.component';
import { Dashboard1Component } from './dashboard1/dashboard1.component';
import { Facture1Component } from './facture1/facture1.component';
import { ClientComponent } from './client/client.component';
import { FournisseurComponent } from './fournisseur/fournisseur.component';
import { InventaireComponent } from './inventaire/inventaire.component';
import { InitialFactureDialogComponent } from './initial.facture.dialog/initial.facture.dialog.component';
import { DialogProductComponent } from './dialog-product/dialog-product.component';
import { DialogConfirmationComponent } from './dialog-confirmation/dialog-confirmation.component';
import { DialogFournisseurComponent } from './dialog-fournisseur/dialog-fournisseur.component';
import { DialogClientComponent } from './dialog-client/dialog-client.component';

@NgModule({
  declarations: [
    AppComponent,

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
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatAutocompleteModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
