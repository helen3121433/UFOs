// import the data from data.js
// use const to declare the variable, because don't want the variavelt tobe reassigned or resued at all in our program
const tableData = data;

// Reference the HTM table using d3
// use d3.select to tell Javascript to look for the <tbody? tags in HTML
var tbody = d3.select("tbody");


function buildTable(data) {
    // First, clear out any existing data
    tbody.html("");
  

  data.forEach((dataRow) => {
    // use let instead of var, because we want this variasble is limited to just thi block of code
    // find <tbody> tag within HTML and add a table row "tr"
    // <tr> tags are used to each row in a table
    let row = tbody.append("tr");
    // Object.values: reference one object from the array 
    // value to go into the dataRow
    // forEach(val): specifiy we want one object per row
    Object.values(dataRow).forEach((val) => {
      // each value of the object to a cell in the table
      let cell = row.append("td");
      cell.text(val);
      }
    );
  });
}

function handleClick() {
    // Grab the datetime value from the filter
    // select verfy first element that matches our selector string: "#datetime"
    // telling D3 to look for #datetime id in the HTML tag
    // propertiy("value"): telling D3 not only look for where our date values are stored in webpage,
    // but to actually grab that inforamation and hold it in "date" variable
    let date = d3.select("#datetime").property("value");
    // setting filteredData as our raw data
    let filteredData = tableData;
  
     // Check to see if a date was entered and filter the
    // data using that date.
    if (date) {
      // Apply `filter` to the table data to only keep the
      // rows where the `datetime` value matches the filter value
      // show only the rows where the date is equal to datefilter where created above
      // === : strict equality, means type and value have to match perfectly
      // == : loose equality, type and value are loosely matched
      filteredData = filteredData.filter(row => row.datetime === date);
    }
  
     // Rebuild the table using the filtered data
    // @NOTE: If no date was entered, then filteredData will
    // just be the original tableData.
    buildTable(filteredData);
  }
  
  // Attach an event to listen for the form button
  d3.selectAll("#filter-btn").on("click", handleClick);
  
  // Build the table when the page loads
  buildTable(tableData);

