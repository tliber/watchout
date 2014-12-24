
var collision = false;
var collisionCounter = 0;
var highScore = 0;
var currentScore = 0;
var enemyMovementSpeed = 1200;
var enemySpaceTime = 0;//never change
// start slin' some d3 here.

var svg = d3.select("body").append("svg")
  .attr({"width" : 500,
  "height" : 500})
  .style({
  'border-size': 15 + 'px',
  "border-color" :'black',
  "border-style" : "solid",
  'background-image' : 'url(orangeSpace.jpg)'});
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
      'y': coordinates[i][1],
      'oldX' : coordinates[i][0],
      'oldY' : coordinates[i][1],
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
  .append("image")
  .attr('class','enemy')
  .attr('xlink:href','succubus.gif')
  .attr("x", function(d){return d.x})
  .attr("y", function(d){return d.y})
  .attr('height', 50 + 'px')
  .attr('width',50 + 'px')


var moveEnemies = function(amount){
  // console.log(enemies)
  newXYS = makeXY(25);
  for (var i = 0;i < enemies.length;i++){
    // console.log('in move' + enemies[i].x)
    enemies[i]['oldX'] = enemies[i].x; 
    enemies[i]['oldY'] = enemies[i].x; 
    enemies[i].x = newXYS[i][0];
    enemies[i].y = newXYS[i][1];
  }


  d3.selectAll('image')
  .data(enemies)
  .transition()
  .duration(enemyMovementSpeed)
  .attr("x",function(d){return d.x})
  .attr("y", function(d){return d.y})

};


var HeroProps = [{"x" : 200, "y" : 200,}]
var hero = svg
  // .append('circle')
  .data(HeroProps)
  // .attr("cx", function(d){return d.x})
  // .attr("cy", function(d){return d.y})
  // .attr("r", 20)
  // .style("fill", "transparent")
  .append('image')
  .attr('class' , 'hero')
  .attr('xlink:href','resizedLama2.gif')
  .attr("x", function(d){return d.x})
  .attr("y", function(d){return d.y})
  .attr('height', 80 + 'px')
  .attr('width',80 + 'px')
  // .attr("onmousedown","selectElement(evt)")
  // .style("fill", "url(resizedLama.gif)")


var drag = d3.behavior.drag()
  .on("drag", function(d,i) {
    hero.attr('x', function(d) {
      d.x = d.x + d3.event.dx
      
      return d.x;   
    })
      .attr('y', function(d) {
        d.y = d.y + d3.event.dy
        return d.y;
      })
  })
hero.call(drag);


var collisionCheck = function(){
  if (enemySpaceTime < enemyMovementSpeed + 1){
    enemySpaceTime = enemySpaceTime + 5;
  } else{
    enemySpaceTime = 0;
  }
  var wayThere = enemySpaceTime/enemyMovementSpeed;
  
  // var transitionItemProps = d3.selectAll('circle');


  var heroX =  d3.select(".hero").attr("x");
  var heroY =  d3.select(".hero").attr("y");
  // console.log(heroX)
  var thresh = 50;
  console.log(enemies.length);
  for (var i = 0;i < enemies.length;i++){
    console.log(enemies[i])
    var oldX = enemies[i]['oldX'];
    var oldY = enemies[i]['oldY'];
    var currentEnemyX = oldX - ((oldX - enemies[i].x) * wayThere);
    var currentEnemyY = oldY - ((oldY - enemies[i].y) * wayThere);
    var endPoint = (Math.abs(heroX - currentEnemyX) + Math.abs(heroY - currentEnemyY));
    // debugger;


    if (thresh > endPoint){
      // console.log('collision');

      
      collisionCounter++;
      return true;
      
    }
  }
    return false;
  // console.log(enemies)
} 

setInterval(moveEnemies.bind(null,25), 1200);
setInterval(function(){
  var checker = collisionCheck();
  if (checker === true){
    currentScore = 0;
    d3.select('.high span').text(highScore)
    d3.select('.collisions span').text(collisionCounter);
  }
  else
    currentScore++;
    if(currentScore > highScore){
      highScore = currentScore;
      // debugger;
    } 
    d3.select('.current span').text(currentScore);
  }, 5);