var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var currRectX = 25;
var currRectY = 332;
var mazeWidth = 702;
var mazeHeight = 702;
var name;

$(".win").hide();
$(".infoScreen").hide();
$(".instructions").hide();
$("canvas").hide();

$("#submit").click(function(e){
  e.preventDefault();
  name = $("#name").val();
  $(".startMenu").hide();
  $(".showName").append("<p>Hello "+name+"!</p>");
  $(".infoScreen").show();
  drawMaze();
  $("canvas").show();
});

$("#help").click(function(ev){
  $(".instructions").toggle();
});


function drawMaze() {
    var mazeImg = new Image();
    mazeImg.onload = function () {
        context.drawImage(mazeImg, 0, 0);
        drawRectangle(currRectX, currRectY);
        context.beginPath();
        context.arc(540, 675, 7.5, 0, 2 * Math.PI);
        context.closePath();
        context.fillStyle = "maroon";
        context.fill();
    };
    mazeImg.src = 'maze.gif'
}

function drawRectangle(x, y) {
    currRectX = x;
    currRectY = y;
    context.beginPath();
    context.rect(x, y, 15, 15);
    context.closePath();
    context.fillStyle = "green";
    context.fill();
}

$(document).keydown(function(e){
  var newX = currRectX;
  var newY = currRectY;
  switch(e.keyCode){
    case 38:  //up key
      newX = currRectX;
      newY = currRectY - 5;
    break;
    case 37:  //left key
      newX = currRectX - 5;
      newY = currRectY;
    break;
    case 40:  //down key
      newX = currRectX;
      newY = currRectY + 5;
    break;
    case 39:  //right key
      newX = currRectX + 5;
      newY = currRectY;
    break;
  }
  var moveAllowed = canMoveTo(newX, newY);
  if(moveAllowed === 1){
    drawMaze();
    drawRectangle(newX, newY);
    currRectX = newX;
    currRectY = newY;
  }else if(moveAllowed === 2){
    drawRectangle(newX, newY);
    win();
  }else{
    drawRectangle(currRectX, currRectY);
  }
})

function canMoveTo(x, y) { //checks to see if move is legal or not
    var imgData = context.getImageData(x, y, 15, 15);
    var data = imgData.data;
    var canMove = 1;
    if (x >= 0 && x <= mazeWidth - 15 && y >= 0 && y <= mazeHeight - 15) {
        for (var i = 0; i < 4 * 15 * 15; i += 4) {
            if (data[i] === 0 && data[i + 1] === 0 && data[i + 2] === 0) {
                canMove = 0;
                break;
            }
            else if (data[i] === 128 && data[i + 1] === 0 && data[i + 2] === 0) {
                canMove = 2;
                break;
            }
        }
    }
    return canMove;
}

function win(){
  $(".win").show();
}
