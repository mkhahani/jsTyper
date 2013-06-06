jsTyper
=======
#### Pure Javascript Typing Slider ####

jsTyper is a pure JavaScript utility to create typing text effect over a list of items. jsTyper is a good replacement for obsolete HTML "marquee". It is compatible with all major browsers (Opera, Firefox, Chrome, Safari & IE).

jsTyper is free and publishes under the MIT license.

Benefits
--------
* Pure JavaScript (no JS framewok or third party library usage)
* Lightweight with optimized source code
* Compatible with all browsers
* Customizable using CSS
* Easy setup
* Multi instance support
* Configurable per instance
* Cool typing effect
* Pause & play functionality on mouse moves
* Free to use (MIT license)

Usage
-----
Use jsTyper simply in two steps:

1. Add related JS file to your page:

        <script type="text/javascript" src="jstyper.js"></script>

2. Run it by a single line of code:

        new jsTyper(elementID, options);

The first argument, `elementID`, is the ID of the slides container.

The second and optional argument, `options`, sets the behavior of jsTyper. Here are default options:
* **slideDelay** : Integer - Time delay between slides in millisecond. Default is 2000.
* **typeDelay**  : Integer - Typing delay in millisecond. Default is 100.
* **blinking**   : Integer - Number of cursor blinkings before typing starts. Default is 2.
* **cursor**     : String  - The trailing text that simulates the cursor. Default is '_'.
* **loop**       : Boolean - Looping over slides. Default is true.

So you may change default options by setting global variable jsTyperOptions that affects on all created instances of jsTyper:

    jsTyperOptions.typeDelay = 250;

Also you can pass desired options to jsTyper. See the example below.

Example
-------
    <html lang="en">
    <head>
       <script type="text/javascript" src="jstyper.js"></script>
    </head>
    <body>
       <div id="container">
      
         <ul id="my_typer" style="display:none;">
           <li>First list item.</li>
           <li>Second list item.</li>
           <li>Third list item.</li>
           <li>Forth list item.</li>
         </ul>
      
       </div>
    </body>
      
    <script type="text/javascript">
       var options = {slideDelay:3000, typeDelay:40};
       new jsTyper('my_typer', options);
    </script>
  
    </html>

######Important:######
*  The most inner tag of each slide must contains a pure text. DON'T include HTML tags (e.g. `<b>`) in your text.
*  It's better to add inline style `display:none` to your slider to avoid the list to be displayed at startup.