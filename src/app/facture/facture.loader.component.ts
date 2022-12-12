import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { Facture } from "../models/facture.model";
import { ServfactureService } from "../services/servfacture.service";

@Component({
    selector: 'app-facture-loader',
    templateUrl: './facture.loader.component.html',
    styleUrls: ['./facture.component.scss'],
})
export class FactureLoaderComponent implements OnInit {
    factureLoaded: boolean = false;
    factureForm!: FormGroup;
    facture!: Facture;
    factureNumber!: number;

    constructor(private fb: FormBuilder,
        private servfacture: ServfactureService) { }

    ngOnInit(): void {


    }


    loadFacture(facture: Facture): FormGroup {

        let factureForm: FormGroup = this.fb.group({
            ligneFactures: this.fb.array(facture.ligneFactures.map(x => this.fb.group(x))),
            factureMetadata: this.fb.group(facture.factureMetadata),
        });
        return factureForm;
    }

    newFacture() {
        this.facture = new Facture();
        this.loadFacture(this.facture);
        this.factureLoaded = true;
    }
    loadFactureByNumber(s: string) {
        let n = Number(s);
        this.servfacture.getFacture(n).subscribe({
            next: (v: Facture) => this.loadFacture(v),
            error: e => console.warn(e),
            complete: () => this.factureLoaded = true
        });
    }


}