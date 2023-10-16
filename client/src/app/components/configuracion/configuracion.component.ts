import { Component,OnInit,HostBinding } from '@angular/core';
import { ownAccountModify } from 'src/app/models/ownAccountModify';
import { changePass } from 'src/app/models/changePass';
import { UserServiceService } from 'src/app/services/user-service.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent {
  users: any=[];
  nuevacontrasena: any=[];
  passwordUpdate: any=[];
  mostrarAlertaUpdate: boolean=false;
  hayError: boolean=false;
  userSeleccionado: any=[];
  idSeleccionado: number | null = null;
  constructor(private usuarioService:UserServiceService, private userService:UserServiceService, private cookieService: CookieService, private router:Router){}
  usuarioSeleccionado:any=[];
  usrData:ownAccountModify={
    nombre:'',
    apePat:'',
    apeMat:'',
    imgUsuario:'',
    telefono:0,
    correo:''
  }
  cambiarPass:changePass={
    anteriorPasswd:'',
    newPasswd:'',
    confirmaPasswd:''
  }

  ngOnInit(){
    this.listarUsuarioDatos();
    const hashCookie=this.cookieService.get('session_id');
    if(hashCookie!='978bd5877610d24d6f17d259522429c55710f33c6629aea9c95cae39a82ed740541872907ba03d439269dec7d3b1b0ebcfef5831ea0f3f8acbb1daff1577de8d'){
      if(hashCookie=='e4b7b5b1162da37abeff1df9ad7590fdf2197ac7a00acfec38d78c666a4df1f60663675ee40df49dff7ae5f93993d72b75a4de998e6f0af063d6348a2c97a74c'){
        this.router.navigate(['/inicio']);
      }else{
        this.router.navigate(['/principal']);
      }
    }else{
      this.listarUsuarioDatos();
    }
  }
  listarUsuarioDatos(){
    this.userService.listarUsuarios().subscribe(
      resp=>
      {
        this.users=resp;
      },
      err=>console.log(err)
    );
  }  
  actualizarDatos(){
    const configuracionData = {
      ...this.usrData,
      ...this.userSeleccionado[0]
    };
    this.usuarioService.actualizarUsuario(''+this.idSeleccionado,configuracionData).subscribe(
      resp=>{this.mostrarAlertaUpdate=true; this.listarUsuarioDatos();},err=>{console.log(err); this.hayError=true;}
    );
  }
  eliminarCuenta(){
    this.userService.eliminarUsuario('' + this.idSeleccionado).subscribe(
      resp => {
        console.log('Cuenta eliminada con éxito');
        this.listarUsuarioDatos();
      },
      err => {
        console.log(err);
        this.hayError = true;
      }
    );
  }
  cambiarContra(){
  //  this.userService.cambiarContra(userId, this.cambiarPass).subscribe(
    //  (resp : any) => {
      //  console.log('Contraseña cambiada con éxito');
        //this.cambiarPass = {
          //anteriorPasswd: '',
          //newPasswd: '',
          //confirmaPasswd: ''
      //  };
      //},
      //(err : any) => {
        //console.log(err);
        //this.hayError = true;
     // }
    //);
  }
}


