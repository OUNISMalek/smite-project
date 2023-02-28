import { Component, OnInit , ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogChargeComponent } from '../dialog-charge/dialog-charge.component';
import { ServchargeService } from '../../../services/servcharge.service';

@Component({
  selector: 'app-charge',
  templateUrl: './charge.component.html',
  styleUrls: ['./charge.component.scss']
})
export class ChargeComponent implements OnInit {
  
  title = 'gestionstock';
  displayedColumns: string[] = ['date','montant','charge', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private router: Router,
    private dialog : MatDialog ,
    private servcharge : ServchargeService) {}

  ngOnInit(): void {
    this.getAllCharges();
  }
    //dialog of adding product
      openDialog() {
        this.dialog.open(DialogChargeComponent, {
         width:'30%'
        }).afterClosed().subscribe(val=>{
          if(val==='save'){
            this.getAllCharges();
          }
        })
      }

  getAllCharges(){
    this.servcharge.getAllCharge()
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
    this.dialog.open(DialogChargeComponent,{
      width :'30%',
      data : row
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getAllCharges();
      }
    })
  }

  deleteCharge(id : number){
    this.servcharge.deleteCharge(id)
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
