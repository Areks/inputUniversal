(function($) {

    // detecting  i9, because jQuery.browser is deprecated
    var isIE9 = false,
        isIE = false;
    /*@cc_on
        isIE = true;
        @if (@_jscript_version == 9)
            isIE9 = true;
        @end
    @*/

    //Checking event's support in element
    var isSupportedEvent = function (eventName, nodeName) {
        var el = document.createElement(nodeName);
        eventName = 'on' + eventName;
        var isSupported = (eventName in el);
        if (!isSupported) {
            el.setAttribute(eventName, 'return;');
            isSupported = typeof el[eventName] == 'function';
        }
        el = null;
        return isSupported;
    }

    $.event.special.inputUniversal = {
        setup: function(data, namespaces) {
            if (isSupportedEvent("input", this.nodeName) && !isIE9) { // if browser support oninput
                $(this).on( "input.onevent", function(event){
                    event.type = "inputUniversal";
                    $.event.handle.apply(this, arguments);
                })
            } else if (isIE && !isIE9) { // for ie < 9
                $(this).on( "propertychange.onevent", function(event){
                    event.type = "inputUniversal";
                    $.event.handle.apply(this, arguments);
                } );
            } else { // for other browser
                $(this).on("keypress.onevent keyup.onevent paste.onevent cut.onevent IE9EventFix", function (event){
                    switch (event.type) {
                        case "cut":
                        case "paste":
                            setTimeout(function(){
                                $(event.target).trigger("IE9EventFix");
                            }, 1);
                            break;
                        default:
                            event.type = "inputUniversal";
                            $.event.handle.apply(this, arguments);
                            break;
                    }
                });
            }

        },

        teardown: function(namespaces) {
            var elem = this, $elem = jQuery(elem);
            if (isSupportedEvent("input", item.nodeName) && !isIE9) {
                this.off("input.onevent")
            } else if (isIE && !isIE9) {
                this.off("propertychange.onevent")
            } else {
                this.off("keypress.onevent keyup.onevent paste.onevent cut.onevent IE9EventFix");
            }

        },

        handler: function(event) {

        }
    };

    // add input function support
    $.fn.inputUniversal = function(data, fn){

        if ( fn == null ) {
            fn = data;
            data = null;
        }

        return arguments.length > 0 ?
            this.on("inputUniversal", null, data, fn ) :
            this.trigger( name );
    };
})(jQuery);