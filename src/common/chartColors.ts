//@ts-ignore
export const getChartColors = (options, dark: boolean) => {
  if (dark) {
    // dark theme
    options.chart.backgroundColor = '#0f172a';
    options.title.style = { color: '#94a3b8' };
    options.colors = [
      '#485fee',
      '#ee2232',
      '#22c55e',
      '#f7a35c',
      '#8085e9',
      '#f15c80',
      '#e4d354',
      '#2b908f',
      '#f45b5b',
      '#91e8e1',
    ];
    options.xAxis.lineColor = '#475569';
    options.xAxis.gridLineColor = '#475569';
    options.xAxis.labels = {
      style: {
        color: '#94a3b8',
        cursor: 'default',
        fontSize: '11px',
      },
    };
    options.yAxis.lineColor = '#475569';
    options.yAxis.gridLineColor = '#475569';
    options.yAxis.labels = {
      style: {
        color: '#94a3b8',
        cursor: 'default',
        fontSize: '11px',
      },
    };
    options.yAxis.title.style = { color: '#94a3b8' };
    options.legend.itemHiddenStyle = { color: '#334155' };
    options.legend.itemStyle = {
      'color': '#94a3b8',
      'cursor': 'pointer',
      'fontSize': '12px',
      'fontWeight': 'bold',
      'textOverflow': 'ellipsis',
    };
    options.legend.itemHoverStyle = { color: '#cbd5e1' };
    if (options.plotOptions.pie) {
      options.plotOptions.pie.dataLabels.style.color = '#94a3b8';
      options.plotOptions.pie.dataLabels.style.textOutline = 'none';
    }

    return options;
  }

  // light theme
  options.chart.backgroundColor = '#ffffff';
  options.title.style = { color: '#334155' };
  options.colors = [
    '#7cb5ec',
    '#434348',
    '#90ed7d',
    '#f7a35c',
    '#8085e9',
    '#f15c80',
    '#e4d354',
    '#2b908f',
    '#f45b5b',
    '#91e8e1',
  ];
  options.xAxis.lineColor = '#cbd5e1';
  options.xAxis.gridLineColor = '#cbd5e1';
  options.xAxis.labels = {
    style: {
      color: '#64748b',
      cursor: 'default',
      fontSize: '11px',
    },
  };
  options.yAxis.lineColor = '#cbd5e1';
  options.yAxis.gridLineColor = '#cbd5e1';
  options.yAxis.labels = {
    style: {
      color: '#64748b',
      cursor: 'default',
      fontSize: '11px',
    },
  };
  options.yAxis.title.style = { color: '#64748b' };
  options.legend.itemHiddenStyle = { color: '#94a3b8' };
  options.legend.itemStyle = {
    'color': '#334155',
    'cursor': 'pointer',
    'fontSize': '12px',
    'fontWeight': 'bold',
    'textOverflow': 'ellipsis',
  };
  options.legend.itemHoverStyle = { color: '#0f172a' };
  if (options.plotOptions.pie) {
    options.plotOptions.pie.dataLabels.style.color = '#334155';
    options.plotOptions.pie.dataLabels.style.textOutline = 'none';
  }

  return options;
};
