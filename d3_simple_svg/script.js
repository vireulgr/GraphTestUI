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

let graphNodes = [
    { id: 'kostya',   sex: 'm' },
    { id: 'julia',    sex: 'f' },
    { id: 'alyosha',  sex: 'm' },
    { id: 'kristina', sex: 'f' },
    { id: 'masha',    sex: 'f' },
    { id: 'petya',    sex: 'm' },
    { id: 'ksyusha',  sex: 'f' },
    { id: 'wasya',    sex: 'm' }
]

let graphLinks = [
    { source: 'kostya',   target: 'julia'   , t: 'f' },
    { source: 'kostya',   target: 'ksyusha' , t: 'l' },
    { source: 'kristina', target: 'kostya'  , t: 'f' },
    { source: 'kristina', target: 'wasya'   , t: 'f' },
    { source: 'petya',    target: 'masha'   , t: 's' },
    { source: 'petya',    target: 'kristina', t: 'l' },
    { source: 'masha',    target: 'alyosha' , t: 'f' },
    { source: 'masha',    target: 'ksyusha' , t: 's' }
]

document.addEventListener( 'DOMContentLoaded', function( ) { 
    //var p = d3.select('div#the')
    //    .selectAll('p')
    //    .data( month )
    //        .text( d => d )

    //p.enter().append('p')
    //    .text( d => d )

    //p.exit().remove()

    let tbl = d3.select('div#the').append( 'table' )
     
    let tblData = tbl.selectAll('tr')
      .data( month )

    let tdData = tblData.enter()
      .append('tr')
      .selectAll('td')
      .data( d => d )

    tdData.enter()
      .append('td')
      .text( d => d.slice( -2 ) )


    // 
    // GRAPH
    //
    let sim = d3.forceSimulation().nodes( graphNodes )
    sim.force( 'repel_force', d3.forceManyBody( ) )
    sim.force( 'center_force', d3.forceCenter( 300, 300 ) )

    let multilink = d3.select( 'svg#wasya' )
        .append( 'g' )
        .attr( 'stroke-opacity', 0.6 )
        .selectAll( 'line' )
        .data( graphLinks )
        .enter()
        .append( 'line' )
        .attr( 'stroke-width', 2 )
        .attr( 'stroke', d => { if( d.t == 'f' ) return 'green'; if( d.t == 's' ) return 'red'; if( d.t == 'l' ) return 'blue' } )

    let multinode = d3.select( 'svg#wasya' )
        .append( 'g' )
        .attr( 'storke-width', '2px' )
        .selectAll( 'circle' )
        .data( graphNodes )
        .enter()
        .append( 'circle' )
        .attr( 'r', 7 )
        .attr( 'fill', d => { if( d.sex == 'm' ) return 'steelblue'; if( d.sex == 'f' ) return 'pink' } )

    let linkForce = d3.forceLink( graphLinks ).id( d => d.id )

    sim.force( 'link_force', linkForce )

    let tickActions = () => {
        multinode
            .attr( 'cx', d => d.x )
            .attr( 'cy', d => d.y )

        multilink
            .attr( 'x1', d => d.source.x )
            .attr( 'y1', d => d.source.y )
            .attr( 'x2', d => d.target.x )
            .attr( 'y2', d => d.target.y )
    }

    sim.on( 'tick', tickActions )
} )
