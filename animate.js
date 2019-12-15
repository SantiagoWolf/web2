
function getStyle(obj, attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, null)[attr];
	}
}
function animate(obj,json,callback){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var isStop = true;
		for(var attr in json){
			var now = 0;
			if(attr == 'opacity'){
				now = parseInt(getStyle(obj,attr)*100);
			}else{
				now = parseInt(getStyle(obj,attr));
			}
			var speed = (json[attr] - now) / 8;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			var cur = now + speed;
			if(attr == 'opacity'){
				obj.style[attr] = cur / 100;
			}else{
				obj.style[attr] = cur + 'px';
			}
			if(json[attr] !== cur){
				isStop = false;
			}
		}
		if(isStop){
			clearInterval(obj.timer);
			callback&&callback();
		}
	}, 30)
}


var title = document.getElementById('p_title')
var slider = document.getElementById('slider')
var oNavlist = document.getElementById('nav').children
var left = document.getElementById('left')
var right = document.getElementById('right')

var index = 1;
var timer;
var isMoving = false;

title_id = setInterval(function(){
  var now = parseInt(getStyle(title,'right'))
  title.style.right = now + 10 + 'px' 
  if(now >= 980) {
    title.style.right = '-400px'
  }
},80)

left.onclick = prev
right.onclick = next

box.onmouseover = function () {
  animate(left,{opacity:50})
  animate(right,{opacity:50})
  clearInterval(timer)
}
box.onmouseout = function () {
  animate(left,{opacity:0})
  animate(right,{opacity:0})
  timer = setInterval(next,3000)
}



function next() {
  if(isMoving)return
  
  index++;
  isMoving = true
  animate(slider,{left: -1200 * index},function(){
    isMoving = false

    if(index == oNavlist.length + 1) {
      slider.style.left = '-1200px'
      index = 1
    }
    for(var i = 0; i < oNavlist.length;i++) {
      oNavlist[i].classList.remove('active')
    }
    oNavlist[index-1].classList.add('active')
  })
  
}
function prev() {
  if(isMoving)return
  index--;

  isMoving = true
  animate(slider,{left: -1200 * index},function(){
    isMoving = false
    if(index == 0) {
      slider.style.left = '-6000px'
      index = 5
    }
    for(var i = 0; i < oNavlist.length;i++) {
      oNavlist[i].classList.remove('active')
    }
    oNavlist[index-1].classList.add('active')
  })
  
}


timer = setInterval(next,3000)

for(var i = 0; i < oNavlist.length ; i++) {
  oNavlist[i].onclick = function() {
    index = this.innerHTML - 1
    next()
  }
}
