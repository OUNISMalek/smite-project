import { Component, OnInit, Inject } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Servch4Service } from '../../services/servch4.service';

@Component({
  selector: 'app-charge4-dialog',
  templateUrl: './charge4-dialog.component.html',
  styleUrls: ['./charge4-dialog.component.scss']
})
export class Charge4DialogComponent implements OnInit {

  ChargeForm !: FormGroup;
  actionBtn : String = "Save";
  constructor(
    private formBuilder : FormBuilder , 
    private servch4 : Servch4Service  , 
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef : MatDialogRef<Charge4DialogComponent>
  ) { }

  ngOnInit(): void {
    this.ChargeForm = this.formBuilder.group({
      date : ['',Validators.required],     
      depenses:['',Validators.required],
      montant:['',Validators.required],
    });
    if(this.editData){
      this.actionBtn="Update";
      this.ChargeForm.controls['date'].setValue(this.editData.date);
      this.ChargeForm.controls['depenses'].setValue(this.editData.depenses);
      this.ChargeForm.controls['montant'].setValue(this.editData.montant);
    }
  }
  addCharge(){
    if(!this.editData){
      if(this.ChargeForm.valid){
        this.servch4.postCharge(this.ChargeForm.value)
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
      this.servch4.putCharge(this.ChargeForm.value , this.editData.id)
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
