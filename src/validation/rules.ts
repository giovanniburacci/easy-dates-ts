export const MONTHS_DAYS =  {
    JANUARY : 31,
    FEBRUARY : 28,
    LEAP_FEBRUARY : 29,
    MARCH : 31,
    APRIL : 30,
    MAY : 31,
    JUNE : 30,
    JULY : 31,
    AUGUST : 31,
    SEPTEMBER : 30,
    OCTOBER : 31,
    NOVEMBER :30,
    DECEMBER : 31
}

//returns a valid number primitive even if first digit is 0
export const toValidNumber = (date:string):number | undefined => 
                    date.charAt(0) === '0' ? Number(date.substring(1)) : Number(date);
