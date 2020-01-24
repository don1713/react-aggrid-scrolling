import React, { Component } from 'react';
import _ from 'lodash';
import {ModuleRegistry, AllCommunityModules} from '@ag-grid-community/all-modules';
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/all-modules/dist/styles/ag-grid.css";
import "@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css";

class GridExample extends Component {
    constructor(props){
        super(props);
        
        ModuleRegistry.registerModules(AllCommunityModules);
        this.getDealEvents = this.getDealEvents.bind(this);
        
        const defaultColumnProperties = {
          sortable: false,
          resizable: true,
          autoSizePadding: 5,
          filter: true,
          editable: true,
          singleClickEdit: false
        };
        
        const columns = [
          // { field: "dealNumber", headerName: "ID", editable: false,
          //   cellRendererFramework: (params) => {
          //       return <button onClick={() => this.getDealEvents(params.data.eventId)}> {params.value} </button>
          //   }
          // },
          // { field: "time", headerName: "Time"},
          // { field: "count", headerName: "Count"},
          // { field: "required", headerName: "Required"},
          // { field: "first", headerName: "First Name"},
          // { field: "middle", headerName: "Middle Name"},
          // { field: "last", headerName: "Last Name"},   
          { field: "dealNumber", headerName: "ID", editable: false,
            cellRendererFramework: (params) => {
                return <button onClick={() => this.getDealEvents(params.data.eventId)}> {params.value} </button>
            }
          },
          { field: "createdOn", headerName: "Time"},
          { field: "documentCount", headerName: "Count"},
          { field: "esignable", headerName: "Required"},
          { field: "buyerName", headerName: "First Name"},
          { field: "coBuyerName", headerName: "Middle"},
          { field: "fiManagerName", headerName: "Last Name"},
          { field: "guarantorName", headerName: "Guarantor"}       
        ].map(c => ({...c, ...defaultColumnProperties}))

        this.state = {
          modules: AllCommunityModules,
          rows: [],
          components: {
            loadingRenderer: function(params) {
              if (params.value !== undefined) {
                return params.value;
              } else {
                return '<img src="images/loading.gif">';
              }
            }
          },
          defaultColDef: { resizable: true },
          columnDefs: columns,
          rowBuffer: 0,
          rowSelection: "single",
          rowModelType: "infinite",
          cacheBlockSize: 49,
          cacheOverflowSize: 1,
          maxConcurrentDatasourceRequests: 1,
          infiniteInitialRowCount: 1,
          maxBlocksInCache: 100
        };
    }

    getDealEvents(eventId) {
      // implement grid row button click
    }

    render(){
          
        return (
          <div style={{ height: '500px', width: 'auto' }} className="ag-theme-balham">           
          { <AgGridReact onGridReady={function($event) { $event.api.sizeColumnsToFit(); }, this.props.onGridReady} 
            columnDefs = {this.state.columnDefs}
            rowData = {this.props.rows}
            gridOptions = {this.props.gridOptions}             
            modules={this.state.modules}           
            components={this.state.components}
            debug={false}
            rowBuffer={this.state.rowBuffer}
            rowSelection={this.state.rowSelection}
            rowDeselection={true}
            rowModelType={this.state.rowModelType}
            cacheBlockSize={this.state.cacheBlockSize}
            cacheOverflowSize={this.state.cacheOverflowSize}
            maxConcurrentDatasourceRequests={this.state.maxConcurrentDatasourceRequests}
            infiniteInitialRowCount={this.state.infiniteInitialRowCount}
            maxBlocksInCache={this.state.maxBlocksInCache}            
            /> }
          </div>
        );         
    }
}
export default GridExample;