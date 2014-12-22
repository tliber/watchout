// start slingin' some d3 here.


var Screen = d3.select("body").append("svg")
  .attr({"width" : 500,
  "height" : 500})
  .style({
  'border-size': 15 + 'px',
  "border-color" :'black',
  "border-style" : "solid"});
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
setInterval(moveEnemies.bind(null,25), 200);
  // moveEnemies(25);
  
// }
// motionOfEnemies();
