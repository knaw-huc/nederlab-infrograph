var xmlhttp = new XMLHttpRequest();
var allData;
var svgContent = '';
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    allData = JSON.parse(this.responseText);






    // timeline data
    var timelineData = allData.dataTimeline;
    var xCoor;
    var yCoor;

    for (var i = 0; i < timelineData.length; i++) {
      xCoor = 500;
      yCoor =  100+(i*30);


      svgContent=svgContent+'<text x="'+yCoor+'" y="500" class="small"  text-anchor="start" dominant-baseline="central" transform="rotate(-90, '+yCoor+', 500)">'+timelineData[i].titels+'</text>';
      svgContent=svgContent+timeLineLine(timelineData[i].titels, xCoor, yCoor);
    }
    document.getElementById("timeLine").innerHTML = svgContent;

  }
};
xmlhttp.open("GET", "data.txt", true);
xmlhttp.send();


function timeLineLine(ammount, x, y) {
  return '<line x1="'+x+'" y1="'+x+'" x2="'+x+'" y2="'+(y+ammount)+'" class="timeLineLine" />';

}
