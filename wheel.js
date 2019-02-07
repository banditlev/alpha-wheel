  var color = ['#F44336','#2196F3','#8BC34A','#FF5722','#E91E63','#FF9800'];
  var label = ['Soren', 'Kenneth', 'Jacob', 'Anja', 'Erik'];
  var slices = label.length;
  var sliceDeg = 360/slices;
  var deg = rand(0, 360);
  var speed = 0;
  var slowDownRand = 0;
  var ctx = canvas.getContext('2d');
  var width = canvas.width; // size
  var center = width/2;      // center
  var isStopped = false;
  var lock = false;
  
  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function deg2rad(deg) {
    return deg * Math.PI/180;
  }
  
  function drawSlice(deg, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.moveTo(center, center);
    ctx.arc(center, center, width/2, deg2rad(deg), deg2rad(deg+sliceDeg));
    ctx.lineTo(center, center);
    ctx.fill();
  }
  
  function drawText(deg, text) {
    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(deg2rad(deg));
    ctx.textAlign = "left";
    ctx.fillStyle = "#fff";
    ctx.font = 'bold 60px sans-serif';
    ctx.fillText(text, 130, 10);
    ctx.restore();
  }
  
  function drawImg() {
    ctx.clearRect(0, 0, width, width);
    for(var i=0; i<slices; i++){
      drawSlice(deg, color[i]);
      drawText(deg+sliceDeg/2, label[i]);
      deg += sliceDeg;
    }
  }
  
  (function anim() {
    deg += speed;
    deg %= 360;
  
    // Increment speed
    if(!isStopped && speed<3){
      speed = speed+1 * 0.1;
    }
    // Decrement Speed
    if(isStopped){
      if(!lock){
        lock = true;
        slowDownRand = rand(0.994, 0.998);
      } 
      speed = speed>0.2 ? speed*=slowDownRand : 0;
    }
    // Stopped!
    if(lock && !speed){
      var ai = Math.floor(((360 - deg - 90) % 360) / sliceDeg); // deg 2 Array Index
      ai = (slices+ai)%slices; // Fix negative index
      return alert("You got:\n"+ label[ai] ); // Get Array Item from end Degree
    }
  
    drawImg();
    window.requestAnimationFrame( anim );
  }());
  
  document.getElementById("spin").addEventListener("mousedown", function(){
    isStopped = true;
  }, false);