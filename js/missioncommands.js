/* 
* @author Niklas von Hertzen <niklas at hertzen.com>
* @created 3.1.2012 
* @website http://hertzen.com
 */




GTA.MissionCommand = function () {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    
    this.rotation;
  
    this.command;
};

GTA.MissionCommand.prototype.setPositionBlock = function ( pos ) {
    
    pos = pos.replace(".",",");
    var match = pos.match(/^\((\d*),(\d*),(\d*)\)$/);
    
    if (match === null) {
        GTA.Error("Unable to parse mission command position from " + pos);
    }
    
    this.x = 64 * (parseInt(match[ 1 ], 10) + 0.5);  
    this.y = 64 * (parseInt(match[ 2 ], 10) + 0.5);    
    this.z = 64 * (parseInt(match[ 3 ], 10));    
};

GTA.MissionCommand.prototype.setPositionPixels = function ( pos ) {
    
    var match = pos.match(/^\((\d*),(\d*),(\d*)\)$/);
    
    if (match === null) {
        GTA.Error("Unable to parse mission command position from " + pos);
    }
    
    this.x = parseInt(match[ 1 ], 10);  
    this.y = parseInt(match[ 2 ], 10);    
    this.z = parseInt(match[ 3 ], 10);    
};

GTA.MissionCommand.prototype.create  = function ( ) {
    
};


GTA.MissionCommand.prototype.setAngle = function ( r ) {
    return parseInt(r, 10);
};

GTA.MC = {};

GTA.MC.TELEPHONE = function ( pos, means, angle ) {
    this.command = "TELEPHONE";
    
    this.setPositionBlock( pos );
    this.means = means;
    this.setAngle ( angle );
};

GTA.MC.TELEPHONE.prototype = new GTA.MissionCommand();
GTA.MC.TELEPHONE.constructor = GTA.MC.TELEPHONE;

// object 40


GTA.MC.DUMMY = function ( pos, variable1, variable2 ) {
    this.command = "DUMMY";
    this.setPositionBlock( pos );
    
    this.unknown1 =  variable1;
    this.unknown2 =  variable2;
};

GTA.MC.DUMMY.prototype = new GTA.MissionCommand();
GTA.MC.DUMMY.constructor = GTA.MC.DUMMY;


GTA.MC.SPRAY = function ( pos, variable1, variable2 ) {
    this.command = "SPRAY";
    this.setPositionBlock( pos );
    
    this.color =  variable1;
    this.radius =  variable2;
};

GTA.MC.SPRAY.prototype = new GTA.MissionCommand();
GTA.MC.SPRAY.constructor = GTA.MC.SPRAY;



GTA.MC.TRIGGER = function ( pos, variable1, variable2 ) {
    this.command = "TRIGGER";
    this.setPositionBlock( pos );

    this.line =  variable1;
    this.radius =  variable2;
};

GTA.MC.TRIGGER.prototype = new GTA.MissionCommand();
GTA.MC.TRIGGER.constructor = GTA.MC.TRIGGER;


GTA.MC.TARGET = function ( pos, variable1, variable2 ) {
    this.command = "TARGET";
    this.setPositionPixels( pos );

//this.variable1 =  variable1;
//this.variable2 =  variable2;
};

GTA.MC.TARGET.prototype = new GTA.MissionCommand();
GTA.MC.TARGET.constructor = GTA.MC.TARGET;



GTA.MC.COUNTER = function ( pos, variable1, variable2 ) {
    this.command = "COUNTER";
    this.setPositionBlock( pos );

    this.count =  variable1;
//this.variable2 =  variable2;
};

GTA.MC.COUNTER.prototype = new GTA.MissionCommand();
GTA.MC.COUNTER.constructor = GTA.MC.COUNTER;




GTA.MC.FUTURE = function ( pos, variable1, variable2 ) {
    this.command = "FUTURE";
    this.setPositionBlock( pos );

    this.type =  variable1;
    this.angle =  this.setAngle( variable2 );
};

GTA.MC.FUTURE.prototype = new GTA.MissionCommand();
GTA.MC.FUTURE.constructor = GTA.MC.FUTURE;



GTA.MC.FUTUREPED = function ( pos, variable1, variable2 ) {
    this.command = "FUTUREPED";
    this.setPositionBlock( pos );

    this.type =  variable1;
    this.angle =  this.setAngle( variable2 );
};

