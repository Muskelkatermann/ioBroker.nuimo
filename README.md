![Logo](admin/nuimo.png)
# ioBroker.nuimo
=================

This adapter connects to a Senic Nuimo.

It uses the Noble BLE library by Sandeep Mistry. On macOS everything should function out of the box.]On Linux and Windows there are certain dependencies which may need installed first:
https://github.com/sandeepmistry/noble#prerequisites


##JavaScript Sample
```
var nuimo = "nuimo.0.1464b65de75542c5b82a7cb6a3be91a0.";

on({id: nuimo+"pressed", valNe: false}, function(obj)
{
var display =   "000000000"+
"011001110"+
"100101001"+
"100101001"+
"111101111"+
"100101001"+
"100101001"+
"100101110"+
"000000000";

setState(nuimo+"dotMatrix", display);

});
```


## Changelog

### 0.5.1
(Muskelkatermann) Better Rotation Handling
```
on({id: nuimo+"rotationBegan", valNe: false}, function(obj)
{
    setState(nuimo+"rotationFactor",0.005); // Sets the ratio between hardware rotation and locical rotation

    setState(nuimo+"rotationAbsolute",22); // Inital Rotation value, for example current TV Volume
});

on({id: nuimo+"rotationAbsolute", valNe: false}, function(obj)
{
    var matrix = Math.round(getState(nuimo+"dotMatrixNumber").val);
    var newVal = Math.round(obj.state.val);

    if(matrix!=newVal)
    {
        // Update LEDMatrix
        setState(nuimo+"dotMatrixNumber",Math.round(obj.state.val)); 
        if(newVal-matrix >= 1)
        {
            // Value increase, increment connected state
            setState("lgtv.0.volumeUp",true);
        }else
        if(newVal-matrix <= -1)
        {
        // Value decreased, decrement connected state
            setState("lgtv.0.volumeDown",true);
        }
    }

});

on({id: nuimo+"rotationEnded", valNe: false}, function(obj)
{
    log("rotationEnded","info");
});
```

### 0.5.0
  (Muskelkatermann) initial commit

## License
The MIT License (MIT)

Copyright (c) 2016 Muskelkatermann<malte.register@me.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
