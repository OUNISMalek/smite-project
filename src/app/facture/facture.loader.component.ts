import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FactureReq } from '../models/facture.model';
import { ServfactureService } from '../services/servfacture.service';

@Component({
  selector: 'app-facture-loader',
  templateUrl: './facture.loader.component.html',
  styleUrls: ['./facture.component.scss'],
})
export class FactureLoaderComponent implements OnInit {
  factureLoaded: boolean = false;
  requestNewFacture: boolean = false;
  facture!: FactureReq;
  facture$!: Observable<FactureReq>;

  constructor(private servfacture: ServfactureService) {}

  ngOnInit(): void {}
  newFacture() {
    this.facture$ = of({} as FactureReq);
    // this.requestNewFacture = true;
  }
  loadFactureByNumber(s: string) {
    let n = Number(s);
    this.facture$ = this.servfacture.getFacture(n);
    this.factureLoaded = true;
  }
  saveFacture(uploadedFacture: string) {
    // let facture = new Facture();
    // Object.assign(facture, uploadedFacture);
    this.servfacture
      .saveFacture(uploadedFacture)
      .subscribe({ complete: () => alert('Facture sauvegardée') });
  }
}
