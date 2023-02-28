import { Component, Inject, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServchargeService } from 'src/app/shared/services/servcharge.service';

@Component({
  selector: 'app-dialog-charge',
  templateUrl: './dialog-charge.component.html',
  styleUrls: ['./dialog-charge.component.scss']
})
export class DialogChargeComponent implements OnInit {
  ChargeForm !: FormGroup;
  actionBtn : String = "Save";
  constructor(
    private formBuilder : FormBuilder , 
    private servcharge : ServchargeService  , 
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef : MatDialogRef<DialogChargeComponent>
  ) { }

  ngOnInit(): void {
    this.ChargeForm = this.formBuilder.group({
      date : ['',Validators.required],     
      montant:['',Validators.required],
      charge:['',Validators.required],
    });
    if(this.editData){
      this.actionBtn="Update";
      this.ChargeForm.controls['date'].setValue(this.editData.date);
      this.ChargeForm.controls['montant'].setValue(this.editData.montant);
      this.ChargeForm.controls['charge'].setValue(this.editData.charge);

    }
  }
  addCharge(){
    if(!this.editData){
      if(this.ChargeForm.valid){
        this.servcharge.addCharge(this.ChargeForm.value)
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
      this.servcharge.updateCharge(this.ChargeForm.value , this.editData.id)
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
