import React from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

class ClusteredChart extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new('clusteredchartdiv');

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    var chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: 'panX',
        wheelY: 'zoomX',
        layout: root.verticalLayout,
      }),
    );

    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    var legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
      }),
    );

    var data_SalesType = [
      {
        year: '2021',
        Online: 25,
        Offline: 28,
      },
      {
        year: '2022',
        Online: 35,
        Offline: 42,
      },
      {
        year: '2023',
        Online: 42,
        Offline: 28,
      },
    ];

    var data_Gender = [
      {
        year: '2021',
        Female: 20,
        Male: 10,
        Undisclosed: 32,
      },
      {
        year: '2022',
        Female: 10,
        Male: 20,
        Undisclosed: 32,
      },
      {
        year: '2023',
        Female: 30,
        Male: 10,
        Undisclosed: 12,
      },
    ];

    var data_AgeGroup = [
      {
        year: '2021',
        '1-10': 2.5,
        '11-20': 2.5,
        '21-30': 2.1,
        '31-40': 1,
        '41-50': 0.8,
        '51-60': 0.4,
        '61-70': 0.5,
      },
      {
        year: '2022',
        '1-10': 2.5,
        '11-20': 2.5,
        '21-30': 2.1,
        '31-40': 1,
        '41-50': 0.8,
        '51-60': 0.4,
        '61-70': 0.5,
      },
      {
        year: '2023',
        '1-10': 2.5,
        '11-20': 2.5,
        '21-30': 2.1,
        '31-40': 1,
        '41-50': 0.8,
        '51-60': 0.4,
        '61-70': 0.5,
      },
    ];

    var data_Race = [
      {
        year: '2021',
        Malays: Math.floor(Math.random() * 30),
        Chinese: Math.floor(Math.random() * 30),
        Indians: Math.floor(Math.random() * 30),
        Others: Math.floor(Math.random() * 30),
      },
      {
        year: '2022',
        Malays: Math.floor(Math.random() * 30),
        Chinese: Math.floor(Math.random() * 30),
        Indians: Math.floor(Math.random() * 30),
        Others: Math.floor(Math.random() * 30),
      },
      {
        year: '2023',
        Malays: Math.floor(Math.random() * 30),
        Chinese: Math.floor(Math.random() * 30),
        Indians: Math.floor(Math.random() * 30),
        Others: Math.floor(Math.random() * 30),
      },
    ];

    var data_CategoryType = [
      {
        year: '2021',
        Basic: Math.floor(Math.random() * 30),
        Elite: Math.floor(Math.random() * 30),
        Royal: Math.floor(Math.random() * 30),
        Legendary: Math.floor(Math.random() * 30),
      },
      {
        year: '2022',
        Basic: Math.floor(Math.random() * 30),
        Elite: Math.floor(Math.random() * 30),
        Royal: Math.floor(Math.random() * 30),
        Legendary: Math.floor(Math.random() * 30),
      },
      {
        year: '2023',
        Basic: Math.floor(Math.random() * 30),
        Elite: Math.floor(Math.random() * 30),
        Royal: Math.floor(Math.random() * 30),
        Legendary: Math.floor(Math.random() * 30),
      },
    ];

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'year',
        renderer: am5xy.AxisRendererX.new(root, {
          cellStartLocation: 0.1,
          cellEndLocation: 0.9,
        }),
        tooltip: am5.Tooltip.new(root, {}),
      }),
    );

    /* xAxis.data.setAll(data_Gender); */

    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        numberFormat: "'RM' #.00",
        renderer: am5xy.AxisRendererY.new(root, {}),
      }),
    );

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    function makeSeries(name, fieldName, dataset) {
      var series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: fieldName,
          categoryXField: 'year',
        }),
      );

      series.columns.template.setAll({
        tooltipText:
          "{name}, {categoryX} \nAvg spending of RM {valueY.formatNumber('0.00')}",
        oversizedBehaviour: 'wrap',
        width: am5.percent(90),
        tooltipY: 0,
      });

      series.data.setAll(dataset);

      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      series.appear();

      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          locationY: 0,
          sprite: am5.Label.new(root, {
            text: '{valueY}',
            fill: root.interfaceColors.get('alternativeText'),
            centerY: 0,
            centerX: am5.p50,
            populateText: true,
          }),
        });
      });

      legend.data.push(series);
    }

    let a = [];

    function createMultipleSeries(DataObjArr) {
      for (let i = 0; i < DataObjArr.length; i++) {
        a = Object.keys(DataObjArr[i]);
      }
      for (let j = 0; j < a.length; j++) {
        if (a[j] !== 'year') {
          makeSeries(a[j], a[j], DataObjArr);
          /* console.log(a[j]) */
        }
      }
    }

    function data_inserter(x) {
      if (x === 'data_SalesType') {
        xAxis.data.setAll(data_SalesType);
        createMultipleSeries(data_SalesType);
      } else if (x === 'data_Gender') {
        xAxis.data.setAll(data_Gender);
        createMultipleSeries(data_Gender);
      } else if (x === 'data_AgeGroup') {
        xAxis.data.setAll(data_AgeGroup);
        createMultipleSeries(data_AgeGroup);
      } else if (x === 'data_Race') {
        xAxis.data.setAll(data_Race);
        createMultipleSeries(data_Race);
      } else if (x === 'data_CategoryType') {
        xAxis.data.setAll(data_CategoryType);
        createMultipleSeries(data_CategoryType);
      }
    }

    data_inserter(this.props.onDataChange);

    /* createMultipleSeries(data_SalesType); */

    /* makeSeries("Online", "Online");
makeSeries("Offline", "Offline"); */
    /* makeSeries("Asia", "asia");
makeSeries("Latin America", "lamerica");
makeSeries("Middle East", "meast");
makeSeries("Africa", "africa"); */
  }

  componentWillUnmount() {
    if (this.root) {
      this.root.dispose();
    }
  }

  render() {
    return (
      <div
        id="clusteredchartdiv"
        style={{ width: '100%', height: '500px' }}
      ></div>
    );
  }
}

export default ClusteredChart;
