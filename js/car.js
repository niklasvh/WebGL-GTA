/* 
 * @author Niklas von Hertzen <niklas at hertzen.com>
 * @created 1.1.2012 
 * @website http://hertzen.com
 */



GTA.Car = function ( ) {
    
    this.remap = [];
    this.price = []; // array[4] of vehicle price in different cranes, in thousands of $
    
    this.doors = [];
    
};


GTA.Car.prototype.loadData = function ( data ) {
    
    
    var i,
    doors;
 
    
    this.width = data.getInt16();
    this.height  = data.getInt16();
    this.depth = data.getInt16();
    
    
    this.sprite = data.getInt16();
    
    //this.abc = this.sprite;
    
    this.weight = data.getInt16(); 
    
    this.maxSpeed = data.getInt16();
    this.minSpeed = data.getInt16();
    
    this.acceleration = data.getInt16();
    this.braking = data.getInt16();
    
    this.grip = data.getInt16();
    this.handling = data.getInt16();
    
    
    for (i = 0; i < 12; i+=1) {
        this.remap[ i ] = new GTA.Remap();
        this.remap[ i ].loadData( data );
    }
    
    data.skip( 12 ); // 8 bit remaps... #care
    
    this.type = data.getUint8();
    this.model = data.getUint8();
    
    this.turning = data.getUint8();
    this.damagable = data.getUint8();
    
    for (i = 0; i < 4; i += 1) {
        this.price[ i ] = data.getUint16();
    }
    
    
    this.cx = data.getUint8();
    this.cy = data.getUint8();  // documented as Int, but seems to be Uint?
    
   
    
    this.moment = data.getUint32();
    
    //this.mass =  data.getUint8();
    // this.mass =  data.getUint16();
    
    this.mass = data.getFloat32();
    this.thrust = data.getFloat32();
    
    this.tyreAdhesionX = data.getFloat32();
    this.tyreAdhesionY = data.getFloat32();
    
    this.handbrakeFriction = data.getFloat32();
    this.footbrakeFriction  = data.getFloat32();
    this.frontbrakeBias = data.getFloat32();
    
    this.turnRatio = data.getInt16();
    
    this.driveWheelOffset = data.getInt16();
    this.steeringWheelOffset = data.getInt16();
    
    this.backEndSlideValue  = data.getFloat32();
    this.handbrakeSlideValue = data.getFloat32();
    
    
    this.convertible = data.getUint8();
    this.engine = data.getUint8();
    this.radio = data.getUint8();
    this.horn = data.getUint8();
    this.soundFunction = data.getUint8();
    this.fastChangeFlag = data.getUint8();
    

    doors  = data.getInt16();
    
    for (i = 0; i < doors; i += 1) {
        this.doors[ i ] = new GTA.CarDoors();
        this.doors[ i ].loadData( data );
    }

    
    
};

GTA.CarDoors = function() {
    
    };

GTA.CarDoors.prototype.loadData = function ( data ) {
    this.rpx = data.getInt16();
    this.rpy = data.getInt16();
    
    this.gameObject = data.getInt16();
    
    this.delta = data.getInt16();
    
};

GTA.Remap = function () {
    
    };

GTA.Remap.prototype.loadData = function ( data ) {
    this.h = data.getInt16(); // hue
    this.l = data.getInt16(); // lightness
    this.s = data.getInt16(); // saturation
};
