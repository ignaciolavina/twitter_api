// import { Line } from 'vue-chartjs'

// export default {
//   extends: Line,
//   props: {
//     chartdata: {
//       type: Object,
//       default: null
//     },
//     options: {
//       type: Object,
//       default: null
//     }
//   },
//   mounted () {
//     this.renderChart(this.chartdata, this.options)
//   }
// }      




let d = new Date();
var timeFormat = "ddd MMM dd HH:mm:ss Z yyyy"

Vue.use(VueCharts);
var app_graphs = new Vue({
    el: '#graphs',
    data: function data() {
        return {
            // dataentry: null,
            // datalabel: null,
            // labels: [d.valueOf(), 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            // // dataset: [(5,2,7), (3,1,8)]

            datasets: [
                {
                    label: "US Dates",
                    data: [{
                        x: "Fri Aug 3 08:54:45 +0000 2019", y: 175
                    }, {
                        x: "Fri Aug 30 08:56:45 +0000 2019", y: 17
                    }, {
                        x: "Fri Aug 30 08:58:45 +0000 2019", y: 150
                    }, {
                        x: "Fri Aug 30 08:59:45 +0000 2019", y: 178
                    }],
                    fill: false,
                    // borderColor: 'red'
                },
            ]




            // dataset_two: [50, 10, 15, 260, 4, 7, 11, 18, 750, 75, 70, 60]
        };
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: "Chart.js Time Scale"
        },
        scales: {
            xAxes: [{
                type: "time",
                time: {
                    displayFormats: {
                        'millisecond': timeFormat,
                        'second': timeFormat,
                        'minute': timeFormat,
                        'hour': timeFormat,
                        'day': 'MMM DD HH',
                        'week': 'MMM DD',
                        'month': 'MMM DD',
                        'quarter': 'MMM DD',
                        'year': 'MMM DD',
                    },
                    // format: timeFormat,
                    tooltipFormat: 'll'
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Date'
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'value'
                }
            }]
        }
    },

    methods: {
        addData: function addData() {
            this.dataset.push(this.dataentry);
            this.labels.push(this.datalabel);
            this.datalabel = '';
            this.dataentry = '';
        }
    }
});