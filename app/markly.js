angular.module('marklyApp', [])
.controller('MainCtrl', function($scope) {
  
    //sample data
    $scope.categories = [
      {"id": 0, "name": "Development"},
      {"id": 1, "name": "Design"},
      {"id": 2, "name": "Hackathons"},
      {"id": 3, "name": "Talks"}
    ];

    $scope.bookmarks = [
      {"id": 0, "title": "AngularJS", "url": "http://angularjs.org", "category": "Development" },
      {"id": 1, "title": "GitHub", "url": "http://github.com", "category": "Development" },
      {"id": 2, "title": "Dribbble", "url": "http://dribbble.com/", "category": "Design" },
      {"id": 3, "title": "Flat UI Colors", "url": "flatuicolors.com", "category": "Design" },
      {"id": 4, "title": "MHacks", "url": "http://www.mhacks.com/", "category": "Hackathons" },
      {"id": 5, "title": "Major League Hacking", "url": "http://mlh.io", "category": "Hackathons" },
      {"id": 6, "title": "Google I/O 2011: HTML5 versus Android: Apps or Web for Mobile Development?", "url": "https://www.youtube.com/watch?v=4f2Zky_YyyQ", "category": "Talks" },
      {"id": 7, "title": "Chamath Palihapitiya - how we put Facebook on the path to 1 billion users", "url": "https://www.youtube.com/watch?v=raIUQP71SBU", "category": "Talks" },
      {"id": 8, "title": "Wat", "url": "https://www.destroyallsoftware.com/talks/wat", "category": "Talks" }
    ];

      $scope.currentCategory = null;

      $scope.isCurrentCategory = function(category) {
        return $scope.currentCategory !== null && category.name === $scope.currentCategory.name;
      }

      $scope.setCurrentCategory = function(category) {
          $scope.currentCategory = category;

          $scope.cancelCreating();
          $scope.cancelEditing();
      }

      $scope.resetCreateForm = function() {
        $scope.newBookmark = {
          title: '',
          url: '',
          category: $scope.currentCategory
        }
      }

      $scope.createBookmark = function(bookmark) {
        bookmark.id = $scope.bookmarks.length;
        $scope.bookmarks.push(bookmark);

        $scope.resetCreateForm();
      }

      $scope.editedBookmark = null;

      $scope.setEditedBookmark = function(bookmark) {
        $scope.editedBookmark = angular.copy(bookmark);
      }

      $scope.updateBookmark = function(bookmark) {
        var index = _.findIndex($scope.bookmarks, function(b) {
          return b.id == bookmark.id;
        });
        $scope.bookmarks[index] = bookmark;

        $scope.editedBookmark = null;
        $scope.isEditing = null;
      }

      $scope.isSelectedBookmark = function(bookmarkId) {
          return $scope.editedBookmark != null && $scope.editedBookmark.id === bookmarkId;
      }

      $scope.deleteBookmark = function(bookmark) {
        _.remove($scope.bookmarks, function(b) {
            return b.id == bookmark.id;
        });
      }

      // Creating and Editing States
      $scope.isCreating = false;
      $scope.isEditing = false;

      $scope.startCreating = function() {
        $scope.isCreating = true;
        $scope.isEditing = false;

        $scope.resetCreateForm();
      }

      $scope.cancelCreating = function() {
        $scope.isCreating = false;
      }

      $scope.startEditing = function() {
        $scope.isCreating = false;
        $scope.isEditing = true;
      }

      $scope.cancelEditing = function()  {
        $scope.isEditing = false;
      }

      $scope.shouldShowCreating = function() {
        return $scope.currentCategory && !$scope.isEditing;
      }

      $scope.shouldShowEditing = function() {
        return $scope.isEditing && !$scope.isCreating;
      }

});
