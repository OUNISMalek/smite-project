import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ServfactureService } from '../services/servfacture.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Facture } from '../models/facture.model';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.scss'],
})
export class FactureComponent implements OnInit {
  title = 'gestionstock';

  dataSource!: MatTableDataSource<AbstractControl>;
  displayedColumns: string[] = ['code', 'service', 'quantite', 'prix_uni_ht', 'prix_ht', 'tva', 'total', 'action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild('pdfexport', { static: false }) public pdfExport!: ElementRef;
  @ViewChild(MatTable) table!: MatTable<any>;
  pdfName: string = "Facture";
  loadedFacture: Facture = new Facture();
  @Input() factureForm!: FormGroup;
  //ligneFactures!: FormArray;
  payLoad = '';

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    console.warn('factureForm from parent : '+ this.factureForm);
   // this.dataSource = new MatTableDataSource((this.factureForm.get('ligneFactures') as FormArray).controls);


  }
  get ligneFactures() {
    return this.factureForm.get('ligneFactures') as FormArray;
  }
  // get factureMetadata() {
  //   return this.factureForm.get('factureMetadata') as FormGroup;
  // }
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
    this.payLoad = JSON.stringify(this.factureForm.getRawValue());
    console.warn(this.payLoad);
  }



  // editFacture(row: any) {
  //   this.dialog
  //     .open(DialogFactureComponent, {
  //       width: '110%',
  //       data: row,
  //     })
  //     .afterClosed()
  //     .subscribe((val) => {
  //       if (val === 'updated') {
  //         this.getFacture();
  //       }
  //     });
  // }

  // deleteFacture(id: number) {
  //   this.servfacture.deleteFacture(id).subscribe({
  //     next: () => {
  //       this.getFacture();
  //     },
  //     error: () => {
  //       alert('Error while deleting orderLine');
  //     },
  //   });
  // }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }
  generatePdf() {
    // // jsPdf implementation
    // const width:number = this.pdfExport.nativeElement.clientWidth;
    // const height:number = this.pdfExport.nativeElement.clientHeight + 40;
    // let orientation: 'l'|'p';
    // if (width > height) {orientation = 'l';} else {orientation = 'p';}
    // domToImage.toPng(this.pdfExport.nativeElement, {width: width,height: height})
    //     .then(result => 
    //       {let jsPdfOptions:jsPDFOptions = {orientation: orientation,unit: 'pt',format: [width + 50, height + 220]};
    //   const pdf = new jsPDF(jsPdfOptions);
    //   pdf.setFontSize(48);
    //   pdf.setTextColor('#2585fe');
    //   pdf.text(this.pdfName, 25, 75);
    //   pdf.setFontSize(24);pdf.setTextColor('#131523');
    //   pdf.text('Date Facture: ' + moment().format('ll'), 25, 115);
    //   pdf.addImage(result, 'PNG', 25, 185, width, height);
    //   pdf.save('file_name'+ '.pdf');}).catch(error => {});

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

