var canvas = document.getElementById("cas"),
    ctx = canvas.getContext("2d");
var x1,y1, // 定义圆心
    defaultLineWidth = 30, // 线的粗度
    timeout,
    totimes = 100,
    gap = 30;
var sourceImg = new Image();// 定义新图(sourceImage)

sourceImg.src = "https://cdn.rawgit.com/zorayoyo/resume/master/images/source.png"; 
canvas.width = document.getElementById("fakemask").clientWidth;
canvas.height = document.getElementById("fakemask").clientHeight;

sourceImg.onload = function(){
  ctx.drawImage(sourceImg,0,0,canvas.width,canvas.height); //在canvas上画sourceImg
  tapClip();
}
    
//通过修改globalCompositeOperation来达到擦除的效果
function tapClip(){
  var hastouch = "ontouchstart" in window?true:false,
    tapstart = hastouch?"touchstart":"mousedown",
    tapmove = hastouch?"touchmove":"mousemove",
    tapend = hastouch?"touchend":"mouseup";
    
  ctx.lineCap = "round"; //画线的两个端点的形状
  ctx.lineJoin = "round"; //两线的交点形状
  ctx.lineWidth = defaultLineWidth * 2; //线的粗度
  ctx.globalCompositeOperation = "destination-out"; //定义新图(source)和已经存在的老图(destination)的绘画形式
  
  canvas.addEventListener(tapstart , function(e){
    clearTimeout(timeout);
    e.preventDefault();
    
    x1 = hastouch ? e.targetTouches[0].pageX : e.clientX-canvas.offsetLeft;
    y1 = hastouch ? e.targetTouches[0].pageY : e.clientY-canvas.offsetTop;
    
    ctx.save(); //保存上下文
    ctx.beginPath() 
    ctx.arc(x1,y1,1,0,2*Math.PI);
    ctx.fill();
    ctx.restore(); //存储保存的上下文
    
    canvas.addEventListener(tapmove, tapmoveHandler);
    canvas.addEventListener(tapend, function(){
      canvas.removeEventListener(tapmove , tapmoveHandler);
      
      timeout = setTimeout(function(){
        var imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
        var dd = 0;
        for(var x=0; x<imgData.width; x+=gap){
          for(var y=0; y<imgData.height; y+=gap){
            var i = (y*imgData.width + x)*4;
            if(imgData.data[i+3] >0){
              dd++;
            }
          }
        }
        if(dd/(imgData.width*imgData.height/(gap*gap))<0.5){
          canvas.className = "transparent";
        }
      },totimes)
    });

    function tapmoveHandler(e){
      clearTimeout(timeout);
      e.preventDefault();
      x2 = hastouch?e.targetTouches[0].pageX:e.clientX-canvas.offsetLeft;
      y2 = hastouch?e.targetTouches[0].pageY:e.clientY-canvas.offsetTop;
      
      ctx.save();
      ctx.moveTo(x1,y1);
      ctx.lineTo(x2,y2);
      ctx.stroke(); // 为所画的路径描边
      ctx.restore();
      
      x1 = x2;
      y1 = y2;
    }
  })
}
