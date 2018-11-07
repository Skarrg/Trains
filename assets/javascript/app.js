// var tFrequency = 3;
// var firstTime = "03:30";
// var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
// var currentTime = moment();
// var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
// var tRemainder = diffTime % tFrequency;
// var tMinutesTillTrain = tFrequency - tRemainder;
// var nextTrain = moment().add(tMinutesTillTrain, "minutes");

var config = {
    apiKey: "AIzaSyAY1JdjFCelFd42TI5KZEG-MVnXHI0mKRA",
    authDomain: "test-f318a.firebaseapp.com",
    databaseURL: "https://test-f318a.firebaseio.com",
    projectId: "test-f318a",
    storageBucket: "test-f318a.appspot.com",
    messagingSenderId: "667698387227"
};

firebase.initializeApp(config);

var database = firebase.database();
console.log(database);

function writeTrainData(trainNumber, name, email, imageUrl) {
    firebase.database().ref('users/' + userId).set({
      username: name,
      email: email,
      profile_picture : imageUrl
    });
  }

$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    var trainNumber = $("#train-name-input").val().trim();
    var trainOrigin = $("#train-origin-input").val().trim();
    var trainDestination = $("#train-destination-input").val().trim();
    var trainStart = $("#train-start-input").val().trim();
    var trainFrequency = $("#train-frequency-input").val().trim();
    var trainLength = $("#train-length-input").val().trim();

    var newTrain = {
        number: trainNumber,
        origin: trainOrigin,
        destination: trainDestination,
        start: trainStart,
        frequency: trainFrequency,
        length: trainLength
    };

    database.ref().push(newTrain);

    $("#train-name-input").val("");
    $("#train-origin-input").val("");
    $("#train-destination-input").val("");
    $("#train-start-input").val("");
    $("#train-frequency-input").val("");
    $("#train-length-input").val("");
});

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());
    var trainNumberResult = childSnapshot.val().number;
    var trainOriginResult = childSnapshot.val().origin;
    var trainDestinationResult = childSnapshot.val().destination;
    var trainStartTime = childSnapshot.val().start;
    var trainFrequencyTime = childSnapshot.val().frequency;
    var trainLengthTime = childSnapshot.val().length;

    //moment black magic
    var startTimeConverted = moment(trainStartTime, "HH:mm").subtract(1, "years");
    console.log ("starttime: " + startTimeConverted);

    var trainLengthConverted = moment(trainLengthTime, "HH:mm");
    console.log("trainlength: " + trainLengthConverted);

    var trainArrivalTime = startTimeConverted + trainLengthConverted;
    console.log ("train arrival time: " + trainArrivalTime);

    var currentTime = moment();
    console.log("Current time: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(startTimeConverted), "minutes");
    console.log("Time Difference: " + diffTime);
  
    var nextTrainDepartureTime = diffTime % trainFrequencyTime;
    console.log(nextTrainDepartureTime);

      if (trainOriginResult === "North Pole") {
        var newRow = $("<tr>").append(
            $("<td>").text(trainDestinationResult),
            $("<td>").text(trainNumberResult),
            $("<td>").text(nextTrainDepartureTime + " minutes"),
          );
        $("#outgoing-table > tbody").append(newRow);
      } else if (trainDestinationResult === "North Pole") {
        var newRow = $("<tr>").append(
            $("<td>").text(trainOriginResult),
            $("<td>").text(trainNumberResult),
            // $("<td>").text(nextTrainArrival),
          );
        $("#incoming-table > tbody").append(newRow);
      };
      
})