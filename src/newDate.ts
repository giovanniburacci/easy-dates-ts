import { EasyDate,Format } from './types/types';
import {regexes} from './management/config';
import { isValidDate } from './validation/validation';
import {toValidNumber} from './validation/rules'
import {MONTHS_DAYS} from './validation/rules'
const DEFAULT:string="";

export const toDate = (date:string | Date, format?:string): EasyDate | undefined => {
    if(date === DEFAULT) {
        return toDate(new Date());
    }
    if(typeof date === 'string') {
        if(date.match(regexes.internationalRegex) ) {

            return {
                format: Format.INTERNATIONAL,
                year: toValidNumber(date.substring(0,4)),
                month: toValidNumber(date.substring(5,7)),
                day: toValidNumber(date.substring(8)),
            }
        }
    }
}

export const addDates = (date1:EasyDate,date2:EasyDate):EasyDate => {
    let year:number = date1.year + date2.year;
    let month:number,day:number;

    if(date1.month + date2.month > 12) {
        month = 12 - (date1.month + date2.month);
        year ++;
    }
    else {
        month = date1.month + date2.month;
    }

    if(date1.day + date2.day > Object.values(MONTHS_DAYS)[month]) {
        month ++;
        day = date1.day + date2.day - Object.values(MONTHS_DAYS)[month-1];
    } 
    else {
        day = date1.day + date2.day;
    }

    return {
        year,
        month,
        day,
        format: Format.INTERNATIONAL
    }
    
}

const date1 = toDate("2004/02/20");
const date2 = toDate("0000/01/25");
console.log(addDates(date1,date2));