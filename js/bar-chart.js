let elementDefaults;
let chartDefaults;
let graphDefaults;
let barProperties;
let barSectionProperties;
let valueProperties;
let legendDefaults;
let displayLegend;

const reset = () => {
  elementDefaults = {
    "position": "relative",
    "width": "500px",
    "height": "300px"
  };

  chartDefaults = {
    "display": "grid",
    "grid-template-areas": "'y-axis tick-values tick-marks graph' 'empty empty empty labels' 'empty empty empty x-axis'",
    "grid-template-rows": "auto 0 0",
    "grid-template-columns": "0 20px 5px auto"
  };

  graphDefaults = {
    "display": "flex",
    "grid-area": "graph",
    "justify-content": "space-evenly",
    "align-items": "flex-end",
    "height": "100%",
    "border-bottom": "1px solid black"
  };

  barProperties = {
    "display": "flex",
    "flex-direction": "column-reverse",
    "align-items": "end",
    "box-sizing": "border-box",
    "width": "100%"
  };

  barSectionProperties = {
    "display": "flex",
    "justify-content": "center",
    "width": "100%",
    "box-sizing": "border-box",
    "background-color": "blue"
  };

  valueProperties = {
    "padding": "5px",
    "color": "white",
    "font-family": "Helvetica, Georgia, sans-serif"
  };

  legendDefaults = {
    "position": "absolute",
    "display": "flex",
    "flex-direction": "column"
  };

  displayLegend = true;
};

let extractBarOptions = (options) => {
  let barOptions = {};

  switch (options.valueLabelPosition) {
  case 'center':
    barOptions["align-items"] = "center";
    delete options.valueLabelPosition;
    break;
  case 'bottom':
    barOptions["align-items"] = "flex-end";
    delete options.valueLabelPosition;
    break;
  default:
    delete options.valueLabelPosition;
  }

  if (options.barSpacing) {
    barOptions["margin-left"] = options.barSpacing;
    graphDefaults["padding-right"] = options.barSpacing;
    delete options.barSpacing;
  }

  if (options.barColor) {
    if (Array.isArray(options.barColor)) {
      barOptions.colors = options.barColor;
    } else {
      barOptions.colors = [ options.barColor ];
    }
    delete options.barColor;
  }

  if (options.valueLabelColor) {
    valueProperties["color"] = options.valueLabelColor;
    delete options.valueLabelColor;
  }

  return barOptions;
};

let extractXAxis = (options) => {
  let xAxis;

  if (options.xAxisName) {
    xAxis = options.xAxisName;
    delete options.xAxisName;
  }

  return xAxis;
};

let extractYAxis = (options) => {
  let yAxis;

  if (options.yAxisName) {
    yAxis = options.yAxisName;
    delete options.yAxisName;
  }

  return yAxis;
};

let extractElementProperties = (options) => {
  return [ "width", "height" ].reduce((elementOptions, prop) => {
    if (options[prop]) {
      elementOptions[prop] = options[prop];
      delete options[prop];
      return elementOptions;
    }
    return elementOptions;
  }, {});
};

let extractLegendOptions = (options) => {
  return ["barColor", "legendPosition"].reduce((legendOptions, property) => {
    legendOptions[property] = options[property];
    return legendOptions;
  }, {});
};

let drawBar = (barData, options) => {
  let bar = Object.keys(barData).reduce((htmlBar, category, idx) => {
    let barSection = $("<div class='bar-section'></div>");
    let label = $("<div class='value'>" + barData[category].value.toLocaleString() + "</div>");
    if (options.colors) {
      barSectionProperties["background-color"] = options.colors[idx];
    }
    if (idx === Object.keys(barData).length - 1) {
      barSectionProperties["border-top-left-radius"] = "4px";
      barSectionProperties["border-top-right-radius"] = "4px";
    } else {
      delete barSectionProperties["border-top-left-radius"];
      delete barSectionProperties["border-top-right-radius"];
    }

    barSection.css(Object.assign(barSectionProperties,
                                 {"height": barData[category].height}));
    label.css(valueProperties);
    barSection.append(label);

    htmlBar.append(barSection);
    return htmlBar;
  }, $("<div class='bar'></div>"));

  bar.css(Object.assign(
    barProperties, options, {"height": "0"}));

  return bar;
};

