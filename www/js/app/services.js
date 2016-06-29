angular.module('app.services', [])

    .service('AppService', ['$q', 'ParseConfiguration',
        function ($q, ParseConfiguration) {

			var parseInitialized = false;

			return {
				/**
				 *
				 * @returns {*}
				 */
				init: function () {

					debugger;
					// if initialized, then return the activeUser
					if (parseInitialized === false) {
						Parse.initialize(ParseConfiguration.applicationId, ParseConfiguration.javascriptKey);
						parseInitialized = true;
						console.log("parse initialized in init function");
					}
					//return $q.when(currentUser);
				},

				getUserLocationByBloodType: function (_bloodgroup) {
					var query = new Parse.Query(Parse.User);
					var response_data = new Parse.Promise();
					var defer = $q.defer();
					query.equalTo("blood_group",_bloodgroup);
					query.find({
						success: function(_user_data){

//						   if (!_user_data) {
//								return $q.reject({error: "noUser"});
//							} else {
//								return $q.when(_user_data);
//							}

//							alert (_user_data);
							defer.resolve(_user_data);
							response_data = _user_data;
//							alert(response_data);
//							for (var i = 0; i < _user_data.length; i++) {
//								var object = _user_data[i];
//								alert(object.id + ' - ' + object.get('location'));
//							}
							//return (user_data);
						},
						error: function(error) {
							Console.log("Error: " + error.code + " " + error.message);
						}
					})
					//alert(response_data);
					return defer.promise;
					//return $q.resolve(response_data);
				}

			}

        }]);
