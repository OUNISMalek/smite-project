import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-fournisseur',
  templateUrl: './dialog-fournisseur.component.html',
  styleUrls: ['./dialog-fournisseur.component.scss'],
})
export class DialogFournisseurComponent implements OnInit {
  actionBtn: string = 'OK';
  fournisseurForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    public dialogRef: MatDialogRef<DialogFournisseurComponent>,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fournisseurForm = this.fb.group({
      id: [null],
      nom: ['', Validators.required],
      description: ['', Validators.required],
      matFiscale: ['', Validators.required],
      dateCreation: [null],
    });
    this.fournisseurForm.controls['id'].disable();
    this.fournisseurForm.controls['dateCreation'].disable();
    if (this.dialogData) {
      if (this.dialogData.action === 'delete') {
        this.actionBtn = 'Supprimer';
        this.fournisseurForm.patchValue({
          id: this.dialogData.form.id,
          nom: this.dialogData.form.nom,
          description: this.dialogData.form.description,
          matFiscale: this.dialogData.form.matFiscale,
          dateCreation: this.dialogData.form.dateCreation,
        });
        this.fournisseurForm.controls['id'].disable();
        this.fournisseurForm.controls['nom'].disable();
        this.fournisseurForm.controls['description'].disable();
        this.fournisseurForm.controls['matFiscale'].disable();
        this.fournisseurForm.controls['dateCreation'].disable();
      }
    }
  }
  onSubmit() {
    if (!this.dialogData) {
      if (this.fournisseurForm.valid) {
        this.dialogRef.close(this.fournisseurForm.value);
      } else this.snack.open('Entree non valide', 'OK', { duration: 2000 });
    }
    if (this.dialogData) {
      if (this.dialogData.action === 'update') {
        if (this.fournisseurForm.valid) {
          this.dialogRef.close(this.fournisseurForm.value);
        } else this.snack.open('Entree non valide', 'OK');
      }
      if (this.dialogData.action === 'delete') {
        this.dialogRef.close('deleted');
      }
    }
  }
}
