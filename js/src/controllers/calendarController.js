app.controller('calendarController', ['$scope', '$http', '$state', 'authService', function ($scope, $http, $state, authService) {

  if (!authService.isAuthenticated() || gapi.client === undefined) {
    $state.go('login');
    return;
  }

  $scope.attendees = [{}];

  $scope.eventData = {
    start: '',
    end: '',
    title: '',
    location: '',
    description: ''
  };

  this.loadedWeeks = [];

  $scope.events = [];


  $scope.setTimeRange = function(start,end){
    $scope.eventData.start = start.format();
    $scope.eventData.end = end.format();
    $scope.$apply();
  };

  var _self = this;
  $scope.loadEventForDuration = function (start,end) {
    var start = moment(new Date(start.toDate()));
    var end = moment(new Date(end.toDate()));
    var found = false;
    _self.loadedWeeks.forEach(function (elem) {
      if (elem.start.isSame(start, 'day')) {
        found = true;
      }
    })

    if (!found)
      _self.loadedWeeks.push({start: start});
    else
      return;

    console.log('start ' + start.format() + "--- end " + end.format());

    gapi.client.load('calendar', 'v3', function () {

      var request = gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': start.format("YYYY-MM-DDTHH:mm:ssZ"),
        'timeMax': end.format("YYYY-MM-DDTHH:mm:ssZ"),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
      });


      request.execute(function (resp) {
        resp.items.forEach(function (elem, i) {
          var eventData = {
            title: elem.summary,
            start: moment(elem.start.dateTime),
            end: moment(elem.end.dateTime),
            id:elem.id,
            sourceEvent:elem
          };
          $scope.events.push(eventData);

          $scope.$broadcast('eventAdded', eventData);
        });
      });
    });

  }

  $scope.createEvent = function () {


    var attendees = [];
    var evt = {
      'summary': $scope.eventData.title,
      'location': $scope.eventData.location,
      'description': $scope.eventData.description,
      'start': {
        'dateTime': $scope.eventData.start
      },
      'end': {
        'dateTime': $scope.eventData.end
      },
      'attendees':attendees,
      'sendNotifications':true
    }

    $scope.attendees.forEach(function (elem) {
      if (elem.email != undefined && elem.email.trim()) {
        attendees.push({'email':elem.email});
      }
    });

    var request = gapi.client.calendar.events.insert({
      'calendarId': 'primary',
      'resource': evt,
      'sendNotifications':true
    });

    request.execute(function (event) {


      $scope.$broadcast('eventAdded',$scope.eventData);

      $scope.eventData = {
        start: '',
        end: '',
        title: '',
        location: '',
        description: ''
      };
      $scope.$apply();
      toastr.success('Event Created successfully', 'Success');

    });
  }

  $scope.updateEvent = function(sourceEvent){

    var request = gapi.client.calendar.events.update({
      'calendarId': 'primary',
      'eventId':sourceEvent.id,
      'resource': sourceEvent
    });

    request.execute(function (event) {
      sourceEvent.sequence = event.sequence;
      toastr.success('Event Updated successfully', 'Success');
    });
  }

  $scope.getEvents = function () {
    return $scope.events;
  }

  var start = moment().startOf('week');
  var end = moment().endOf('week');

  $scope.loadEventForDuration(start,end);

}]);