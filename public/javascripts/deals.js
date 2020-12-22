var autoGroupColumnDef3 = {
  headerName: 'Deals',
  field: 'deals',
  cellRenderer: 'agGroupCellRenderer',
  cellRendererParams: {
    checkbox: true
  }
}

dealsGridOptions = {
      statusBar: {
        statusPanels: [
            { statusPanel: 'agTotalAndFilteredRowCountComponent', key: 'totalAndFilter', align: 'left' },
            { statusPanel: 'agSelectedRowCountComponent', align: 'left' },
            { statusPanel: 'agAggregationComponent', align: 'right' }
        ]
    },
  enableRangeSelection: true,
  autoGroupColumnDef: autoGroupColumnDef3,
  //rowData: rowData
  rowSelection: 'multiple',
  groupSelectsChildren: true,

  defaultColDef: {
    flex: 1,
    minWidth: 150,
    sortable: true,
    resizable: true,
    filter: true,
    editable: true,
    enableCharts: true,
    enterMovesDownAfterEdit: true,
    enterMovesDown: true, 
    floatingFilter: true,   
  },    
  sideBar: 'columns',
};

function getDealsRow(agGrid){
  agGrid.simpleHttpRequest({
    url: 'http://localhost:3000/DealsAPI'
  })
  .then(function (data) {
    console.log(data);
    dealsGridOptions.api.setRowData(data);
  })
}

function getDealsColumnHeader(agGrid){
  agGrid.simpleHttpRequest({
    url: 'http://localhost:3000/DealsColumnNames'
  })
  .then(function (data) {
    var mycolumn = [];
    for (var index in data){
      mycolumn.push({headerName: data[index], field: data[index], filter: 'agMultiColumnFilter'})
    }
    dealsGridOptions.api.setColumnDefs( mycolumn );
    dealsGridOptions.columnApi.applyColumnState({
      state: [
        {colId: 'clientCode', rowGroup: true},
        {colId: 'businessAreaNumber', pivot: true, enablePivot: true},
        {colId: 'actualSpots', pivot: true, rowGroup: true, enableRowGroup: true}
      ],
      defaultState: {
        pivot: false,
        rowGroup: false,
      },
    });
    
  })
}

function setupDealsGrid(gridDiv){    
    new agGrid.Grid(gridDiv, dealsGridOptions);
    getDealsColumnHeader(agGrid);
    getDealsRow(agGrid);
    dealsGridOptions.api.sizeColumnsToFit();
}