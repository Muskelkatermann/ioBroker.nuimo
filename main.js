/**
 *
 * template adapter
 *
 *
 *  file io-package.json comments:
 *
 *  {
 *      "common": {
 *          "name":         "nuimo",                  // name has to be set and has to be equal to adapters folder name and main file name excluding extension
 *          "version":      "0.0.0",                    // use "Semantic Versioning"! see http://semver.org/
 *          "title":        "Node.js template Adapter",  // Adapter title shown in User Interfaces
 *          "authors":  [                               // Array of authord
 *              "name <mail@template.com>"
 *          ]
 *          "desc":         "template adapter",          // Adapter description shown in User Interfaces. Can be a language object {de:"...",ru:"..."} or a string
 *          "platform":     "Javascript/Node.js",       // possible values "javascript", "javascript/Node.js" - more coming
 *          "mode":         "daemon",                   // possible values "daemon", "schedule", "subscribe"
 *          "schedule":     "0 0 * * *"                 // cron-style schedule. Only needed if mode=schedule
 *          "loglevel":     "info"                      // Adapters Log Level
 *      },
 *      "native": {                                     // the native object is available via adapter.config in your adapters code - use it for configuration
 *          "test1": true,
 *          "test2": 42
 *      }
 *  }
 *
 */

/* jshint -W097 */// jshint strict:false
/*jslint node: true */
"use strict";

var value = 0;

let Nuimo = require("./node_modules/nuimojs/nuimo.js"),
    nuimo = new Nuimo();
	
	
var theDevice;
var internalRotationBegan = false;
var internalRotationAbsolute = 0;
var internalRotationFactor = 0;
var internalDotMatrixBrightness= 255;
var internalDotMatrixDuration= 1000;
var internalDotMatrixFading= true;


var timeoutHandle;


var blank = [
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
        ];
		
		var number_0 = [
            0, 0, 0, 0,
            1, 1, 1, 1,
            1, 0, 0, 1,
            1, 0, 0, 1,
            1, 0, 0, 1,
            1, 0, 0, 1,
            1, 0, 0, 1,
            1, 1, 1, 1,
            0, 0, 0, 0,
        ];
		
		var number_1 = [
            0, 0, 0, 0,
            0, 0, 1, 0,
            0, 0, 1, 0,
            0, 0, 1, 0,
            0, 0, 1, 0,
            0, 0, 1, 0,
            0, 0, 1, 0,
            0, 0, 1, 0,
            0, 0, 0, 0,
        ];
		
		var number_2 = [
            0, 0, 0, 0,
            1, 1, 1, 1,
            0, 0, 0, 1,
            0, 0, 0, 1,
            1, 1, 1, 1,
            1, 0, 0, 0,
            1, 0, 0, 0,
            1, 1, 1, 1,
            0, 0, 0, 0,
        ];
		
		var number_3 = [
            0, 0, 0, 0,
            1, 1, 1, 1,
            0, 0, 0, 1,
            0, 0, 0, 1,
            1, 1, 1, 1,
            0, 0, 0, 1,
            0, 0, 0, 1,
            1, 1, 1, 1,
            0, 0, 0, 0,
        ];
		
		var number_4 = [
            0, 0, 0, 0,
            1, 0, 0, 1,
            1, 0, 0, 1,
            1, 0, 0, 1,
            1, 1, 1, 1,
            0, 0, 0, 1,
            0, 0, 0, 1,
            0, 0, 0, 1,
            0, 0, 0, 0,
        ];
		
		var number_5 = [
            0, 0, 0, 0,
            1, 1, 1, 1,
            1, 0, 0, 0,
            1, 0, 0, 0,
            1, 1, 1, 1,
            0, 0, 0, 1,
            0, 0, 0, 1,
            1, 1, 1, 1,
            0, 0, 0, 0,
        ];
		
		var number_6 = [
            0, 0, 0, 0,
            1, 1, 1, 1,
            1, 0, 0, 0,
            1, 0, 0, 0,
            1, 1, 1, 1,
            1, 0, 0, 1,
            1, 0, 0, 1,
            1, 1, 1, 1,
            0, 0, 0, 0,
        ];
		
		var number_7 = [
            0, 0, 0, 0,
            1, 1, 1, 1,
            0, 0, 0, 1,
            0, 0, 0, 1,
            0, 0, 0, 1,
            0, 0, 0, 1,
            0, 0, 0, 1,
            0, 0, 0, 1,
            0, 0, 0, 0,
        ];
		
		var number_8 = [
            0, 0, 0, 0,
            1, 1, 1, 1,
            1, 0, 0, 1,
            1, 0, 0, 1,
            1, 1, 1, 1,
            1, 0, 0, 1,
            1, 0, 0, 1,
            1, 1, 1, 1,
            0, 0, 0, 0,
        ];
		
		var number_9 = [
            0, 0, 0, 0,
            1, 1, 1, 1,
            1, 0, 0, 1,
            1, 0, 0, 1,
            1, 1, 1, 1,
            0, 0, 0, 1,
            0, 0, 0, 1,
            0, 0, 0, 1,
            0, 0, 0, 0,
        ];
		
		var numbers = [number_0,
					number_1,
					number_2,
					number_3,
					number_4,
					number_5,
					number_6,
					number_7,
					number_8,
					number_9]
		
		function setMatrixNumeric(digit1, digit2)
		{
			var matrix = [
					0,0
				];
				
			for( var i = 0; i < 82; i++)
			{
				matrix[i] = 0;
			}
			var count = 0;
			for( var i = 0; i < 10; i++)
			{
				for( var j = 0; j < 4; j++)
				{
					
					matrix[(9*i)+j] = digit1[count];
					count++;
				}
			}
			count = 0;
			for( var i = 0; i < 10; i++)
			{
				for( var j = 5; j < 9; j++)
				{
					
					matrix[(9*i)+j] = digit2[count];
					count++;
				}
			}
			return matrix;
		}
		
	
