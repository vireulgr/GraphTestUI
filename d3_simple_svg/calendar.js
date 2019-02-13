//
let myPrintDate = date => {
    const dayStr    = (date.getDate() < 10)? '0' + date.getDate()       : '' + date.getDate();
    const monthStr  = (date.getMonth() < 9)? '0' + (date.getMonth() + 1): '' + (date.getMonth() + 1);
    //const dateStr = '' + dayStr + '.' + monthStr + '.' + (date.getFullYear() - 2000) /*+'(' + date.getDay() + ')'*/;
    const dateStr = '' + date.getFullYear() + '-' + monthStr + '-' + dayStr /*+'(' + date.getDay() + ')'*/;
    return dateStr;
}

//
let getStartOfTheWeekDate = date => {
    let startOfTheWeek = new Date( date );
    const dayOfWeek = startOfTheWeek.getDay();
    if( dayOfWeek === 0 ) {
      startOfTheWeek.setDate( startOfTheWeek.getDate() - 6 );
    }
    else {
      startOfTheWeek.setDate( startOfTheWeek.getDate() - (startOfTheWeek.getDay() - 1) );
    }
    return startOfTheWeek;
}

// Print Week JSON
let myPrintWeekJSON = date => {
    let weekJSON = '[';
    let weekDay = date.getDay();

    while( weekDay != 0 ) {
        //weekJSON += '{"date":"' + myPrintDate( date ) + '"},';
        weekJSON += '"' + myPrintDate( date ) + '",';
        date.setDate( date.getDate() + 1 );
        weekDay = date.getDay();
    }
    //weekJSON += '{"date":"' + myPrintDate( date ) + '"}]';
    weekJSON += '"' + myPrintDate( date ) + '"]';
    date.setDate( date.getDate() + 1 );
    return weekJSON;
}

// Print Week
let myPrintWeek1 = date => {
    let weekStr = '';
    let weekDay = date.getDay();

    while( weekDay != 0 ) {
        weekStr += myPrintDate( date ) + ' ';
        date.setDate( date.getDate() + 1 );
        weekDay = date.getDay();
    }
    weekStr += myPrintDate( date );
    date.setDate( date.getDate() + 1 );
    console.log( weekStr )
}

// Print Week
let myPrintWeek2 = date => {
    let weekStr = '';
    let weekDay = date.getDay();

    while( weekDay != 0 ) {
        weekStr += date.toLocaleDateString('ru-RU', options) + ' ';
        date.setDate( date.getDate() + 1 );
        weekDay = date.getDay();
    }
    weekStr += date.toLocaleDateString('ru-RU', options);
    date.setDate( date.getDate() + 1 );
    console.log( weekStr );
}

// Print Week
let myPrintWeek3 = ( date, dateFmt ) => {
    let weekStr = '';
    let weekDay = date.getDay();

    while( weekDay != 0 ) {
        weekStr += dateFmt.format( date ) + ' ';
        date.setDate( date.getDate() + 1 );
        weekDay = date.getDay();
    }
    weekStr += dateFmt.format( date );
    date.setDate( date.getDate() + 1 );
    console.log( weekStr );
}

// Print month JSON
let myPrintMonthJSON = startMonthDate => {

    if( !(startMonthDate instanceof Date) || isNaN(startMonthDate.getTime()) ) {
      console.log( 'arg is not valid date' );
      return '';
    }

    const date = getStartOfTheWeekDate( startMonthDate );

    let monthJSON = '[';
    let calendarWeek = 0;
    for( ; calendarWeek < 5; ++calendarWeek ) {
        monthJSON += myPrintWeekJSON( date ) + ',';
    }
    if( date.getDate() > 8 ) {
        monthJSON += myPrintWeekJSON( date );
    }
    else {
      monthJSON = monthJSON.slice( 0, -1 );
    }
    monthJSON += ']';

    return monthJSON;
}

//
let printMonth = initialDate => {

    const date = getStartOfTheWeekDate( initialDate );

    let calendarWeek = 0;
    for( ; calendarWeek < 5; ++calendarWeek ) {
        myPrintWeek1( date );
    }
    if( date.getDate() > 8 ) {
        myPrintWeek1( date );
    }
}

//
let printMonth2 = initialDate => {
    const date = getStartOfTheWeekDate( initialDate );

    let calendarWeek = 0;
    for( ; calendarWeek < 5; ++calendarWeek ) {
        myPrintWeek2( date );
    }
    if( date.getDate() > 8 ) {
        myPrintWeek2( date );
    }
}

//
let printMonth3 = initialDate => {
    let dateFmt = new Intl.DateTimeFormat( 'de-DE', options );

    const date = getStartOfTheWeekDate( initialDate );

    let calendarWeek = 0;
    for( ; calendarWeek < 5; ++calendarWeek ) {
        myPrintWeek3( date, dateFmt );
    }
    if( date.getDate() > 8 ) {
        myPrintWeek3( date, dateFmt );
    }
}
//********************************************************************************
// Vars
//********************************************************************************
//const options = { day: '2-digit', month: '2-digit', year: '2-digit' };

//const dateStr = '2018-12-01';

//const initialDate = new Date( dateStr );

// Entry Point
//console.log( initialDate );

//let exDate = new Date( '2018-05-01' )
//for( let i = 0; i < 6; ++i ) {
//  exDate.setMonth( exDate.getMonth() +1 )
//  exDate.setDate( 1 )
//  console.log( myPrintDate( exDate ) )
//  let a = myPrintMonthJSON( exDate )
//  //console.log( a )
//  let o = JSON.parse( a )
//  console.log( o[0][0], o[0][1], o[0][2], o[0][3], o[0][4], o[0][5], o[0][6] )
//}
//console.log();
//printMonth2( initialDate );
//console.log();
//printMonth3( initialDate );