GTA.MC.FUTUREPED.prototype = new GTA.MissionCommand();
GTA.MC.FUTUREPED.constructor = GTA.MC.FUTUREPED;




GTA.MC.DOOR = function ( pos, face, variable1, variable2 ) {
    this.command = "DOOR";
    this.setPositionBlock( pos );

    this.face = face;
    this.type =  variable1;
    this.interior =  variable2;
};

GTA.MC.DOOR.prototype = new GTA.MissionCommand();
GTA.MC.DOOR.constructor = GTA.MC.DOOR;





GTA.MC.FUTURECAR = function ( pos, variable1, variable2 ) {
    this.command = "FUTURECAR";
    this.setPositionBlock( pos );

    this.model =  variable1;
    this.angle =  this.setAngle( variable2 );
};

GTA.MC.FUTURECAR.prototype = new GTA.MissionCommand();
GTA.MC.FUTURECAR.constructor = GTA.MC.FUTURECAR;



GTA.MC.BOMBSHOP = function ( pos, variable1, variable2 ) {
    this.command = "BOMBSHOP";
    this.setPositionBlock( pos );

//this.variable1 =  variable1;
//this.variable2 =  variable2;
};

GTA.MC.BOMBSHOP.prototype = new GTA.MissionCommand();
GTA.MC.BOMBSHOP.constructor = GTA.MC.BOMBSHOP;




GTA.MC.POWERUP = function ( pos, variable1, variable2 ) {
    this.command = "POWERUP";
    this.setPositionBlock( pos );

    this.type =  variable1;
    this.timer =  variable2;
};

GTA.MC.POWERUP.prototype = new GTA.MissionCommand();
GTA.MC.POWERUP.constructor = GTA.MC.POWERUP;



GTA.MC.CARTRIGGER = function ( pos, variable1, variable2 ) {
    this.command = "CARTRIGGER";
    this.setPositionBlock( pos );

    this.line =  variable1;
    this.car =  variable2;
};

GTA.MC.CARTRIGGER.prototype = new GTA.MissionCommand();
GTA.MC.CARTRIGGER.constructor = GTA.MC.CARTRIGGER;



GTA.MC.HELLS = function ( pos, variable1, variable2 ) {
    this.command = "HELLS";
    this.setPositionBlock( pos );


    this.model =  variable1;
    this.angle =  this.setAngle( variable2 );
};

GTA.MC.HELLS.prototype = new GTA.MissionCommand();
GTA.MC.HELLS.constructor = GTA.MC.HELLS;



GTA.MC.PARKED = function ( pos, variable1, variable2 ) {
    this.command = "PARKED";
    this.setPositionBlock( pos );

    this.model =  variable1;
    this.angle =  this.setAngle( variable2 );
};

GTA.MC.PARKED.prototype = new GTA.MissionCommand();
GTA.MC.PARKED.constructor = GTA.MC.PARKED;


GTA.MC.PARKED.prototype.create = function ( game ) {
    var gameobject = new GTA.GameObjectPosition();
    //console.log(this.z);
    //this.z = 300;
    gameobject.addCar( game, this.model, this.x, this.y, this.z, this.angle );
    game.map.addObject( gameobject );
   // console.log(gameobject);
    //game.scene.add(gameobject.sprite)
    //console.log(this);
};


GTA.MC.GUN_TRIG = function ( pos, variable1, variable2 ) {
    this.command = "GUN_TRIG";
    this.setPositionBlock( pos );

    this.line =  variable1;
    this.range =  variable2;
};

GTA.MC.GUN_TRIG.prototype = new GTA.MissionCommand();
GTA.MC.GUN_TRIG.constructor = GTA.MC.GUN_TRIG;



GTA.MC.PLAYER = function ( pos, variable1, variable2 ) {
    this.command = "PLAYER";
    this.setPositionBlock( pos );

    this.car =  variable1;
    this.angle =  this.setAngle( variable2 );
};

GTA.MC.PLAYER.prototype = new GTA.MissionCommand();
GTA.MC.PLAYER.constructor = GTA.MC.PLAYER;



