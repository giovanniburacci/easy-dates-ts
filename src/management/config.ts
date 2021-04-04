export const formatSeparators:string[] = ['-','/','.','-'];

const internationalRegex:RegExp = new RegExp( '\^\\d{4}['+formatSeparators.join('/')+']\\d{1,2}['+formatSeparators.join('/')+']\\d{1,2}$' );

const yearLastRegex:RegExp = new RegExp( '\^\\d{1,2}['+formatSeparators.join('/')+']\\d{1,2}['+formatSeparators.join('/')+']\\d{4}$' )

export const addSeparator = (separator:string): void =>{
    if(separator.length === 1)
        formatSeparators.concat(separator);
}

export const regexes = {
    internationalRegex,
    yearLastRegex
}