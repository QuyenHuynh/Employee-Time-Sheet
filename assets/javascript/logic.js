// Initialize Firebase
var config = {
    apiKey: "AIzaSyAOeouPvvTqsfWnJxJTXH-_ZE1FgPzKYu4",
    authDomain: "prototypeprime-3ab50.firebaseapp.com",
    databaseURL: "https://prototypeprime-3ab50.firebaseio.com",
    projectId: "prototypeprime-3ab50",
    storageBucket: "prototypeprime-3ab50.appspot.com",
    messagingSenderId: "924680633610"
};
firebase.initializeApp(config);

var database = firebase.database();

//on-click function for adding new employees to the database
$("#submit-btn").on("click", function (event) {

    event.preventDefault();

    //get information from text boxes
    var name = $("#name").val().trim();
    var role = $("#role").val().trim();
    var startDate = moment($("#date").val().trim(), "MM/DD/YYYY").format("X");  //uses moment.js to convert to unix time stamp
    var monthlyRate = parseInt($("#rate").val().trim());

    var newEmployee = {
        name: name,
        role: role,
        startDate: startDate,
        monthlyRate: monthlyRate
    }
    database.ref().push(newEmployee);

    //reset text boxes
    $("#name").val("");
    $("#role").val("");
    $("#date").val("");
    $("#rate").val("");
});




//runs if a child has been added to the database
database.ref().on("child_added", function (snapshot) {
    var data = snapshot.val();
    console.log(data);

    //assign our values to new variables
    var employeeName = data.name;
    var employeeRole = data.role;
    var employeeStart = data.startDate;
    var employeeRate = data.monthlyRate;

    //re-formatted start date
    var employeeStartFormatted = moment.unix(employeeStart).format("MM/DD/YYYY");
    //calculate months worked
    var monthsWorked = moment().diff(moment(employeeStart, "X"), "months");
    //calculate total billed
    var employeeBilled = monthsWorked * employeeRate;


    //create new row
    var newRow = $("<tr>").append(
        $("<td>").text(employeeName),
        $("<td>").text(employeeRole),
        $("<td>").text(employeeStartFormatted),
        $("<td>").text(monthsWorked),
        $("<td>").text(employeeRate),
        $("<td>").text(employeeBilled)
    );

    $("tbody").append(newRow);

});