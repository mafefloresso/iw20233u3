import { Component, OnInit } from '@angular/core';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {

  formularioRegistro: FormGroup;

  constructor(public fb: FormBuilder,
    public alertController: AlertController,
    private toastController: ToastController, private router: Router,
    private userService: UserService) {

    this.formularioRegistro = this.fb.group({
      'email': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required),
    })
  }

  ngOnInit() {
  }

  async guardar() {
    var f = this.formularioRegistro.value;
    if (this.formularioRegistro.invalid) {
      const alert = await this.alertController.create({
        header: 'Formulario Incompleto',
        message: 'Por favor llene todos los campos.',
        buttons: ['OK']
      });

      await alert.present();
      return;
    }

    this.addUser();
  }

  async addUser() {
    const user = this.formularioRegistro.value;
    this.userService.addUser(user);

    const toast = await this.toastController.create({
      message: 'Cuenta Creada',
      duration: 2000,
      position: 'bottom'
    });

    toast.present();
    this.router.navigate(['/login']);
  }
}