let createXAxis = (xAxis) => {
  let title = $("<div class='x-axis'>" + xAxis + "</div>");

  title.css({
    "grid-area": "x-axis",
    "text-align": "center"
  });

  return title;
};

let createYAxis = (yAxis) => {
  let title = $("<div class='y-axis'>" + yAxis + "</div>");

  title.css({
    "grid-area": "y-axis",
    "writing-mode": "vertical-rl",
    "transform": "rotate(180deg)",
    "text-align": "center"
  });

  return title;
};

let createLabels = (labels, barOptions) => {
  // TODO: if a simple array is passed in as data to the drawBarChart method,
  // don't show the labels as they are just made-up ones used to normalize the
  // data structure
  let labelEl = labels.reduce((htmlLabel, label) => {
    htmlLabel.append($("<div>" + label + "</div>").css({
      "flex": "1 1 " + 100 / labels.length + "%",
      "padding-right": barOptions["margin-left"],
      "font-size": "0.8em",
      "text-align": "center"
    }));
    return htmlLabel;
  }, $("<div class='x-axis-labels'></div>"));

  labelEl.css({
    "grid-area": "labels",
    "display": "flex",
    "justify-content": "space-evenly",
    "margin-left": barOptions["margin-left"]
  });

  return labelEl;
};

let showLabelArea = () => {
  let gridRowHeights = chartDefaults['grid-template-rows'].split(' ');
  gridRowHeights[1] = "1.375em";
  chartDefaults['grid-template-rows'] = gridRowHeights.join(' ');
};

let showXAxisArea = () => {
  let gridRowHeights = chartDefaults['grid-template-rows'].split(' ');
  gridRowHeights[2] = "1.375em";
  chartDefaults['grid-template-rows'] = gridRowHeights.join(' ');
};

let showYAxisArea = () => {
  let gridColumnWidths = chartDefaults['grid-template-columns'].split(' ');
  gridColumnWidths[0] = "1.375em";
  chartDefaults['grid-template-columns'] = gridColumnWidths.join(' ');
};

let hideTickArea = () => {
  let gridColumnWidths = chartDefaults['grid-template-columns'].split(' ');
  gridColumnWidths[1] = 0;
  gridColumnWidths[2] = 0;
  chartDefaults['grid-template-columns'] = gridColumnWidths.join(' ');
};

// Adapted from https://stackoverflow.com/questions/611878/reasonable-optimized-chart-scaling
let bestTick = (maxValue, mostTicks) => {
  let tick;
  // Get the smallest interval possible given the max and the most ticks allowed
  const minInterval = maxValue / mostTicks;
  // Get the magnitude of the smallest interval
  const magnitude = Math.pow(10, Math.floor(Math.log10(minInterval)));
  const residual = minInterval / magnitude;

  if (residual > 5) {
    tick = 10 * magnitude;
  } else if (residual > 2) {
    tick = 5 * magnitude;
  } else if (residual > 1) {
    tick = 2 * magnitude;
  } else {
    tick = magnitude;
  }

  return tick;
};

const generateTicks = (intervalHeight, scale, tickInterval) => {
  const ticks = scale / tickInterval;
  let tickContainer = $("<div class='ticks'></div>");

  for (let i = 0; i < ticks; i++) {
    let intervalEl = $("<div></div>");
    intervalEl.css({
      "box-sizing": "border-box",
      "border-top": "1px solid black",
      "height": intervalHeight + "%"
    });
    tickContainer.append(intervalEl);
  }
  tickContainer.css({
    "grid-area": "tick-marks"
  });

  return tickContainer;
};

