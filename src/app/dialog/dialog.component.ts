import { Component, OnInit,Inject } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';

interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})


export class DialogComponent implements OnInit {

  ProductForm!:FormGroup
  ActionBtn:String='Save';
  FormName:String='Add Product Form';
  foods:Food[]=[
    {value:'steak-0',viewValue:'Steak'},
    {value:'pizza-1',viewValue:'Pizza'},
    {value:'Tacos-2',viewValue:'Tacos'}
  ];
  seasons=  ['Winter', 'Spring', 'Summer', 'Autumn'];
  constructor(private formBuilder:FormBuilder,private api:ApiService,@Inject(MAT_DIALOG_DATA)public editdata:any,private dialogRef:MatDialogRef<DialogComponent>)
  {
        
  }
  
  ngOnInit(): void {
this.ProductForm=this.formBuilder.group(
  {
    product:['',Validators.required],
    category:['',Validators.required],
    pickdate:['',Validators.required],
    season:['',Validators.required]

  }
)

  ///console.log(this.editdata);

  if(this.editdata)
  {
    this.ActionBtn='Update';
    this.FormName='Edit';
    this.ProductForm.controls['product'].setValue(this.editdata.product);
    this.ProductForm.controls['category'].setValue(this.editdata.category);
    this.ProductForm.controls['pickdate'].setValue(this.editdata.pickdate);
    this.ProductForm.controls['season'].setValue(this.editdata.season);
  }
    
  }

  

  fnadd()
  {
    //console.log(this.ProductForm.value);
    if(!this.editdata)
    {
    if(this.ProductForm.valid)
    {
      this.api.postproduct(this.ProductForm.value).subscribe(
        {
          next:(res)=>
          {
          alert('Product  added sucessfully..');
          this.ProductForm.reset();
          this.dialogRef.close('save');
          },
          error:()=>
          {
            alert('Error while adding the product');
          }
        });
    }
   
  }
  else{
    this.updateproduct();
  }
  }

  
  

  updateproduct()
  {
       this.api.PutProduct(this.ProductForm.value,this.editdata.id).subscribe(
        {
          next:(res)=>
          {
            alert('Product updated suceessfully');
            this.ProductForm.reset();
            this.dialogRef.close('update');
          },
          error:(res)=>
          {
            alert('Error while updating the record');
          }
        })
        
  }
}