GTA.MC.TARGET_SCORE = function ( pos, variable1, variable2 ) {
    this.command = "TARGET_SCORE";
    //this.setPositionBlock( pos );

    this.score =  variable1;
//this.variable2 =  variable2;
};

GTA.MC.TARGET_SCORE.prototype = new GTA.MissionCommand();
GTA.MC.TARGET_SCORE.constructor = GTA.MC.TARGET_SCORE;




GTA.MC.DUM_MISSION_TRIG = function ( pos, variable1, variable2, variable3 ) {
    this.command = "DUM_MISSION_TRIG";
    this.setPositionBlock( pos );

    this.line =  variable1;
    this.radius =  variable2;
    this.vehicle =  variable2;
};

GTA.MC.DUM_MISSION_TRIG.prototype = new GTA.MissionCommand();
GTA.MC.DUM_MISSION_TRIG.constructor = GTA.MC.DUM_MISSION_TRIG;



GTA.MC.GTA_DEMAND = function ( pos, variable1, variable2, variable3, variable4 ) {
    this.command = "GTA_DEMAND";
    //this.setPositionBlock( pos );

    this.craneNumber =  variable1; // 0-3, NOT line number
    this.model =  variable2;
    this.remap =  variable3;
    this.totalGet =  variable4;
};

GTA.MC.GTA_DEMAND.prototype = new GTA.MissionCommand();
GTA.MC.GTA_DEMAND.constructor = GTA.MC.GTA_DEMAND;



GTA.MC.MISSION_COUNTER = function ( pos, variable1, variable2 ) {
    this.command = "MISSION_COUNTER";
    //this.setPositionBlock( pos );

    this.count = 0;
    this.total =  variable1;
//this.variable2 =  variable2;
};

GTA.MC.MISSION_COUNTER.prototype = new GTA.MissionCommand();
GTA.MC.MISSION_COUNTER.constructor = GTA.MC.MISSION_COUNTER;



GTA.MC.MISSION_TOTAL = function ( pos, variable1, variable2 ) {
    this.command = "MISSION_TOTAL";
    //this.setPositionBlock( pos );

    this.count = 0;
    this.total =  variable1;
//this.variable2 =  variable2;
};

GTA.MC.MISSION_TOTAL.prototype = new GTA.MissionCommand();
GTA.MC.MISSION_TOTAL.constructor = GTA.MC.MISSION_TOTAL;





GTA.MC.SECRET_MISSION_COUNTER = function ( pos, variable1, variable2 ) {
    this.command = "SECRET_MISSION_COUNTER";
    //this.setPositionBlock( pos );

    this.count = 0;
    this.total =  variable1;
//this.variable2 =  variable2;
};

GTA.MC.SECRET_MISSION_COUNTER.prototype = new GTA.MissionCommand();
GTA.MC.SECRET_MISSION_COUNTER.constructor = GTA.MC.SECRET_MISSION_COUNTER;



GTA.MC.MPHONES = function ( pos, variable1, variable2 ) {
    this.command = "MPHONES";
    //this.setPositionBlock( pos );

    this.phone =  variable1;
    this.radius =  variable2;
};

GTA.MC.MPHONES.prototype = new GTA.MissionCommand();
GTA.MC.MPHONES.constructor = GTA.MC.MPHONES;



GTA.MC.PHONE_TOGG = function ( pos, variable1, variable2 ) {
    this.command = "PHONE_TOGG";
    this.setPositionBlock( pos );

    this.mphoneLine =  variable1;
    this.range =  variable2;
};

GTA.MC.PHONE_TOGG.prototype = new GTA.MissionCommand();
GTA.MC.PHONE_TOGG.constructor = GTA.MC.PHONE_TOGG;



GTA.MC.OBJECT = function ( pos, variable1, variable2 ) {
    this.command = "OBJECT";
    this.setPositionBlock( pos );


    this.type =  variable1;
    this.angle =  this.setAngle( variable2 );
};

GTA.MC.OBJECT.prototype = new GTA.MissionCommand();
GTA.MC.OBJECT.constructor = GTA.MC.OBJECT;


GTA.MC.CRANE = function ( pos, variable1, variable2 ) {
    this.command = "CRANE";
    this.setPositionPixels( pos );

    this.variable1 =  variable1;
    this.variable2 =  variable2;
};

GTA.MC.CRANE.prototype = new GTA.MissionCommand();
GTA.MC.CRANE.constructor = GTA.MC.CRANE;



