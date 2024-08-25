import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Insured } from 'src/app/interfaces/insured';
import { InsuredService } from 'src/app/services/insured.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit{

  
constructor(
  private dialogReference: MatDialogRef<DeleteDialogComponent>,
  @Inject (MAT_DIALOG_DATA) public _insuredEdit: Insured,
  private _insuredService: InsuredService,
  private _snackBar: MatSnackBar,
) {

  
}

  ngOnInit(): void {
  }

  deleteInsured(_insured: Insured){
    this._insuredService.deleteInsured(this._insuredEdit.id).subscribe({
      next:(data)=>{
        this.showAlert("Asegurado actualizado", "Listo")
        this.dialogReference.close("Actualizado")
      },error:(e) => {
        console.log(e)
        this.showAlert("Error al actualizar", "Error")
      }
    })
  }

  showAlert(msg: string, action: string){
    this._snackBar.open(msg, action, {
      horizontalPosition:"end",
      verticalPosition:"top",
      duration:3000
    });
  }
}
