app.directive('fullCalendar', function () {
  return {
    restricts: 'E',
    scope:{
      getEvent:'&',
      loadEvent:'&',
      setTimeRange:'&',
      update:'&'
    },
    link: function ($scope, $elem, $attr) {

      console.log($scope.events);

      var FC = $.fullCalendar;

      FC.sourceFetchers.push(function(sourceOptions, start, end, timezone) {
        console.log(sourceOptions);
        $scope.loadEvent({start:start,end:end});
      });



      $($elem).fullCalendar({
        header: {
          left: 'prev,next  ',
          center: 'title',
          right: 'agendaDay,agendaWeek'
        },
        timezone:'local',
        navLinks: true, // can click day/week names to navigate views
        selectable: true,
        selectHelper: true,
        select: function(start, end) {

          $scope.setTimeRange({start:start,end:end});

          eventData = {
            start: start,
            end: end
          };

        },
        eventDrop:function(event, delta, revertFunc) {
          console.log(event);
          event.sourceEvent.start.dateTime = event.start.format();
          event.sourceEvent.end.dateTime = event.end.format();
          $scope.update({sourceEvent:event.sourceEvent});
        },
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        events: $scope.getEvent(),
        defaultView:'agendaWeek'
      });

      $scope.$on('eventAdded',function(event,eventData){
        console.log('eventAdded' + eventData);
        $($elem).fullCalendar('renderEvent', eventData, true);
        $($elem).fullCalendar('unselect');
      });



    }
  }
});