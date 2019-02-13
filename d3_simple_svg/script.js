// https://bl.ocks.org/heybignick/3faf257bbbbc7743bb72310d03b86ee8
// https://bl.ocks.org/fancellu/2c782394602a93921faff74e594d1bb1
// https://bl.ocks.org/d3noob/43a860bc0024792f8803bba8ca0d5ecd
// https://github.com/d3/d3-selection/blob/master/README.md
//
// https://bost.ocks.org/mike/join/
// https://bost.ocks.org/mike/selection/
let theDate = new Date()
theDate.setDate( theDate.getDate() - 30 )
let month = JSON.parse( myPrintMonthJSON( theDate ) )

document.addEventListener( 'DOMContentLoaded', function( ) { 
    //var p = d3.select('div#the')
    //    .selectAll('p')
    //    .data( month )
    //        .text( d => d )

    //p.enter().append('p')
    //    .text( d => d )

    //p.exit().remove()

    var tbl = d3.select('div#the').append( 'table' )
     
    let tblData = tbl.selectAll('tr')
      .data( month )

    let tdData = tblData.enter()
      .append('tr')
      .selectAll('td')
      .data( d => d )

    tdData.enter()
      .append('td')
      .text( d => d.slice( -2 ) )

} )
