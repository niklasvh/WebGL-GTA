/* 
* @author Niklas von Hertzen <niklas at hertzen.com>
* @created 9.1.2012 
* @website http://hertzen.com
 */



GTA.Sound = function ( buffer, start, len, sampleRate ) {
    this.start = start;
    this.byteLength = len;
    this.sampleRate = sampleRate;
    
    
    var headerLength = 4 + 4 + 4 + 4 + 4 + 2 + 2 + 4 + 4 + 2 + 2 + 4 + 4;
    
    
    var totalLen = 44 + len;
    
    var wavBuffer = new ArrayBuffer( totalLen ),
    rawData = new DataView( buffer ),
    data = new DataView( wavBuffer, true );
    
    /*
     
      ChunkID: array[0..3] of char;     // 'RIFF' text
  ChunkSize: Longword;
  Format: array[0..3] of char;      // 'WAVE' text
  Subchunk1ID: array[0..3] of char; // 'fmt ' text
  Subchunk1Size: Longword;
  AudioFormat: Word;
  NumChannels: Word;
  SampleRate: Longword;
  ByteRate: Longword;
  BlockAlign: Word;
  BitsPerSample: Word;
  Subchunk2ID: array[0..3] of char; // 'data' text
  Subchunk2Size: Longword;
     
     */
    
    // http://forums.gtazz.com/topic/4054/
    
    // ChunkID
    data.setUint8(0, 82, false); // R
    data.setUint8(1, 73, false); // I
    data.setUint8(2, 70, false); // F
    data.setUint8(3, 70, false); // F
    
    // ChunkSize
    data.setUint32(4, 49188, true );
    
    // Format
    data.setUint8(8, 87, true); // W
    data.setUint8(9, 65, true); // A
    data.setUint8(10, 86, true); // V
    data.setUint8(11, 69, true); // E
    
    // Subchunk1ID
    data.setUint8(12, 102, true); // f
    data.setUint8(13, 109, true); // m
    data.setUint8(14, 116, true); // t
    data.setUint8(15, 32, true); // " "   
    
    // Subchunk1Size
    data.setUint32(16, 16, true );
    
    // AudioFormat
    data.setUint16(20, 1, true); 
    
    // NumChannels
    data.setUint16(22, 1, true); 
    
    // SampleRate
    data.setUint32(24, sampleRate, true ); 
   
    // ByteRate
    data.setUint32(28, sampleRate, true ); 
   
    // BlockAlign
    data.setUint16(32, 1, true); 
   
    // Bits Per sample
    data.setUint16(34, 8, true); 
   
    // Subchunk2ID
    data.setUint8(36, 100, true); // d
    data.setUint8(37, 97, true); // a
    data.setUint8(38, 116, true); // t
    data.setUint8(39, 97, true); //  a   
    
    //Subchunk2Size
    data.setUint32(40, len, true );
    
    var i,
    forLen = start + len - 1,
    readbyte,
    pos = 44;
   
   
    /*
    for (i = start; i < forLen; i += 1) {
       
        readbyte = rawData.getUint8(i, true);
        
        data.setUint8(pos, readbyte, true);
        pos += 1;
        
    }
    
     
     */
     
     
    var bb = new BlobBuilder(); // Note: window.WebKitBlobBuilder in Chrome 12.
    bb.append(data.buffer);
    console.log(window.URL.createObjectURL(bb.getBlob()));
    //console.log(data.getUint8(60));
     
    var context = new webkitAudioContext();




    context.decodeAudioData(data.buffer, function(buffer) {
      
    }, function(){
        console.log("error"); 
    });
     
     

};


