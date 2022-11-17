import { Component, Inject, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators, RequiredValidator} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-dialog-charge',
  templateUrl: './dialog-charge.component.html',
  styleUrls: ['./dialog-charge.component.scss']
})
export class DialogChargeComponent implements OnInit {
  chargeForm !: FormGroup;
  actionBtn : String = "Save";
  constructor(
    private formBuilder : FormBuilder , 
    private api : ApiService , 
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef : MatDialogRef<DialogChargeComponent>
  ) { }

  ngOnInit(): void {
    this.chargeForm = this.formBuilder.group({
      date:['',Validators.required],     
      montant:['',Validators.required],
      charge:['',Validators.required],
    });
    if(this.editData){
      this.actionBtn="Update";
      this.chargeForm.controls['date'].setValue(this.editData.date);
      this.chargeForm.controls['montant'].setValue(this.editData.montant);
      this.chargeForm.controls['charge'].setValue(this.editData.charge);

    }
  }
  addCharge(){
    if(!this.editData){
      if(this.chargeForm.valid){
        this.api.postCharge(this.chargeForm.value)
        .subscribe({
          next:(res)=>{
            alert("charge added successfully");
            this.chargeForm.reset();
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
      this.api.putCharge(this.chargeForm.value , this.editData.id)
      .subscribe({
        next:(res)=>{
          alert("Charge updated successfully");
          this.chargeForm.reset();
          this.dialogRef.close('update');
        },
        error:()=>{
          alert("Error while updating !");
        }
      })
    }

}
