import { Injectable } from '@angular/core';

// importamos para poder manejar peticiones http y headers
import { Http, Headers } from '@angular/http';

// importamos las interfaces en la cual estan los datos del formulario
import { Heroe  } from '../interfaces/heroe.interface';

// importamos para usar la funcion de mapeo
import 'rxjs/Rx';


@Injectable()
export class HeroesService {

// direccion URL de la base de datos en firebase

heroesURL:string = "https://heroesapp-3408a.firebaseio.com/heroes.json";
heroeURL:string = "https://heroesapp-3408a.firebaseio.com/heroes/";

// injectamos el http

  constructor( private http:Http ) { }

// funcion para pasar el json a firebase informacion guarda en heroe
  nuevoHeroe( heroe:Heroe ){

    // funcion para pasar el json a firebase informacion guardar en heroe

    let body = JSON.stringify( heroe );
    let headers = new Headers({
      'Content-Type':'application/json'
    });

// retornamos la peticion json y se mapea
    return this.http.post( this.heroesURL, body, { headers } )
    .map( res=>{
      console.log(res.json());
      return res.json();
    })
  }

// funcion para pasar el json a firebase informacion actualizar en heroe
  actualizarHeroe( heroe:Heroe, key$:string  ){

    let body = JSON.stringify( heroe );
    let headers = new Headers({
      'Content-Type':'application/json'
    });

    let url = `${ this.heroeURL }/${ key$ }.json`;

// retornamos la peticion json y se mapea
    return this.http.put( url, body, { headers } )
    .map( res=>{
      console.log(res.json());
      return res.json();
    })
  }
// funcion get para llamar informacion individual
getHeroe( key$:string ){   

  let url = `${ this.heroeURL }${ key$ }.json`;  
  return this.http.get ( url )  .map( res=>res.json() );

}

// funcion get para llamar informacion de todos los registros
getHeroes(  ){   

  return this.http.get ( this.heroesURL )  .map( res=>res.json() );

}
// funcion borrar para el boton ene heroes.component.html
borraHeroe( key$:string ){   

  let url = `${ this.heroeURL }${ key$ }.json`;  
  return this.http.delete ( url )  .map( res=>res.json() );

}

}
