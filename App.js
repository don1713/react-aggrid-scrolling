import React, { Component } from 'react';
import './App.css';
import { Segment, Menu } from 'semantic-ui-react';
import GridExample from './components/gridExample';
import {ModuleRegistry, AllCommunityModules} from '@ag-grid-community/all-modules';
import "@ag-grid-community/all-modules/dist/styles/ag-grid.css";
import "@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css";

class App extends Component {
    constructor(props){
      super(props);
          
      ModuleRegistry.registerModules(AllCommunityModules);

      this.state = {  
        modules: AllCommunityModules,     
        env: "dit",
        path: "http://localhost:8080/api/",
        showDeals: true,    
        lastKnownKey: "",
        lastRow: 0,
        numberOfRecords: 50,
      }; 
    }

    dataSource = test => 
        ({getRows: params => {
            if (test) {            
                this.getDeals()
                .then(res => 
                {            
                    // this is the array of json objects returned from the getItems call
                    var result = res;

                    // i'm keeping an identifier of the last record so on my subsequent call it knows where to start from.                     
                    var lastKnownKey = result[result.length-1].lastKey;
                    this.setState(state => ({lastKnownKey: lastKnownKey}));

                    if (result.length > 0) {  
                        // i'm also keeping track of the last row so I know where in the grid I'm at                                                        
                        var lastRow = this.state.lastRow + result.length;
                        this.setState(state => ({lastRow: lastRow}));

                        // return the results back to the grid where it will append this 
                        // new set of data to the end of the records in the grid
                        params.successCallback(result, lastRow);
                    }
                    else {
                        params.successCallback([{columnNameField: "No results found."}], 1);
                    }
                    return result;
                })          
                .catch(error => console.error("Error: ", error));                
            }
            else
            {
                console.log('test not true')
            }
        }
    });            


    getDeals = lastKnownKey => {      
        var path = this.state.path + 'deallistpage?env=' 
            + this.state.env + '&lastKeyEvaluated=' + this.state.lastKnownKey + '&limit=' + this.state.numberOfRecords;

        const url = new URL(path);
        const getDealsHeaders = new Headers();
        getDealsHeaders.append('Content-Type', 'application/json');
       
        const options = {
            method: "GET",
            headers: getDealsHeaders
        };
    
        // this is the call to my API that returns an array of json objects
        return fetch(url, options)
        .then(function(response) {
            if(!response.ok) {
            throw Error(response.statusText)
            }
            return response;
        })
            .then(results => {
            var records = results.json();
            return records;})
            .then(data => data);
    };
             
    onGridReady = params => {
        this.gridApi = params;
        this.gridColumnApi = params.columnApi;
        
        // create the datasource for your grid
        var data = this.dataSource(true);

        // set the grid datasource
        params.api.setDatasource(data);
    }    

    render() {    

        return (      
            <Segment>
            <Menu>               
                <Menu.Item name = 'List' />
            </Menu>
            <div>

                <GridExample name="gridExample"  onGridReady={this.onGridReady} 
                 rows={this.state.rows} gridOptions={this.gridOptions} />
               
            </div>
            </Segment>
        );
    }
}
    
export default App; 
    
    