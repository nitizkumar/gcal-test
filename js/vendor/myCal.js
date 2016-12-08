var FC = $.fullCalendar;

FC.sourceFetchers.push(function(sourceOptions, start, end, timezone) {
  console.log(sourceOptions);
});