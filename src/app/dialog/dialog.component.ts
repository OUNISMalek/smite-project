import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators, RequiredValidator} from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatDialogRef} from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
productForm !: FormGroup;
actionBtn : String = "Save";
  constructor(
    private formBuilder : FormBuilder , 
    private api : ApiService , 
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef : MatDialogRef<DialogComponent>) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      code:['',Validators.required],     
      productName:['',Validators.required],
      quantity:['',Validators.required],
      date : ['',Validators.required],
      category:['',Validators.required],
    });
    if(this.editData){
      this.actionBtn="Update";
      this.productForm.controls['code'].setValue(this.editData.code);
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['quantity'].setValue(this.editData.quantity);
      this.productForm.controls['date'].setValue(this.editData.date);
      this.productForm.controls['category'].setValue(this.editData.category);

    }
   }
   addProduct(){
    if(!this.editData){
      if(this.productForm.valid){
        this.api.addProduct(this.productForm.value)
        .subscribe({
          next:(res)=>{
            alert("Product added successfully");
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error:()=>{
            alert("Error while adding the product")
          }
        })
      }
    }else {
      this.updateProduct()
    }
    }
    updateProduct(){
      this.api.updateProduct(this.productForm.value , this.editData.id)
      .subscribe({
        next:(res)=>{
          alert("Product updated successfully");
          this.productForm.reset();
          this.dialogRef.close('update');
        },
        error:()=>{
          alert("Error while updating !");
        }
      })
    }
  }
