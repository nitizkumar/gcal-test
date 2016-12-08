app.directive('fullCalendar', function () {
  return {
    restricts: 'E',
    scope:{
      getEvent:'&',
      loadEventForWeek:'&',
      loadEventForDay:'&'
    },
    link: function ($scope, $elem, $attr) {

      console.log($scope.events);

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
        onNext:function(date,viewName){
          if(viewName === 'agendaWeek'){
            $scope.loadEventForWeek({date:date});
          }else{
            $scope.loadEventForDay({date:date});
          }
        },
        onPrev:function(date,viewName){
          if(viewName === 'agendaWeek'){
            $scope.loadEventForWeek({date:date});
          }else{
            $scope.loadEventForDay({date:date});
          }
        },
        navLinkDayClick: function(date, jsEvent) {
          console.log('day', date.format()); // date is a moment
          var view = $($elem).data('fullCalendar').zoomTo(date,'day');
          return true;
        },
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        events: $scope.getEvent(),
        defaultView:'agendaWeek'
      });

      $scope.$on('eventAdded',function(event,eventData){
        console.log('eventAdded' + eventData);
        $($elem).fullCalendar('renderEvent', eventData, true);
      });
    }
  }
});