   function putItem(i) {  // draws item i from the array item[]; if item[i] is -1, nothing is drawn.
      var h = item[i];
      if (h == -1)
         return;
      var x,y,ht;
      if (h > 16) { 
         ht = (h-100)*barIncrement + minBarHeight;
         g.fillStyle = finishedBarColor;
      }
      else {
         ht = h*barIncrement + minBarHeight;
         g.fillStyle = barColor;
      }
      if (i == 0) {
         x = leftOffset + ((barWidth+barGap)*15)/2;
         y = secondRow_y - ht;
      }
      else if (i < 17) {
         x = leftOffset + (i-1)*(barWidth+barGap);
         y = firstRow_y - ht;
      }
      else {
         x = leftOffset + (i-17)*(barWidth+barGap);
         y = secondRow_y - ht;
      }
      try {
         g.fillRect(x,y,barWidth,ht);
         g.strokeStyle = finishedBarColor;
         g.strokeRect(x,y,barWidth,ht);
      }
      catch (e) { // (Got an error during development when item[i] was undefined.  Shouldn't happen again. :-)
         if (timeout != null)
            timeout.cancel();
         setState(IDLE);
         alert("Internal error while drawing!!??");
      }
   }
   
   function drawMovingItem() { // Draws an item that is being moved to animate the copying of an item from one place to another.
      var ht = movingItem*barIncrement + minBarHeight;
      g.fillStyle = movingBarColor;
      g.fillRect(movingItemLoc.x,movingItemLoc.y-ht,barWidth,ht);
      g.strokeColor = movingBarOutlineColor;
      g.strokeRect(movingItemLoc.x,movingItemLoc.y-ht,barWidth,ht);
   }
   
   function drawMax() { // Writes "Max" under one of the items, with an arrow pointing to the item.
      var sw = 30;  // (guess at string width)
      var x = leftOffset + (maxLoc-1)*(barWidth+barGap) + barWidth/2;
      var y = firstRow_y + 38 + textAscent;
      g.fillStyle = maxColor;
      g.fillText("Max",x-sw/2,y+textAscent);
      g.strokeStyle = maxColor;
      g.beginPath();
      g.moveTo(x,y);
      g.lineTo(x,y-29);
      g.moveTo(x,y-29);
      g.lineTo(x+6,y-24);
      g.moveTo(x,y-29);
      g.lineTo(x-6,y-24);
      g.stroke();
   }
   
   function drawBox(boxLoc) { // draws a box aroud one of the items (indicated by boxLoc)
      var x,y;
      if (boxLoc == 0) {
         x = leftOffset + ((barWidth+barGap)*15)/2;
         y = secondRow_y;
      }
      else if (boxLoc < 17) {
         x = leftOffset + (boxLoc-1)*(barWidth+barGap);
         y = firstRow_y;
      }
      else {
         x = leftOffset + (boxLoc-17)*(barWidth+barGap);
         y = secondRow_y;
      }
      g.strokeStyle = boxColor;
      g.strokeRect(x-2,y-barHeight-2,barWidth+4,barHeight+4);
   }
   
   function drawMultiBox() {  // draws a box around items number multiBoxLoc.x through multiBoxLoc.y
      var x,y,wd;
      if (multiBoxLoc.x < 17) {
         y = firstRow_y;
         x = leftOffset + (multiBoxLoc.x-1) * (barWidth + barGap);
      }
      else {
         y = secondRow_y;
         x = leftOffset + (multiBoxLoc.x-17) * (barWidth + barGap);
      }
      wd = (multiBoxLoc.y - multiBoxLoc.x)*(barGap + barWidth) + barWidth;
      g.strokeStyle = multiBoxColor;
      g.strokeRect(x-4,y-barHeight-4,wd+8,barHeight+8);
   }
   
   function drawMergeListBoxes() { // Draws a pair of boxes around lists that are being merged in MergeSort
      var x,y,wd1,wd2;
      y = firstRow_y;
      x = leftOffset + (mergeBox[0]-1) * (barWidth + barGap);
      wd1 = (mergeBox[1] - mergeBox[0])*(barGap + barWidth) + barWidth;
      wd2 = (mergeBox[2] - mergeBox[0])*(barGap + barWidth) + barWidth;
      g.strokeStyle = multiBoxColor;
      g.strokeRect(x-4,y-barHeight-4,wd1+8,barHeight+8);
      g.strokeRect(x-4,y-barHeight-4,wd2+8,barHeight+8);
   }
   
   function draw() {  // Completely redraws the canvas to show the current state.
       g.clearRect(0,0,width,height);
       g.strokeStyle = borderColor;
       g.strokeRect(0,0,width,height);
       g.strokeRect(1,1,width-2,height-2);
       for (var i = 1; i <= 16; i++)
          putItem(i);
       g.fillStyle = borderColor;
       for (var i = 1; i <= 16; i++) {
          var sw = (i<10)? 6 : 12;
          g.fillText("" + i,leftOffset+(i-1)*(barWidth+barGap)+(barWidth-sw)/2,firstRow_y+6+textAscent);
       }
       for (var i = 17; i <= 32; i++)
          putItem(i);
      if (tempOn) {
         g.fillStyle = borderColor;
         var sw = 40;
         g.fillText("Temp",leftOffset + (16*barWidth+15*barGap - sw)/2, secondRow_y + 5 + textAscent);
         putItem(0);
      }
      if (maxLoc >= 0)
         drawMax();
      if (box1Loc >= 0) 
         drawBox(box1Loc);
      if (box2Loc >= 0)
         drawBox(box2Loc);
      if (multiBoxLoc.x > 0)
         drawMultiBox();
      if (mergeBox[0] > 0)
         drawMergeListBoxes();
      if (movingItem >= 0)
         drawMovingItem();
   }
   
