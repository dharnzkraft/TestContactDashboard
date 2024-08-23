import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nairaCurrency'
})
export class NairaCurrencyPipe implements PipeTransform {

  transform(value: number, decimal: number = 2): string {
    if (value == null) {
      return '';
    }

    // Format the value as a string with the Naira symbol and two decimal places
    const formattedValue = value.toFixed(decimal).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `₦${formattedValue}`;
  }
}
