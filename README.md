# easy-dates-ts

This typescript library was developed as dumb utility to help managing dates in different formats without committing errors.
It is not intended to be a professional tool, rather a style and developing excercise.
Meanwhile, if it proves to be useful for anybody besides me, that means I'm not the only one who felt and came up with this need :)

# EASY-DATES-TS@1.0.0 IS OFFICIALLY OUT!!

Install it using:
`npm install --save easy-dates-ts`

## Core features:

### EasyDate type
Object which contains the following properties:
* Year
* Month
* Date

### Accepted Formats

* **Format.INTERNATIONAL**: YYYY/MM/DD or YYYY/M/D or any combination of previous M/D
* **Format.DAY_FIRST**: DD/MM/YYYY or D/M/YYYY or any combination of previous D/M
* **Format.USA**: MM/DD/YYYY or M/D/YYYY or any combination of previous M/D

### Separators
Default accepted separators are `['-','/','.']`, however custom separators may be added via addSeparator(separator:string) which is listed below. Maximum allowed length is 1.

### toDate(date:string,format?:Format):EasyDate
Allows generating an EasyDate from a well-formatted string. 
Allowed string matches are:
* DD/MM/YYYY (Day-first)
  - Also allowed D/M/YYYY
* MM/DD/YYYY (USA)
  - Also allowed M/D/YYYY
* YYYY/MM/DD (International)
  - Also allowed YYYY/M/D

In case of XX/XX/YYYY, Format.USA will be assigned only if strictly specified as an argument; otherwise, Format.DAY_FIRST will be assigned.

### addDates(date1:EasyDate,date2:EasyDate):EasyDate
Sums two EasyDates and returns an EasyDate. Days are calculated before months, hence the result may vary from adding months first.

### subtractDates(date1:EasyDate,date2:EasyDate):EasyDate
Subtracts two EasyDates and returns an EasyDate. Days are calculated before months, hence the result may vary from adding months first.

### areEqualDates(date1:EasyDate,date2:EasyDate):boolean
Returns true if two dates match (same year,month or day), otherwise returns false.

### isGreaterDate(date1:EasyDate,date2:EasyDate):boolean
Returns true if the first date is greater than the seconds (greater year, month or day), otherwise returns false.

### cmpDates(date1:EasyDate,date2:EasyDate):number
* Returns 1 if date1 > date2
* Returns 0 if date1 === date2
* Returns -1 if date1 < date2

### addSeparator(separator:string):void
Adds a custom separator (maximum length: 1) to the list of accepted separators. Adding numbers may cause unpredictable behaviours



### isLeapYear(date:EasyDate):boolean
Returns true if the passed EasyDate matches an actual leap year.

### countLeapYears(date:EasyDate):boolean
Returns how many leap years exist from the passed year to year 0.

### countSumDates(date1:EasyDate,date2:EasyDate):number
Returns countLeapYears(date1) - countLeapYears(date2), hence the difference between how many leap years exist from date1 and how many from date2.

### Regexes
Used to determine whether an input string can be transformed into an EasyDate.
* regexes.internationalRegex : accepts **YYYY/MM/DD || YYYY/M/D || YYYY/MM/D || YYYY/M/DD**
* regexes.yearLastRegex : accepts **XX/XX/YYYY || X/X/YYYY || X/XX/YYYY || XX/X/YYYY**
