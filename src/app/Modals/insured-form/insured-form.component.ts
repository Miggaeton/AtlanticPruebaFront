import { Component, OnInit, Inject, inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import{ MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Insured } from 'src/app/interfaces/insured';

import { InsuredService } from 'src/app/services/insured.service';

import * as Dayjs from 'dayjs';

@Component({
  selector: 'app-insured-form',
  templateUrl: './insured-form.component.html',
  styleUrls: ['./insured-form.component.css'],
  providers:[]
})
export class InsuredFormComponent {
  formInsured: FormGroup;
  tituloAccion: string = 'Nuevo'
  botonAccion: string = 'Guardar'
  listInsured: Insured[] = []


  constructor(
    private dialogReference: MatDialogRef<InsuredFormComponent>,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _insuredService: InsuredService,
    @Inject (MAT_DIALOG_DATA) public _insuredEdit: Insured
) {
    this.formInsured = this._formBuilder.group({
      id: ['', Validators.required],
      firstName: ['', Validators.required],
      secondName: [''],
      firstLastName: ['', Validators.required],
      secondLastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      birthDate: ['', Validators.required],
      value: ['', Validators.required],
      observations: ['']
    })


    this._insuredService.getInsured().subscribe({
      next:(data) => {
        this.listInsured = data;
      },error:(e) => {}
    });

  }

  showAlert(msg: string, action: string){
    this._snackBar.open(msg, action, {
      horizontalPosition:"end",
      verticalPosition:"top",
      duration:3000
    });
  }

  addEditInsured(){
    const _insured: Insured = {

      id: this.formInsured.value.id,
      firstName: this.formInsured.value.firstName,
      secondName: this.formInsured.value.secondName,
      firstLastName: this.formInsured.value.firstLastName,
      secondLastName: this.formInsured.value.secondLastName,
      email: this.formInsured.value.email,
      phone: (this.formInsured.value.phone).toString(),
      birthDate: Dayjs(this.formInsured.value.birthDate).format("YYYY-MM-DD"),
      value: this.formInsured.value.value,
      observations: this.formInsured.value.observations
    }

    if (this._insuredEdit) {
      this._insuredService.updateInsured(this._insuredEdit.id, _insured).subscribe({
        next:(data)=>{
          this.showAlert("Asegurado actualizado", "Listo")
          this.dialogReference.close("Actualizado")
        },error:(e) => {
          console.log(e)
          this.showAlert("Error al actualizar", "Error")
        }
      })
    }else{
      this._insuredService.addInsured(_insured).subscribe({
        next:(data)=>{
          this.showAlert("Asegurado registrado", "Listo")
          this.dialogReference.close("Registrado")
        },error:(e) => {
          console.log(e)
          this.showAlert("Error al crear", "Error")
        }
      })
    }
  }


  ngOnInit(): void {
    
    if(this._insuredEdit){
      this.formInsured.patchValue({
        id: this._insuredEdit.id.toString(),
        firstName: this._insuredEdit.firstName,
        secondName: this._insuredEdit.secondName,
        firstLastName: this._insuredEdit.firstLastName,
        secondLastName: this._insuredEdit.secondLastName,
        email: this._insuredEdit.email,
        phone: this._insuredEdit.phone,
        birthDate: this._insuredEdit.birthDate,
        value: this._insuredEdit.value,
        observations: this._insuredEdit.observations
      })

      this.tituloAccion  = "Editar"
      this.botonAccion = "Actualizar"
    }

    this.dialogReference.updateSize('60%', '90%')
  }
}
