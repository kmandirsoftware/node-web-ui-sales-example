var autoGroupColumnDef2 = {
  headerName: 'Campaigns',
  field: 'campaigns',
  cellRenderer: 'agGroupCellRenderer',
  cellRendererParams: {
    checkbox: true
  }
}

campaignGridOptions = {
  autoGroupColumnDef: autoGroupColumnDef2,
  //rowData: rowData
  rowSelection: 'multiple',
  groupSelectsChildren: true,

    onGridReady: function (params) {
    params.api.sizeColumnsToFit();

    window.addEventListener('resize', function () {
      setTimeout(function () {
        params.api.sizeColumnsToFit();
      });
    });
  },
  defaultColDef: {
    flex: 1,
    minWidth: 150,
    sortable: true,
    resizable: true,
  },    
  sideBar: 'columns',
};

function getCampaignRow(agGrid){
  agGrid.simpleHttpRequest({
    url: 'http://localhost:3000/CampaignsAPI'
  })
  .then(function (data) {
    campaignGridOptions.api.setRowData(data);
  })
}

function getCampaignColumnHeader(agGrid){
  agGrid.simpleHttpRequest({
    url: 'http://localhost:3000/CampaignsColumnNames'
  })
  .then(function (data) {
    var mycolumn = [];
    for (var index in data){
      mycolumn.push({headerName: data[index], field: data[index], sortable: true, filter: true, editable: true})
    }
    campaignGridOptions.api.setColumnDefs( mycolumn );
    campaignGridOptions.columnApi.applyColumnState({
      state: [
        {colId: 'product', rowGroup: true},
        {colId: 'reportingCategoryName', pivot: true, enablePivot: true},
        {colId: 'campaignPositionCode', pivot: true, rowGroup: true, enableRowGroup: true}
      ],
      defaultState: {
        pivot: false,
        rowGroup: false,
      },
    });
    
  })
}

function setupCampainGrid(gridDiv){    
    new agGrid.Grid(gridDiv, campaignGridOptions);
    getCampaignColumnHeader(agGrid);
    getCampaignRow(agGrid);
    campaignGridOptions.api.sizeColumnsToFit();
}