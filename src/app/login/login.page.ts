import { Component, OnInit } from '@angular/core';

import{
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;
   usuariosRegistrados = this.userService.getUsers();

  constructor(public fb:FormBuilder, 
    public alertController: AlertController,
    private router: Router,
    private toastController: ToastController,  
    private userService: UserService) { 
    this.formularioLogin = this.fb.group({
      'email': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required),
    })
   }

  ngOnInit() {
  }

  async ingresar() {
    var f = this.formularioLogin.value;
    
    const usuarioEncontrado = this.usuariosRegistrados.find((usuario) => {
      return usuario.email === f.email && usuario.password === f.password;
    });
  
    if (usuarioEncontrado) {
      
    const toast = await this.toastController.create({
      message: 'Bienvenido',
      duration: 2000,
      position: 'bottom'
    });

    toast.present();
      this.router.navigate(['/tabs']);
    } else {
      const alert = await this.alertController.create({
        header: 'Datos Incorrectos',
        message: 'Los datos no son correctos.',
        buttons: ['OK']
      });
      await alert.present();
      f.email = '';
      f.password = '';
    }
  }
  

}
