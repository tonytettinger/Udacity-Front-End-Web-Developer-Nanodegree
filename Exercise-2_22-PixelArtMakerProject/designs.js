$(document).ready(function () {


var mouseDown = false;
let canvas = $("#pixel_canvas");
let eraserButton = $("#eraserButton");
let colorPicker = $("#colorPicker");
let height= $("#input_height");
let width= $("#input_width");

//Keeps track and stores the value referring to the mouse button position (up/down).
$(document.body)
    .on("mousedown", function(){
    mouseDown = true;
    })
    .on("mouseup", function(){
    mouseDown = false;
    });

//Changes the status of the eraser button, used to make cells white.
eraserButton.click(function(){
    event.preventDefault();
    $(this).toggleClass("eraseron");
      $(this).text(function(i,text){
          return text === "Eraser: ON" ? "Eraser: OFF" : "Eraser: ON";
      })
   });

/*Event listener for clicking on submit button which calls make grid function and alerts user,
for the grid width/length value to be in between 0 and 70.
This is necessary so the loading time of the grid is not too long and grid size is optimal for
drawing.
*/
$("#gridSubmit").on("click",function(event){
    event.preventDefault();
    if(height.val() >= 1 && height.val() <= 70 && width.val() <= 70 && width.val() >= 1){
    makeGrid();
    }else{
        return alert("For optimal user experience, please enter a value between 0 and 70 for Grid Height and Grid Width!")
    }
});

/*Make grid function, which adapts its size to the total number of cells.
Larger cell numbers translate to smaller individual cells, so it fits the screen better and also makes drawing
detailed pictures easier. For this  Math.pow() function is included, which scales down from 36px
in case of one single cell to about 9px in the case of maximum allowed 70x70 cells.
*/

let makeGrid = function() {
    let rows = height.val();
    let columns = width.val();
    let rowcol = rows*columns;
    let power = Math.pow(0.99972, rowcol);
    let side = (36 * power)+"px";
    $("td").remove();
    $("tr").remove();
    for(let i =1; i <= rows; i++){
        canvas.append("<tr></tr>");
        for(let j=1; j <= columns; j++){
            $("#pixel_canvas tr:last").append("<td class='cell bgwhite'></td>");
  }
    $("tr").height(side);
    $("td").width(side);
  }
};

/*Painting function if clicked on a cell, it fills cell with the selected color.
First it checks if the eraser button is on, in that case it paints the cells white.
If it's off it changes the background to the color selected by colorpicker
*/
canvas.on("click", "td", function(){
    let colorPicked=colorPicker.val();
        if (eraserButton.hasClass("eraseron")){
            $(this).css("background-color", "#FFFFFF");
        }else{
            $(this).css("background-color", colorPicked);
    }
});

//Painting the cells if movement is continuous with mouse button pushed down.
canvas.on("mouseover", "td", function(){
    let colorPicked=colorPicker.val();
    if(mouseDown){
        if (eraserButton.hasClass("eraseron")){
            $(this).css("background-color", "#FFFFFF");
        }else{
            $(this).css("background-color", colorPicked);
    }
    }
});

});
