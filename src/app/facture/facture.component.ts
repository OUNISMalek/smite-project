import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogFactureComponent } from '../dialog-facture/dialog-facture.component';
import { ServfactureService } from '../services/servfacture.service';
import jsPDF, { jsPDFOptions } from 'jspdf';
import domToImage from 'dom-to-image';
import * as moment from 'moment';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.scss'],
})
export class FactureComponent implements OnInit {
  title = 'gestionstock';

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['code', 'service', 'quantite', 'prix_uni_ht', 'prix_ht', 'tva', 'total', 'action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild('pdfexport', { static: false }) public pdfExport!: ElementRef;
  pdfName: string = "Facture";
  total_lettre!: string;
  total_ttc!: number;
  taxes!: number;
  total_ht!: number;
  benef_facture!: string;
  num_facture!: number;
  titre_facture!: string;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private servfacture: ServfactureService
  ) { }

  ngOnInit(): void {
    this.getAllFactures();
  }
  //dialog of adding product
  openDialog() {
    this.dialog
      .open(DialogFactureComponent, {
        width: '110%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val == 'saved')
          this.getAllFactures();
      });
  }

  getAllFactures() {
    this.servfacture.getLigneFacture().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert('Error while fetching!!');
      },
    });
  }

  editFacture(row: any) {
    this.dialog
      .open(DialogFactureComponent, {
        width: '110%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'updated') {
          this.getAllFactures();
        }
      });
  }

  deleteFacture(id: number) {
    this.servfacture.deleteLigneFacture(id).subscribe({
      next: () => {
        this.getAllFactures();
      },
      error: () => {
        alert('Error while deleting orderLine');
      },
    });
  }

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
      PDF.save(`${this.benef_facture||this.pdfName}.pdf`);
    });
  }
}

