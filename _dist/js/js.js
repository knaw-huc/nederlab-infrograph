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
      xCoor =  100+(i*30);
      yCoor = 500;



      svgContent=svgContent+'<text x="'+xCoor+'" y="'+yCoor+'" class="small"  text-anchor="end" dominant-baseline="central" transform="rotate(-90, '+xCoor+', '+yCoor+')">'+timelineData[i].titels+'</text>';
      svgContent=svgContent+timeLineLine(timelineData[i].woorden, xCoor, yCoor, 'lineTitle');
      svgContent=svgContent+timeLineLine(timelineData[i].titels, xCoor, yCoor, 'lineWord');


    }
    document.getElementById("timeLine").innerHTML = svgContent;

  }
};
xmlhttp.open("GET", "data.txt", true);
xmlhttp.send();


function timeLineLine(ammount, x, y, className) {
  var logicals = [0, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 100000000, 10000000000];
  var lineHeight = 10;
  var blockHeight = 30;

  for (var i = 0; i < (logicals.length-1); i++) {
    console.log((ammount < logicals[i]) && (ammount > logicals[i+1]));
    if ((ammount > logicals[i]) && (ammount < logicals[i+1])) {
      lineHeight = i*blockHeight;
    }

  }

  return '<line x1="'+x+'" y1="'+y+'" x2="'+x+'" y2="'+(y-lineHeight)+'" class="timeLineLine '+className+'" />';

}
