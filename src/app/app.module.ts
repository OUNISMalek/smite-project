import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { Servch1Service } from './services/servch1.service';
import { Servch2Service } from './services/servch2.service';
import { Servch3Service } from './services/servch3.service';
import { Servch4Service } from './services/servch4.service';
import { ServchargeService } from './services/servcharge.service';
import { ServfactureService } from './services/servfacture.service';
import { MaterialModule } from './material/material.module';


@NgModule({

  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
  ],
  providers: [
    ApiService,
    Servch1Service,
    Servch2Service,
    Servch3Service,
    Servch4Service,
    ServchargeService,
    ServfactureService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
