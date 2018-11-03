var tFrequency = 3;
var firstTime = "03:30";
var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
var currentTime = moment();
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
var tRemainder = diffTime % tFrequency;
var tMinutesTillTrain = tFrequency - tRemainder;
var nextTrain = moment().add(tMinutesTillTrain, "minutes");