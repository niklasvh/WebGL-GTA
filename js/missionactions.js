/* 
* @author Niklas von Hertzen <niklas at hertzen.com>
* @created 3.1.2012 
* @website http://hertzen.com
 */


GTA.MissionAction = function () {
  
};


GTA.AC = {};

/*

GTA.AC.prototype.DONOWT = function ( target, succ, fail, data, score ) {
    
    
    
    // Success trigger, set to true if always succeeds
    if ( false ) {
        this.values = 
        
    }
    
    // Failure trigger
    if ( false ) {
        
    }
    
}
*/



GTA.AC.DONOWT = function ( target, succ, fail, data, score ) {
this.action = "DONOWT";

this.target =  target;
this.success =  succ;
this.fail =  fail;
this.data =  data;
this.score =  score;
};

GTA.AC.DONOWT.prototype = new GTA.MissionAction();
GTA.AC.DONOWT.constructor = GTA.AC.DONOWT;



/*
 * Survive for <timer> and it goes to <succ>, if you dont survive, your dead anyway.
 */

GTA.AC.SURVIVE = function ( target, succ, fail, data, score ) {
this.action = "SURVIVE";

this.target =  target;
this.success =  succ;
this.fail =  fail;
this.data =  data;
this.score =  score;
};

GTA.AC.SURVIVE.prototype = new GTA.MissionAction();
GTA.AC.SURVIVE.constructor = GTA.AC.SURVIVE;




GTA.AC.CRANE = function ( target, succ, fail, data, score ) {
this.action = "CRANE";

this.target =  target;
this.success =  succ;
this.fail =  fail;
this.data =  data;
this.score =  score;
};

GTA.AC.CRANE.prototype = new GTA.MissionAction();
GTA.AC.CRANE.constructor = GTA.AC.CRANE;




GTA.AC.ARROW = function ( target, succ, fail, data, score ) {
this.action = "ARROW";

this.target =  target;
this.success =  succ;
this.fail =  fail;
this.data =  data;
this.score =  score;
};

GTA.AC.ARROW.prototype = new GTA.MissionAction();
GTA.AC.ARROW.constructor = GTA.AC.ARROW;




GTA.AC.MOBILE_BRIEF = function ( target, succ, fail, data, score ) {
this.action = "MOBILE_BRIEF";

this.target =  target;
this.success =  succ;
this.fail =  fail;
this.data =  data;
this.score =  score;
};

GTA.AC.MOBILE_BRIEF.prototype = new GTA.MissionAction();
GTA.AC.MOBILE_BRIEF.constructor = GTA.AC.MOBILE_BRIEF;




GTA.AC.STARTUP = function ( target, succ, fail, data, score ) {
this.action = "STARTUP";

this.target =  target;
this.success =  succ;
this.fail =  fail;
this.data =  data;
this.score =  score;
};

GTA.AC.STARTUP.prototype = new GTA.MissionAction();
GTA.AC.STARTUP.constructor = GTA.AC.STARTUP;