// you have to require the utils module and call adapter function
var utils =    require(__dirname + '/lib/utils'); // Get common adapter utils

// you have to call the adapter function and pass a options object
// name has to be set and has to be equal to adapters folder name and main file name excluding extension
// adapter will be restarted automatically every time as the configuration changed, e.g system.adapter.template.0
var adapter = utils.adapter('nuimo');

// is called when adapter shuts down - callback has to be called under any circumstances!
adapter.on('unload', function (callback) {
    try {
        adapter.log.info('cleaned everything up...');
        callback();
    } catch (e) {
        callback();
    }
});

// is called if a subscribed object changes
adapter.on('objectChange', function (id, obj) {
    // Warning, obj can be null if it was deleted
    adapter.log.info('objectChange ' + id + ' ' + JSON.stringify(obj));
});

// is called if a subscribed state changes
adapter.on('stateChange', function (id, state) {
    // Warning, state can be null if it was deleted
    adapter.log.info('stateChange ' + id + ' ' + JSON.stringify(state));

    // you can use the ack flag to detect if it is status (true) or command (false)
    if (state && !state.ack) {
        adapter.log.info('ack is not set!');
    }
	
	var tmp = id.split('.');
    var dp = tmp.pop();
	adapter.log.info("DP: " + dp);
	if(dp == "dotMatrix")
	{
		//getMatrixFromString(state.val);
		theDevice.setLEDMatrix(getMatrixFromString(state.val), internalDotMatrixBrightness, internalDotMatrixDuration, internalDotMatrixFading);
	}else
	if(dp == "dotMatrixNumber")
	{
		var theValue = Math.round(state.val);
		if(theValue>9)
		{
			theDevice.setLEDMatrix(setMatrixNumeric(numbers[String(theValue).charAt(0)],numbers[String(theValue).charAt(1)]), internalDotMatrixBrightness, internalDotMatrixDuration, internalDotMatrixFading);
		}else
		{
			theDevice.setLEDMatrix(setMatrixNumeric(numbers[0],numbers[String(theValue).charAt(0)]), internalDotMatrixBrightness, internalDotMatrixDuration, internalDotMatrixFading);
		}
	}else
	if(dp == "rotationFactor")
	{
		internalRotationFactor = state.val;
	}else
	if(dp == "rotationAbsolute")
	{
		internalRotationAbsolute = state.val;
	}else
	if(dp == "dotMatrixBrightness")
	{
		internalDotMatrixBrightness = state.val;
	}else
	if(dp == "dotMatrixDuration")
	{
		internalDotMatrixDuration = state.val;
	}else
	if(dp == "dotMatrixFading")
	{
		internalDotMatrixFading = state.val;
	}
	
	
	
	
});

