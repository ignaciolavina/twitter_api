

let d = new Date();

Vue.use(VueCharts);
var app_graphs = new Vue({
  el: '#graphs',
  data: function data() {
    return {
      dataentry: null,
      datalabel: null,
      labels: [d.valueOf(), 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      // dataset: [(5,2,7), (3,1,8)]
      dataset: [5, +1, 150, 25, 45, 70, 115, 185, 70, 75, 70, 60]
      // dataset_two: [50, 10, 15, 260, 4, 7, 11, 18, 750, 75, 70, 60]
    };
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