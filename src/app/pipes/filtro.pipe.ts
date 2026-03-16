import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filtro',
    standalone: false
})
export class FiltroPipe implements PipeTransform {

  transform(value: string, limite: number): string {
    return value.length > limite ? value.substring(0,limite) :   value;;
  }

}
