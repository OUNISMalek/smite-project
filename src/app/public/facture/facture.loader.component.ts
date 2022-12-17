import { Component, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";
import { Facture } from "../../models/facture.model";
import { ServfactureService } from "../../services/servfacture.service";

@Component({
    selector: 'app-facture-loader',
    templateUrl: './facture.loader.component.html',
    styleUrls: ['./facture.loader.component.scss'],
})
export class FactureLoaderComponent implements OnInit {
    facture!: Facture;
    facture$!: Observable<Facture>;


    constructor(private servfacture: ServfactureService) { }

    ngOnInit(): void {

    }
    newFacture() {
        this.facture$ = of(new Facture());
    }
    loadFactureByNumber(s: any) {
        this.facture$ = this.servfacture.getFacture(s);
    }
    saveFacture(uploadedFacture: string) {
        // let facture = new Facture();
        // Object.assign(facture, uploadedFacture);
        this.servfacture.saveFacture(uploadedFacture).subscribe({ complete: () => alert("Facture sauvegardée") });
    }

}