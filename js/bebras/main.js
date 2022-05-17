$(document).ready(function () {

    /*circle progress for results*/
    if ($(".circle").length) {
        var c5 = $(".circle");
        var a = document.getElementById("valueCircle").innerText;
        c5.circleProgress({
            size: 200,
            startAngle: 4.7,
            value: a / 200,
            lineCap: "round",
            fill: { color: "#359344" },
            thickness: 9,
        });
    }
   
    
});