// Function for adding Options to the select tag
function addOptionsC(){
  d3.json(data).then(function(sample){
      // An array of countrys from the layoff json file
      var country = sample.map(d=>d.country);
      function removeDuplicates(arr){
          return arr.filter((item,index)=>arr.indexOf(item)===index);
      }
      ctry = removeDuplicates(country).sort()
      console.log(ctry);
      
      // Add option tags with country to the select tag
      var DatasetInput = d3.select("#selDatasetC");
      ctry.forEach(function(id){
          DatasetInput.append("option").attr('value',id).text(id);
      });
  });
}

function addOptionsI(){
  d3.json(data).then(function(sample){
      // An array of industrys from the layoff json file
      var industry = sample.map(d=>d.industry);
      function removeDuplicates(arr){
          return arr.filter((item,index)=>arr.indexOf(item)===index);
      }
      indry = removeDuplicates(industry).sort()
      console.log(indry);
      
      // Add option tags with industry to the select tag
      var DatasetInput = d3.select("#selDatasetI");
      indry.forEach(function(id){
          DatasetInput.append("option").attr('value',id).text(id);
      });
  });
}

function addOptionsY(){
  d3.json(data).then(function(sample){
      // An array of years from the layoff json file
      var year = sample.map(d=>d.date);
      function removeDuplicates(arr){
          return arr.filter((item,index)=>arr.indexOf(item)===index);
      }
      yr = removeDuplicates(year).sort()
      console.log(yr);
      
      // Add option tags with year to the select tag
      var DatasetInput = d3.select("#selDatasetY");
      yr.forEach(function(id){
          DatasetInput.append("option").attr('value',id).text(id);
      });
  });
}

// Function for plotting charts
function plotCharts(selC,selI,selY){
  d3.json(data).then(function(sample){
      console.log("selection", selC);
      
      var filteredSamplesData = sample.filter(s=> s.country == selC && s.total_laid_off > 0 && s.industry == selI && s.date == selY);
      console.log("Filtered Data:",filteredSamplesData);
      
      var locations = filteredSamplesData.map(s=>s.location);        
      var layoffNumbers = filteredSamplesData.map(s=>s.total_laid_off);
      console.log("Locations & LayoffNumbers", locations,layoffNumbers);

      var c = document.getElementById("lineChart");
      var ctx = c.getContext("2d"); 
      ctx.fillText("",250,50);
      ctx.clearRect(0, 0, c.width, c.height);
      if (locations.length > 0) {
        // Plot Line chart
        new Chart(c, {
          type: 'line',
          data:{
            labels:locations,
            datasets:[{
              label:'Total Layoffs',
              data:layoffNumbers,
              // y:locations
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }]
          }            
        });
      } else {
        ctx.font = 'italic 30pt Calibri';
        ctx.fillText("No Data to Plot for the given Filter.",250,50);
      };
  });
}

// when dropdown value is changed ,it displays the change in barchart
function optionChanged(){
  c = document.getElementById("selDatasetC").value;
  i = document.getElementById("selDatasetI").value;
  y = document.getElementById("selDatasetY").value;

  plotCharts(c,i,y);  
  
}

// Function for displaying the default page
function init(){
  addOptionsC();
  addOptionsY();
  addOptionsI();
  optionChanged();
}

init();