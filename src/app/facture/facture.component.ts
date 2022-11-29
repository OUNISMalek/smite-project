import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { DialogFactureComponent } from '../dialog-facture/dialog-facture.component';
import { ServfactureService } from '../services/servfacture.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.scss'],
})
export class FactureComponent implements OnInit {
  title = 'gestionstock';
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
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private servfacture: ServfactureService
  ) {}

  ngOnInit(): void {
    this.getAllFactures();
  }
  //dialog of adding product
  openDialog() {
    this.dialog
      .open(DialogFactureComponent, {
        width: '50%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getAllFactures();
        }
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
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'update') {
          this.getAllFactures();
        }
      });
  }

  deleteFacture(id: number) {
    this.servfacture.deleteLigneFacture(id).subscribe({
      next: (res) => {
        alert('OrderLine deleted successfully');
        this.getAllFactures();
      },
      error: () => {
        alert('Error while deleting orderLine');
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  generatePdf() {
    let DATA: any = document.getElementById('pdf-export');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('angular-demo.pdf');
    });
  }
}
