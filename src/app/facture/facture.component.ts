import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Facture } from '../models/facture.model';


@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.scss'],
})
export class FactureComponent implements OnInit, OnChanges {

  dataSource!: MatTableDataSource<AbstractControl>;
  displayedColumns: string[] = ['code', 'service', 'quantite', 'prix_uni_ht', 'prix_ht', 'tva', 'total', 'action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild('pdfexport', { static: false }) public pdfExport!: ElementRef;
  @ViewChild(MatTable) table!: MatTable<any>;
  pdfName: string = "Facture";
  @Input('facture') facture: Facture = {} as Facture;
  factureForm!: FormGroup;
  @Output() uploadedFacture  = new EventEmitter<string>();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initializeForm();
  }
  ngOnChanges() {
    this.initializeForm();
  }
  initializeForm() {
    this.factureForm = this.loadFacture(this.facture);
    this.dataSource = new MatTableDataSource((this.factureForm.get('ligneFactures') as FormArray).controls);
  }

  loadFacture(facture: Facture): FormGroup {
    let factureForm: FormGroup = this.fb.group({
      ligneFactures: this.fb.array(facture.ligneFactures.map(x => this.fb.group(x))),
      factureMetadata: this.fb.group(facture.factureMetadata),
    });
    return factureForm;
  }
  get ligneFactures() {
    return this.factureForm.get('ligneFactures') as FormArray;
  }

  removeLigneFacture(index: number) {
    this.ligneFactures.removeAt(index);
    this.table.renderRows();
  }
  resetLigneFactures() {
    this.ligneFactures.reset();
    this.table.renderRows();
  }
  addLigneFacture() {
    this.ligneFactures.push(this.fb.group({
      code: [''],
      service: [''],
      quantite: [''],
      prix_uni_ht: [''],
      prix_ht: [''],
      tva: [''],
      total: [''],
    }));
    this.table.renderRows();
  }

  onSubmit() {
    this.uploadedFacture.emit(JSON.stringify(this.factureForm.getRawValue()));
  }
  generatePdf() {
    this.onSubmit();
    html2canvas(this.pdfExport.nativeElement, { scale: 3 }).then((canvas) => {
      const imageGeneratedFromTemplate = canvas.toDataURL('image/png');
      const fileWidth = 200;
      const generatedImageHeight = (canvas.height * fileWidth) / canvas.width;
      let PDF = new jsPDF('p', 'mm', 'a4',);
      PDF.addImage(imageGeneratedFromTemplate, 'PNG', 0, 5, fileWidth, generatedImageHeight,);
      PDF.html(this.pdfExport.nativeElement.innerHTML)
      let metadataForm = this.factureForm.get('factureMetadata') as FormGroup
      PDF.save(`${metadataForm.controls['benef_facture'].value || this.pdfName}.pdf`);
    });
  }
}

