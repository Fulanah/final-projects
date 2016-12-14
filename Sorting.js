  
   var actionQueue = new Array(); // A queue of pending actions for implmenting some aspects of the animation.
   
   var done = false;  // state variables for scripting the various sorting algorithms.
   var i, j, k;
   var hi, lo;
   var stack = new Array();
   var stackCt;
   var sortLength, end_i, end_j;
   var valid = false;  // false when a sort is just ready to start; set to true when the first step is taken.

  function copyItem(toItem, fromItem) {  // copy an item from one place to another (actually just enqueue actions to do so)
      if (fast) { // enqueue a single copy action when the "fast" checkbox is seledted.
         actionQueue.push( { action: "copy", from: fromItem, to: toItem, delay: 200 } );
      }
      else {  // enqueue a series of actions that move the item gradually from old position to new.
         var x1, y1, x2, y2;
         if (toItem == 0) {
            x2 = leftOffset + ((barWidth+barGap)*15)/2;
            y2 = secondRow_y;
         }
         else if (toItem < 17) {
            x2 = leftOffset + (toItem-1)*(barWidth+barGap);
            y2 = firstRow_y;
         }
         else {
            x2 = leftOffset + (toItem-17)*(barWidth+barGap);
            y2 = secondRow_y;
         }
         if (fromItem == 0) {
            x1 = leftOffset + ((barWidth+barGap)*15)/2;
            y1 = secondRow_y;
         }
         else if (fromItem < 17) {
            x1 = leftOffset + (fromItem-1)*(barWidth+barGap);
            y1 = firstRow_y;
         }
         else {
            x1 = leftOffset + (fromItem-17)*(barWidth+barGap);
            y1 = secondRow_y;
         }
         var dist = Math.round(Math.sqrt( (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2) ));
         var ct = Math.round(dist / 3);
         if (ct > 25)
           ct = 25;
         else if (ct < 6)
           ct = 6;
         actionQueue.push( { action: "startmove", from: fromItem, x: x1, y:y1, delay: 100 } );
         for (var i = 0; i <= ct; i++) {
            actionQueue.push( { action: "move", x: x1 + Math.round(((x2-x1)*i)/ct), y: y1 + Math.round(((y2-y1)*i)/ct), delay: 25 } );
         }
         actionQueue.push( { action: "donemove", to: toItem, delay: 200 } );
      }
   }
   
   function swapItems (a, b) { // swaps two items; actually just enqueues actions to do that
     copyItem(0, a);
     copyItem(a, b);
     copyItem(b, 0);
   }

   function greaterThan(itemA, itemB) {  // test if one item is greater than another; boxes are shown around the two items.
     compCt++;
     $("#compCt").html("" + compCt);
     putBoxes(itemA,itemB);
     return (item[itemA] > item[itemB]);
   }
   
   function putBoxes(itemA,itemB) {  // show boxes around two items
      box1Loc = itemA;
      box2Loc = itemB;
   }
     
   function scriptSetup() {  // The first step in a sort
      method = $("#sortSelect").val();
      say2(""); 
      switch (method) {
       case "5":  {
         stackCt = 0;
         hi = 16;
         lo = 1;
         k = 0;
         i = 1;     // i and j are starting valuse for lo and hi
         j = 16;
         say1("Apply \"QuickSortStep\" to items 1 through 16.");
         say2("The range of possible final positions for item 1 is boxed.");
         multiBoxLoc.x = 1;
         multiBoxLoc.y = 16;
         tempOn = true;
         break;
        }
      }
    }
    
    
    function scriptStep() {  // Do one step in a sort.  (A very long function!)
        switch (method) {
      
          case "5": // quicksort
           if (k==0)  {
             if (hi==lo)  {
               say2("There is only one item in the range; it is already in its final position.");
               item[hi] = 100+item[hi];
               multiBoxLoc.x = -1;
               multiBoxLoc.y = -1;
               k = 1;
             }
             else {
               say2("Copy item " + lo + " to Temp");
               copyItem(0, lo);
               k = -1;
             }
            }
           else if (k==1)  {
             if (stackCt==0)  {
               say1("The sort is finished.");
               say2("");
               tempOn = false;
               done = true;
             }
             else {
               hi = stack[stackCt];
               lo = stack[stackCt - 1];
               j = hi;
               i = lo;
               stackCt = stackCt - 2;
               say1("Apply \"QuickSortStep\" to items " + lo + " through " + hi);
               say2("The range of possible final positions for item " + lo + " is boxed");
               multiBoxLoc.x = lo;
               multiBoxLoc.y = hi;
               k = 0;
             }
            }
           else if (k==2)  {
             say2("Item " + hi + " is in final position; smaller items below and bigger items above");
             multiBoxLoc.x = -1;
             multiBoxLoc.y = -1;
             item[hi] = 100+item[hi];
             if (hi < j)  {
               stack[stackCt + 1] = hi + 1;
               stack[stackCt + 2] = j;
               stackCt = stackCt + 2;
             }
             if (hi > i)  {
               stack[stackCt + 1] = i;
               stack[stackCt + 2] = hi - 1;
               stackCt = stackCt + 2;
             }
             k = 1;
            }
           else if (hi==lo)  {
             putBoxes(-1, -1);
             say2("Only one possible position left for Temp; copy Temp to position "  + hi);
             copyItem(hi, 0);
             k = 2;
            }
           else if (item[lo]==-1)  {
             if (greaterThan(0, hi))  {
               say2("Item " + hi + " is smaller than Temp, so move it; Temp will end up above it");
               copyItem(lo, hi);
               lo = lo + 1;
                multiBoxLoc.x = lo;
               multiBoxLoc.y = hi;
             }
             else {
               say2("Item " + hi + " is bigger than Temp, so Temp will end up below it");
               hi = hi - 1;
                multiBoxLoc.x = lo;
               multiBoxLoc.y = hi;
             }
            }
           else if (item[hi]==-1)  {
             if (greaterThan(lo, 0))  {
               say2("Item " +  lo + " is bigger than Temp, so move it; Temp will end up below it");
               copyItem(hi, lo);
               hi = hi - 1;
                multiBoxLoc.x = lo;
               multiBoxLoc.y = hi;
             }
             else {
               say2("Item " + lo + " is smaller than Temp, so Temp will end up above it");
               lo = lo + 1;
                multiBoxLoc.x = lo;
               multiBoxLoc.y = hi;
             }
            }  // end case 5
         } // end switch
       }  // end scriptStep()

   function doAction(what) {  // perform one action from the action queue; actions are encoded as objects.
      switch (what.action) {
      case "copy": 
          item[what.to] = item[what.from];
          item[what.from] = -1;
          copyCt++;
          $("#moveCt").html("" + copyCt);
          break;
      case "startmove": //alert("start move " + what.from);
          movingItem = item[what.from];
          item[what.from] = -1;
          movingItemLoc.x = what.x;
          movingItemLoc.y = what.y;
          break;
      case "move":
          movingItemLoc.x = what.x;
          movingItemLoc.y = what.y;
          break;
      case "donemove":  //alert("end move " + what.to + "," + movingItem);
          item[what.to] = movingItem;
          movingItem = -1;
          copyCt++;
          $("#moveCt").html("" + copyCt);
          break;
       case "finishItem":
          item[what.itemNum] += 100;
          break;
       case "maxoff":
          maxLoc = -1;
          break;
       }
   }
    
   function frame() {  // do one frame of the animation; set timeout for next frame if appropriate.
      timeout = null;
      fast = $("#fastCheckbox").attr("checked");
      if (actionQueue.length > 0) {
         var what;
         do {
            what = actionQueue.shift();
            doAction(what);
         } while (actionQueue.length > 0 && what.delay == 0);
         timeout = setTimeout(frame,Math.max(5,what.delay));
      }
      else {
         if (!valid){ 
            scriptSetup();
            valid = true;
            done = false;
            if (state == RUN)
               timeout = setTimeout(frame, fast? 100 : 1000);
         }
         else { 
            scriptStep();
            if (!done && state == RUN)
               timeout = setTimeout(frame, fast? 100 : 1000);
         }
         if (done)
            setState(IDLE);
         else if (state == STEPPING)
            setState(PAUSED);
      }
      if (done && actionQueue.length == 0)
         setState(IDLE);
      else if (state == STEPPING && actionQueue.length == 0)
         setState(PAUSED);
      draw();
   }
  