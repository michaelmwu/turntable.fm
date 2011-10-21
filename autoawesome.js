(function(){
  var ttObj = null;
  var roomInfo = null;
  
  function seated() {
    for(var i = 0; typeof(ttObj.djs[i]) != 'undefined'; i++) {
      if(ttObj.djs[i][0] == roomInfo.selfId) {
        return true;
      }
    }
    
    return false;
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
    if(!seated()) { 
        ttObj.callback('upvote');
    }
    
    var delay = randomXtoY(5000, 30000);
    setTimeout(bop, delay);
  }
 
  $.when(getTurntableObjects()).then(function() {
    console.log('Found turntable objects, initiating bop');
    
    bop();
  });
})();