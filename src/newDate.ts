import { EasyDate, Format } from './types/types';
import {regexes,formatSeparators} from './management/config';
import { countSumDates, isValidDate } from './validation/validation';
import {toValidNumber} from './validation/rules'
import {MONTHS_DAYS} from './validation/rules'
const EMPTY_STRING:string="";

//returns an EasyDate if the date is properly formatted, else returns undefined
const getInternationalProps = (date:string):EasyDate => {
    for(let separator of formatSeparators) {
        if(date.indexOf(separator) !== -1) {
            const newDate:EasyDate = {
                year: toValidNumber(date.substring(0,date.indexOf(separator))),
                month: toValidNumber(date.substring(date.indexOf(separator)+1,date.lastIndexOf(separator))),
                date: toValidNumber(date.substring(date.lastIndexOf(separator)+1))
            }
            if(isValidDate(newDate)) {
                return newDate;
            }
            else {
                return undefined;
            }
        }
    }
}

const getUSAProps = (date:string):EasyDate => {
    for(let separator of formatSeparators) {
        if(date.indexOf(separator) !== -1) {
            const newDate:EasyDate = {
                month: toValidNumber(date.substring(0,date.indexOf(separator))),
                date: toValidNumber(date.substring(date.indexOf(separator)+1,date.lastIndexOf(separator))),
                year: toValidNumber(date.substring(date.lastIndexOf(separator)+1))
            }
            if(isValidDate(newDate)) {
                return newDate;
            }
            else {
                return undefined;
            }
        }
    }
}
const getDayFirstProps = (date:string):EasyDate => {
    for(let separator of formatSeparators) {
        if(date.indexOf(separator) !== -1) {
            const newDate:EasyDate = {
                date: toValidNumber(date.substring(0,date.indexOf(separator))),
                month: toValidNumber(date.substring(date.indexOf(separator)+1,date.lastIndexOf(separator))),
                year: toValidNumber(date.substring(date.lastIndexOf(separator)+1))
            }
            if(isValidDate(newDate)) {
                return newDate;
            }
            else {
                return undefined;
            }
        }
    }
}

//returns an EasyDate from a well-formatted string. format parameter can be included to force the EasyDate
//format to Format.USA or Format.DAY_FIRST, however every check will still be done to ensure the string
//is properly correct and will eventually return undefined if not. format parameter will be ignored in case
//of a well-formatted Format.INTERNATIONAL string. if format is missing and the string is not a 
//Format.INTERNATIONAL, Format.DAY_FIRST will be assigned to the EasyDate.
//nb: in case of ambiguity, DAY_FIRST format will overwhelm.
export const toDate = (date:string | Date, format?:Format): EasyDate | undefined => {

    if(Object.prototype.toString.call(date) === '[object Date]' && date instanceof Date) {
        return {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            date: date.getDate()
        }
    }

    if(typeof date === 'string') {

        if(date === EMPTY_STRING) {

            return toDate(new Date());
        }
        else {
            if(date.match(regexes.internationalRegex))  {
                const intProps = getInternationalProps(date);
                if(intProps !== undefined)
                {
                    if(intProps.year !== undefined && intProps.month !== undefined && intProps.date !== undefined){
                        return {
                            ...intProps
                        }
                    }
                }
            }
            else if (date.match(regexes.yearLastRegex)) {
                const yerLastProps = format === Format.USA ? getUSAProps(date) : getDayFirstProps(date);
                if(yerLastProps !== undefined)
                {
                    console.log('date', yerLastProps);
                    if(yerLastProps.year !== undefined && yerLastProps.month !== undefined && yerLastProps.date !== undefined){
                        return {
                            ...yerLastProps
                        }
                    }
                }
            }
            else {
                return undefined;
            }
        }
    }
}

//returns an EasyDate which is the result of the passed arguments.
// nb: dates are calculated before months (I guess it's the most logic order)
//so the results may vary from method to method
export const addDates = (date1:EasyDate,date2:EasyDate):EasyDate => {
    let year:number = date1.year + date2.year;

    let month:number,date:number;

    if(date1.month + date2.month > 12) {
        month = 12 - (date1.month + date2.month);
        year ++;
    }
    else {
        month = date1.month + date2.month;
    }

    if(date1.date + date2.date > Object.values(MONTHS_DAYS)[month]) {
        month ++;
        date = date1.date + date2.date - Object.values(MONTHS_DAYS)[month-1];
    } 
    else {
        date = date1.date + date2.date;
    }

    return {
        year,
        month,
        date
    }
    
}

//returns an EasyDate which is the result of the subtraction between the passed paramaters. 
// nb: dates are calculated before months (I guess it's the most logic order)
//so the results may vary from method to method
export const subtractDates = (date1:EasyDate,date2:EasyDate):EasyDate => {
    const sumDates = countSumDates(date2,{year:0});
    let year:number = date1.year - date2.year;
    let month:number,date:number;

    if(date1.month - date2.month < 1) {
        month = 12 - (date2.month - date1.month);
        year --;
    }
    else {
        month = date1.month - date2.month
    }

    if(date1.date - date2.date < 1 ) {
        date = Object.values(MONTHS_DAYS)[month] - (date2.date - date1.date) //- sumDates
        month --;

    }
    else {
        date=date1.date - date2.date
    }

    return {
        year,
        month,
        date
    }
}

//returns true if all fields match
export const areEqualDates = (date1:EasyDate,date2:EasyDate):boolean => 
                    date1.year === date2.year &&
                    date1.month === date2.month &&
                    date1.date === date2.date

//returns true if first parameter > second
export const isGreaterDate = (date1:EasyDate,date2:EasyDate):boolean =>
    date1.year > date2.year ? true : (
        date1.month > date2.month && date1.year === date2.year ? true : (
            date1.month === date2.month && date1.year === date2.year && date1.date > date2.date  ? true : false              
        )
    )

//returns 1 if first parameter > second, -1 if first parameter < second, 0 if first parameter === 0,
//undefined if smth went wrong
export const cmpDates = (date1:EasyDate,date2:EasyDate):number =>

        areEqualDates(date1,date2) ? 0 : (
            isGreaterDate(date1,date2) ? 1 : (
                isGreaterDate(date2,date1) ? -1 : undefined
            )
        )

const date1 = toDate("3/12/2020");
const date2 = toDate("08/06/2019")
console.log(subtractDates(date1,date2));