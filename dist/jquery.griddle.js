/*
 *  jquery-griddle - v1.0.0
 *  jQuery Plugin to responsively equalise horizontal widths of floated elements.
 *  
 *
 *  Made by James Buncle
 *  Under MIT License
 */
(function ($) {
    "use strict";
    $.fn.griddle = function () {
        return this.each(function () {
            var $obj = $(this), lastSize = $obj.outerWidth(true);
            $(window).resize(function () {
                var newWidth = $obj.outerWidth(true);
                //Only resize if the container has actually changed width
                if (newWidth !== lastSize) {
                    $.fn.griddle.layout($obj.children());
                    lastSize = newWidth;
                }
            });
            $.fn.griddle.layout($obj.children());
        });
    };
    $.fn.griddle.layout = function ($objs) {
        var $parent = $objs.parent(),
                parentWidth = $parent.innerWidth(),
                $currRow = $([]),
                topOffset = 0, maxHeight;
        $objs.each(function () {
            var $currObj = $(this), maxHeight;
            $currObj.css({
                'position': 'absolute',
                'width': 'auto'
            });
            /* 
             * Check if adding object to current row will
             * shrink elements beyond their original size
             */
            if (parentWidth / ($currRow.length + 1)
                    < $.fn.griddle.getMaxWidth($currRow.add($currObj))) {
                //Adding new element will not fit, jump to next row
                maxHeight = $.fn.griddle.getMaxHeight($currRow);
                $.fn.griddle.doRow($currRow, parentWidth, topOffset);
                topOffset += maxHeight;
                $currRow = $currObj;
            } else {
                //Will fit, add it
                $currRow = $currRow.add($currObj);
            }
        });
        maxHeight = $.fn.griddle.getMaxHeight($currRow);
        $.fn.griddle.doRow($currRow, parentWidth, topOffset);
        topOffset += maxHeight;
        $parent.height(topOffset);
        $parent.css('position', 'relative');
    };
    /**
     * Layout the given elements children evenly on the same line
     * 
     * @param {type} $obj
     * @param {type} parentWidth
     * @param {type} topOffset
     */
    $.fn.griddle.doRow = function ($obj, parentWidth, topOffset) {
        var remainder = parentWidth % $obj.length,
                width = parentWidth / $obj.length,
                diff;

        $obj.each(function (index) {
            var $obj = $(this),
                    //Calculate padding, margin & border difference to adjust
                    diff = $obj.outerWidth(true) - $obj.width();
            $obj.css({
                'position': 'absolute',
                'width': width - diff,
                'left': width * index,
                'top': topOffset
            });
        });
        //Add any remainder to the last element to not leave any spacing
        diff = $obj.last().outerWidth(true) - $obj.last().width();
        $obj.last().width(width + remainder - diff);
    };

    /**
     * Get the height of the tallest element
     * 
     * @param {type} $objs
     * @returns {Number|@var;outerHeight}
     */
    $.fn.griddle.getMaxHeight = function ($objs) {
        var maxHeight = 0;
        $objs.each(function () {
            var outerHeight = $(this).outerHeight();
            if (outerHeight > maxHeight) {
                maxHeight = outerHeight;
            }
        });
        return maxHeight;
    };
    /**
     * Get the width of the widest elements
     * 
     * @param {type} $objs
     * @returns {@var;thisWidth|Number}
     */
    $.fn.griddle.getMaxWidth = function ($objs) {
        var maxWidth = 0;
        $objs.each(function () {
            var thisWidth = $(this).outerWidth(true);
            if (thisWidth > maxWidth) {
                maxWidth = thisWidth;
            }
        });
        return maxWidth;
    };
}(jQuery));