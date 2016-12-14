    
    function doRun() { // handler for "Run" button
       if (state == RUN || state == IDLE || state == STEPPING)
          return; // won't happen if button enable/disable is functioning
       setState(RUN);
       frame();
    }
    
    function doStep() { // handler for "Step" button
       if (state == RUN || state == IDLE || state == STEPPING)
          return; // won't happen if button enable/disable is functioning
       setState(STEPPING);
       frame();
    }
       
    function doNew() { // handler for "New" button
       newSort();
    }
   
   $(function() { // initialization; called by jQuery when the document is ready.
      var canvas = document.getElementById("sortcanvas"); // A reference to the canvas element.
      g = canvas.getContext("2d");
      if ( ! g.fillText ) {  // eliminate missing function error in excanvas.js for IE 8 and earlier
         g.fillText = function() { };
      }
      g.font = "bold 11pt sans-serif";
      width = canvas.width;
      height = canvas.height;
      var x = (width - 20 + barGap)/16;
      barWidth =  x - barGap;
      textAscent = 15;
      leftOffset = (width - 16*barWidth - 15*barGap)/2;
      barHeight = (height - 40 - 2*textAscent) / 2;
      barIncrement = (barHeight-3)/17;
      minBarHeight = barHeight - 17*barIncrement;
      firstRow_y = barHeight + 10;
      secondRow_y = 2*barHeight + 25 + textAscent;
      $("#runBtn").click(doRun);
      $("#stepBtn").click(doStep);
      $("#newBtn").click(doNew);
      newSort();
   });