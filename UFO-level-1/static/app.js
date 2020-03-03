// from data.js
const tableData = data;

const tbody = d3.select('tbody');
data.forEach(e => {
    let row = tbody.append("tr")
    row.append('td').text(e.datetime)
    row.append('td').text(e.city)
    row.append('td').text(e.state.toUpperCase())
    row.append('td').text(e.country.toUpperCase())
    row.append('td').text(e.shape)
    row.append('td').text(e.durationMinutes)
    row.append('td').text(e.comments).style("text-align", "justify")
})

