(function (root, factory) {
    if(typeof exports === 'object' && typeof module === 'object')
        module.exports = factory();
    else if(typeof define === 'function' && define.amd)
        define([], factory);
    else if(typeof exports === 'object')
        exports["Zoom"] = factory();
    else
        root["Zoom"] = factory();
})(this,function(){
 
	/**
	 * 简洁的元素缩放功能。
	 * @param {[type]} el     要缩放的元素
	 * @param {[type]} option {windth:元素宽度（必须），height:元素高度（必须），minScale:最小缩放比例，maxScale:最大缩放比例，top:原始位置,left:原始位置}
	 */
	function Zoom(el,option){
		if (!option || !option.width || !option.height) {
			throw "dom的尺寸参数错误";
		}
		option = Object.assign({
			minScale:1,
			maxScale:3,
			top:0,
			left:0
		}, option);
 
		this.el = el;
		
		this.lastSapce = 0;
		this.touchState = 0;
		this.lastPoint = null
		this.targetPoint = null;
 
		//放大缩小的倍数 当前缩放倍数 
		this.minScale = option.minScale || 1;
		this.maxScale = option.maxScale || 10;
		
		//dom的尺寸参数
		this.width = option.width ;
		this.height = option.height;
		this.top = option.top ;
		this.left = option.left;
		this.scale = 1;
 
		//初始位置 以及 初始宽高
		this.originTop = option.top;
		this.originLeft = option.left;
		this.originW = this.width;
		this.originH = this.height;
		//图片中心点 
		this.centerX = this.left + this.originW / 2;
		this.centerY = this.top + this.originH / 2;	
 
		this.el.style.position = 'absolute';
 
		this.init();
		return this;
	}
 
 
	Zoom.prototype.getTouches = function (event){
		let touches = event.touches;
		if (!touches) {
			touches = event.originalEvent.touches;
		}
		return touches;
	}
 
	Zoom.prototype.getTouchsDistance = function(t1,t2){
 
		let dx = parseInt(t1.pageX - t2.pageX);
		let dy = parseInt(t1.pageY - t2.pageY);
 
		let d = Math.pow((dx *dx + dy * dy), 0.5);
 
		return d.toFixed(5);
	}
 
	Zoom.prototype.restView = function(){
		this.el.style.width = this.width + 'px';
		this.el.style.height = this.height + 'px';
		this.el.style.top = this.top + 'px';
		this.el.style.left = this.left + 'px';
	}
 
 
	Zoom.prototype.init = function(){
 
 
		this.el.addEventListener('touchmove',this.touchmoveHandler);
		this.el.addEventListener('touchstart',this.touchmoveHandler);
		this.el.addEventListener('touchend',this.touchEndHandler);
		this.el.addEventListener('touchcancel',this.touchEndHandler);
		this.el.addEventListener('touchstart',this.dbclickHandler);
		this.el.zoom = this;
 
	}
	Zoom.prototype.dbclickHandler = function(event){
		event.stopPropagation();
		event.preventDefault();
		let el = event.currentTarget;
		let zoom = el.zoom;
		let time = new Date(event.timeStamp).getTime(); 
		let touchs = zoom.getTouches(event);
		if (touchs.length == 1) {
			if (!el.lastClickTime) {
				el.lastClickTime = time;
			}else{
				if (time - el.lastClickTime < 300) {
					el.lastClickTime = 0;
					if (zoom.scale != 1) {
						zoom.setScale(1);
					}else if(zoom.scale == 1){
						zoom.setScale(2);
					}		
				}else{
					el.lastClickTime = time;
				}
			}
		}
		zoom.touchStartTime = new Date().getTime();
		return false;
	},
	Zoom.prototype.drage = function(touch){
		if (this.lastPoint == null) {
			this.lastPoint = {
				x:touch.pageX,
				y:touch.pageY,
			}
		}else{
			let dx = parseInt(touch.pageX - this.lastPoint.x);
			let dy = parseInt(touch.pageY - this.lastPoint.y);
 
 
			this.lastPoint.x = touch.pageX;
			this.lastPoint.y = touch.pageY;
 
			this.left += dx;
			this.top += dy;
 
			this.setTransform(false);
		}
	}
 
	Zoom.prototype.zoom = function(touchs){
 
		this.lastPoint = null;
		let t1 = touchs[0];
		let t2 = touchs[1];
 
		let x1 = t1.pageX;
		let x2 = t2.pageX;
		let y1 = t1.pageY;
		let y2 = t2.pageY;
 
		let d = this.getTouchsDistance(t1,t2);
 
		if (this.touchState == 0) {
			this.lastSapce = d;
			this.touchState = 1;
 
			this.pointX = (x2 + (x1 - x2) / 2 - this.left)/this.scale;
			this.pointY = (y2 + (y1 - y2) / 2 - this.top)/this.scale;
 
 
 
		}else if(this.touchState == 1){
 
			let scaleChange = ((d / this.lastSapce) - 1) * 2;
 
			let scale = this.scale + scaleChange / 2;
 
			this.setScale(scale,this.pointX,this.pointY);
 
			this.lastSapce = d;
		}
	}
 
	Zoom.prototype.touchmoveHandler = function(event){
 
		event.stopPropagation();
		event.preventDefault();
		let el = event.currentTarget;
		let zoom = el.zoom;
		let touchs = zoom.getTouches(event);
		if (touchs.length == 1) {
			zoom.drage(touchs[0]);//拖动处理
		}else if (touchs.length >= 2) {
			zoom.lastPoint = null;//终止拖动事件
			zoom.zoom(touchs);//缩放处理
 
		}
 
		return false;
	}
 
	Zoom.prototype.touchEndHandler = function(event){
		let zoom = event.currentTarget.zoom;
 
		zoom.touchState = 0;
		zoom.lastPoint = null;
		zoom.lastSapce = 0;
 
		let minSpace = 20;
		let parentWidth = zoom.el.parentElement.offsetWidth;
		let parentHight =zoom.el.parentElement.offsetHeight;
		let scale = zoom.scale;
 
		if(scale < zoom.minScale){
			scale = zoom.minScale;
		}
		if(scale > zoom.maxScale){
			scale = zoom.maxScale;
		}
 
		if(scale != zoom.scale){
			zoom.preSetScale(scale,zoom.lastPointX,zoom.lastPointY);
		}
 
		if((zoom.left + zoom.width) < minSpace){
				zoom.left = - zoom.width + minSpace;
		}
		if(zoom.left >= (parentWidth - minSpace)){
				zoom.left = parentWidth - minSpace;
		}
 
		if((zoom.top + zoom.height) < minSpace){
			zoom.top = - zoom.height + minSpace;
		}
		if(zoom.top >= (parentHight - minSpace)){
			zoom.top = parentHight - minSpace;
		}
 
 
		
		zoom.setTransform(true);
 
		return;
	}
	Zoom.prototype.setTransform = function (needAnimation,originX,originY){
		let distanceX = this.left - this.originLeft;
		let distanceY = this.top - this.originTop;
		let scale = this.scale;
		originX = originX == undefined ? (this.originTop + 'px') : originX;
		originY = originY == undefined ? (this.originLeft + 'px') : originY;
		this.el.style.transformOrigin = 'left top';
		this.el.style.transform = 'matrix('+scale+',0,0,'+scale+','+distanceX+','+distanceY+')';
		if(needAnimation == true){
			this.el.style.transition = 'all .3s ease-in-out 0s'
		}else{
			this.el.style.transition = ''
		}		
	}
	
	Zoom.prototype.destroy = function(){
 
		this.el.removeEventListener('touchmove',this.touchmoveHandler);
		this.el.removeEventListener('touchstart',this.touchmoveHandler);
		this.el.removeEventListener('touchend',this.touchEndHandler);
		this.el.removeEventListener('touchcancel',this.touchEndHandler);
 
		this.el.zoom = null;
	}
	//初始化放大倍数
	Zoom.prototype.setScale = function(scale,pointX,pointY){
		this.preSetScale(scale,pointX,pointY);
		this.setTransform(false);
	}
 
	Zoom.prototype.preSetScale = function(scale,pointX,pointY){
 
		if (scale < 0.1) {
			scale = 0.1;
		}
 
		if (pointX ==undefined) {
			this.left = this.centerX - this.originW / 2 - this.originW/2*(scale - 1);
			this.top = this.centerY - this.originH / 2 - this.originH/2*(scale - 1);
 
			this.width = scale * this.originW;
			this.height = scale * this.originH;
 
			this.scale = scale;
		}else{
			this.width = scale * this.originW;
			this.height = scale * this.originH;
 
			this.left = this.left - pointX * (scale - this.scale);
			this.top = this.top - pointY * (scale - this.scale);
 
			this.lastPointX = pointX;
			this.lastPointY = pointY;
 
			this.scale = scale;
		}
 
	}
 
	return Zoom;
});