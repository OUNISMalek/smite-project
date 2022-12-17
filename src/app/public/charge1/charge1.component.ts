import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Servch1Service } from '../../services/servch1.service';
import { Charge1DialogComponent } from '../charge1-dialog/charge1-dialog.component';

@Component({
  selector: 'app-charge1',
  templateUrl: './charge1.component.html',
  styleUrls: ['./charge1.component.scss']
})
export class Charge1Component implements OnInit {
  
  title = 'gestionstock';
  displayedColumns: string[] = ['date','montant','trimestre', 'etatcotisation', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private router:Router,
    private dialog : MatDialog ,
    private servch1 : Servch1Service) { }

  ngOnInit(): void {
    this.getAllCharges();
  }
 //dialog of adding product
 openDialog() {
  this.dialog.open(Charge1DialogComponent, {
   width:'30%'
  }).afterClosed().subscribe(val=>{
    if(val==='save'){
      this.getAllCharges();
    }
  })
}

getAllCharges(){
this.servch1.getCharge()
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
this.dialog.open(Charge1DialogComponent,{
width :'30%',
data : row
}).afterClosed().subscribe(val=>{
if(val==='update'){
  this.getAllCharges();
}
})
}

deleteCharge(id : number){
this.servch1.deleteCharge(id)
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
