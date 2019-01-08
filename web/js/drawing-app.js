var color = $(".selected").css("background-color");
var $canvas = $("canvas");
var context = $canvas[0].getContext("2d");
var lastEvent;
var mousedown = false;

$(".controls").on("click", "li", function () {
    //deselect sibling elements
    $(this).siblings().removeClass("selected");
    //select clicked element
    $(this).addClass("selected");

    //catch current color
    color = $(this).css("background-color");
    console.log(color);
});

// when "New Color" is pressed
$("#revealColorSelect").click(function () {
    //show or hide color select
    changeColor();
    $("#colorSelect").toggle();
});

//update the color span
function changeColor() {
    var r = $("#red").val();
    var g = $("#green").val();
    var b = $("#blue").val();

    console.log("rgb(" + r + "," + g + "," + b + ")");
    $("#newColor").css("background-color", "rgb(" + r + "," + g + "," + b + ")");
}

//when color sliders change
$("input[type=range]").change(changeColor);

//when "Add New Color" is pressed
$("#addNewColor").click(function () {
    //Append the new color to "ul"
    var $newColor = $("<li></li>");
    $newColor.css("background-color", $("#newColor").css("background-color"));
    $(".controls ul").append($newColor);

    //select the new color
    $newColor.click();
});


//On mouse events in the canvas
$canvas.mousedown(function (e) {
    lastEvent = e;
    mousedown = true;
}).mousemove(function (e) {
    if (mousedown)
    {
        //Draw line
        context.beginPath();
        context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
        context.lineTo(e.offsetX, e.offsetY);
        context.strokeStyle = color;
        context.stroke();
        lastEvent = e;
    }

}).mouseup(function () {
    mousedown = false;
}).mouseleave(function () {
    $canvas.mouseup();
});

