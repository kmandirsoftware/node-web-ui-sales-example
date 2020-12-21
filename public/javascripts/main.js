
// setup the grid after the page has finished loading

document.addEventListener('DOMContentLoaded', function() {
    var gridDiv = document.querySelector('#programGrid');
    var gridDiv2 = document.querySelector('#campaignGrid');
    if(gridDiv === null){
      if( gridDiv2 != null){
        setupCampainGrid(gridDiv2);
      }else{
        console.log("no grids to display!")
      }
    }else{
      setupProgramGrid(gridDiv);
    }
    
});

