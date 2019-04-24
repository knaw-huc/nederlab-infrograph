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
    var itemWidth = 40;
    var barSpace = 10;

    for (var i = 0; i < timelineData.length; i++) {

      xCoor =  80+(i*itemWidth);
      yCoor  = timelineYPos;



      svgContent=svgContent+'<text x="'+xCoor+'" y="'+(yCoor+16)+'" class="small"  >'+timelineData[i].eeuwkort+'</text>'; //text-anchor="end" dominant-baseline="central" transform="rotate(-90, '+xCoor+', '+yCoor+')"
      svgContent=svgContent+timeLineLine(timelineData[i].woorden, xCoor, yCoor, 'lineTitle');
      svgContent=svgContent+timeLineLine(timelineData[i].titels, (xCoor+barSpace), yCoor, 'lineWord');


    }
    document.getElementById("timeLine").innerHTML = svgContent;

  }
};
xmlhttp.open("GET", "data.txt", true);
xmlhttp.send();


function timeLineLine(ammount, x, y, className) {

  var lineHeight = 10;


  for (var i = 0; i < (logicals.length-1); i++) {
    if ((ammount > logicals[i]) && (ammount < logicals[i+1])) {




      lineHeight = i*blockHeight;
    }

  }

  return '<line x1="'+x+'" y1="'+y+'" x2="'+x+'" y2="'+(y-lineHeight)+'" class="timeLineLine '+className+'" />';

}

function timeLineLegend() {
  var outpout;
  var labelsList = logicals.reverse;
  var x = 20;
  var y = timelineYPos - (labelsList.length*blockHeight);

  for (var i = 0; i < labelsList.length; i++) {
    outpout = outpout + '<text x="'+x+'" y="'+(y+blockHeight)+'" class="small">'+labelsList[i]+ '</text>';
  }
}
