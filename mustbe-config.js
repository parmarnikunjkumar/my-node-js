/**
 * Created by nirdosh on 27.07.15.
 */
var mustBe = require('mustbe');
module.exports = function(config){

  config.routeHelpers(function(rh){
    rh.getUser(function (req,cb) {
      cb(null,req.user);
    });

    rh.notAuthorized(function(req,res,next){
      res.redirect("/login?msg=you are not authorized");
    });

    config.activities(function(activities){
      // configure an activity with an authorization check
      activities.can("view thing", function(identity, params, cb){
        var id = params["id"];
        someLib.anotherThing(id, function(err, thing){
          if (err) { return cb(err); }
          var hasThing = !!thing;
          cb(null, hasThing);
        });
      });
    });
  })
}