window.onload = pageReady;
function pageReady() {
    const url = 'http://sandbox.bittsdevelopment.com/code1/fetchemployees.php';
    fetch(url)
        .then((response) => {
            // console.log(response);
            if (response.status >= 200 && response.status <= 299) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then((employee) => {

            var i;
            var string = "";
            //Checks size of JSON object to set limit for FOR loop
            var employeeData = Object.keys(employee).length;
            // console.log(employeeData);
            for (i = 1; i <= employeeData; i++) {
                var employeeId = employee[i].employeeid;
                var employeeFName = employee[i].employeefname + " " + employee[i].employeelname;
                var employeeBio = employee[i].employeebio;
                var employeeHaspic = employee[i].employeehaspic;
                var employeeIsFeatured = employee[i].employeeisfeatured;

                //Resulting string
                string += '<div class="emp-container">';

                //If the employee is featured, add a crown image
                if (employeeIsFeatured == 1) {
                    string += '<div class="emp-featured">&#128081;</div>';
                }
                string += '<div class="emp-img">';
                string += '<img src="http://sandbox.bittsdevelopment.com/code1/employeepics/' + employeeId + '.jpg "' + 'alt="a picture of ' + name + '" class="img">' + '</div>';
                string += '<div class="emp-name"><h2 class="name">' + employeeFName + '</h2>';
                string += '<p class="emp-bio">' + employeeBio + '</p></div>'
                string += '<div class="emp-role">';

                //If role is more than 1, display all of them otherwise display 1 role
                if (employee[i].roles.length == 1) {
                    var roleId = employee[i].roles[0].roleid;
                    string += '<span class="role" id="' + roleId + '">' + employee[i].roles[0].rolename + '</span>';
                } else {
                    for (var j = 0; j < employee[i].roles.length; j++) {
                        var roleId = employee[i].roles[j].roleid;
                        string += '<span class="role" id="' + roleId + '">' + employee[i].roles[j].rolename + '</span>';
                    }
                }
                string += '</div></div>';
            }
            var mainContainer = document.getElementById('main-container');
            mainContainer.innerHTML = string;
        }).catch((error) => {
        // Handle the error
        console.log(error);
    });


    const URL = 'http://sandbox.bittsdevelopment.com/code1/fetchroles.php';
    fetch(URL)
        .then((response) => {
            if (response.status >= 200 && response.status <= 299) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then((roles) => {
            // console.log(roles);
            //loop to check every single role given as object
            for(var i = 0; i < roles.length; i++){
                // console.log(roles);
                var roleId = roles[i].roleid;
                var role = document.getElementsByClassName("role");
                //loop to check every single role of each employee
                for(var j = 0; j < role.length; j++){
                    var Id = role[j].id;
                    //If role ID from API and role ID in HTML are same, change the background color according to the roles given.
                    if(roleId == Id){
                        role[j].style.background = roles[i].rolecolor;
                        // If rolecolor is #FDFFF7, set font color to black because white color is not visible on #FDFFF7 otherwise font color is white defined in css
                        if(roles[i].rolecolor == "#FDFFF7"){
                            role[j].style.color = "black";
                        }
                    }
                }
            }
        })
}



