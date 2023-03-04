import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-client',
  templateUrl: './dialog-client.component.html',
  styleUrls: ['./dialog-client.component.scss'],
})
export class DialogClientComponent implements OnInit {
  actionBtn: string = 'OK';
  clientForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    public dialogRef: MatDialogRef<DialogClientComponent>,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      id: [''],
      tel: [''],
      nom: ['', Validators.required],
      mail: ['', Validators.email],
      addresse: [''],
      codePostale: [''],
      dateCreation: [''],
    });
    this.clientForm.controls['id'].disable();
    this.clientForm.controls['dateCreation'].disable();
    if (this.dialogData) {
      if (this.dialogData.action === 'update') {
        this.actionBtn = 'Mettre à jour';
        this.clientForm.patchValue({
          id: this.dialogData.form.id,
          tel: this.dialogData.form.tel,
          nom: this.dialogData.form.nom,
          mail: this.dialogData.form.mail,
          addresse: this.dialogData.form.addresse,
          codePostale: this.dialogData.form.codePostale,
          dateCreation: this.dialogData.form.dateCreation,
        });
        this.clientForm.controls['id'].disable();
        this.clientForm.controls['dateCreation'].disable();
      }
      if (this.dialogData.action === 'delete') {
        this.actionBtn = 'Supprimer';
        this.clientForm.patchValue({
          id: this.dialogData.form.id,
          tel: this.dialogData.form.tel,
          nom: this.dialogData.form.nom,
          mail: this.dialogData.form.mail,
          addresse1: this.dialogData.form.addresse,
          codePostale: this.dialogData.form.codePostale,
          dateCreation: this.dialogData.form.dateCreation,
        });
        this.clientForm.controls['id'].disable();
        this.clientForm.controls['tel'].disable();
        this.clientForm.controls['nom'].disable();
        this.clientForm.controls['mail'].disable();
        this.clientForm.controls['addresse'].disable();
        this.clientForm.controls['codePostale'].disable();
        this.clientForm.controls['dateCreation'].disable();
      }
    }
  }
  onSubmit() {
    if (!this.dialogData) {
      if (this.clientForm.valid) {
        this.dialogRef.close(this.clientForm.value);
      } else this.snack.open('Entree non valide', 'OK', { duration: 2000 });
    }
    if (this.dialogData) {
      if (this.dialogData.action === 'update') {
        if (this.clientForm.valid) {
          console.log(this.clientForm.value)
          this.dialogRef.close(this.clientForm.value);
        } else this.snack.open('Entree non valide', 'OK');
      }
      if (this.dialogData.action === 'delete') {
        this.dialogRef.close('deleted!');
      }
    }
  }
}