GTA.MC.BARRIER = function ( pos, variable1, variable2, variable3 ) {
this.command = "BARRIER";
this.setPositionBlock( pos );

this.face =  variable1;
this.numFrames =  variable2;
this.interiorType =  variable3;
};

GTA.MC.BARRIER.prototype = new GTA.MissionCommand();
GTA.MC.BARRIER.constructor = GTA.MC.BARRIER;


GTA.MC.BLOCK_INFO = function ( pos, variable1, variable2 ) {
this.command = "BLOCK_INFO";
this.setPositionBlock( pos );
/*
For CHANGE_BLOCK, <info1> is the new value for the block., and <info2> is 0.
For CHANGE_FACE, <info1> is the face to change & <info2> is the new face value.
 */
this.info1 =  variable1;
this.info2 =  variable2;
};

GTA.MC.BLOCK_INFO.prototype = new GTA.MissionCommand();
GTA.MC.BLOCK_INFO.constructor = GTA.MC.BLOCK_INFO;



GTA.MC.BOMBSHOP_COST = function ( pos, variable1, variable2 ) {
this.command = "BOMBSHOP_COST";
//this.setPositionBlock( pos );

this.cost =  variable1;
//this.variable2 =  variable2;
};

GTA.MC.BOMBSHOP_COST.prototype = new GTA.MissionCommand();
GTA.MC.BOMBSHOP_COST.constructor = GTA.MC.BOMBSHOP_COST;







GTA.MC.MIDPOINT_MULTI = function ( pos, variable1, variable2 ) {
this.command = "MIDPOINT_MULTI";
this.setPositionBlock( pos );

this.nextCheckpoint =  variable1;
//this.variable2 =  variable2;
};

GTA.MC.MIDPOINT_MULTI.prototype = new GTA.MissionCommand();
GTA.MC.MIDPOINT_MULTI.constructor = GTA.MC.MIDPOINT_MULTI;



GTA.MC.FINAL_MULTI = function ( pos, variable1, variable2 ) {
this.command = "FINAL_MULTI";
this.setPositionBlock( pos );

//this.variable1 =  variable1;
//this.variable2 =  variable2;
};

GTA.MC.FINAL_MULTI.prototype = new GTA.MissionCommand();
GTA.MC.FINAL_MULTI.constructor = GTA.MC.FINAL_MULTI;



GTA.MC.MID_MULTI_SETUP = function ( pos, variable1, variable2 ) {
this.command = "MID_MULTI_SETUP";
this.setPositionBlock( pos );

this.firstCheckPoint =  variable1;
//this.variable2 =  variable2;
};

GTA.MC.MID_MULTI_SETUP.prototype = new GTA.MissionCommand();
GTA.MC.MID_MULTI_SETUP.constructor = GTA.MC.MID_MULTI_SETUP;


GTA.MC.CANNON_START = function ( pos, variable1, variable2 ) {
this.command = "CANNON_START";
this.setPositionBlock( pos );

//this.variable1 =  variable1;
//this.variable2 =  variable2;
};

GTA.MC.CANNON_START.prototype = new GTA.MissionCommand();
GTA.MC.CANNON_START.constructor = GTA.MC.CANNON_START;




GTA.MC.CORRECT_CAR_TRIG = function ( pos, variable1, variable2, variable3 ) {
this.command = "CORRECT_CAR_TRIG";
this.setPositionBlock( pos );

this.line =  variable1;
this.radius =  variable2;
this.car =  variable3;
};

GTA.MC.CORRECT_CAR_TRIG.prototype = new GTA.MissionCommand();
GTA.MC.CORRECT_CAR_TRIG.constructor = GTA.MC.CORRECT_CAR_TRIG;




GTA.MC.SPECIFIC_DOOR = function ( pos, variable1, variable2, variable3, variable4 ) {
this.command = "SPECIFIC_DOOR";
this.setPositionBlock( pos );

this.face =  variable1;
this.type =  variable2;
this.interior = variable3;
this.carLineNum = variable4;
};

GTA.MC.SPECIFIC_DOOR.prototype = new GTA.MissionCommand();
GTA.MC.SPECIFIC_DOOR.constructor = GTA.MC.SPECIFIC_DOOR;




