import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { jsPDF } from 'jspdf';
//import html2canvas from 'html2canvas';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FactureReq, NewFactData, NewLigneFact } from 'src/app/models/facture.model';
import { AppEvent } from 'src/app/shared/state/data.model';
import { DataStateService } from 'src/app/shared/state/datastate.service';
import { DialogFactureComponent } from '../dialogs/dialog-facture/dialog-facture.component';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.scss'],
})
export class FactureComponent implements OnInit {
  dataSource!: MatTableDataSource<AbstractControl>;
  displayedColumns: string[] = [
    'code',
    'service',
    'quantite',
    'prix_uni_ht',
    'prix_ht',
    'tva',
    'total',
    'action',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild('pdfexport', { static: false }) public pdfExport!: ElementRef;
  @ViewChild(MatTable) table!: MatTable<any>;
  pdfName: string = 'Facture';
  facture: FactureReq = {} as FactureReq;
  newFacture?: NewFactData;
  newLigne: NewLigneFact | undefined;
  factureForm!: FormGroup;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private dataService: DataStateService
  ) {}

  ngOnInit() {
    this.dataService.sourceEventSubjectObservable.subscribe((res: AppEvent) => {
      this.newFacture = res.payload;
    });
    this.initializeForm();
    this.dataSource = new MatTableDataSource(
      (this.factureForm.get('ligneFactures') as FormArray).controls
    );
  }

  initializeForm() {
    if (this.newFacture) {
      this.factureForm = this.loadFacture(this.newFacture);
    } else {
      this.factureForm = this.fb.group({
        ligneFactures: this.fb.array([]),
        codeFacture: this.fb.control(''),
        dateFacture: this.fb.control(''),
        typeFacture: this.fb.control(''),
        idClient: this.fb.control(''),
      });
    }
  }

  loadFacture(factureData: NewFactData): FormGroup {
    return this.fb.group({
      ligneFactures: this.fb.array([]),
      codeFacture: this.fb.control(factureData.codeFacture),
      dateFacture: this.fb.control(factureData.dateFacture),
      typeFacture: this.fb.control(factureData.typeFacture),
      idClient: this.fb.control(factureData.idClient),
    });
  }

  get ligneFactures() {
    return this.factureForm.get('ligneFactures') as FormArray;
  }

  removeLigneFacture(index: number) {
    this.ligneFactures.removeAt(index);
    this.table.renderRows();
  }
  editLigneFacture(index: number, rowData: NewLigneFact) {
    const dialogRef = this.dialog.open(DialogFactureComponent, {
      data: rowData,
    });
    dialogRef.afterClosed().subscribe(
      (res:NewLigneFact) => {
        if (res) {
          this.ligneFactures.at(index).setValue(res);
          this.table.renderRows();
        }
      }
    );
  }
  resetLigneFactures() {
    this.ligneFactures.reset();
    this.table.renderRows();
  }
  addLigneFacture() {
    const dialogRef = this.dialog.open(DialogFactureComponent);
    dialogRef.afterClosed().subscribe(
      (res:NewLigneFact) => {
        if (res) {
          this.newLigne = res;
          this.ligneFactures.push(this.fb.group(this.newLigne));
          this.table.renderRows();
        }
      }
    );
  }
  calculateTotales(){

  }

  onSubmit() {
    //this.uploadedFacture.emit(JSON.stringify(this.factureForm.getRawValue()));
  }
  generatePdf() {
    //   this.onSubmit();
    //   html2canvas(this.pdfExport.nativeElement, { scale: 3 }).then((canvas) => {
    //     const imageGeneratedFromTemplate = canvas.toDataURL('image/png');
    //     const fileWidth = 200;
    //     const generatedImageHeight = (canvas.height * fileWidth) / canvas.width;
    //     let PDF = new jsPDF('p', 'mm', 'a4');
    //     PDF.addImage(
    //       imageGeneratedFromTemplate,
    //       'PNG',
    //       0,
    //       5,
    //       fileWidth,
    //       generatedImageHeight
    //     );
    //     PDF.html(this.pdfExport.nativeElement.innerHTML);
    //     let metadataForm = this.factureForm.get('factureMetadata') as FormGroup;
    //     PDF.save(
    //       `${metadataForm.controls['benef_facture'].value || this.pdfName}.pdf`
    //     );
    //   });
  }
}
