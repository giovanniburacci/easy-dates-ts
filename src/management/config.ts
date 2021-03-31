export const formatSeparators:string[] = ['-','+'];
export const internationalRegex:RegExp = new RegExp( '\^\\d{4}['+formatSeparators.join('/')+']\\d{2}['+formatSeparators.join('/')+']\\d{2}$' );

export const addSeparator = (separator:string): void =>{
    if(separator.length === 1)
        formatSeparators.concat(separator);
}