GTA.MC.PED = function ( pos, variable1, variable2, variable3, variable4 ) {
this.command = "PED";
this.setPositionPixels( pos );

this.type =  variable1;
this.angle =  this.setAngle( variable2 );
this.remap =  variable3;
this.enemy =  variable4;

};

GTA.MC.PED.prototype = new GTA.MissionCommand();
GTA.MC.PED.constructor = GTA.MC.PED;


GTA.MC.MOVING_TRIG_HIRED = function ( pos, variable1, variable2, variable3 ) {
this.command = "MOVING_TRIG_HIRED";
//this.setPositionBlock( pos );

this.car =  variable1; // ???? is it car????
this.radius =  variable2;
this.huntType =  variable3;

};

GTA.MC.MOVING_TRIG_HIRED.prototype = new GTA.MissionCommand();
GTA.MC.MOVING_TRIG_HIRED.constructor = GTA.MC.MOVING_TRIG_HIRED;




GTA.MC.CARWAIT_TRIG = function ( pos, variable1, variable2 ) {
this.command = "CARWAIT_TRIG";
this.setPositionBlock( pos );

this.line = variable1;
this.car = variable2;
};

GTA.MC.CARWAIT_TRIG.prototype = new GTA.MissionCommand();
GTA.MC.CARWAIT_TRIG.constructor = GTA.MC.CARWAIT_TRIG;




GTA.MC.GUN_SCREEN_TRIG = function ( pos, variable1, variable2 ) {
this.command = "GUN_SCREEN_TRIG";
//this.setPositionBlock( pos );

this.line =  variable1;
this.ped =  variable2;
};

GTA.MC.GUN_SCREEN_TRIG.prototype = new GTA.MissionCommand();
GTA.MC.GUN_SCREEN_TRIG.constructor = GTA.MC.GUN_SCREEN_TRIG;




GTA.MC.CARDESTROY_TRIG = function ( pos, variable1, variable2, variable3 ) {
this.command = "CARDESTROY_TRIG";
this.setPositionBlock( pos );

this.line =  variable1;
this.range =  variable2;
this.car = variable3;

};

GTA.MC.CARDESTROY_TRIG.prototype = new GTA.MissionCommand();
GTA.MC.CARDESTROY_TRIG.constructor = GTA.MC.CARDESTROY_TRIG;





GTA.MC.MOVING_TRIG = function ( pos, variable1, variable2, variable3 ) {
this.command = "MOVING_TRIG";
//this.setPositionBlock( pos );

this.carLineNum =  variable1;
this.radius =  variable2;
this.huntType =  variable3;
};

GTA.MC.MOVING_TRIG.prototype = new GTA.MissionCommand();
GTA.MC.MOVING_TRIG.constructor = GTA.MC.MOVING_TRIG;





GTA.MC.PARKED_PIXELS = function ( pos, variable1, variable2 ) {
this.command = "PARKED_PIXELS";
this.setPositionPixels( pos );

this.model =  variable1;
this.angle =  this.setAngle( variable2 );
};

GTA.MC.PARKED_PIXELS.prototype = new GTA.MissionCommand();
GTA.MC.PARKED_PIXELS.constructor = GTA.MC.PARKED_PIXELS;





GTA.MC.CARBOMB_TRIG = function ( pos, variable1, variable2 ) {
this.command = "CARBOMB_TRIG";
//this.setPositionBlock( pos );

this.car =  variable1;
this.line =  variable2;
};

GTA.MC.CARBOMB_TRIG.prototype = new GTA.MissionCommand();
GTA.MC.CARBOMB_TRIG.constructor = GTA.MC.CARBOMB_TRIG;





GTA.MC.CARSTUCK_TRIG = function ( pos, variable1, variable2 ) {
this.command = "CARSTUCK_TRIG";
this.setPositionBlock( pos );

// unknown command..........

this.variable1 =  variable1;
this.variable2 =  variable2;
};

GTA.MC.CARSTUCK_TRIG.prototype = new GTA.MissionCommand();
GTA.MC.CARSTUCK_TRIG.constructor = GTA.MC.CARSTUCK_TRIG;




GTA.MC.CHOPPER_ENDPOINT = function ( pos, variable1, variable2 ) {
this.command = "CHOPPER_ENDPOINT";
this.setPositionPixels( pos );

//this.variable1 =  variable1;
//this.variable2 =  variable2;
};

