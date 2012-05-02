/* 
 * @author Niklas von Hertzen <niklas at hertzen.com>
 * @created 30.12.2011 
 * @website http://hertzen.com
 */


function DataViewReader( data, littleEndian ) {
    
    var pos = 0,
    bitOffset = 0,
    bitBuffer = 0,
    dv = (data instanceof DataView) ? data : new DataView(data),
    methods = {
        skip: function ( by ) {
            pos += by;   
        },
        seek: function ( to ) {
            pos = to;  
        },
        getInt8: function( offset ) {    
            var r = dv.getInt8( offset || pos, littleEndian);
            pos = (offset || pos) + 1;
            return r;
        },
        getInt16: function( offset ) {
            var r = dv.getInt16( offset || pos, littleEndian);
            pos = (offset || pos) + 2;
            return r;
        },
        getInt32: function ( offset ) {
            var r = dv.getInt32( offset || pos, littleEndian);
            pos = (offset || pos) + 4;
            return r;
        },
        getUint8: function( offset ) {
            var r = dv.getUint8( offset || pos, littleEndian);
            pos = (offset || pos) + 1;
            return r;
        },
        getUint16: function( offset ) {
            var r = dv.getUint16( offset || pos, littleEndian);
            pos = (offset || pos) + 2;
            return r;
        },
        getUint32: function ( offset ) {
            var r = dv.getUint32( offset || pos, littleEndian);
            pos = (offset || pos) + 4;
            return r;
        },
        getFloat32: function ( offset ) {
            
            /*
             Note that all of the float quantities in the car data are stored in the file as 32-bit fixed point values 
            ( with 16 bits after the point ). This is to aid Playstation compatibility. 
            They are converted to float when they are loaded into the game. 
             */
            
            var r = dv.getFloat32( offset || pos, littleEndian);
            pos = (offset || pos) + 4;
            return r;
        },
        getPos: function() {
            return pos;  
        },
        getData: function() {
            return dv;  
        },
        isBitSet: function ( bit, value) {
            //  return (( num>>bit ) % 2 != 0)
            return (value & (1 << bit)) != 0;
        },
        
        getString: function (length, byteOffset) {
            
            if (byteOffset === undefined) {
                byteOffset = pos;      
            }
            
         
            var value,
            int8array = new Int8Array(data, byteOffset, length),
            stringarray = [],
            i;
            
            for (i = 0; i < length; ++i) {
                stringarray[i] = int8array[i];
            }
            
            value = String.fromCharCode.apply(null, stringarray);
            

            pos = byteOffset + length;
            return value;
        },
        
        readBits: function(bitBuffer, bits) {
            var val = 0,
            lsb = false;
        
            for(var i = 0; i < bits; i+=1){

            
                if(lsb){
                    val |= (bitBuffer & (0x01 << bitOffset++) ? 1 : 0) << i;
                }
                else{
                    val = (val << 1) | (bitBuffer & (0x80 >> bitOffset++) ? 1 : 0);
                }
            }
        
        
            return val;
        }
        
    };
    
    return methods;
    
}