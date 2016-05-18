var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var currRectX = 594;
var currRectY = 16;
var intervalVar;

function drawMaze(rectX, rectY) {
    var mazeImg = new Image();
    mazeImg.onload = function () {
        context.drawImage(mazeImg, 0, 0);
        drawRectangle(rectX, rectY);
        context.beginPath();
        context.arc(615, 650, 6, 0, 2 * Math.PI);
        context.closePath();
        context.fillStyle = "maroon";
        context.fill();
    };
    mazeImg.src = "maze.gif";
}

function drawRectangle(x, y) {
    currRectX = x;
    currRectY = y;
    context.beginPath();
    context.rect(x, y, 13, 13);
    context.closePath();
    context.fillStyle = "green";
    context.fill();
}

// function moveBox(e){
//   // var newX;
//   // var newY;
//   e = e || window.event;
//   switch(e.keyCode){
//     case 38:  //up key
//       currRectX = currRectX;
//       currRectY = currRectY - 5;
//     break;
//     case 37:  //left key
//       currRectX = currRectX - 5;
//       currRectY = currRectY;
//     break;
//     case 40:  //down key
//       currRectX = currRectX;
//       currRectY = currRectY -5;
//     break;
//     case 39:  //right key
//       currRectX = currRectX -5;
//       currRectY = currRectY;
//     break;
//   }
// }

$(document).keydown(function(e){
  switch(e.keyCode){
    case 38:  //up key
      currRectX = currRectX;
      currRectY = currRectY - 5;
    break;
    case 37:  //left key
      currRectX = currRectX - 5;
      currRectY = currRectY;
    break;
    case 40:  //down key
      currRectX = currRectX;
      currRectY = currRectY + 5;
    break;
    case 39:  //right key
      currRectX = currRectX + 5;
      currRectY = currRectY;
    break;
  }
  drawRectangle(currRectX, currRectY);
})

drawMaze(594, 16);
