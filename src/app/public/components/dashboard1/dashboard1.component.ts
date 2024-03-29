import { Component, OnInit , ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { DialogComponent } from '../dialogs/dialog/dialog.component';
@Component({
  selector: 'app-dashboard1',
  templateUrl: './dashboard1.component.html',
  styleUrls: ['./dashboard1.component.scss']
})
export class Dashboard1Component implements OnInit {

  title = 'gestionstock';
  displayedColumns: string[] = ['code','productName', 'quantity', 'date','category', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private router: Router,private dialog : MatDialog , private api : ApiService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }
      //dialog of adding product
      openDialog() {
        this.dialog.open(DialogComponent, {
         width:'30%'
        }).afterClosed().subscribe(val=>{
          if(val==='save'){
            this.getAllProducts();
          }
        })
      }
  getAllProducts(){
    this.api.getAllProduct()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      },
      error:(err)=>{
        alert("Error while fetching !!");
      }
    })
  }

  editProduct(row : any){
    this.dialog.open(DialogComponent,{
      width :'30%',
      data : row
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getAllProducts();
      }
    })
  }

  deleteProduct(id : number){
    this.api.deleteProductById(id)
    .subscribe({
      next:(res)=>{
        alert("Product deleted successfully");
        this.getAllProducts();
      },
      error:()=>{
        alert("Error while deleting the product");
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
