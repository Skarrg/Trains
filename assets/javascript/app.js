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
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();
    
    var trainNumber = $("#train-name-input").val().trim();
    var trainOrigin = $("#train-origin-input").val().trim();
    var trainDestination = $("#train-destination-input").val().trim();
    var trainStart = $("#train-start-input").val().trim();
    var trainFrequency = $("#train-frequency-input").val().trim();

    var newTrain = {
        number: trainNumber,
        origin: trainOrigin,
        destination: trainDestination,
        start: trainStart,
        frequency: trainFrequency
    };

    database.ref().push(newTrain);

    console.log(newTrain);

    $("#train-name-input").val("");
    $("#train-origin-input").val("");
    $("#train-destination-input").val("");
    $("#train-start-input").val("");
    $("#train-frequency-input").val("");
});

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());
    var trainNumber = childSnapshot.val().number;
    var trainOrigin = childSnapshot.val().origin;
    var trainDestination = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().start;
    var trainFrequency = childSnapshot.val().frequency;
})