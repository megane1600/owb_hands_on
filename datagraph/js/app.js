var dataSet = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
const DATANUM = 15;
const MAXWIDTH = 280;
const DATAHSIZE = 12;
const DELAYTIME = 500;
var curNum = 0;

d3.select("#myGraph")
  .selectAll("rect")
  .data(dataSet)
  .enter()
  .append("rect")
  .attr("x", 0)
  .attr("y", function(d, i){
    return i*DATAHSIZE;
  })
  .attr("height", "10px")
  .attr("width", "0px")
  .transition()
  .delay(function(d, i){
    return i * DELAYTIME;
  })
  .duration(2500)
  .attr("width", function(d, i){
    return d + "px"
  })

d3.select("#updateButton")
  .on("click", function(){
    dataSet[curNum] = document.newdata.newval.value;
    curNum++;
    if(curNum > DATANUM) curNum = 0;
    d3.select("#myGraph")
     .selectAll("rect")
     .data(dataSet)
     .transition()
     .attr("width", function(d, i){
       return d + "px";
     })
  })　