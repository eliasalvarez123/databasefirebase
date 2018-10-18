import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys',
  pure: false
})
export class KeysPipe implements PipeTransform {

  transform( value: any ): any {
// traigo las llaves con lo que se identifican los datos en fire base
let keys = [];
// recorro todo el objeto que traigo de firebase
for( let key in value){
  keys.push(key)
  }
  return keys;
  }

}
