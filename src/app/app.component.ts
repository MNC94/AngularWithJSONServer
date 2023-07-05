import { Component, OnInit,AfterViewInit, ViewChild } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import { MatTableDataSource,MatTableModule } from '@angular/material/table'; 
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AngularWithMaterialApp';
  displayedColumns: string[] = ['id', 'product', 'category', 'season','pickdate','action'];
  dataSource!: MatTableDataSource<any>;
 @ViewChild(MatPaginator) paginator!: MatPaginator;
 @ViewChild(MatSort) sort !: MatSort;
  
  constructor(private dialog:MatDialog,private api:ApiService)
  {
  
  }

  ngOnInit(): void {
    this.getproducttdetails();
  }
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openDialog() {
     this.dialog.open(DialogComponent,{
      width: '30%',
     }).afterClosed().subscribe(val=>
      {
        if(val==='save')
        {
          this.getproducttdetails();
        }
      });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  
  editproduct(row:any)
  {
    this.dialog.open(DialogComponent,{
      width: '30%',
      data:row
     }).afterClosed().subscribe(val=>{
      if(val==='update')
      {
        this.getproducttdetails();
      }
     });
  }
  deleteproduct(id:Number)
  {
    this.api.deletProduct(id).subscribe({
    next:(res)=>{
         alert('Product deleted successfully..');
         this.getproducttdetails();
    },
    error:(err)=>{
     alert('Deleting time while error found ');
    }

    })
  }



    getproducttdetails()
    {
       this.api.getproduct().subscribe(
        {
          next:(res)=>
          {
            //console.log(res);
            this.dataSource=new MatTableDataSource(res);
            this.dataSource.paginator=this.paginator;
            this.dataSource.sort=this.sort;
          },
          error:(err)=>
          {
            alert('error while Fetechig data');
          }
        }
       )
    }
}