GTA.MC.CHOPPER_ENDPOINT.prototype = new GTA.MissionCommand();
GTA.MC.CHOPPER_ENDPOINT.constructor = GTA.MC.CHOPPER_ENDPOINT;




GTA.MC.DUM_PED_BLOCK_TRIG = function ( pos, variable1, variable2, variable3 ) {
this.command = "DUM_PED_BLOCK_TRIG";
this.setPositionBlock( pos );

this.line =  variable1;
this.radius =  variable2;
this.dummyPed = variable3;

};

GTA.MC.DUM_PED_BLOCK_TRIG.prototype = new GTA.MissionCommand();
GTA.MC.DUM_PED_BLOCK_TRIG.constructor = GTA.MC.DUM_PED_BLOCK_TRIG;





GTA.MC.PEDCAR_TRIG = function ( pos, variable1, variable2, variable3 ) {
this.command = "PEDCAR_TRIG";
//this.setPositionBlock( pos );

this.line =  variable1;
this.ped =  variable2;
this.car =  variable3;
};

GTA.MC.PEDCAR_TRIG.prototype = new GTA.MissionCommand();
GTA.MC.PEDCAR_TRIG.constructor = GTA.MC.PEDCAR_TRIG;




GTA.MC.CORRECT_MOD_TRIG = function ( pos, variable1, variable2, variable3 ) {
this.command = "CORRECT_MOD_TRIG";
this.setPositionBlock( pos );

this.line =  variable1;
this.radius =  variable2;
this.model =  variable3;
};

GTA.MC.CORRECT_MOD_TRIG.prototype = new GTA.MissionCommand();
GTA.MC.CORRECT_MOD_TRIG.constructor = GTA.MC.CORRECT_MOD_TRIG;




GTA.MC.BASIC_BARRIER = function ( pos, variable1, variable2, variable3 ) {
this.command = "BASIC_BARRIER";
this.setPositionBlock( pos );

this.face =  variable1;
this.numFrames =  variable2;
this.type =  variable3;
};

GTA.MC.BASIC_BARRIER.prototype = new GTA.MissionCommand();
GTA.MC.BASIC_BARRIER.constructor = GTA.MC.BASIC_BARRIER;





GTA.MC.DAMAGE_TRIG = function ( pos, variable1, variable2 ) {
this.command = "DAMAGE_TRIG";
this.setPositionBlock( pos );

this.line =  variable1;
this.range =  variable2;
};

GTA.MC.DAMAGE_TRIG.prototype = new GTA.MissionCommand();
GTA.MC.DAMAGE_TRIG.constructor = GTA.MC.DAMAGE_TRIG;





GTA.MC.SPECIFIC_BARR = function ( pos, variable1, variable2, variable3, variable4, variable5 ) {
this.command = "SPECIFIC_BARR";
this.setPositionBlock( pos );

this.face =  variable1;
this.type =  variable2;
this.numFrames =  variable3;
this.carNum =  variable4;
this.remap =  variable5;

};

GTA.MC.SPECIFIC_BARR.prototype = new GTA.MissionCommand();
GTA.MC.SPECIFIC_BARR.constructor = GTA.MC.SPECIFIC_BARR;




GTA.MC.MODEL_BARRIER = function ( pos, variable1, variable2, variable3, variable4 ) {
this.command = "MODEL_BARRIER";
this.setPositionBlock( pos );

this.face =  variable1;
this.type =  variable2;
this.numFrames =  variable3;
this.carType =  variable4;
};

GTA.MC.MODEL_BARRIER.prototype = new GTA.MissionCommand();
GTA.MC.MODEL_BARRIER.constructor = GTA.MC.MODEL_BARRIER;




GTA.MC.ALT_DAMAGE_TRIG = function ( pos, variable1, variable2 ) {
this.command = "ALT_DAMAGE_TRIG";
this.setPositionBlock( pos );

// same as damage_trig?

this.line =  variable1;
this.range =  variable2;
};

GTA.MC.ALT_DAMAGE_TRIG.prototype = new GTA.MissionCommand();
GTA.MC.ALT_DAMAGE_TRIG.constructor = GTA.MC.ALT_DAMAGE_TRIG;