// Some message was sent to adapter instance over message box. Used by email, pushover, text2speech, ...
adapter.on('message', function (obj) {
    if (typeof obj == 'object' && obj.message) {
        if (obj.command == 'send') {
            // e.g. send email or pushover or whatever
            console.log('send command');

            // Send response in callback if required
            if (obj.callback) adapter.sendTo(obj.from, obj.command, 'Message received', obj.callback);
        }
    }
});


function getMatrixFromString(str)
		{
			var matrix = [
					0,0
				];
				
			for( var i = 0; i < 82; i++)
			{
				matrix[i] = 0;
			}
			var count = 0;
			for( var i = 0; i < str.length; i++)
			{
				if(str.charAt(i)=="1")
				{
					matrix[i] = 1;
				}else
				{
					matrix[i] = 0;
				}
			}
			return matrix;
		}

// is called when databases are connected and adapter received configuration.
// start here!
adapter.on('ready', function () {
    main();
});

function main() {

    // The adapters config (in the instance object everything under the attribute "native") is accessible via
    // adapter.config:
    adapter.log.info('config test1: ' + adapter.config.test1);
    adapter.log.info('config test1: ' + adapter.config.test2);


    /**
     *
     *      For every state in the system there has to be also an object of type state
     *
     *      Here a simple template for a boolean variable named "testVariable"
     *
     *      Because every adapter instance uses its own unique namespace variable names can't collide with other adapters variables
     *
     */

   
    adapter.setObject('testVariable', {
        type: 'state',
        common: {
            name: 'testVariable',
            type: 'boolean',
            role: 'indicator'
        },
        native: {}
    });

    // in this template all states changes inside the adapters namespace are subscribed
    adapter.subscribeStates('*');


    /**
     *   setState examples
     *
     *   you will notice that each setState will cause the stateChange event to fire (because of above subscribeStates cmd)
     *
     */

    // the variable testVariable is set to true as command (ack=false)
    adapter.setState('testVariable', true);

    // same thing, but the value is flagged "ack"
    // ack should be always set to true if the value is received from or acknowledged from the target system
  //  adapter.setState('testVariable', {val: true, ack: true});

    // same thing, but the state is deleted after 30s (getState will return null afterwards)
    //adapter.setState('testVariable', {val: true, ack: true, expire: 30});



    // examples for the checkPassword/checkGroup functions
/*    adapter.checkPassword('admin', 'iobroker', function (res) {
        console.log('check user admin pw ioboker: ' + res);
    });

    adapter.checkGroup('admin', 'admin', function (res) {
        console.log('check group user admin group admin: ' + res);
    });

*/



nuimo.on("discover", (device) => {


    adapter.log.info(`Discovered Nuimo (${device.batteryLevel})`);
	
	
	adapter.setObject(device.uuid, {
        type: 'device',
        common: {
            name: 'uuid',
            type: 'string',
        },
        native: {}
    });
	
	adapter.setObject(device.uuid+'.batteryLevel', {
        type: 'state',
        common: {
            name: 'batteryLevel',
            type: 'number',
            role: 'indicator'
        },
        native: {}
    });
	
	adapter.setObject(device.uuid+'.pressed', {
        type: 'state',
        common: {
            name: 'pressed',
            type: 'boolean',
            role: 'indicator'
        },
        native: {}
    });
	
	adapter.setObject(device.uuid+'.released', {
        type: 'state',
        common: {
            name: 'released',
            type: 'boolean',
            role: 'indicator'
        },
        native: {}
    });
	
	adapter.setObject(device.uuid+'.rotationBegan', {
        type: 'state',
        common: {
            name: 'rotationBegan',
            type: 'boolean',
            role: 'indicator'
        },
        native: {}
    });
	adapter.setState(device.uuid+'.rotationBegan', {val: false, ack: true});
	
	adapter.setObject(device.uuid+'.rotationEnded', {
        type: 'state',
        common: {
            name: 'rotationEnded',
            type: 'boolean',
            role: 'indicator'
        },
        native: {}
    });
	adapter.setState(device.uuid+'.rotationEnded', {val: false, ack: true});
	
	adapter.setObject(device.uuid+'.rotationRelative', {
        type: 'state',
        common: {
            name: 'rotationRelative',
            type: 'number',
            role: 'indicator'
        },
        native: {}
    });
	
	adapter.setObject(device.uuid+'.rotationAbsolute', {
        type: 'state',
        common: {
            name: 'rotationAbsolute',
            type: 'number',
            role: 'indicator'
        },
        native: {}
    });
	
	adapter.setObject(device.uuid+'.rotationFactor', {
        type: 'state',
        common: {
            name: 'rotationFactor',
            type: 'number',
            role: 'indicator'
			
        },
        native: {}
    });
	
	adapter.getState(device.uuid+'.rotationFactor', function (err, state) {
		if(!state)
		{
			internalRotationFactor = 0.1;
			adapter.setState(device.uuid+'.rotationFactor',{val: 0.1, ack: true});
		}else
		{
	    	internalRotationFactor = state.val	
		}
	}); 
	
	adapter.setObject(device.uuid+'.swipeLeft', {
        type: 'state',
        common: {
            name: 'swipeLeft',
            type: 'boolean',
            role: 'indicator'
        },
        native: {}
    });
	
	adapter.setObject(device.uuid+'.swipeRight', {
        type: 'state',
        common: {
            name: 'swipeRight',
            type: 'boolean',
            role: 'indicator'
        },
        native: {}
    });
	
	adapter.setObject(device.uuid+'.swipeUp', {
        type: 'state',
        common: {
            name: 'swipeUp',
            type: 'boolean',
            role: 'indicator'
        },
        native: {}
    });
	
	adapter.setObject(device.uuid+'.swipeDown', {
        type: 'state',
        common: {
            name: 'swipeDown',
            type: 'boolean',
            role: 'indicator'
        },
        native: {}
    });
	
	adapter.setObject(device.uuid+'.flyLeft', {
        type: 'state',
        common: {
            name: 'flyLeft',
            type: 'boolean',
            role: 'indicator'
        },
        native: {}
    });
	
	adapter.setObject(device.uuid+'.flyRight', {
        type: 'state',
        common: {
            name: 'flyRight',
            type: 'boolean',
            role: 'indicator'
        },
        native: {}
    });
	
	adapter.setObject(device.uuid+'.handDetected', {
        type: 'state',
        common: {
            name: 'handDetect',
            type: 'boolean',
            role: 'indicator'
        },
        native: {}
    });
	
	adapter.setObject(device.uuid+'.handDistance', {
        type: 'state',
        common: {
            name: 'handDistance',
            type: 'boolean',
            role: 'indicator'
        },
        native: {}
    });
	
	adapter.setObject(device.uuid+'.dotMatrix', {
        type: 'state',
        common: {
            name: 'dotMatrix',
            type: 'string',
            role: 'indicator'
        },
        native: {}
    });
	
	adapter.setObject(device.uuid+'.dotMatrixNumber', {
        type: 'state',
        common: {
            name: 'dotMatrixNumber',
            type: 'number',
            role: 'indicator'
        },
        native: {}
    });
	
	
	adapter.setObject(device.uuid+'.dotMatrixBrightness', {
        type: 'state',
        common: {
            name: 'dotMatrixBrightness',
            type: 'number',
            role: 'indicator',
			def: '255',
			min: '0',
			max: '255'
        },
        native: {}
    });
	adapter.getState(device.uuid+'.dotMatrixBrightness', function (err, state) {
		if(!state)
		{
			internalDotMatrixBrightness= 255;
			adapter.setState(device.uuid+'.dotMatrixBrightness',{val: internalDotMatrixBrightness, ack: true});
		}else
		{
	    	internalDotMatrixBrightness = state.val	
		}
	});
	
	adapter.setObject(device.uuid+'.dotMatrixDuration', {
        type: 'state',
        common: {
            name: 'dotMatrixDuration',
            type: 'number',
            role: 'indicator',
			def: '1000'
        },
        native: {},
    });
	adapter.getState(device.uuid+'.dotMatrixDuration', function (err, state) {
		if(!state)
		{
			internalDotMatrixDuration= 1000;
			adapter.setState(device.uuid+'.dotMatrixDuration',{val: internalDotMatrixDuration, ack: true});
		}else
		{
	    	internalDotMatrixDuration = state.val	
		}
	}); 
	
	adapter.setObject(device.uuid+'.dotMatrixFading', {
        type: 'state',
        common: {
            name: 'dotMatrixFading',
            type: 'boolean',
            role: 'indicator'
        },
        native: {},
    });
	adapter.getState(device.uuid+'.dotMatrixFading', function (err, state) {
		if(!state)
		{
			internalDotMatrixFading= true;
			adapter.setState(device.uuid+'.dotMatrixFading',{val: internalDotMatrixFading, ack: true});
		}else
		{
	    	internalDotMatrixFading = state.val	
		}
	}); 







	 device.on("batteryLevelChange", (level) => {
        adapter.setState(device.uuid+'.batteryLevel', {val: level, ack: true});
    });

	
	


    device.on("connect", () => {
        adapter.log.info("Nuimo connected");
    });
	
	device.on("release", () => {
        adapter.log.info("Button released");
		adapter.setState(device.uuid+'.pressed', {val: false, ack: true});
		adapter.setState(device.uuid+'.released', {val: true, ack: true});
    });

    device.on("press", () => {
        adapter.log.info('Button pressed');
		
		adapter.setState(device.uuid+'.released', {val: false, ack: true});
		adapter.setState(device.uuid+'.pressed', {val: true, ack: true});
		
		
		 
    
		
		
		
		
     
    });
	
	device.on("swipe", (direction) => {
        switch (direction) {
            case (Nuimo.Direction.LEFT):
                adapter.setState(device.uuid+'.swipeLeft', {val: true, ack: true}); break;
            case (Nuimo.Direction.RIGHT):
                adapter.setState(device.uuid+'.swipeRight', {val: true, ack: true}); break;
            case (Nuimo.Direction.UP):
                adapter.setState(device.uuid+'.swipeUp', {val: true, ack: true}); break;
            case (Nuimo.Direction.DOWN):
                adapter.setState(device.uuid+'.swipeDown', {val: true, ack: true}); break;
        }
    });

    device.on("rotate", (amount) => {
        adapter.log.info(`Rotated by ${amount}`);
		
		
		
		
		
			
		var stateName = device.uuid+'.rotationBegan';
		if(!internalRotationBegan)
		{
			internalRotationBegan = true;
			adapter.setState(device.uuid+'.rotationBegan', {val: true, ack: true});
			adapter.setState(device.uuid+'.rotationEnded', {val: false, ack: true});
			
			
			internalRotationAbsolute = 0;
			adapter.setState(device.uuid+'.rotationAbsolute', {val: 0, ack: true});
			
		}
		
		adapter.setState(device.uuid+'.rotationRelative', {val: amount, ack: true});
		internalRotationAbsolute = internalRotationAbsolute + (amount*internalRotationFactor);
		adapter.setState(device.uuid+'.rotationAbsolute', {val: internalRotationAbsolute, ack: true});
		
		clearTimeout(timeoutHandle);
		timeoutHandle = setTimeout(function(){
			adapter.setState(device.uuid+'.rotationBegan', {val: false, ack: true});
			adapter.setState(device.uuid+'.rotationEnded', {val: true, ack: true});
			internalRotationBegan = false;
		},350);
		
		
		
		
		
			
    });

    device.on("fly", (direction, speed) => {
        switch (direction) {
            case (Nuimo.Direction.LEFT):
				adapter.setState(device.uuid+'.flyLeft', {val: true, ack: true}); break;
            case (Nuimo.Direction.RIGHT):
                adapter.setState(device.uuid+'.flyRight', {val: true, ack: true}); break;
        }
		
    });

    device.on("detect", (distance) => {
		adapter.setState(device.uuid+'.handDetected', {val: true, ack: true});
		adapter.setState(device.uuid+'.handDistance', {val: distance, ack: true});
    });
	

	theDevice = device;
    device.connect();
	

});

nuimo.scan();







}
