(function(){
  var ttObj = null;
  var roomInfo = null;

  //function to get random number upto m
  function randomXtoY(minVal,maxVal,floatVal)
  {
    var randVal = minVal+(Math.random()*(maxVal-minVal));
    return typeof floatVal=='undefined'?Math.round(randVal):randVal.toFixed(floatVal);
  }
  
  function getTurntableObjects(){
    roomInfo = null;
  
    var dfd = $.Deferred(),
      resolveWhenReady = function() {
      if(window.location.pathname !== "/lobby") {
        for(var o in turntable) {
          if(turntable[o] !== null) {
            for(var o2 in turntable[o]) {
              if(turntable[o][o2] !== null) {
                if(o2 == 'creatorId') {
                  // console.log("currentDj found in: ", o);
                  roomInfo = turntable[o];
                  break;
                }
              }
            }
          }
        }

        if(roomInfo) {
            for(o in roomInfo) {
                if(roomInfo[o] !== null) {
                    for(o2 in roomInfo[o]) {
                        if(o2 == 'myuserid') {
                            ttObj = roomInfo[o];
                        }
                    }
                }
            }
            dfd.resolve();
        } else {
            setTimeout(function(){
                resolveWhenReady();
            }, 250);
        }
      } else {
        setTimeout(function(){
          resolveWhenReady();
        }, 250);
      }
    };  
    resolveWhenReady();

    return dfd.promise();
  }
 
  console.log('Loading autobopper');
 
  function bop() {
    if(ttObj.current_dj && ttObj.current_dj[0] != ttObj.myuserid) { 
        ttObj.callback('upvote');
    }
    
    var delay = randomXtoY(5000, 30000);
    setTimeout(bop, delay);
  }
 
  $.when(getTurntableObjects()).then(function() {
    console.log('Found turntable objects, initiating bop');
    
    bop();
  });
 
 $.when(getTurntableObjects()).then(function() {
    console.log('Found turntable objects, initiating bop');
 
    bop();
  });
})();