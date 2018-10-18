import { error } from '@angular/compiler-cli/src/transformers/util';
import { Component, OnInit } from '@angular/core';

// importamos los paquetes de angular para formularios
import { NgForm } from '@angular/forms';

// importamos el router para direccionar los heroes
import { Router, ActivatedRoute } from '@angular/router';

// importamos las interfaces en la cual estan los datos del formulario
import { Heroe } from '../../interfaces/heroe.interface';

// importamos el servicio de heroe
import { HeroesService } from '../../services/heroes.service';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent implements OnInit {

 // variables que voy a manejar en los formularios y voy a enviar a firebase 
private heroe:Heroe = {
nombre:"",
bio:"",
casa:"Marvel"
}
// bandera para diferenciar entre crear un archivo y modificarlo
nuevo:boolean = false;
id:string;

// inyecto el servicio en el contructor
  constructor(private _heroesService: HeroesService,
    private router: Router,
    private route: ActivatedRoute ) { 

// parametro que se envian al firebase
this.route.params
.subscribe ( parametros=>{

  this.id = parametros['id']
  if( this.id !== "nuevo" ){

this._heroesService.getHeroe( this.id )
.subscribe( heroe => this.heroe = heroe )

  }
});

    }

  ngOnInit() {
  }
// funcion para guardar los datos en firebase
  guardar(){
    console.log(this.heroe);
 // guardar en fire base
if( this.id == "nuevo" ) {
  this._heroesService.nuevoHeroe( this.heroe )
.subscribe( data=>{
this.router.navigate(['/heroe',data.name])
},
error => console.error(error));
}else{
  // actualizar en data base
  this._heroesService.actualizarHeroe( this.heroe, this.id )
.subscribe( data=>{
console.log(data);
},
error => console.error(error));
}

}
// para activar el boton nuevo heroe

agregarNuevo( forma: NgForm ){
  this.router.navigate(['/heroe','nuevo']);
  forma.reset({
    casa:"Marvel"
  });
}

}
