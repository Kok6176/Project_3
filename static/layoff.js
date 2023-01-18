console.log("working");
let dropdowntag = d3.select("#selDataset")

function init() {
    let selector = d3.select("#selDataset");
    d3.json("./static/js/cleanlayoffs.json").then(function (data) {
        console.log(data);

    for (let i = 0; i < data.length; i++){
      dropdowntag
        .append("option")
        .text(data[i]["company"])
        .property("value", data[i]["id"]);
    };
    });
}
function optionChanged(x){
console.log(x)
    // buildtable(x)
    // buildcharts(x)
   
   }
function linechart(){
 
    d3.json("./static/js/converted.json").then(function (data) {
        console.log(data);
let date = []
let layoffs = []






        for (let i = 0; i < data.length; i++){
date.push(data[i]["date"])
layoffs.push(data[i]["total_laid_off"])





            
          };












        var data2 = [
            {
              x: date,
              y: layoffs,
              type: 'bar'
              //mode:"lines"
            }
          ];
          
          Plotly.newPlot('line', data2);
    });







    
        








}





init();

linechart();