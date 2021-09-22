const LocalStrategy = require('passport-local').Strategy
const {User} = require('./models')
const  bcrypt = require('bcrypt');
function init (passport, getUserByID) {
  const authUser = async(schoolId, password, done) => {
    const user = await User.findOne({where: {schoolId}});
    if(user == null) {
      return done(null, false, {message: `No such user with school id ${schoolId}`});
    }
    try {
      if(await bcrypt.compare(password, user.password)) {
        return done(null, user)
      } else {
        return done(null, false, {message: "Incorrect password"} )
      }
    } catch (error) {
      return done(error);
    }
  }

  passport.use(new LocalStrategy({usernameField: 'schoolId'}, authUser));
  passport.serializeUser((user, done)=> {
    done(null, user.id)
  })
  passport.deserializeUser( async (id, done) => {
    try {
      const user = await User.findOne({where:{id}})
      done(null, user)
    } catch (error) {
      done(error)
    }
  })
}

module.exports = init;