const generateTickValues = (intervalHeight, scale, tickInterval) => {
  let widestTickVal = $("<span id='del'>" + scale.toLocaleString() + "</span>");
  widestTickVal.css({
    "visibility": "none",
    "font-size": "0.8em"
  });
  $("body").append(widestTickVal);
  let tickColWidth = $("#del").width() + 5;
  $("#del").remove();
  let gridColumnWidths = chartDefaults["grid-template-columns"].split(' ');
  gridColumnWidths[1] = tickColWidth + "px";
  chartDefaults["grid-template-columns"] = gridColumnWidths.join(' ');

  let tickValueContainer = $("<div class='tick-values'></div>");
  for (let i = tickInterval; i <= scale; i += tickInterval) {
    let tickValue = $("<div>" + i.toLocaleString() + "</div>");
    tickValue.css({
      "height": intervalHeight + "%",
      "margin-top": "-0.5em",
      "margin-bottom": "0.5em",
      "padding-right": "5px",
      "font-size": "0.8em",
      "text-align": "right"
    });
    tickValueContainer.prepend(tickValue);
  }
  tickValueContainer.css({
    "grid-area": "tick-values"
  });

  return tickValueContainer;
};

const drawGraph = (data, scale, options, barOptions) => {
  // Get each value's percentage of the scale
  for (let category in data) {
    for (let sectionCategory in data[category]) {
      let height = data[category][sectionCategory].value / scale * 100;
      data[category][sectionCategory].height = height + "%";
    }
  }

  // Create and add each data item as a bar on the graph
  let graph = Object.keys(data).reduce((el, category) => {
    el.append(drawBar(data[category], barOptions));
    return el;
  }, $("<div class='graph'></div>"));

  // Apply styling to the graph
  graph.css(Object.assign(graphDefaults, options));
  if (options.showTicks) { graph.css("border-left", "1px solid black"); }

  return graph;
};

const drawYAxisElements = (yAxis, scale, tickInterval, options) => {
  let name;
  let ticks;
  let tickValues;
  const intervalHeight = tickInterval / scale * 100;

  if (yAxis) {
    showYAxisArea();
    name = createYAxis(yAxis);
  }

  defaultsAndOptions = Object.assign({showTicks: false}, options);
  if (defaultsAndOptions.showTicks) {
    ticks = generateTicks(intervalHeight, scale, tickInterval);
    tickValues = generateTickValues(intervalHeight, scale, tickInterval);
  } else {
    hideTickArea();
  }

  return [name, tickValues, ticks];
};

const drawXAxisElements = (xAxis, labels, barOptions) => {
  let labelsElement;
  let xAxisName;

  if (labels) {
    showLabelArea();
    labelsElement = createLabels(labels, barOptions);
  }

  if (xAxis) {
    showXAxisArea();
    xAxisName = createXAxis(xAxis);
  }

  return [labelsElement, xAxisName];
};

const drawChart = (height, data, scale, tickInterval, options) => {
  let chart = $("<article class='chart'></article>");
  let barOptions = extractBarOptions(options);
  let xAxis;
  let yAxis;
  xAxis = extractXAxis(options);
  yAxis = extractYAxis(options);

  chart.append(drawGraph(data, scale, options, barOptions));
  chart.append(drawYAxisElements(yAxis, scale, tickInterval, options));
  chart.append(drawXAxisElements(xAxis, Object.keys(data), barOptions));
  chart.css(Object.assign(chartDefaults, { "height": height }));

  return chart;
};

const drawLegend = (data, legendOptions) => {
  let legendEl = $("<aside class='legend'></aside>");
  let legendData = {};

  for (let xCat in data) {
    let xCatData = Object.keys(data[xCat]).reduce((obj, category, idx) => {
      obj[category] = legendOptions.barColor[idx];
      return obj;
    }, {});
    Object.assign(legendData, xCatData);
  }

  for (let item in legendData) {
    let legendItem = $("<div class='legend-item'></div>");
    let swatch = $("<div class'swatch'></div>");
    swatch.css({
      "height": "1em",
      "width": "1em",
      "float": "left",
      "background-color": legendData[item]
    });
    legendItem.append(swatch);
    let label = $("<div class='label'>" + item + "</div>");
    label.css({
      "padding-left": "1.5em",
      "font-size": "0.8em"
    });
    legendItem.append(label);
    legendEl.append(legendItem);
  }

  legendOptions.legendPosition = legendOptions.legendPosition || {
    top: "0",
    left: "30px"
  };
  legendEl.css(Object.assign(legendDefaults, legendOptions.legendPosition));

  return legendEl;
};

