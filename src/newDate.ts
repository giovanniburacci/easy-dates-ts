import { easyDate,Format } from "./types/types";

const DEFAULT:string="";

const toValidNumber = (date:string):number => 
                    date.charAt(0) === '0' ? Number(date.substring(1)) : Number(date);



export const toDate = (date:string | Date): easyDate | undefined => {
    if(date === DEFAULT) {
        return toDate(new Date());
    }
    
    if(typeof date === 'string') {
        if(date.match(/^\d{4}[./-]\d{2}[./-]\d{2}$/) ) {
            return {
                format: Format.INTERNATIONAL,
                year: toValidNumber(date.substring(0,4)),
                month: toValidNumber(date.substring(5,7)),
                day: toValidNumber(date.substring(8)),
            }
        }
    }

    
}

console.log(toDate("1984-21-22"))