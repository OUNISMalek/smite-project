import { Component, OnInit, Inject } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Servch1Service } from 'src/app/shared/services/servch1.service';

@Component({
  selector: 'app-charge1-dialog',
  templateUrl: './charge1-dialog.component.html',
  styleUrls: ['./charge1-dialog.component.scss']
})
export class Charge1DialogComponent implements OnInit {
  ChargeForm !: FormGroup;
  actionBtn : String = "Save";
  constructor(    
    private formBuilder : FormBuilder , 
    private servch1 : Servch1Service  , 
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef : MatDialogRef<Charge1DialogComponent>) { }

  ngOnInit(): void {
    this.ChargeForm = this.formBuilder.group({
      date : ['',Validators.required],     
      montant:['',Validators.required],
      trimestre:['',Validators.required],
      etatcotisation:['',Validators.required],
    });
    if(this.editData){
      this.actionBtn="Update";
      this.ChargeForm.controls['date'].setValue(this.editData.date);
      this.ChargeForm.controls['montant'].setValue(this.editData.montant);
      this.ChargeForm.controls['trimestre'].setValue(this.editData.trimestre);
      this.ChargeForm.controls['etatcotisation'].setValue(this.editData.etatcotisation);
    }
  }
  addCharge(){
    if(!this.editData){
      if(this.ChargeForm.valid){
        this.servch1.addCharge(this.ChargeForm.value)
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
      this.servch1.updateCharge(this.ChargeForm.value , this.editData.id)
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
