let svgWidth = 640
let svgHeight = 480
let dataLength = 30
let circleR = 10
let myData = Array.from( {length: dataLength},( a ) => ( { x: (circleR+Math.ceil(Math.random()*(svgWidth-circleR*2))), y: (circleR+Math.ceil(Math.random()*(svgHeight-circleR*2))) } ) )
document.addEventListener( 'DOMContentLoaded', function () {

    let svg = d3.select( 'body' ).append( 'svg' ).attr( 'width', svgWidth ).attr( 'height', svgHeight )

    let circles = svg.selectAll( 'circle' )
        .data( myData )
        .enter()
        .append( 'circle' )
        .attr( 'cx', d=>d.x )
        .attr( 'cy', d=>d.y )
        .attr( 'r', circleR )


    let wasya = function( d/*, i, nodes*/ ) {
        //this.setAttribute( 'cx', d3.event.x )
        //this.setAttribute( 'cy', d3.event.y )
        d3.select( this )
            .attr( 'cx', d.x = d3.event.x )
            .attr( 'cy', d.y = d3.event.y )
    }

    // https://github.com/d3/d3-selection#selection_on
    let dragHandler = d3.drag().on( 'drag', wasya )

    dragHandler( circles )

} )
