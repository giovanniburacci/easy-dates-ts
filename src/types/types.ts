
export type easyDate = {
    year?: number,
    month?: number,
    day?: number,
    seconds?: number,
    millisecond?: number,
    format: Format
};

export enum Format {
    USA = 'MM/DD/YYYY',
    INTERNATIONAL = 'YYYY/MM/DD',
    DAY_FIRST = 'YYYY/MM/DD'
};

