
//different kinds of separators which can be accepted
export const formatSeparators:string[] = ['-','/','.'];

//regexp to accept YYYY/XX/XX - very strict about 4 digits to define years, otherwise it would be undefined
const internationalRegex:RegExp = new RegExp( '\^\\d{4}['+formatSeparators.join('/')+']\\d{1,2}['+formatSeparators.join('/')+']\\d{1,2}$' );

//regexp to accept XX/XX/YYYY
const yearLastRegex:RegExp = new RegExp( '\^\\d{1,2}['+formatSeparators.join('/')+']\\d{1,2}['+formatSeparators.join('/')+']\\d{4}$' )

//method to add custom separators
//nb: only one-digit symbols are allowed, also setting numbers as separator can cause
//unpredictable behaviours
export const addSeparator = (separator:string): void =>{
    if(separator.length === 1)
        formatSeparators.concat(separator);
}

export const regexes = {
    internationalRegex,
    yearLastRegex
}