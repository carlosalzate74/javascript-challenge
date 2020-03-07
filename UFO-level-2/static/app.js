// from data.js
const tableData = data;

// Deefine dropdown objects
const date_dropdown = d3.select("#datetime");
const city_dropdown = d3.select("#city");
const state_dropdown = d3.select("#state");
const country_dropdown = d3.select("#country");
const shape_dropdown = d3.select("#shape");

// Clear filter button
const clearFilterBtn = d3.select("#clearfilterbtn");

// Data table body
const tbody = d3.select('tbody');

// Creating and Populating the table
const populateTable = function (data){
	d3.selectAll("#myrows").remove()
	filteredData = getFilteredData(data)

	filteredData.forEach(e => {
	    let row = tbody.append("tr").attr("id", "myrows")
	    row.append('td').text(e.datetime)
	    row.append('td').text(e.city)
	    row.append('td').text(e.state.toUpperCase())
	    row.append('td').text(e.country.toUpperCase())
	    row.append('td').text(e.shape)
	    row.append('td').text(e.durationMinutes)
	    row.append('td').text(e.comments).style("text-align", "justify")
	})
}

// Populating filters according to values in data
const setOptions = function (data, id, key){

	d3.select(id).selectAll("option").remove()

	// Populating a dropdown with unique values
	d3.select(id).selectAll("option")
    .data(d3.map(data, function(d){return d[key];}).keys())
    .enter()
    .append("option")
    .text(function(d){return d;})
    .attr("value",function(d){return d;})

    // Setting an option to see all data as pre-selected
    d3.select(id)
    .append("option")
    .text("--All--")
    .attr("value", "")
    .lower()
    .property("selected", 1)

    if(id != "#datetime")
    	d3.select(id).selectAll("option").sort()
}


const getFilteredData = function(data){
	// Collect filters from all dropdown boxes
	let selectedFilters = d3.selectAll("option").filter(function (d, i) { return this.selected })
										._groups[0]
										.filter(e => e.value != "")
	// Keys as filter item id
	let keys = selectedFilters.map(o => o.parentNode.id)

	// Values as selected option from filter
	let values = selectedFilters.map(o => o.value)

	// Merge arrays into a json. Structure with options selected
	let selected =  values.reduce(function(selected, field, index) {
	  selected[keys[index]] = field;
	  return selected;
	}, {})

	// console.log(selected)

	// Apply filters to data
	filteredData = data
	if(selected["datetime"])
		filteredData = filteredData.filter(e => e.datetime == selected["datetime"])
	if(selected["city"])
		filteredData = filteredData.filter(e => e.city == selected["city"])
	if(selected["state"])
		filteredData = filteredData.filter(e => e.state == selected["state"])
	if(selected["country"])
		filteredData = filteredData.filter(e => e.country == selected["country"])
	if(selected["shape"])
		filteredData = filteredData.filter(e => e.shape == selected["shape"])

	return filteredData
}

// Populate all filter's options
const setDropdowns = function(){
	setOptions(data, "#datetime", "datetime")
  	setOptions(data, "#city", "city")
  	setOptions(data, "#state", "state")
  	setOptions(data, "#country", "country")
  	setOptions(data, "#shape", "shape")
}

date_dropdown.on("change", function(){
	populateTable(data, true)
})

city_dropdown.on("change", function(){
	populateTable(data, true)
})

state_dropdown.on("change", function(){
	populateTable(data, true)
})

country_dropdown.on("change", function(){
	populateTable(data, true)
})

shape_dropdown.on("change", function(){
	populateTable(data, true)
})

clearFilterBtn.on("click", function(){
	setDropdowns()
	populateTable(data, false)
})

window.onload = function() {
	setDropdowns()
  	populateTable(data, false)
}
