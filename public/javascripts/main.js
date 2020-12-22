
// setup the grid after the page has finished loading

document.addEventListener('DOMContentLoaded', function() {
    var gridDiv = document.querySelector('#gridid');
    var gridName = $(gridDiv).attr("name");
    console.log(gridName);
    
    switch(gridName) {
      case "programGrid":
          setupProgramGrid(gridDiv);
          break;
      case "campaignGrid":
          setupCampainGrid(gridDiv);
          break;
      case "dealsGrid":
          setupDealsGrid(gridDiv);
          break;
      default:
          console.log("no grids to display")
    }
    
});

