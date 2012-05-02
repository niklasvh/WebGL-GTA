/* 
* @author Niklas von Hertzen <niklas at hertzen.com>
* @created 3.1.2012 
* @website http://hertzen.com
 */


GTA.Missions = function () {
    this.commands = {};
    this.actions = [];
    
};





GTA.parseINI = function ( data ) {
    
    // fix formatting issues
    
    data = data.replace("-1[","-1\n[");
    data = data.replace(/, /g,",");
    data = data.replace(/1\(/g,"1 (");
    data = data.replace(/\t/g, ' ');
    
    
    // remove blank lines     
    data = data.replace(/(^[\r\n]*|[\r\n]+)[\s\t]*[\r\n]+/g, "\n").trim();
    
    var commands = data.split("\n"),
    mapStartRE = /^\[(\d*)\]$/,
    matched,
    info,
    i,
    fields,
    typeField,
    command,
    commandInfo,
    numCommands = commands.length,
    defining = "objects",
    currentMap = null,
    c;
    
    for ( i = 0; i < numCommands; i += 1 ) {
        
        c = commands [ i ].trim();
        
        if ( currentMap === null ) {
          
            matched = c.match( mapStartRE );
            
            if ( matched === null ) {
                
                if (c.charCodeAt(0) === 26) {
                    //EOF
                    break;
                }
                
                GTA.Log( c )
                
                GTA.Error( "No map defined in MISSION.INI (compressed line " + i + ")" );
            } 
            defining = "objects";  
            matched[1] = matched[1];
            this.missions[ matched[1] ] = new GTA.Missions(); 
            currentMap = this.missions[ matched[1] ];
            //console.log(currentMap);
            i+=1;
            
            info = commands [ i ].split(",");
            
            currentMap.name = info[0].trim();
            currentMap.something = info[1].trim();
            currentMap.cmp = info[2].trim().toUpperCase();
            currentMap.something2 = info[4].trim();
            
            i+=1; // some other stuff?????
            continue;
        }
        /*
        if ( c === "-1" ) {
            // end map
            currentMap = null;
            continue;
        }*/
        
        if (c !== "-1") {
           
            if (defining === "objects") {
                fields = c.split(" ");
           
                if ( fields[1] === "1") {
                    commandInfo = fields.slice(2);
                    typeField = 2;
                }else {
                    commandInfo = fields.slice(1);
                    typeField = 3;
                }
                
           
                if (GTA.MC[ commandInfo[ 1 ] ] === undefined) {
                    GTA.Log("Unknown mission command " +  commandInfo[ 1 ].toUpperCase() );
                    command = new GTA.MissionCommand();
                } else {
                    if (typeField === 2) {
                        command = new GTA.MC[ commandInfo[ 1 ].toUpperCase() ](  commandInfo[0], commandInfo[2], commandInfo[3] );
                    } else {
                        command = new GTA.MC[ commandInfo[ 1 ].toUpperCase() ](  commandInfo[0], commandInfo[2], commandInfo[3], commandInfo[4] );
                    }
                
                }
 
                currentMap.commands [ fields[ 0 ] ] = command;
             
             
            } else if ( defining === "actions" ) {
                
                fields = c.split(" ");
                
                if (GTA.AC[ fields[ 1 ] ] === undefined) {
                   // GTA.Log("Unknown mission action " +  fields[ 1 ] );
                    
                    command = new GTA.MissionAction();
                  //   throw new Exception("aaa");
                } else {
                 
                        command = new GTA.AC[ fields[ 1 ] ]( fields[2], fields[3], fields[4], fields[5], fields[6] );    
                
                }
 
                currentMap.actions [ fields[ 0 ] ] = command;
              
            }
             
        } else {
            if (defining === "actions") {
                // map complete
                currentMap = null;
                continue;
            }
            defining = "actions";
            continue;
        }
        
       
        
    }
    
    

    
    
};

