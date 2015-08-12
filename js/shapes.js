
var shapeselect = 1;

function Point(x, y) {
    "use strict";
    this.x = x || 0;
    this.y = y || 0;
}


function Badge(x,y){
    this.x = x || 0 ;
    this.y = y || 0 ;
    }


//base of shape defined

function Shape(state, x, y, w, h, fill, t) {
    "use strict";
    // This is a very simple and unsafe constructor. All we're doing is checking if the values exist.
    // "x || 0" just means "if there is a value for x, use that. Otherwise use 0."
    // But we aren't checking anything else! We could put "Lalala" for the value of x
    this.state = state;
    this.x = x || 0;
    this.y = y || 0;
    this.w = w || 1;
    this.h = h || 1;
    this.fill = fill || '#AAAAAA';
    this.type = t;
    this.points = [];
    this.startx = 0;
    this.starty = 0;
    this.endx = 0;
    this.endy = 0;
    this.newstartx = 0;//for dragin
    this.newstarty = 0//
    if (this.type == 3) {
        this.startx = this.x;
        this.starty = this.y;
        this.endx = this.x;
        this.endy = this.y;
        this.addPoint(new Point(this.x, this.y));
        this.addBadge(new Badge(this.x,this.y));
    }

}


//function to add point

Shape.prototype.addPoint = function (point) {
    "use strict";
    this.points.push(point);
    if (point.x < this.startx)
        this.startx = point.x;
    else if (point.x > this.endx)
        this.endx = point.x;

    if (point.y < this.starty)
        this.starty = point.y;
    else if (point.y > this.endy)
        this.endy = point.y;

};


Shape.prototype.addBadge = function (badge){
this.badges = [] ;
    this.badges.push(badge);


}


/*Shape.prototype.addBadge = function (badgeLeft, badgeTop) {
//    var canvas = document.getElementsByTagName('canvas');
    *//*this.canvas = canvas;*//*
//    this.width = canvas.width;
//    this.height = canvas.height;
//    ctx = canvas.getContext('2d');


}*/

// Draws this shape to a given context


