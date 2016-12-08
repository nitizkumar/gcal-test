app.directive('fullCalendar', function () {
  return {
    restricts: 'E',
    scope:{
      getEvent:'&'
    },
    link: function ($scope, $elem, $attr) {

      console.log($scope.events);

      $($elem).fullCalendar({
        header: {
          left: 'prev,next  ',
          center: 'title',
          right: 'agendaDay,agendaWeek'
        },
        defaultDate: '2016-12-12',
        navLinks: true, // can click day/week names to navigate views
        selectable: true,
        selectHelper: true,
        select: function(start, end) {
          var title = prompt('Event Title:');
          var eventData;
          if (title) {
            eventData = {
              title: title,
              start: start,
              end: end
            };
            $($elem).fullCalendar('renderEvent', eventData, true); // stick? = true
          }
          $($elem).fullCalendar('unselect');
        },
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        events: $scope.getEvent(),
        defaultView:'agendaWeek'
      });
    }
  }
});