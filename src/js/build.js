var xmlhttp = new XMLHttpRequest();
var allData;
var svgContent = '';
var timelineYPos =1000;
var collectionsYPos =400;
var blockHeight = 30;
var leftMargin = 100;
var logicals = [0, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000, 10000000000];


// get json
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    allData = JSON.parse(this.responseText);







    // timeline data
    var timelineData = allData.dataTimeline;
    var collectionsData = allData.dataCollections;
    var xCoorTL;
    var yCoorTL;
    var xCoorCol;
    var yCoorCol;
    var itemWidth = 43;
    var barSpace = 10;

    svgContent=svgContent+timeLineLegend(collectionsYPos);
    for (var h = 0; h < collectionsData.length; h++) {
      itemWidth = 25;
      xCoorCol =  leftMargin+(h*itemWidth);
      yCoorCol  = collectionsYPos;

      // collections

      svgContent=svgContent+'<text x="'+(xCoorCol-10)+'" y="'+(yCoorCol+16)+'"  font-family="sans-serif" class="txt" text-anchor="end" dominant-baseline="central" transform="rotate(-45, '+xCoorCol+', '+yCoorCol+')" >'+collectionsData[h].name+'</text>'; //text-anchor="end" dominant-baseline="central" transform="rotate(-90, '+xCoor+', '+yCoor+')"
      svgContent=svgContent+timeLineLine(collectionsData[h].val, xCoorCol, yCoorCol, 'lineTitle');


    }




    svgContent=svgContent+timeLineLegend(timelineYPos);
    for (var i = 0; i < timelineData.length; i++) {
      itemWidth = 43;
      xCoorTL =  leftMargin+(i*itemWidth);
      yCoorTL  = timelineYPos;

      // timelines

      svgContent=svgContent+'<text x="'+xCoorTL+'" y="'+(yCoorTL+16)+'" class="txt" font-family="sans-serif" >'+timelineData[i].eeuwkort+'</text>'; //text-anchor="end" dominant-baseline="central" transform="rotate(-90, '+xCoor+', '+yCoor+')"
      svgContent=svgContent+timeLineLine(timelineData[i].woorden, xCoorTL, yCoorTL, 'lineWord');
      svgContent=svgContent+timeLineLine(timelineData[i].titels, (xCoorTL+barSpace), yCoorTL, 'lineTitle');


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
      strokeWidth = (i*.7)*(i*.7);

      var diff = ammount/logicals[i];

      lineHeight = (i*blockHeight)+((diff*blockHeight)/10);
    }

  }

  return '<line x1="'+x+'" y1="'+y+'" x2="'+x+'" y2="'+(y-lineHeight)+'" class="timeLineLine '+className+'" stroke-width="'+strokeWidth+'" />';

}


//create legend aside lines
function timeLineLegend(y) {

  var output='123';

  var labelsList = logicals;
  var x = leftMargin-30;


  for (var j = 0; j < labelsList.length; j++) {

    output = output + '<line x1="'+x+'" y1="'+(y-(j*blockHeight))+'"  x2="'+(x+500)+'" y2="'+(y-(j*blockHeight))+'" class="thinLine" stroke-opacity="0.2" />';
    //output = output + '<text x="'+x+'" y="'+(y-(j*blockHeight))+'" class="small">'+labelsList[j]+ '</text>';
  }

  return output;
}


//https://www.amcharts.com/demos/logarithmic-scale/
