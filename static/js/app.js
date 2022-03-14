// from data.js
// use const to declare the variable, because don't want the variavelt tobe reassigned or resued at all in our program

const tableData = data;

// get table references
// Reference the HTM table using d3
// use d3.select to tell Javascript to look for the <tbody? tags in HTML
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  
  data.forEach((dataRow) => {
    // Append a row to the table body
    // use let instead of var, because we want this variasble is limited to just thi block of code
    // find <tbody> tag within HTML and add a table row "tr"
    // <tr> tags are used to each row in a table
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    // Object.values: reference one object from the array 
    // value to go into the dataRow
    // forEach(val): specifiy we want one object per row
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// 1. Create a variable to keep track of all the filters as an object.

var allfilterData = {};
// var date = d3.select("#datetime").property("value");
// var city = d3.select("#city").property("value");
// var state = d3.select("#state").property("value");
// var country = d3.select("#country").property("value");
// var shape = d3.select("#shape").property("value");

// 3. Use this function to update the filters. 
function updateFilters() {

    // 4a. Save the element that was changed as a variable.
    let elementchange = d3.select(this);

    // 4b. Save the value that was changed as a variable.
    let valuechange = elementchange.property("value");
    console.log(valuechange);

    // 4c. Save the id of the filter that was changed as a variable.
    let IDfilter = elementchange.attr("id");
    console.log(IDfilter);
  
    // 5. If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object.
    if(valuechange){
      allfilterData[IDfilter] = valuechange;
    }
    else{
      delete allfilterData[IDfilter];
    }
   
    console.log(allfilterData);
    // 6. Call function to apply all filters and rebuild the table
    filterTable();
  
  }
  
  

  // 7. Use this function to filter the table when data is entered.
  function filterTable() {
  
    // 8. Set the filtered data to the tableData.
    let filterData = tableData;
  
    // 9. Loop through all of the filters and keep any data that
    // matches the filter values
    Object.entries(allfilterData).forEach(function([key,value]){
      // console.log(key,value);
      filterData = filterData.filter(row => row[key] === value);
    });
  
    // 10. Finally, rebuild the table using the filtered data
    buildTable(filterData);
  }
  
  // 2. Attach an event to listen for changes to each filter
  d3.selectAll("input").on("change",updateFilters)


  // Build the table when the page loads
  buildTable(tableData);