Shape.prototype.draw = function (ctx, optionalColor) {


    "use strict";
    var i, cur, half;
    //ctx.fillStyle = this.fill;
    //ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.strokeStyle = this.fill;
    ctx.lineWidth = 3;
    if (this.state.selection === this)
        ctx.strokeStyle = this.state.selectionColor;

w = this.w ;
    h = this.h ;

    if (this.type == 1) {
        if (this.w < 5) {
            this.w = 5;
        }
        if (this.h < 5) {
            this.h = 5;
        }

        this.badgeLeft = parseInt(this.w / 2);
        this.badgeTop = parseInt(this.h / 2);

        ctx.strokeRect(this.x, this.y, this.w, this.h);
        if(h > 80 || w>70) {
            ctx.beginPath();
            ctx.arc(this.x + this.badgeLeft, this.y + this.badgeTop, 20, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'green';
            ctx.fill();
            ctx.lineWidth = 5;
            ctx.strokeStyle = '#003300';
            ctx.stroke();
        }
    }

    else if (this.type == 2) {

        var x = this.x;
        var y = this.y;
        var w = this.w;
        var h = this.h;


        var kappa = .5522848,
            ox = (w / 2) * kappa, // control point offset horizontal
            oy = (h / 2) * kappa, // control point offset vertical
            xe = x + w,           // x-end
            ye = y + h,           // y-end
            xm = x + w / 2,       // x-middle
            ym = y + h / 2;       // y-middle

        ctx.beginPath();
        ctx.moveTo(x, ym);
    ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
        ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
        ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
        ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
        ctx.closePath(); // not used correctly, see comments (use to close off open path)

        ctx.stroke();


        if(w > 60 || h > 60  ) {
            //  setTimeout(function(){
            ctx.beginPath();
            ctx.arc(xm, ym, 20, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'green';
            ctx.fill();
            ctx.lineWidth = 5;
            ctx.strokeStyle = '#003300';
            ctx.stroke();
        }

        //}, 3000);

//        if()

    }
    else if (this.type == 3) {
        var pl = this.points.length;

        var draw_start = this.points[1];
        var draw_start_x = draw_start.x || 0 ;
        var draw_start_y = draw_start.y || 0 ;



        if (pl > 1) {
            var ax = 0;
            var ay = 0;
            if (this.state.selection === this) {
                ax = this.newstartx - this.startx;
                ay = this.newstarty - this.starty;
            }





            pl = pl - 2;
            for (i = 0; i < pl; i += 1) {

                ctx.beginPath();

                var pnt = this.points[i];
                ctx.moveTo(pnt.x + ax, pnt.y + ay);
                var pnt2 = this.points[i + 1];
                ctx.lineTo(pnt2.x + ax, pnt2.y + ay);
                ctx.stroke();
                ctx.closePath();


            }



            pl = this.points.length;
            for (i = 0; i < pl; i += 1) {

                var pnt = this.points[i];
                pnt.x = pnt.x + ax;
                pnt.y = pnt.y + ay;



            }

            if (this.state.selection === this) {
                this.startx = this.newstartx;
                this.starty = this.newstarty;
                this.endx = this.endx + ax;
                this.endy = this.endy + ay;
            }


        }

//        if(this.draw_start.x && this.draw_start.y) {
            ctx.beginPath();
            ctx.arc(draw_start.x  , draw_start.y, 20, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'green';
            ctx.fill();
            ctx.lineWidth = 5;
            ctx.strokeStyle = '#003300';
            ctx.stroke();
//        }
    }
//    else if ()


    if (this.state.selection === this) {
        //ctx.strokeStyle = this.state.selectionColor;
        //ctx.lineWidth = this.state.selectionWidth;
        //ctx.strokeRect(this.x,this.y,this.w,this.h);

        // draw the boxes
        half = this.state.selectionBoxSize / 2;

        // 0  1  2
        // 3     4
        // 5  6  7
        var totalcontrolpoints = 0;
        if (this.type == 2) {
            totalcontrolpoints = 4;
            this.state.selectionHandles[0].x = this.x + this.w / 2 - half; // 1
            this.state.selectionHandles[0].y = this.y - half; // 1

            this.state.selectionHandles[1].x = this.x - half; // 3
            this.state.selectionHandles[1].y = this.y + this.h / 2 - half; // 3

            this.state.selectionHandles[2].x = this.x + this.w - half; // 4
            this.state.selectionHandles[2].y = this.y + this.h / 2 - half; //4

            this.state.selectionHandles[3].x = this.x + this.w / 2 - half; // 6
            this.state.selectionHandles[3].y = this.y + this.h - half; // 6
        }
        else if (this.type == 1) {

            totalcontrolpoints = 8;
            // top left, middle, right
            this.state.selectionHandles[0].x = this.x - half;
            this.state.selectionHandles[0].y = this.y - half;

            this.state.selectionHandles[1].x = this.x + this.w / 2 - half;
            this.state.selectionHandles[1].y = this.y - half;

            this.state.selectionHandles[2].x = this.x + this.w - half;
            this.state.selectionHandles[2].y = this.y - half;

            //middle left
            this.state.selectionHandles[3].x = this.x - half;
            this.state.selectionHandles[3].y = this.y + this.h / 2 - half;

            //middle right
            this.state.selectionHandles[4].x = this.x + this.w - half;
            this.state.selectionHandles[4].y = this.y + this.h / 2 - half;

            //bottom left, middle, right
            this.state.selectionHandles[6].x = this.x + this.w / 2 - half;
            this.state.selectionHandles[6].y = this.y + this.h - half;

            this.state.selectionHandles[5].x = this.x - half;
            this.state.selectionHandles[5].y = this.y + this.h - half;

            this.state.selectionHandles[7].x = this.x + this.w - half;
            this.state.selectionHandles[7].y = this.y + this.h - half;


        }

        ctx.fillStyle = this.state.selectionBoxColor;
        for (i = 0; i < totalcontrolpoints; i += 1) {
            cur = this.state.selectionHandles[i];
            ctx.fillRect(cur.x, cur.y, this.state.selectionBoxSize, this.state.selectionBoxSize);
        }


    }
};

// Determine if a point is inside the shape's bounds
Shape.prototype.contains = function (mx, my) {
    "use strict";

    return  (this.x <= mx) && (this.x + this.w >= mx) &&
        (this.y <= my) && (this.y + this.h >= my);
};

Shape.prototype.containsFreehandDraw = function (mx, my) {
    "use strict";

    return  (this.startx <= mx) && (this.endx >= mx) &&
        (this.starty <= my) && (this.endy >= my);

};

function CanvasState(canvas) {
    "use strict";
    // **** First some setup! ****

    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = canvas.getContext('2d');
    // This complicates things a little but but fixes mouse co-ordinate problems
    // when there's a border or padding. See getMouse for more detail
    var stylePaddingLeft, stylePaddingTop, styleBorderLeft, styleBorderTop,
        html, myState, i;
    if (document.defaultView && document.defaultView.getComputedStyle) {
        this.stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(canvas, null).paddingLeft, 10) || 0;
        this.stylePaddingTop = parseInt(document.defaultView.getComputedStyle(canvas, null).paddingTop, 10) || 0;
        this.styleBorderLeft = parseInt(document.defaultView.getComputedStyle(canvas, null).borderLeftWidth, 10) || 0;
        this.styleBorderTop = parseInt(document.defaultView.getComputedStyle(canvas, null).borderTopWidth, 10) || 0;
    }
    // Some pages have fixed-position bars (like the stumbleupon bar) at the top or left of the page
    // They will mess up mouse coordinates and this fixes that
    html = document.body.parentNode;
    this.htmlTop = html.offsetTop;
    this.htmlLeft = html.offsetLeft;

    // **** Keep track of state! ****

    this.valid = false; // when set to false, the canvas will redraw everything
    this.shapes = [];  // the collection of things to be drawn
    this.dragging = false; // Keep track of when we are dragging
    this.resizeDragging = false; // Keep track of resize
    this.expectResize = -1; // save the # of the selection handle
    // the current selected object. In the future we could turn this into an array for multiple selection
    this.selection = null;
    this.lastshape = null;
    this.dragoffx = 0; // See mousedown and mousemove events for explanation
    this.dragoffy = 0;

    // New, holds the 8 tiny boxes that will be our selection handles
    // the selection handles will be in this order:
    // 0  1  2
    // 3     4
    // 5  6  7
    this.selectionHandles = [];
    for (i = 0; i < 8; i += 1) {
        this.selectionHandles.push(new Shape(this));
    }

    // **** Then events! ****

    // This is an example of a closure!
    // Right here "this" means the CanvasState. But we are making events on the Canvas itself,
    // and when the events are fired on the canvas the variable "this" is going to mean the canvas!
    // Since we still want to use this particular CanvasState in the events we have to save a reference to it.
    // This is our reference!
    myState = this;

    //fixes a problem where double clicking causes text to get selected on the canvas
    canvas.addEventListener('selectstart', function (e) {
        e.preventDefault();
        return false;
    }, false);
    // Up, down, and move are for dragging


    var loc;

    canvas.addEventListener('mousedown', function (e) {
        var mouse, mx, my, shapes, l, i, mySel;
        if (myState.lastshape)
            myState.lastshape = null;
        if (myState.expectResize !== -1) {
            myState.resizeDragging = true;

            return;
        }
        mouse = myState.getMouse(e);
        mx = mouse.x;
        my = mouse.y;
        shapes = myState.shapes;
        l = shapes.length;
        for (i = l - 1; i >= 0; i -= 1) {
            if (shapes[i].type != 3 && shapes[i].contains(mx, my)) {
                mySel = shapes[i];

                loc = shapes.indexOf(mySel);


                if (shapeselect == 4) {
                    shapes.splice(loc, 1);
                }
                // Keep track of where in the object we clicked
                // so we can move it smoothly (see mousemove)

                myState.selection = mySel;

                myState.dragoffx = mx - mySel.x;
                myState.dragoffy = my - mySel.y;
                myState.dragging = true;

                myState.valid = false;
                return;
            }
        }

        for (i = l - 1; i >= 0; i -= 1) {
            if (shapes[i].type == 3 && shapes[i].containsFreehandDraw(mx, my)) {
                mySel = shapes[i];
                // Keep track of where in the object we clicked
                // so we can move it smoothly (see mousemove)


                loc = shapes.indexOf(mySel);

                if (shapeselect == 4) {
                    shapes.splice(loc, 1);
                }

                myState.selection = mySel;
                mySel.newstartx = mySel.startx;
                mySel.newstarty = mySel.starty;
                myState.dragoffx = mx - mySel.startx;
                myState.dragoffy = my - mySel.starty;
                myState.dragging = true;
                myState.valid = false;
                return;
            }
        }


        // havent returned means we have failed to select anything.
        // If there was an object selected, we deselect it
        if (myState.selection) {
            myState.selection = null;

            myState.valid = false; // Need to clear the old selection border
        }

        myState.addShape(new Shape(myState, mx, my, 0, 0, '#000', shapeselect));


        var len = myState.shapes.length;

        myState.lastshape = myState.shapes[len - 1];
        myState.valid = false;


    }, true);

    /*mouse move on drawing */

    canvas.addEventListener('mousemove', function (e) {
        var mouse = myState.getMouse(e),
            mx = mouse.x,
            my = mouse.y,
            oldx, oldy, i, cur;
        if (myState.lastshape) {
            if (myState.lastshape.type == 3) {
                myState.lastshape.addPoint(new Point(mx, my));
            }
            else {
                myState.lastshape.w = mx - myState.lastshape.x;
                myState.lastshape.h = my - myState.lastshape.y;

            }


            myState.valid = false;
        }


        if (myState.dragging) {
            mouse = myState.getMouse(e);
            // We don't want to drag the object by its top-left corner, we want to drag it
            // from where we clicked. Thats why we saved the offset and use it here
            if (myState.selection && myState.selection.type == 3) {
                myState.selection.newstartx = mouse.x - myState.dragoffx;
                myState.selection.newstarty = mouse.y - myState.dragoffy;
            }
            else {
                myState.selection.x = mouse.x - myState.dragoffx;
                myState.selection.y = mouse.y - myState.dragoffy;
            }


            myState.valid = false; // Something's dragging so we must redraw
        } else if (myState.resizeDragging) {
            // time ro resize!
            oldx = myState.selection.x;
            oldy = myState.selection.y;

            // 0  1  2
            // 3     4
            // 5  6  7
            switch (myState.expectResize) {
                case 0:
                    myState.selection.x = mx;
                    myState.selection.y = my;
                    myState.selection.w += oldx - mx;
                    myState.selection.h += oldy - my;
                    break;
                case 1:
                    myState.selection.y = my;
                    myState.selection.h += oldy - my;
                    break;
                case 2:
                    myState.selection.y = my;
                    myState.selection.w = mx - oldx;
                    myState.selection.h += oldy - my;
                    break;
                case 3:
                    myState.selection.x = mx;
                    myState.selection.w += oldx - mx;
                    break;
                case 4:
                    myState.selection.w = mx - oldx;
                    break;
                case 5:
                    myState.selection.x = mx;
                    myState.selection.w += oldx - mx;
                    myState.selection.h = my - oldy;
                    break;
                case 6:
                    myState.selection.h = my - oldy;
                    break;
                case 7:
                    myState.selection.w = mx - oldx;
                    myState.selection.h = my - oldy;
                    break;
            }

            myState.valid = false; // Something's dragging so we must redraw
        }

        // if there's a selection see if we grabbed one of the selection handles
        if (myState.selection !== null && !myState.resizeDragging && myState.selection.type != 3) {
            var totalcontrolpoints = 0;
            if (myState.selection.type == 1)
                totalcontrolpoints = 8;
            else if (myState.selection.type == 2)
                totalcontrolpoints = 4;

            for (i = 0; i < totalcontrolpoints; i += 1) {
                // 0  1  2
                // 3     4
                // 5  6  7

                cur = myState.selectionHandles[i];

                // we dont need to use the ghost context because
                // selection handles will always be rectangles
                if (mx >= cur.x && mx <= cur.x + myState.selectionBoxSize &&
                    my >= cur.y && my <= cur.y + myState.selectionBoxSize) {
                    // we found one!
                    myState.expectResize = i;
                    myState.valid = false;

                    switch (i) {
                        case 0:
                            this.style.cursor = 'nw-resize';
                            if (myState.selection.type == 2) {
                                myState.expectResize = 1;
                                this.style.cursor = 'n-resize';
                            }
                            break;
                        case 1:
                            this.style.cursor = 'n-resize';
                            if (myState.selection.type == 2) {
                                myState.expectResize = 3;
                                this.style.cursor = 'w-resize';
                            }
                            break;
                        case 2:
                            this.style.cursor = 'ne-resize';
                            if (myState.selection.type == 2) {
                                myState.expectResize = 4;
                                this.style.cursor = 'e-resize';
                            }
                            break;
                        case 3:
                            this.style.cursor = 'w-resize';
                            if (myState.selection.type == 2) {
                                myState.expectResize = 6;
                                this.style.cursor = 's-resize';
                            }
                            break;
                        case 4:
                            this.style.cursor = 'e-resize';
                            break;
                        case 5:
                            this.style.cursor = 'sw-resize';
                            break;
                        case 6:
                            this.style.cursor = 's-resize';
                            break;
                        case 7:
                            this.style.cursor = 'se-resize';
                            break;
                    }
                    return;
                }

            }
            // not over a selection box, return to normal
            myState.resizeDragging = false;
            myState.expectResize = -1;
            this.style.cursor = 'auto';
        }


    }, true);

    /*canvas state */
    canvas.addEventListener('mouseup', function (e, ctx) {
        myState.dragging = false;
        myState.resizeDragging = false;
        myState.expectResize = -1;
        if (myState.selection !== null) {
            if (myState.selection.w < 0) {
                myState.selection.w = -myState.selection.w;
                myState.selection.x -= myState.selection.w;
            }
            if (myState.selection.h < 0) {
                myState.selection.h = -myState.selection.h;
                myState.selection.y -= myState.selection.h;
            }


        }
        if (myState.lastshape) {

            if (myState.lastshape.w < 0) {
                myState.lastshape.w = -myState.lastshape.w;
                myState.lastshape.x -= myState.lastshape.w;
            }
            if (myState.lastshape.h < 0) {
                myState.lastshape.h = -myState.lastshape.h;
                myState.lastshape.y -= myState.lastshape.h;
            }


            myState.lastshape = null;
        }


    }, true);
    // double click for making new shapes
    canvas.addEventListener('dblclick', function (e) {
        //var mouse = myState.getMouse(e);
        //myState.addShape(new Shape(myState, mouse.x - 10, mouse.y - 10, 20, 20, 'rgba(0,255,0,.6)'));
    }, true);

    // **** Options! ****

    this.selectionColor = '#CC0000';
    this.selectionWidth = 2;
    this.selectionBoxSize = 6;
    this.selectionBoxColor = 'darkred';
    this.interval = 30;
    setInterval(function () {
        myState.draw();
    }, myState.interval);
}
/*shapes generated are added to shapes array*/


CanvasState.prototype.addShape = function (shape) {
    "use strict";
    this.shapes.push(shape);
    this.valid = false;
};


CanvasState.prototype.clear = function () {
    "use strict";
    this.ctx.clearRect(0, 0, this.width, this.height);
};

// While draw is called as often as the INTERVAL variable demands,
// It only ever does something if the canvas gets invalidated by our code
CanvasState.prototype.draw = function () {
    "use strict";
    var ctx, shapes, l, i, shape, mySel;
    // if our state is invalid, redraw and validate!
    if (!this.valid) {
        ctx = this.ctx;
        shapes = this.shapes;
        this.clear();

        // ** Add stuff you want drawn in the background all the time here **

        // draw all shapes
        l = shapes.length;
        for (i = 0; i < l; i += 1) {
            shape = shapes[i];
            // We can skip the drawing of elements that have moved off the screen:
            if (shape.x <= this.width && shape.y <= this.height &&
                shape.x + shape.w >= 0 && shape.y + shape.h >= 0) {
                shapes[i].draw(ctx);
            }
        }


        this.valid = true;
    }
};


// Creates an object with x and y defined, set to the mouse position relative to the state's canvas
// If you wanna be super-correct this can be tricky, we have to worry about padding and borders
CanvasState.prototype.getMouse = function (e) {
    "use strict";
    var element = this.canvas, offsetX = 0, offsetY = 0, mx, my;

    // Compute the total offset
    if (element.offsetParent !== undefined) {
        do {
            offsetX += element.offsetLeft;
            offsetY += element.offsetTop;
            element = element.offsetParent;
        } while (element);
    }

    // Add padding and border style widths to offset
    // Also add the <html> offsets in case there's a position:fixed bar
    offsetX += this.stylePaddingLeft + this.styleBorderLeft + this.htmlLeft;
    offsetY += this.stylePaddingTop + this.styleBorderTop + this.htmlTop;

    mx = e.pageX - offsetX;
    my = e.pageY - offsetY;

    // We return a simple javascript object (a hash) with x and y defined
    return {x: mx, y: my};
};


// If you dont want to use <body onLoad='init()'>
// You could uncomment this init() reference and place the script reference inside the body tag
//init();


function init() {
    "use strict";
    var s = new CanvasState(document.getElementsByTagName("canvas")[0]);
    // add a large green rectangle

}

/*shape selection functions */
function rectangle() {
    shapeselect = 1;
    document.getElementById("canvas1").style.cursor = "cell";


}

function circle() {
    shapeselect = 2;
    document.body.style.cursor = "cell";
}

function freehand() {
    shapeselect = 3;
    document.body.style.cursor = "crosshair";
}
function deleteShape() {
    shapeselect = 4;
    document.body.style.cursor = "move";

}

function badge() {
    shapeselect = 5;

}

