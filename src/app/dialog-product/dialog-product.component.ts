import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-product',
  templateUrl: './dialog-product.component.html',
  styleUrls: ['./dialog-product.component.scss']
})
export class DialogProductComponent implements OnInit {
  productForm!:FormGroup;
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.productForm=this.fb.group({
      code:['',Validators.required],     
      productName:['',Validators.required],
      quantity:['',Validators.required],
      date : ['',Validators.required],
      fournisseur:['',Validators.required],
    }

    );
  }

}
