import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InsuredFormComponent } from './Modals/insured-form/insured-form.component';
import { TableComponentComponent } from './table-component/table-component.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AtlanticPruebaFront';
  activeTheme = true;
  /**
   *
   */
  constructor(public dialog: MatDialog) {

  }


}
