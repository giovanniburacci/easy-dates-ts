import { EasyDate } from "../types/types";
import {MONTHS_DAYS} from './rules'

const isLeapYear = (year:number):boolean => 
                (year % 100 == 0 && year % 400 == 0) || (year % 4 == 0 && year % 100 !== 0)

export const isValidDate = (date:EasyDate):boolean => 
    date.month > 0 && date.month < 13 && (
        isLeapYear(date.year) && date.month == 2 ?  date.date < 30 : date.date <= Object.values(MONTHS_DAYS)[date.month-1]
        ) 
        && date.date > 0
    
