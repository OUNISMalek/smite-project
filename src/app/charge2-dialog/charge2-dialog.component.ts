import { Component, OnInit, Inject } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Servch2Service } from '../services/servch2.service';

@Component({
  selector: 'app-charge2-dialog',
  templateUrl: './charge2-dialog.component.html',
  styleUrls: ['./charge2-dialog.component.scss']
})
export class Charge2DialogComponent implements OnInit {
  ChargeForm !: FormGroup;
  actionBtn : String = "Save";
  constructor(
    private formBuilder : FormBuilder , 
    private servch2 : Servch2Service  , 
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef : MatDialogRef<Charge2DialogComponent>
  ) { }

  ngOnInit(): void {
    this.ChargeForm = this.formBuilder.group({
      date : ['',Validators.required],     
      designation:['',Validators.required],
      fournisseur:['',Validators.required],
      montant:['',Validators.required],
      modepaiement:['',Validators.required],
    });
    if(this.editData){
      this.actionBtn="Update";
      this.ChargeForm.controls['date'].setValue(this.editData.date);
      this.ChargeForm.controls['designation'].setValue(this.editData.designation);
      this.ChargeForm.controls['fournisseur'].setValue(this.editData.fournisseur);
      this.ChargeForm.controls['montant'].setValue(this.editData.montant);
      this.ChargeForm.controls['modepaiement'].setValue(this.editData.modepaiement);
    }
  }
  addCharge(){
    if(!this.editData){
      if(this.ChargeForm.valid){
        this.servch2.postCharge(this.ChargeForm.value)
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
      this.servch2.putCharge(this.ChargeForm.value , this.editData.id)
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
