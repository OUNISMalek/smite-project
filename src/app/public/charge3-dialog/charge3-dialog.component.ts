import { Component, OnInit, Inject } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Servch3Service } from '../../services/servch3.service';

@Component({
  selector: 'app-charge3-dialog',
  templateUrl: './charge3-dialog.component.html',
  styleUrls: ['./charge3-dialog.component.scss']
})
export class Charge3DialogComponent implements OnInit {
  ChargeForm !: FormGroup;
  actionBtn : String = "Save";
  constructor( private formBuilder : FormBuilder , 
    private servch3 : Servch3Service  , 
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef : MatDialogRef<Charge3DialogComponent>
  ) { }

  ngOnInit(): void {
    this.ChargeForm = this.formBuilder.group({
      salarie : ['',Validators.required],     
      montant:['',Validators.required],
    }); 
    if(this.editData){
      this.actionBtn="Update";
      this.ChargeForm.controls['salarie'].setValue(this.editData.salarie);
      this.ChargeForm.controls['montant'].setValue(this.editData.montant);
    }
  }
  addCharge(){
    if(!this.editData){
      if(this.ChargeForm.valid){
        this.servch3.postCharge(this.ChargeForm.value)
        .subscribe({
          next:(res)=>{
            alert("Charge added successfully");
            this.ChargeForm.reset();
            this.dialogRef.close('save');
          },
          error:()=>{
            alert("Error while adding the charge")
          }
        })
      }
    }else {
      this.updateCharge()
    }
    }

    updateCharge(){
      this.servch3.putCharge(this.ChargeForm.value , this.editData.id)
      .subscribe({
        next:(res)=>{
          alert("Charge updated successfully");
          this.ChargeForm.reset();
          this.dialogRef.close('update');
        },
        error:()=>{
          alert("Error while updating !");
        }
      })
    }

}
