app.controller('calendarController', ['$scope', '$http', '$state', 'authService', function ($scope, $http, $state, authService) {

  if (!authService.isAuthenticated() || gapi.client === undefined)  {
    $state.go('login');
    return;
  }

  this.loadedWeeks = [];

  $scope.events = [];

  var _self = this;
  $scope.loadEventForWeek = function (start) {
    var start = moment(new Date(start.toDate()));
    var end = moment(start).endOf('week');
    var found = false;
    _self.loadedWeeks.forEach(function (elem) {
      if(elem.start.isSame(start,'day')){
        found = true;
      }
    })

    if(!found)
      _self.loadedWeeks.push({start:start});
    else
      return;

    console.log('start ' + start.format() + "--- end " + end.format() );
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
            end: moment(elem.end.dateTime)
          };
          $scope.events.push(eventData);

          $scope.$broadcast('eventAdded', eventData);
        });
      });
    });

  }


  $scope.getEvents = function () {
    return $scope.events;
  }

  var start = moment().startOf('week');

  $scope.loadEventForWeek(start);

}]);