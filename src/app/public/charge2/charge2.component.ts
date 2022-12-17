import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Servch2Service } from '../../services/servch2.service';
import { Charge2DialogComponent } from '../charge2-dialog/charge2-dialog.component';

@Component({
  selector: 'app-charge2',
  templateUrl: './charge2.component.html',
  styleUrls: ['./charge2.component.scss']
})
export class Charge2Component implements OnInit {

  title = 'gestionstock';
  displayedColumns: string[] = ['date','designation','fournisseur', 'montant','mode de paiement', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private router:Router,
    private dialog : MatDialog ,
    private servch2 : Servch2Service) { }

  ngOnInit(): void {
    this.getAllCharges();
  }
 //dialog of adding product
 openDialog() {
  this.dialog.open(Charge2DialogComponent, {
   width:'30%'
  }).afterClosed().subscribe(val=>{
    if(val==='save'){
      this.getAllCharges();
    }
  })
}
getAllCharges(){
this.servch2.getCharge()
.subscribe({
next:(res)=>{
  this.dataSource = new MatTableDataSource(res);
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
},
error:(err)=>{
  alert("Error while fetching!!");
}
})
}
editCharge(row : any){
this.dialog.open(Charge2DialogComponent,{
width :'30%',
data : row
}).afterClosed().subscribe(val=>{
if(val==='update'){
  this.getAllCharges();
}
})
}
deleteCharge(id : number){
this.servch2.deleteCharge(id)
.subscribe({
next:(res)=>{
  alert("Charge deleted successfully");
  this.getAllCharges();
},
error:()=>{
  alert("Error while deleting the charge");
}
})
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
}
