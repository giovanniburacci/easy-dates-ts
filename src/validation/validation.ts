import { EasyDate } from "../types/types";
import {MONTHS_DAYS} from './rules'


//checks whether it's a leap year
const isLeapYear = (year:number):boolean => 
                (year % 100 == 0 && year % 400 == 0) || (year % 4 == 0 && year % 100 !== 0)


//checks whether it's an actual valid date
export const isValidDate = (date:EasyDate):boolean => 
    date.month > 0 && date.month < 13 && (
        isLeapYear(date.year) && date.month == 2 ?  date.date < 30 : date.date <= Object.values(MONTHS_DAYS)[date.month-1]
        ) 
        && date.date > 0
    
//calculates how many leap years are there from a certain year to year 0
const countLeapYears = (year:number):number =>
                                        (year / 4)- (year / 100) + (year / 400)


//calculates how many leap years are there between two dates
export const countSumDates = (date1:EasyDate,date2:EasyDate) =>
                            countLeapYears(date1.year) - countLeapYears(date2.year+1)

