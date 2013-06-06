/**
 * jsTyper - Pure Javascript Typing Slider, v1.0
 * Copyright 2013 Mohsen Khahani
 *
 * Licensed under the MIT license
 * Created on May 18, 2013
 *
 * Features:
 *   - Nice typing effects
 *   - Support XHTML slides
 *   - Configurable typing speed
 *   - Pause on mouse over
 *
 * http://mohsenkhahani.ir/jsTyper
 */

/**
 * Default configuration options
 */
var jsTyperOptions = {
    slideDelay : 2000,  /* Time delay between slides in millisecond */
    typeDelay : 100,    /* Typing delay in millisecond */
    blinking : 2,       /* Number of cursor blinkings before typing starts */
    cursor : '_',       /* The trailing text that simulates the cursor */
    loop : true         /* Looping over slides */
};

/**
 * jsTyper base class
 */
function jsTyper(elementId, options) {
    options = options || {};
    this.typeDelay = (options.typeDelay !== undefined)? options.typeDelay : jsTyperOptions.typeDelay;
    this.slideDelay = (options.slideDelay !== undefined)? options.slideDelay : jsTyperOptions.slideDelay;
    this.blinking = (options.blinking !== undefined)? options.blinking : jsTyperOptions.blinking;
    this.cursor = (options.cursor !== undefined)? options.cursor : jsTyperOptions.cursor;
    this.loop = (options.loop !== undefined)? options.loop : jsTyperOptions.loop;
    this.slides = [];
    this.timer = null;
    this.typing = false;
    this.playing = false;
    this.currIdx = 0;

    this.init(elementId);
}

/**
 * Initiates typer
 */
jsTyper.prototype.init = function(id) {
    function getInnerElement(el) {
        if (el.children.length === 0) {
            return el;
        } else {
            return getInnerElement(el.children[0]);
        }
    }

    var self = this,
        slider,
        i;

    if (document.readyState != 'complete') {
        setTimeout(function() { self.init(id); }, 100);
        return;
    }

    slider = this.slider = document.getElementById(id);
    if (slider.children.length === 0) {
        return;
    }
    for (i = 0; i < slider.children.length; i++) {
        this.slides[i] = {};
        this.slides[i].outer = slider.children[i];
        this.slides[i].outer.style.display = 'none';
        this.slides[i].inner = getInnerElement(slider.children[i]);
        this.slides[i].text = this.slides[i].inner.innerHTML;
    }
    this.addEvents(slider);
    slider.style.display = '';
    this.playing = true;
    this.play();
};

/**
 * Starts typer
 */
jsTyper.prototype.play = function() {
    var slide = this.slides[this.currIdx],
        prevIdx = (this.currIdx === 0) ?
            this.slides.length - 1 : this.currIdx - 1;
    if (this.playing && !this.typing) {
        this.typing = true;
        this.slides[prevIdx].outer.style.display = 'none';
        this.blink(slide, 0);
        if (this.currIdx === this.slides.length - 1) {
            if (this.loop) {
                this.currIdx = 0;
            } else {
                this.playing = false;
                this.removeEvents(this.slider);
                return;
            }
        } else {
            this.currIdx += 1;
        }
    }
};

/**
 * Blinks cursor before type begins
 */
jsTyper.prototype.blink = function(slide, index) {
    var self = this;
    slide.outer.style.display = '';
    if (index < this.blinking) {
        slide.inner.innerHTML = (index % 2 === 0) ? this.cursor : '';
        setTimeout(function() { self.blink(slide, index + 1); }, (500));
    } else {
        this.type(slide, 0);
    }
};

/**
 * Types inner text of the givven slide
 */
jsTyper.prototype.type = function(slide, index) {
    var self = this;
    slide.inner.innerHTML = slide.text.substr(0, index) + this.cursor;
    if (index < slide.text.length) {
        setTimeout(function() { self.type(slide, index + 1); }, (this.typeDelay));
    } else {
        slide.inner.innerHTML = slide.text;
        this.typing = false;
        if (this.playing) {
            this.timer = setTimeout(function() {
                self.play();
            }, (this.slideDelay));
        }
    }
};

/**
 * Adds pause & play functionality
 */
jsTyper.prototype.addEvents = function(el) {
    var self = this;
    this.resume = function() {
        self.playing = true;
        self.timer = setTimeout(function() {
            self.play();
        }, (1000));
    };
    this.pause = function() {
        clearTimeout(self.timer);
        self.playing = false;
    };
    if (el.addEventListener) {
        el.addEventListener('mouseover', this.pause, false);
        el.addEventListener('mouseout', this.resume, false);
    } else {
        el.attachEvent('onmouseover', this.pause);
        el.attachEvent('onmouseout', this.resume);
    }
};

/**
 * Removes pause & play functionality
 */
jsTyper.prototype.removeEvents = function(el) {
    if (el.removeEventListener) {
        el.removeEventListener('mouseover', this.pause, false);
        el.removeEventListener('mouseout', this.resume, false);
    } else {
        el.detachEvent('onmouseover', this.pause);
        el.detachEvent('onmouseout', this.resume);
    }
};
