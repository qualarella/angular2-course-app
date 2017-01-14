import { Pipe, PipeTransform } from '@angular/core';
 
@Pipe({
    name: 'duration'
})
export class DurationPipe implements PipeTransform {
  transform(minutes: number, args?: any): string {
   if (minutes < 0) {
     throw new RangeError('Parameter must be positive');
   }
 
   const MINUTES_IN_ONE_HOUR: number = 60;

   return `${Math.floor(minutes / MINUTES_IN_ONE_HOUR)}h ${minutes % MINUTES_IN_ONE_HOUR}min`;
  }
}