import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InsuredFormComponent } from './InsuredForm/insured-form/insured-form.component';
import { TableComponentComponent } from './table-component/table-component.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AtlanticPruebaFront';
  /**
   *
   */
  constructor(public dialog: MatDialog) {

  }

  openDialog(){
    this.dialog.open(InsuredFormComponent, {
      width: "350px"
    }).afterClosed().subscribe(resultado =>{
      if(resultado === "creado"){
        
      }
    });
  }
}
