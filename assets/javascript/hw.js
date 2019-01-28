// Initialize Firebase
var config = {
    apiKey: "AIzaSyDPNNMw7NNe4Oqnbk1MGIA3cvJPdcD6B9w",
    authDomain: "train-scheduler-f68a8.firebaseapp.com",
    databaseURL: "https://train-scheduler-f68a8.firebaseio.com",
    projectId: "train-scheduler-f68a8",
    storageBucket: "train-scheduler-f68a8.appspot.com",
    messagingSenderId: "38428566450"
  };
   
  firebase.initializeApp(config);
  
  // Create a variable to reference the database
  var database = firebase.database();

  // Function to send data to firebase
  $('#submitButton').on('click', function(){
    var trainName = $('#trainname-input').val().trim();
    var destination = $('#destination-input').val().trim();
    var firstTrain = moment($('#firsttime-input').val().trim(), "HH:mm").subtract(10, "years").format("x");
    var frequency = $('#frequency-input').val().trim();
 
    // Create variable to hold data
    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    }
  //  Upload data to firebase
      database.ref().push(newTrain);

      alert('Train Successfully Added!');
      // Clear Text Boxes
      $('#trainname-input').val("");
      $('#destination-input').val("");
      $('#firsttime-input').val("");
      $('#frequency-input').val("");
});

//   Store Data from database and display on HTML
database.ref().on('child_added', function(snapshot){
  var name = snapshot.val().name;
  var destination = snapshot.val().destination;
  var firstTrain = snapshot.val().firstTrain;
  var frequency = snapshot.val().frequency;

  var remainder = moment().diff(moment.unix(firstTrain), "minutes")%frequency;
  var minutes = frequency - remainder;
  var arrival = moment().add(minutes, "m").format("hh:mm A");

  console.log(remainder);
  console.log(minutes);
  console.log(arrival);

  $('#train-table > tBody').append('<tr><td>'+name+'</td><td>'+destination+'</td><td>'+frequency+'</td><td>'+arrival+'</td><td>'+minutes+'</td>')

})
  
  //Run Time  
  setInterval(function(startTime) {
    $("#timer").html(moment().format('hh:mm a'))
  }, 1000);
  
  
  
    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm a"));
    // $("#timer").html(h + ":" + m);
    $("#timer").text(currentTime.format("hh:mm a"));
  