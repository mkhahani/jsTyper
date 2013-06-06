/**
 * jsTyper - Pure Javascript Typing Slider, v1.0
 * Copyright 2013 Mohsen Khahani
 * http://mohsenkhahani.ir/jsTyper
 */
var jsTyperOptions={slideDelay:2000,typeDelay:100,blinking:2,cursor:"_",loop:true};function jsTyper(a,b){b=b||{};this.typeDelay=(b.typeDelay!==undefined)?b.typeDelay:jsTyperOptions.typeDelay;this.slideDelay=(b.slideDelay!==undefined)?b.slideDelay:jsTyperOptions.slideDelay;this.blinking=(b.blinking!==undefined)?b.blinking:jsTyperOptions.blinking;this.cursor=(b.cursor!==undefined)?b.cursor:jsTyperOptions.cursor;this.loop=(b.loop!==undefined)?b.loop:jsTyperOptions.loop;this.slides=[];this.timer=null;this.typing=false;this.playing=false;this.currIdx=0;this.init(a)}jsTyper.prototype.init=function(e){function d(f){if(f.children.length===0){return f}else{return d(f.children[0])}}var a=this,c,b;if(document.readyState!="complete"){setTimeout(function(){a.init(e)},100);return}c=this.slider=document.getElementById(e);if(c.children.length===0){return}for(b=0;b<c.children.length;b++){this.slides[b]={};this.slides[b].outer=c.children[b];this.slides[b].outer.style.display="none";this.slides[b].inner=d(c.children[b]);this.slides[b].text=this.slides[b].inner.innerHTML}this.addEvents(c);c.style.display="";this.playing=true;this.play()};jsTyper.prototype.play=function(){var a=this.slides[this.currIdx],b=(this.currIdx===0)?this.slides.length-1:this.currIdx-1;if(this.playing&&!this.typing){this.typing=true;this.slides[b].outer.style.display="none";this.blink(a,0);if(this.currIdx===this.slides.length-1){if(this.loop){this.currIdx=0}else{this.playing=false;this.removeEvents(this.slider);return}}else{this.currIdx+=1}}};jsTyper.prototype.blink=function(a,c){var b=this;a.outer.style.display="";if(c<this.blinking){a.inner.innerHTML=(c%2===0)?this.cursor:"";setTimeout(function(){b.blink(a,c+1)},(500))}else{this.type(a,0)}};jsTyper.prototype.type=function(a,c){var b=this;a.inner.innerHTML=a.text.substr(0,c)+this.cursor;if(c<a.text.length){setTimeout(function(){b.type(a,c+1)},(this.typeDelay))}else{a.inner.innerHTML=a.text;this.typing=false;if(this.playing){this.timer=setTimeout(function(){b.play()},(this.slideDelay))}}};jsTyper.prototype.addEvents=function(b){var a=this;this.resume=function(){a.playing=true;a.timer=setTimeout(function(){a.play()},(1000))};this.pause=function(){clearTimeout(a.timer);a.playing=false};if(b.addEventListener){b.addEventListener("mouseover",this.pause,false);b.addEventListener("mouseout",this.resume,false)}else{b.attachEvent("onmouseover",this.pause);b.attachEvent("onmouseout",this.resume)}};jsTyper.prototype.removeEvents=function(a){if(a.removeEventListener){a.removeEventListener("mouseover",this.pause,false);a.removeEventListener("mouseout",this.resume,false)}else{a.detachEvent("onmouseover",this.pause);a.detachEvent("onmouseout",this.resume)}};