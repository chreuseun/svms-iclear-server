const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');

const {endPointWebApp,mobile,sms, v2} = require('./config/routes')
const ipAdd = require('./config/ipaddress');
const accountRouter = require('./routes/_v2/account');
const departmentRouter = require('./routes/_v2/departments');
const educationLevelsRouter = require('./routes/_v2/educationLevels');
const coursesRouter = require('./routes/_v2/courses');
const semesterRouter = require('./routes/_v2/semester');


const ip_v4 = ipAdd;
const app = express();

app.use('/static' , express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cors());

// ROUTES
app.use(endPointWebApp, require('./routes/users/login'));  // USERS
app.use(endPointWebApp, require('./routes/menu/menu')); // MENU
app.use(endPointWebApp, require('./routes/educ_level/educ_level')) // EDUC_LEVEL
app.use(endPointWebApp, require('./routes/departments/departments'))  // DEPARTMENTS
app.use(endPointWebApp, require('./routes/violation/violation'))// VIOLATIONS
app.use(endPointWebApp, require('./routes/activity/activty'))// ACTIVITY
app.use(endPointWebApp, require('./routes/acad_year/acad_year')) // ACAD_YEAR
app.use(endPointWebApp, require('./routes/semester/semester')) // SEMESTER
app.use(endPointWebApp, require('./routes/students/students')) // STUDENTS
app.use(endPointWebApp, require('./routes/clearance/clearance')); // CLEARANCE
app.use(endPointWebApp, require('./routes/class/class')); // CLASS OLD
app.use(endPointWebApp, require('./routes/filter_student/filter_student')); //FILTER STUDENT
app.use(endPointWebApp, require('./routes/subjectClass/subjectClass')); // Registrar new adding
app.use(endPointWebApp, require('./routes/finance/finance')); // Registrar new adding


app.use(mobile, require('./routes/mobile/student/mob_student'));
app.use(mobile, require('./routes/mobile/clearance/mob_clearance'));
app.use(mobile, require('./routes/mobile/violation/violation'));
app.use(mobile, require('./routes/mobile/violationClass/violationClass'));

// SMS ENDPOINTS 
app.use(sms, require('./routes/sms/DepartmentClearance/DepartmentClearance'));

app.use('/',require('./routes/test/test')) // TEST FOR TESTING

/* VERSION 2 REWORK APIS */
app.use(v2, accountRouter)
app.use(v2, departmentRouter)
app.use(v2, educationLevelsRouter)
app.use(v2, coursesRouter)
app.use(v2, semesterRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log('----- ICLEAR SERVER IS LISTENER ')
});

console.log(`Server is Running in ${ip_v4}:${PORT}`);