const drawTitle = (title, fontSize, color) => {
  let titleEl = $("<header class='title'><h1>" + title + "</h1></header>");

  $("h1", titleEl).css({
    "font-size": fontSize || undefined,
    "color": color || undefined
  });

  return titleEl;
};

const normalizeXCategory = (data) => {
  let objData;

  // 1. Turn a single number value into an array
  if (typeof data === 'number') {
    objData = [ data ];
  } else {
    objData = data;
  }

  // 2. Turn an array into an object with the indexes as the property names
  if (Array.isArray(objData)) {
    // [ 1, 2, 3 ] => { 0: 1, 1: 2, 2: 3 }
    objData = objData.reduce((obj, value, idx) => {
      obj[idx] = value;
      return obj;
    }, {});
    displayLegend = false;
  }

  // 3. Turn the value of each category into an object with a value property (we
  // will later add a height property alongside the value property)
  for (let category in objData) {
    objData[category] = { value: objData[category] };
  }

  return objData;
};

const normalize = (data) => {
  let objData = {};
  // Turn array into an object with categories as properties
  if (Array.isArray(data)) {
    objData = data.reduce((obj, value, idx) => {
      obj[idx] = value;
      return obj;
    }, {});
  } else {
    objData = data;
  }

  // Ensure each category value is represented as an object, even if it only
  // contains a single value
  for (let category in objData) {
    objData[category] = normalizeXCategory(objData[category]);
  }

  return objData;
};

const getMaxFor = (data) => {
  // TODO: What if the data includes negative numbers?
  let max = 0;
  for (let category in data) {
    // Get the sum of all the values in this bar's data...
    let categorySum = Object.values(data[category]).reduce((sum, num) => {
      return sum + num.value;
    }, 0);
    // ... and see if it's the biggest so far
    max = categorySum > max ? categorySum : max;
  }
  return max;
};

const drawBarChart = (data, options, element) => {
  // When drawing multiple charts on a single page, reset all of the original
  // settings for each chart so that settings from one do not affect the other
  reset();

  // Get the data into the format that can be used by the rest of the code
  let normalizedData = normalize(data);

  // Determine the scale of the chart
  // Get largest of all bar values
  const max = getMaxFor(normalizedData);
  // =< 8 ticks looks best to my eyes
  const tickInterval = bestTick(max, 8);
  // Based on the largest value to plot, and the tick interval we calculated,
  // what is the scale of the chart
  const scale = Math.ceil(max / tickInterval) * tickInterval;

  // Extract options
  let elementOptions = extractElementProperties(options);
  let elementProperties = Object.assign(elementDefaults, elementOptions);
  let legendOptions = extractLegendOptions(options);

  // The total height of the passed in element needs to be the default 300px or
  // the height passed in from the options, so the graph needs to be the total
  // height of the chart element minus the height of the title
  let titleHeight = 0;
  if (options.title) {
    element.append(drawTitle(options.title, options.titleSize, options.titleColor));
    let header = $("header", element);
    titleHeight = header.outerHeight(true) - parseInt(header.css("margin-top"), 10);
  }

  let chartHeight = parseInt(elementProperties.height, 10) - titleHeight + "px";
  element.append(drawChart(chartHeight, normalizedData, scale, tickInterval, options));

  if (displayLegend) { element.append(drawLegend(data, legendOptions)); }

  // Apply some styling to the element that holds the graph
  element.css(elementProperties);

  // Animate the bars over a third of a second
  $(".bar").animate({height: "100%"}, 333);
};
