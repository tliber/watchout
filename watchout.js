
var collision = false;
var collisionCounter = 0;
var highScore = 0;
var currentScore = 0;
// start slingin' some d3 here.

var svg = d3.select("body").append("svg")
  .attr({"width" : 500,
  "height" : 500})
  .style({
  'border-size': 15 + 'px',
  "border-color" :'black',
  "border-style" : "solid",
  'background-image' : 'url(sound_of_space.jpg)'});
  // .append("battleField")

  // .attr("cy", 25)
  // .attr("r", 25)

var makeXY = function(amount){
  var xys = [];
  if (amount === undefined){
    amount = 1;
  }
  // var x = (Math.random() * 490);
  // var y = (Math.random() * 490);
  for (var i = 0; i < amount; i++){
    var x = (Math.random() * 490);
    var y = (Math.random() * 490);
    xys.push([x,y]);
  };
  return xys;
};


var makeEnemies = function(amount){
  var coordinates = makeXY(amount);
  // console.log(coordinates[0][0])
  var enemies = [];
  var hero = {};
  for(var i = 0;i < amount; i++){
    // debugger;
    // console.log(coordinates[i][0]);
    var enemy = {
      'id': i,
      'x': coordinates[i][0],
      'y': coordinates[i][1]
    };
    enemies.push(enemy)
  // console.log(enemies);
  }
  return enemies;
}
var enemies = makeEnemies(25);
var Enemies = d3.select("svg").selectAll('div')
  .data(enemies)
  .enter()
  .append("circle")
  .attr("cx", function(d){return d.x})
  .attr("cy", function(d){return d.y})
  .attr('id', function(d){return d.id})
  .attr("r", 10).style("fill", "black");


var moveEnemies = function(amount){
  // console.log(enemies)
  newXYS = makeXY(25);
  for (var i = 0;i < enemies.length;i++){
    enemies[i].x = newXYS[i][0];
    enemies[i].y = newXYS[i][1];
  }
  // console.log(enemies)
  d3.selectAll('circle')
  .data(enemies)
  .transition()
  .duration(500)
  .attr("cx",function(d){return d.x})
  .attr("cy", function(d){return d.y})
  // .attr("r", 10).style("fill", "purple");
  // console.log(l);
  // .data(makeXY(amount))
  // .enter()
  
  // .enter()
};
// addEnemies(25);  
// var motionOfEnemies = function(){
var HeroProps = [{"x" : 200, "y" : 200,}]
  // 'border-size': '15px',
  // "border-color" :'black',
  // "border-style" : "solid"}



var hero = svg
  .append('circle')
  .data(HeroProps)
  .attr("cx", function(d){return d.x})
  .attr("cy", function(d){return d.y})
  .attr("r", 20)
  .attr('class' , 'hero')
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

// console.log(hero);
// console.log(hero)
var collisionCheck = function(){
  // console.log('running c check')
  var heroX =  d3.select(".hero").attr("cx");
  var heroY =  d3.select(".hero").attr("cy");
  // console.log(heroX)
  var thresh = 50;
  for (var i = 0;i < enemies.length;i++){
    // console.log((Math.abs(heroX - enemies[i].x) + Math.abs(heroY - enemies[i].y)));
    // console.log((Math.abs(heroX - enemies[i].x) + 'assumed X dif'));
    // var howClose = (Math.abs(heroX - enemies[i].x) + Math.abs(heroY - enemies[i].y))
    // console.log(howClose + ' this close' + enemies[i].x + 'enemy x')
    // console.log(howClose + ' this close' + enemies[i].y + 'enemy y')

    // debugger;
    // console.log(i);
    if (thresh > (Math.abs(heroX - enemies[i].x) + Math.abs(heroY - enemies[i].y))){
      // console.log('collision');
      
      collisionCounter++;
      return true;
      
    }
  }
    return false;
  // console.log(enemies)
} 
// debugger;
// collisionCheck(hero);
setInterval(moveEnemies.bind(null,25), 500);
setInterval(function(){
  var checker = collisionCheck();
  if (checker === true){
    // console.log('hit')
    currentScore = 0;
    d3.select('.high span').text(highScore)
    d3.select('.collisions span').text(collisionCounter);
  }
  else
    // collisionCounter++;
    currentScore++;
    if(currentScore > highScore){
      highScore = currentScore;
    } 
    d3.select('.current span').text(currentScore);
  }, 5);// setInterval(function(){

// },100)
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