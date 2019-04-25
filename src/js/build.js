var xmlhttp = new XMLHttpRequest();
var allData;
var svgContent = '';
var timelineYPos =500;
var blockHeight = 30;
var logicals = [0, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 100000000, 10000000000];


// get json
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    allData = JSON.parse(this.responseText);






    // timeline data
    var timelineData = allData.dataTimeline;
    var xCoor;
    var yCoor;
    var itemWidth = 43;
    var barSpace = 10;

    for (var i = 0; i < timelineData.length; i++) {

      xCoor =  80+(i*itemWidth);
      yCoor  = timelineYPos;



      svgContent=svgContent+'<text x="'+xCoor+'" y="'+(yCoor+16)+'" class="small"  >'+timelineData[i].eeuwkort+'</text>'; //text-anchor="end" dominant-baseline="central" transform="rotate(-90, '+xCoor+', '+yCoor+')"
      svgContent=svgContent+timeLineLine(timelineData[i].woorden, xCoor, yCoor, 'lineTitle');
      svgContent=svgContent+timeLineLine(timelineData[i].titels, (xCoor+barSpace), yCoor, 'lineWord');
      svgContent=svgContent+timeLineLegend();

    }
    document.getElementById("timeLine").innerHTML = svgContent;

  }
};
xmlhttp.open("GET", "data.txt", true);
xmlhttp.send();



// create vertical lines
function timeLineLine(ammount, x, y, className) {

  var lineHeight = 10;
  var strokeWidth = 2;


  for (var i = 0; i < (logicals.length-1); i++) {
    if ((ammount > logicals[i]) && (ammount < logicals[i+1])) {
      strokeWidth = i*3;




      lineHeight = i*blockHeight;
    }

  }

  return '<line x1="'+x+'" y1="'+y+'" x2="'+x+'" y2="'+(y-lineHeight)+'" class="timeLineLine '+className+'" stroke-width="'+strokeWidth+'" />';

}


//create legend aside lines
function timeLineLegend() {

  var output='123';

  var labelsList = logicals;
  var x = 20;
  var y= timelineYPos;

  for (var j = 0; j < labelsList.length; j++) {

    output = output + '<line x1="'+x+'" y1="'+(y-(j*blockHeight))+'"  x2="'+(x+500)+'" y2="'+(y-(j*blockHeight))+'"       class="thinLine" />';
    output = output + '<text x="'+x+'" y="'+(y-(j*blockHeight))+'" class="small">'+labelsList[j]+ '</text>';
  }

  return output;
}
