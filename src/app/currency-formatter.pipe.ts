import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat'
})
export class CurrencyFormatPipe implements PipeTransform {

  transform(
    value: any, currencySymbol: string = '₦',
    decimalLength: number = 2, chunkDelimiter: string = ',', decimalDelimiter: string = '.', chunkLength: number = 3): string {
    if (isNaN(value)) {
      return `${currencySymbol}0.00`;
    }

    // Convert the value to a number and then to a fixed decimal string
    const numericValue = Number(value);
    const fixedValue = numericValue.toFixed(decimalLength);

    // Split the integer and decimal parts
    // eslint-disable-next-line prefer-const
    let [integer, decimal] = fixedValue.split('.');

    // Add chunk delimiters to the integer part
    const regex = new RegExp(`\\B(?=(\\d{${chunkLength}})+(?!\\d))`, 'g');
    integer = integer.replace(regex, chunkDelimiter);

    // Combine the integer and decimal parts with the decimal delimiter
    return `${currencySymbol}${integer}${decimalDelimiter}${decimal}`;
  }
}
