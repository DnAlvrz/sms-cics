'use strict'

const grade = require('./models/grade');

const express = require('express'),
  app = express(),
  dotenv=require('dotenv'),
  morgan = require('morgan'),
  path = require('path'),
  methodOverride = require('method-override'),
  flash = require('express-flash'),
  session = require('express-session'),
  passport = require('passport'),
  initPassport = require('./passport-config'),
  {sequelize, User, AcademicYear, Grade, Class} = require('./models'),
  authMiddlewares= require('./app/middlewares/auth');

initPassport(passport);
dotenv.config({path:'.env'})
const PORT = process.env.PORT || 8080;

app.use(methodOverride('_method'));

//log requests
app.use(morgan('dev'));

//load assets
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')));
app.use('/img', express.static(path.resolve(__dirname, 'assets/img')));

//parse request to body parser.
app.use(express.json({limit:'10mb'}));
app.use(express.urlencoded({extended:true}));

app.use(flash());
app.use(session({
  secret: 'super secret',
  cookie: {maxAge: 9000000},
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res,next) => {
  res.locals.currentUser = req.user;
  next();
})

//set view engine
app.set('view engine', 'ejs')
app.set('views', [path.join(__dirname, 'app/views'),path.join(__dirname, 'app/views/admin')]);

app.use('/api/courses', require('./app/routes/api/course'));

app.get('/login', authMiddlewares.checkisNotAuth,(req, res) => {
  res.render('login')
});

app.get('/logout', authMiddlewares.checkAuth, (req, res) => {
  req.logOut();
  res.redirect('/login')
});

app.post('/login', passport.authenticate('local',{
  successRedirect:'/',
  failureRedirect: '/login',
  failureFlash: true
}));

app.use((req,res, next) => {
  if(req.isAuthenticated()){
    next();
    return;
  }
  res.redirect('/login')
})

// home page
app.get('/', authMiddlewares.checkAuth , async (req, res) => {
  if(req.user.roles === "student"){
    const student = await User.findOne({
      where: {
        id:req.user.id
      },
      include : [
        {
          model: Grade,
          as: 'grades',
          include: [{
            model:Class,
            as:'subject',
            include:['subject','schoolyear']
          }]
        }
      ]
    });
    const schoolYears = await AcademicYear.findAll({include:['semesters']});
    res.render('index', {user:req.user, student, schoolYears})
  }
  else if(req.user.roles === "teacher"){
    res.redirect('/teacher')
  } else {
    res.redirect('/admin')
  }
})

app.use('/admin', require('./app/routes/admin'));
app.use('/teacher', require('./app/routes/teacher'));

sequelize.authenticate()
  .then(async () => {
    // let date = new Date();
    // console.log(`${date.getFullYear()} - ${date.getFullYear()+1} `);
    try {
      const superAdmin = await User.findOne({where:{schoolId:"cics-super-admin"}});
      if(!superAdmin) {
        const bcrypt = require('bcrypt');
        try {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt)
          const superAdmin = await User.create({
            schoolId: "cics-super-admin",
            firstname:"super" ,
            lastname: "admin",
            password: hashedPassword,
            birthdate: "10/15/2021",
            email: "admin@zppsu.com",
            address: "R.T. Lim Boulevard, Baliwasan, ZC",
            contactNum: process.env.CONTACT_NUMBER,
            roles: "superadmin",
            status: "active"
          });
        } catch (err) {
          console.log(err);
        }

      }
    } catch (error) {
      console.log(error)
    }
    console.log("Database connected")
    app.listen(PORT, () => {
      console.log(`Server ${process.pid} is running on http://localhost:${PORT}`);
    });
  })
  .catch(err=> {
    console.log(err);
  })


  //load router
  // app.use('/api/schoolyears', require('./app/routes/api/schoolyear'));
  // app.use('/api/semesters', require('./app/routes/api/semester'));
  // app.use('/api/faculty', require('./app/routes/api/semester'));
  // app.use('/api/students', require('./app/routes/api/student'));
  // app.use('/api/subjects', require('./app/routes/api/subject'));
