import { Component, OnInit } from '@angular/core';
// importo el servicio de heroe
import { HeroesService } from '../../services/heroes.service';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',

})
export class HeroesComponent implements OnInit {
// creo una varibles donde capturo los objetos de fire base
  heroes:any[] = [];
// varibles para vr si esta cargando la informacion 
loading:boolean = true;

  // inyecto el servicio de heroes
  constructor(private _heroesService:HeroesService) { 

    // muestro los valores que tengo en la data los cuales son los firebase
    this._heroesService.getHeroes()
    .subscribe( data =>{
   
      // carga despues de 1 segundo
     setTimeout( ()=>{
       this.loading = false;
       this.heroes = data;
      }, 1000 );
      }
    )
  }

  ngOnInit() {
  }
// esta es la funcion donde borro los registro
borraHeroe ( key$:string){

  this._heroesService.borraHeroe(key$)
  .subscribe( respuesta=>{
    if( respuesta ){
      console.error(respuesta);
    }else{
      delete this.heroes[key$];
    }
  })
}

}
