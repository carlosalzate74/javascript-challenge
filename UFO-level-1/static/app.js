// from data.js
const tableData = data;

const date_dropdown = d3.select("#date");

const tbody = d3.select('tbody');

const populate = function(data, id, key){
	let date = d3.select(id).property("value")
	let filterData = data.filter(e => e[key] === date)

	// If no filter is selected then show all the data
	filterData == "" ? filterData = data : filterData

	// Creating the table
	filterData.forEach(e => {
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

const getFilter = function (data, id, key){
	// Populating a dropdown with unique values
	d3.select(id).selectAll("option")
    .data(d3.map(data, function(d){return d[key];}).keys())
    .enter()
    .append("option")
    .text(function(d){return d;})
    .attr("value",function(d){return d;});

    // Setting an option to see all data as pre-selected
    d3.select(id)
    .append("option")
    .text("--All--")
    .attr("value", null)
    .lower()
    .property("selected", 1)
}

getFilter(data, "#date", "datetime")
populate(data, "#date", "datetime")

date_dropdown.on("change", function(){
	d3.selectAll("#myrows").remove()
	populate(data, "#date", "datetime")
})
