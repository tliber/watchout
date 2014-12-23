// start slingin' some d3 here.


var Screen = d3.select("body").append("svg")
  .attr({"width" : 500,
  "height" : 500})
  .style({
  'border-size': 15 + 'px',
  "border-color" :'black',
  "border-style" : "solid",
  'background-color' : 'black'});
  // .append("battleField")

  // .attr("cy", 25)
  // .attr("r", 25)

var makeXY = function(amount){
  var xys = [];
  // var x = (Math.random() * 490);
  // var y = (Math.random() * 490);
  for (var i = 0; i < amount; i++){
    var x = (Math.random() * 490);
    var y = (Math.random() * 490);
    xys.push([x,y]);
  };
  return xys;
};
var addEnemies = function(amount){
  
  d3.select("svg").selectAll('div')
  .data(makeXY(amount))
  .enter()
  .append("circle")
  .attr("cx", function(d){return d[0]})
  .attr("cy", function(d){return d[1]})
  .attr("r", 10).style("fill", "purple");
};
var moveEnemies = function(amount){
  // debugger
  d3.selectAll('circle')
  .data(makeXY(amount))
  .transition()
  .duration(300)
  .attr("cx",function(d){return d[0]})
  .attr("cy", function(d){return d[1]})
  .attr("r", 10).style("fill", "purple");
  // .attr("r", 10).style("fill", "purple");
  // console.log(l);
  // .data(makeXY(amount))
  // .enter()
  
  // .enter()
};
addEnemies(25);
// var motionOfEnemies = function(){
setInterval(moveEnemies.bind(null,25), 500);
var HeroProps = [{"x" : 200, "y" : 200,}]
  // 'border-size': '15px',
  // "border-color" :'black',
  // "border-style" : "solid"}



var hero = d3.select('svg').data(HeroProps)
  .append('circle')
  .attr("cx", function(d){return d.x})
  .attr("cy", function(d){return d.y})
  .attr("r", 20)
  .attr('id' , 'hero')
  // .attr("onmousedown","selectElement(evt)")
  .style("fill", "orange")


var drag = d3.behavior.drag()
  .on("drag", function(d,i) {
    hero.attr('cx', function(d) {
      d.x = d.x + d3.event.dx
      return d.x;
    })
      .attr('cy', function(d) {
        d.y = d.y + d3.event.dy
        return d.y;
      })
  })
hero.call(drag);
 // function selectElement(evt) {
    //pointer to mouse
    // selectedElement = evt.target;

    //pointer to mouse location
    // var currentX = evt.clientX;
    // var currentY = evt.clientY;
    // console.log(selectedElement);
    // console.log(currentX)
    // console.log(currentY)
    // d3.select(selectedElement)
    // .attr('cx', currentX)
    // .attr('cy', currentY)
    // .data([currentX, currentY])

    // currentMatrix = selectedElement.getAttributeNS(null, "transform").slice(7,-1).split(' ');
     

    // for(var i=0; i<currentMatrix.length; i++) {

      // currentMatrix[i] = parseFloat(currentMatrix[i]);

      // }

 

    // selectedElement.setAttributeNS(null, "onmousemove", "moveElement(evt)");

  








  // .behavior.drag()
  // .on("drag", dragmove);;
  // .attr('width' : 60 + 'px',
  // "height" : '60' + 'px',
  // 'border-size': '15' + 'px',
  // "border-color" :'black',
  // "border-style" : "solid"}

  // moveEnemies(25);
  // console.log(Neo);
// motionOfEnemies();
// var drag = d3.behavior.drag()  
             // .on('dragstart', function() { circle.style('fill', 'red'); })
             // .on('drag', function() { circle.attr('cx', d3.event.x)
                                            // .attr('cy', d3.event.y); })
             // .on('dragend', function() { circle.style('fill', 'black'); });