import { AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Insured } from '../interfaces/insured';
import { InsuredService } from '../services/insured.service';
import { MatDialog } from '@angular/material/dialog';
import { InsuredFormComponent } from '../InsuredForm/insured-form/insured-form.component';
import { DeleteDialogComponent } from '../InsuredForm/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-table-component',
  templateUrl: './table-component.component.html',
  styleUrls: ['./table-component.component.css']
})
export class TableComponentComponent implements AfterViewInit, OnInit{
  displayedColumns: any[] = ['id', 
    'firstName', 
    'secondName', 
    'firstLastName',
    'secondLastName',
    'email',
    'phone',
    'birthDate',
    'value',
    'observations',
    'acciones']
  dataSource = new MatTableDataSource();

  constructor(private _insured: InsuredService, public dialog: MatDialog){

  }

  ngOnInit(): void {
    this.showInsured();
  }
  
  showInsured(){
    this._insured.getInsured().subscribe({
      next:(dataS) => {
        this.dataSource.data = dataS;
        console.log(this.dataSource.data)
      },error:(e) => {console.error(e)}

    })
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;


  }
  
applyFilter(event: Event){
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

openDialog(_insured: Insured){
  
  this.dialog.open(InsuredFormComponent, {
    width: "350px",
    data: _insured
  }).afterClosed().subscribe(resultado =>{
    if(resultado === "editado"){
      this.showInsured();
    }
  });
}

deleteDialog(_insured: Insured){
  
  this.dialog.open(DeleteDialogComponent, {
    width: "350px",
    data: _insured
  }).afterClosed().subscribe(resultado =>{
    if(resultado === "editado"){
      this.showInsured();
    }
  });
}

}

