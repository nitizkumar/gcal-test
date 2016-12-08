app.controller('calendarController', ['$scope', '$http', '$state', function ($scope, $http, $state) {
  
  gapi.client.load('calendar', 'v3', $scope.listUpcomingEvents);

  $scope.listUpcomingEvents = function () {
    alert();
    var request = gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime'
    });

    request.execute(function (resp) {
      var events = resp.items;
      console.log(events);
    });

  };

  $scope.events = [
    {
      title: 'All Day Event',
      start: '2016-12-01'
    },
    {
      title: 'Long Event',
      start: '2016-12-07',
      end: '2016-12-10'
    },
    {
      id: 999,
      title: 'Repeating Event',
      start: '2016-12-09T16:00:00'
    },
    {
      id: 999,
      title: 'Repeating Event',
      start: '2016-12-16T16:00:00'
    },
    {
      title: 'Conference',
      start: '2016-12-11',
      end: '2016-12-13'
    },
    {
      title: 'Meeting',
      start: '2016-12-12T10:30:00',
      end: '2016-12-12T12:30:00'
    },
    {
      title: 'Lunch',
      start: '2016-12-12T12:00:00'
    },
    {
      title: 'Meeting',
      start: '2016-12-12T14:30:00'
    },
    {
      title: 'Happy Hour',
      start: '2016-12-12T17:30:00'
    },
    {
      title: 'Dinner',
      start: '2016-12-12T20:00:00'
    },
    {
      title: 'Birthday Party',
      start: '2016-12-13T07:00:00'
    },
    {
      title: 'Click for Google',
      url: 'http://google.com/',
      start: '2016-12-28'
    }

  ];


  $scope.getEvents = function () {
    return $scope.events;
  }
}]);