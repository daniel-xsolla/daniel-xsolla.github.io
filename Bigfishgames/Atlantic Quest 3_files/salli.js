if (typeof jQuery != 'undefined') {
    if (!$.ct) {
        // define generic check type function that returns true if object is
        // of the given type string
        $.ct = function(thing,type) {
            if(!type) {
                return(typeof thing!='undefined');
            }
            else
            {
                var sps={element:1,textnode:1,whitespace:1,arguments:1,regexp:1,collection:1,array:1,jquery:1};
                return (sps[type]?(get_type(thing)==type):(typeof thing==type));
            }
        };
    }

    if(!$.ct($.bfg, 'object')) {
        //<![CDATA[
        $.bfg = {};
        $.bfg.cfg = {};
        //]]>
    }

    /**
     * Salli/Salli-g interface "class".
     */
    $.bfg.Salli = function() {
        /**
         * set up default variables
         */
        this.action = "signin";
        this.form_id = "form_login";
        this.css = false;
        this.salli_source_param = 'ol=';
        this.query_string_params = {};
    };

    $.bfg.Salli.prototype.ajaxErrorCallback = function(){};

    /**
     * User-initiated invocation.
     * This allows the user to decide when and where SALLI is invoked
     *
     * @param opts which contains keys for the following:
     *  string action
     *  string form_id
     *  string css
     *  function after_load
     *  function after_submit
     *  function after_success
     *  function after_failure
     *  string susi_url
     *  string help_url
     *  string salli_css_url
     *  function ajaxErrorCallback
     *
     * @return void
     */
    $.bfg.Salli.prototype.invoke = function(opts) {
        if(!$.ct(opts, 'object')) {
            opts = {};
        }

        opts.action = opts['action'] || this.action;
        opts.susi_url = opts['susi_url'] || $.bfg.cfg.paths.susi_url;
        opts.help_url = opts['help_url'] || null;
        opts.after_load = opts['after_load'] || this.after_load;
        opts.after_submit = opts['after_submit'] || this.after_submit;
        opts.after_success = opts['after_success'] || this.after_success;
        opts.after_failure = opts['after_failure'] || this.after_failure;
        opts.ajaxTimeoutCallback = opts['ajaxTimeoutCallback'] || this.ajaxTimeoutCallback;
        opts.ajaxErrorCallback = opts['ajaxErrorCallback'] || this.ajaxErrorCallback;
        opts.form_request_complete = opts['form_request_complete'] || this.form_request_complete;
        opts.form_submit = opts['form_submit'] || this.form_submit;
        opts.form_submit_complete = opts['form_submit_complete'] || this.form_submit_complete;
        opts.insert_help_url = opts['insert_help_url'] || this.insert_help_url;
        opts.clear_errors = opts['clear_errors'] || this.clear_errors;
        opts.show_message = opts['show_message'] || this.show_message;
        opts.form_id = opts['form_id'] || this.form_id;
        opts.salli_source_param = opts['salli_source_param'] || this.salli_source_param;

        // Allows an object to be passed in containing queryString params to be added.
        // The object key is the param name and the value is the param value.
        // e.g. { appid: 'com.bigfishgame.fairway', platform: 'ios', newsletter: 'isplash'}
        // This is extensible if future params need to be passed in
        opts.query_string_params = opts['query_string_params'] || this.query_string_params;

        var salli_form = $('#'+opts.form_id);
        // validation of supplied arguments
        if ($.ct(opts.susi_url, 'undefined')) {
            salli_form.html("<p>ERROR: You have not specified susi_url as a parameter." +
                "<br />This should look something like 'http://susi.bigfishgames.com'." +
                "<br />Excuse me while I fall over gracefully...</p>");
            return;
        }
        if (opts.help_url && !(new RegExp('^(https?:)?//')).test(opts.help_url)) {
            salli_form.html("<p>ERROR: help_url must be an absolute URL." +
                "<br />Excuse me while I fall over gracefully...</p>");
            return;
        }

        var url = opts.susi_url+"/sallig/"+opts.action+"/get";

        // set up the css
        var css = opts['css'] || this.css;
        if (css) {
            var salli_css_url = opts['salli_css_url'] || $.bfg.cfg.paths.salli_css_url;
            salli_form.addClass("form_salli");
            $('head').append(
                '<link rel="stylesheet" href="'+
                    salli_css_url+
                    '" type="text/css" />');
        }

        // get our form
        var getData = 'callback=?';
        // pass origin property when appropriate
        if(opts.salli_source_param !== undefined) {
            getData = getData + '&' + opts.salli_source_param;
        }

        // Build up queryString parameters to append to the request
        for (var p in opts.query_string_params) {
            getData = getData + '&' + p + '=' + opts.query_string_params[p];
        }

        $.ajax({
            url: url,
            data: getData,
            dataType: "jsonp",
            timeout: 20000,
            success: function(data) {
                opts.form_request_complete(data, opts);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                if (textStatus === 'timeout') {
                    opts.ajaxTimeoutCallback();
                }
                else {
                    opts.ajaxErrorCallback();
                }
            }
        });

    };

    /**
     * Callback when Salli form request has returned from server.
     *
     * @param data the JSON data object of the response.
     * @param opts additional data passed as process e.g. callbacks, info, etc.
     */
    $.bfg.Salli.prototype.form_request_complete = function(data, opts) {
        var salli_form = $('#'+opts.form_id);
        salli_form.html(data.html);
        // Fire callback method:
        if($.ct(opts.after_load, 'function')) {
            opts.after_load(opts);
        }
        salli_form.unbind('submit').submit(function(e) {
            opts.form_submit(e, opts);
        });
    };

    /**
     * Callback when Salli form submit button is pressed.
     *
     * @param event the JS event object
     * @param opts additional data passed as process e.g. callbacks, info, etc.
     */
    $.bfg.Salli.prototype.form_submit = function(event, opts) {
        event.preventDefault();

        // clear errors - in cases where a user re-submits the form
        opts.clear_errors();

        var post_data = $('#'+opts.form_id).serialize();
        if(opts.salli_source_param !== undefined) {
            post_data = post_data + '&' + opts.salli_source_param;
        }

        // Build up queryString parameters to append to the request
        for (var p in this.query_string_params) {
            post_data = post_data + '&' + p + '=' + this.query_string_params[p];
        }

        var post = opts.susi_url+"/sallig/"+opts.action+"/post";
        $.ajax({
            url: post + '?callback=?',
            data: post_data,
            dataType: "jsonp",
            timeout: 20000,
            success: function(data) {
                opts.form_submit_complete(data, opts);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                if (textStatus === 'timeout') {
                    opts.ajaxTimeoutCallback();
                }
                else {
                    opts.ajaxErrorCallback();
                }
            }
        });
    };

    /**
     * Callback when Salli form is submitted and returns response from server.
     * Note this injects help_url where needed - if overriding, must replicate
     * the same behaviour.
     *
     * @param data the JSON data object response
     * @param opts additional data passed as process e.g. callbacks, info, etc.
     */
    $.bfg.Salli.prototype.form_submit_complete = function(data, opts) {
        // replace SUSI help url if listed in message body
        if (opts && opts.help_url) {
            data = opts.insert_help_url(data, opts);
        }
        var isSubmitValid = $.ct(opts.after_submit, 'function');
        if(isSubmitValid) {
            opts.after_submit(data, opts);
        }
        if(data.success && isSubmitValid) {
            opts.after_success(data, opts);
        } else {
            opts.after_failure(data, opts);
        }
    };

    /**
     * Inserts the help URL defined in the opts into the supplied data object.
     * Recursively traverses the data object for all potential HTML data and
     * attempts insert.
     *
     * @param data text data
     * @param opts injection object
     *
     * @return object data, possibly modified with new URL
     */
    $.bfg.Salli.prototype.insert_help_url = function(data, opts) {
        for(var key in data) {
            var curData = data[key];
            if ($.ct(curData, 'object')) {
                curData = opts.insert_help_url(curData, opts);
            }
            else if ($.ct(curData, 'string')) {
                var element = $('<div>' + curData + '</div>');
                if (element.length > 0) {
                    element.find('.susi_help_url').prop('href', opts.help_url);
                }
                curData = element.html();
            }
            data[key] = curData;
        }
        return data;
    };

    /**
     * Callback invoked when Salli form has finished loading - by default,
     * does nothing
     *
     * @param opts injection object
     */
    $.bfg.Salli.prototype.after_load = function(opts) {

    };

    /**
     * Callback invoked after Salli form is submitted - by default, does nothing
     *
     * @param data
     * @param opts injection object
     *
     * @return void
     */
    $.bfg.Salli.prototype.after_submit = function(data, opts) {

    };

    /**
     * Callback invoked after Salli form succeeds - by default, does nothing
     *
     * @param data
     * @param opts injection object
     *
     * @return void
     */
    $.bfg.Salli.prototype.after_success = function(data, opts) {

    };

    /**
     * Callback invoked after Salli form submission fails - displays given
     * message data.
     *
     * @param data messages to display
     * @param opts injection object
     *
     * @return void
     */
    $.bfg.Salli.prototype.after_failure = function(data, opts) {
        opts.show_message(data, opts);
    };

    /**
     * Build error boxes for form validation.
     *
     * @param msg_list list of messages to display
     * @param opts optional data injected via object
     *
     * @return void
     */
    $.bfg.Salli.prototype.show_message = function(msg_list, opts) {
        // clear any errors that have been set previously - use
        // default or client-supplied version of clear.
        var clear_errors = this.clear_errors;
        if(opts && $.ct(opts.clear_errors, 'function')) {
            clear_errors = opts.clear_errors;
        }
        clear_errors();
        for(var key in msg_list) {
            var selector = msg_list[key]['selector'];
            var message = msg_list[key]['msg'];
            var type = msg_list[key]['type'];
            var formError = $('<div class="formErrors">'+message+'</div>');

            // if existing CSS class matches message key, modify element
            var keyElement = $('.f_' + key);
            if(keyElement.length) {
                // don't insert error message text if empty message text
                if(message !== '') {
                    if(type === 'element' && selector !== '') {
                        $('.f_' + selector)
                            .prepend(formError.hide().fadeIn())
                            .css('display','block');
                    }
                    else {
                        formError.hide().prependTo(keyElement).fadeIn();
                    }
                }
                keyElement.addClass('wrong');
            }

            // otherwise insert error into generic selector
            else if(message !== '' && selector !== '' ) {
                $('.' + selector)
                    .append(formError.hide().fadeIn())
                    .css('display','block');
            }
        }
    };

    /**
     * Clears all form errors and removes from display.
     *
     * @return void
     */
    $.bfg.Salli.prototype.clear_errors = function() {
        $('.formErrors').empty().remove();
        $('.formSuccess').empty().remove();
        $('.wrong').removeClass('wrong');
    };

    /**
     * MOMA implement fire_event - currently uses overlay, we don't want to be
     * dependent on this.
     */
    $.bfg.Salli.prototype.fire_event = function(eview, ob){
        //var final_ob = (eview ? {'view': eview} : {});
        //$.extend(final_ob, ob);
        //$.bfg.overlay.fire_event('salli', final_ob);
    };

    // create instance of SalliClass class for backwards compatibility.
    $.bfg.salli = new $.bfg.Salli();
}
