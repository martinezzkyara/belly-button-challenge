// read in samples.json
const samples_URL = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"


// d3.json(samples_URL).then((data) => {
//     console.log(data);
// });

// bar chart 
function barchart(sample_id) {
    d3.json(samples_URL).then((data) => {
        // process the data
        let sample_data = data.samples;
        let filtered_sample_data = sample_data.filter(item => item.id == sample_id);
        let filtered_data = filtered_sample_data[0];

        // get the data of interest
        let otu_ids = filtered_data.otu_ids;
        let otu_labels = filtered_data.otu_labels;
        let sample_values = filtered_data.sample_values;

        // console.log(otu_ids, otu_labels, sample_values);

        // begin setting up the plot
        let y = otu_ids.slice(0, 10).map(otu_id => `OTU ${otu_id}`).reverse();
        let x = sample_values.slice(0, 10).reverse();
        let text = otu_labels.slice(0, 10).reverse();
        let title = {
            title: "Top 10 OTUs Found"
        };
        let chart_details = {
            x: x,
            y: y,
            text: text,
            type: "bar",
            orientation: "h"
        };

        // render the plot
        Plotly.newPlot("bar", [chart_details], title)

    })

}
// for testing only 
// barchart('940');

function bubblechart(sample_id) {
    d3.json(samples_URL).then((data) => {
        // process the data
        let sample_data = data.samples;
        let filtered_sample_data = sample_data.filter(item => item.id == sample_id);
        let filtered_data = filtered_sample_data[0];

        // get the data of interest
        let otu_ids = filtered_data.otu_ids;
        let otu_labels = filtered_data.otu_labels;
        let sample_values = filtered_data.sample_values;

        // console.log(otu_ids, otu_labels, sample_values);

        // begin setting up the plot
        let x = otu_ids;
        let y = sample_values;
        let marker = {
            size: sample_values,
            color: otu_ids,
            colorscale: "Earth"
        }
        let text = otu_labels;

        let title = {
            title: "Top 10 OTUs Found",
            hovermode: "closest",
            xaxis: { title: "OTU ID" }
        };

        let chart_details = {
            x: x,
            y: y,
            text: text,
            mode: "markers",
            marker: marker
        };

        // render the plot
        Plotly.newPlot("bubble", [chart_details], title)

    })

}
// for testing only 
// bubblechart('940');

function display_meta(sample_id) {
    d3.json(samples_URL).then((data) => {
        // process the data
        let meta = data.metadata;
        let filtered_meta_data = meta.filter(item => item.id == sample_id);
        let filtered_data = filtered_meta_data[0];

        // remove other meta data
        d3.select("#sample-metadata").html("");

        // add meta data 
        console.log("Sample Metadata for Sample ID", sample_id, ":");
        Object.entries(filtered_data).forEach(([key, val]) => {
            d3.select("#sample-metadata").append("h5").text(`${key}: ${val}`);

            console.log(key, ":", val);
        })


    })

}
// for testing only
// display_meta('940');

// this is for when a new sample is selected.  this function will update the plots and meta data 
function optionChanged(selected) {
    barchart(selected);
    bubblechart(selected);
    display_meta(selected);
}

// need to make sure to dipslay some data on the first load of the page and also need functionality for the dropdown menu
function first_load() {
    // dropdown menu first
    let dropdown = d3.select("#selDataset");

    d3.json(samples_URL).then((data) => {

        let sample_names = data.names;

        sample_names.forEach((sample_id) => {
            dropdown.append("option").text(sample_id).property("value", sample_id);
        })

        // need to display something on the first load
        let first_load_sample = sample_names[0];
        barchart(first_load_sample);
        bubblechart(first_load_sample);
        display_meta(first_load_sample);

    })

}

// need to call the first_load() function to start rendering stuff
first_load();
