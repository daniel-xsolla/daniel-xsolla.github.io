(function($) {
    /**
     * -----------------
     * BFG HEADER BANNER
     * -----------------
     * A notification banner system for bfg_header
     * @author: Aaron Ostrowsky <aaron.ostrowsky@bigfishgames.com>
     *
     * @param object options - cookie key with optional value, type, and onInit custom logic
     *
     * $('#my-banner').bfgHeaderBanner({
     *      key: 'MyParamKey',
     *      onInit: function() {
     *        // ...whatever custom JS you need to run for this banner
     *        // i.e. specific to the page when banner to be shown
     *        // e.g. set a cookie when user clicks link on page
     *      });
     *
     */
    $.fn.bfgHeaderBanner = function(options) {

        var banner = $.extend({
            elements: this,
            key: '',
            value: 'true',
            cookie: 'weekPrefs',// sessionPrefs, weekPrefs, permaPrefs
            onInit: function() { return false; },
            onShow: function() { return false; },
            onClose: function() { return false; },
            _init: function() {
                var that = this,
                    elements = that.elements;
                // banner present in DOM
                if (elements.length) {
                    // onInit custom logic
                    that.onInit();
                    return elements.each(function() {
                        if ($.userPrefs.getPrefs(that.key, that.cookie) != that.value) {
                            that._displayBanner( this );
                        }
                    });
                }
            },
            _displayBanner: function(element) {
                var that = this,
                    element = $(element);

                // display banner
                if ($.userPrefs.getPrefs(that.key + 'BannerOpen', that.cookie) != '1') {
                    // slide open if not already open
                    element.slideDown('slow');
                    $.userPrefs.savePrefs(that.key + 'BannerOpen', '1', that.cookie);
                } else {
                    element.show();
                }
                // onShow custom logic
                that.onShow();
                // set close btn action
                element.find('a.bfg-header-banner-close').click(function() {
                    // close banner
                    element.slideUp();
                    // set cookie
                    $.userPrefs.savePrefs(that.key, that.value, that.cookie);
                    // onClose custom logic
                    that.onClose();
                });
            }
        }, options);

        // initialize banner
        banner._init(options);

    };

     $.fn.bfgTLSHeaderBanner = function(options) {

        var banner = $.extend({
            elements: this,
            key: '',
            value: 'true',
            cookie: 'weekPrefs',// sessionPrefs, weekPrefs, permaPrefs
            onInit: function() { return false; },
            onShow: function() { return false; },
            onClose: function() { return false; },
            _init: function() {
                var that = this,
                    elements = that.elements;
                // banner present in DOM
                if (elements.length) {
                    // onInit custom logic
                    that.onInit();
                    return elements.each(function() {
                        that._displayBanner( this );
                    });
                }
            },
            _displayBanner: function(element) {
                var that = this,
                    element = $(element);

                // display banner
                if ($.userPrefs.getPrefs(that.key + 'BannerOpen', that.cookie) != '1') {
                    // slide open if not already open
                    element.slideDown('slow');
                    $.userPrefs.savePrefs(that.key + 'BannerOpen', '1', that.cookie);
                } else {
                    element.show();
                }
                // onShow custom logic
                that.onShow();
                // set close btn action
                element.find('a.bfg-header-banner-close').click(function() {
                    // close banner
                    element.slideUp();

                    // onClose custom logic
                    that.onClose();
                });
            }
        }, options);

        // initialize banner
        banner._init(options);

    };
})(this.jQuery);

$(function(){


    //------------------
    // TLS Warning Banner
    //------------------
    $('#bfg-tls-warning-banner').bfgTLSHeaderBanner();

    //------------------
    // IE Warning Banner
    //------------------
    $('#bfg-ie-warning-banner').bfgHeaderBanner({
        key: 'IEWarned',
        value: 'yes',
        cookie: 'sessionPrefs'
    });


    //---------------------
    // Cookie Policy Banner
    //---------------------
    $('#bfg-cookie-policy-banner').bfgHeaderBanner({
        key: 'CookiePolicyUserConsent',
        cookie: 'permaPrefs',
        excludedParents:
        // exclude links from certain parents
        // can be array of jquery selectors or string containing a single selector
        ['#overlay', '#simplemodal-overlay', '.bfg-header-banner'],
        hasParent:
        // determine if target link is contained within parent element
        function(target, parent) {
            var parents = (typeof parent == 'string') ? [parent] : parent,
                elms = 0;
            for (var i = 0; i < parents.length; i++) {
                var inParentElm = $(target).closest(parents[i]).length;
                elms = elms + inParentElm;
            };
            return (elms > 0);
        },
        onInit: function() {
            var that = this;
            // link consent action
            $('a').live('click', function(e) {
                // do nothing if link is excluded
                if (that.hasParent(e.target, that.excludedParents)) return;

                // consent: any link other than cookie policy page i.e. links w/ data attribute 'data-ignore-cookie-policy'
                var ignoreCookiePolicy = $(e.target).data('ignoreCookiePolicy');
                if (typeof ignoreCookiePolicy == 'undefined' || ignoreCookiePolicy == false) {
                    // set cookie
                    $.userPrefs.savePrefs(that.key, that.value, that.cookie);
                }
            });
        }
    });


});
$.bfg.placeholder = {

    // Checks if the placeholder attribute is supported
    isPlaceholderSupported: function() {
        return 'placeholder' in document.createElement('input');
    },

    // Sets the value of the input field to the placeholder attribute
    setPlaceholder: function($elem) {
        var placeholder = $elem.attr('placeholder');
        if (placeholder) {
            $elem.val(placeholder);
            $elem.addClass('bfg-placeholder');
        }
    },

    // Removes the placeholder from the input field value
    removePlaceholder: function($elem) {
        $elem.val('');
        $elem.removeClass('bfg-placeholder');
    },

    // Runs through the inputs and attaches the focus and blur events
    run: function() {
        if (!$.bfg.placeholder.isPlaceholderSupported()) {
            var $inputFields = $('form.bfg-search input[placeholder]');

            // On focus, empty the field if the current text is the placeholder
            $inputFields.focus(function() {
                if ($(this).val() === $(this).attr('placeholder')) {
                    $.bfg.placeholder.removePlaceholder($(this));
                }
            });

            // On blur, set the placeholder text in the value if the field is empty
            $inputFields.blur(function() {
                if (!$(this).val()) {
                    $.bfg.placeholder.setPlaceholder($(this));
                }
            });

            // Apply the placeholder text to all empty fields
            $inputFields.each(function() {
                if (!$(this).val()) {
                    $.bfg.placeholder.setPlaceholder($(this));
                }
            });
        }
    }

};

$(function() {
    $.bfg.placeholder.run();
});

$(function() {
    if($('#login_link_punch_card').size() > 0) {
        $punchCardToolTip = $('.punch-card-tooltip');
    
        var getPunchCardTip = function($punchCardToolTip) {
            $.ajax({
                url: $('#login_link_punch_card').data('tooltip').url,
                success: function(data){
                    $punchCardToolTip.html(data['content'][0]);
                    // @todo Simplify the html in the payload. Way too many ids going on there.
                },
                dataType: 'jsonp',
                jsonpCallback : 'jsonp' + Math.floor(Math.random() * Math.pow(2, 32))
            });
        };
    
        if ($punchCardToolTip) {
            getPunchCardTip($punchCardToolTip);
            window.setInterval(function() {
                getPunchCardTip($punchCardToolTip);
            }, 300000);
        }
    }
});

/**
 * RedirectCookie.js
 *
 * Handles session pref cookie setting when devices are on international sites
 * and we are redirecting them to the iOS page.
 */
(function ($) {
    "use strict";
    /*global window, document, location, alert: false, console: false, jQuery: false, $: false */

    $.fn.redirectCookie = function () {

        var allowedLanguages = ['de', 'es', 'fr', 'jp'],
            allowedPlatforms = ['android', 'ipad', 'iphone'],
            config = $.bfg.cfg,
            link;

        return this.each(function () {

            $(this).click(function (event) {

                // iOS and allowed languages only
                if ($.inArray(config.lang, allowedLanguages) !== false
                        && $.inArray(config.platform.os_name, allowedPlatforms)) {

                    link = $(this).attr('href');
                    if (link.charAt(link.length - 1) === '/') {
                        link = link.substr(0, link.length - 1);
                    }

                    // Check if this is a dl_index path by comparing it to the home page
                    if (link === config.paths.hurl) {
                        event.preventDefault();
                        $.userPrefs.savePrefs('overrideHomePageRedirect', true, 'sessionPrefs');
                        window.location.href = $(this).attr('href');
                    }

                }

            });

        });

    };

}(jQuery));

$(window).load(function () {
    "use strict";
    /*global window, document, alert: false, console: false, jQuery: false, $: false */
    $('.bfg-header .bfg-primary-nav a, #footer .footer_block a, .breadcrumbs a, #sitemap a').redirectCookie();
});

/**
 * SalliG.js
 *
 * SALLI-G header scripts
 */
/*global window, document, location, alert: false, console: false, jQuery: false, $: false */


// Add the $.bfg.header object if it doesn't already exist
$.bfg = $.bfg || {};
$.bfg.header = $.bfg.header || {};


/**
 * SALLI-G Header object
 *
 * @type {Object}
 */
$.bfg.header.sallig = {

    /**
     * COPPA Compliance cookie name
     * @type {String}
     */
    coppaComplianceCookie: 'coppaComplianceLockout',

    /**
     * Default month field selector
     * @type {String}
     */
    dobMonthSel: '.reg_dob_month',

    /**
     * Default day field selector
     * @type {String}
     */
    dobDaySel: '.reg_dob_day',

    /**
     * Default year field selector
     * @type {String}
     */
    dobYearSel: '.reg_dob_year',

    /**
     * Adds the DOB template from the footer into the form
     *
     * @param {String} wrapper Form wrapper
     */
    addDOBFields: function (wrapper) {
        'use strict';
        if (!wrapper) {
            return;
        }

        var dobMonthStr = $('#salli_dob_dropdowns').html(),
            dobMonthSlc = $(dobMonthStr);

        dobMonthSlc.insertBefore(wrapper + ' div.f_reg_submit');
    },

    /**
     * Adds the CASL checkbox using the hidden checkbox
     */
    addCaslOptIn: function (wrapper) {
        'use strict';

        // This is now working as initially anticipated so we don't need to add
        // the check box with javascript. We will clean this up later.
        return;

        if (!wrapper) {
            return;
        }

        var $casl = $('<div class="f_reg_optout_nl"></div>'),
            $label = $('<label for="reg_optout_nl">Yes, I\'d like to receive Big Fish marketing communications.</label>'),
            $checkbox = $('<input type="checkbox" name="reg_optout_nl" id="reg_optout_nl" value="yes">');
        $casl.append('<div></div>').append($label);
        $(wrapper + ' #reg_optout_nl').replaceWith($casl);
        $casl.find('div').append($checkbox);
    },

    /**
     * Returns true if COPPA Compliance rules apply
     *
     * @return {Boolean}
     */
    coppaCompliance: function () {
        'use strict';
        return $.bfg.cfg.lang === 'en' && $.bfg.cfg.locale.geoip_country === 'us';
    },

    /**
     * Returns true if the COPPA Compliance lockout is displayed
     *
     * @return {Boolean}
     */
    coppaLockoutDisplayed: function () {
        'use strict';
        return $('.coppa-compliance-lockout').length > 0;
    },

    /**
     * Displays the COPPA Compliance lockout view
     *
     * @param {String} wrapper Signup form wrapper
     */
    displayCoppaLockout: function (wrapper) {
        'use strict';
        wrapper = wrapper || '#sallig_signup_form';

        var lockout = $('#salli_coppa_lockout').html();
        $(lockout).insertBefore(wrapper);
        $(wrapper + ' *, #reg_email_privacy').remove();
    },

    /**
     * Returns true if the DOB makes the user at least 13 years of age
     *
     * @param {Object} dobSel DOB field selectors
     *
     * @return {Boolean}
     */
    hasCoppaCompliantDob: function (dobSel) {
        'use strict';
        dobSel = dobSel || {};
        dobSel.month = dobSel.month || this.dobMonthSel;
        dobSel.day = dobSel.day || this.dobDaySel;
        dobSel.year = dobSel.year || this.dobYearSel;

        var today = new Date(),
            targetDate = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate());
        return new Date($(dobSel.year).val(), $(dobSel.month).val() - 1, $(dobSel.day).val()) < targetDate;
    },

    /**
     * Checks if the DOB fields exist on the form
     *
     * @param {Array} dobSel DOB field selectors
     *
     * @return {Boolean}
     */
    hasDobFields: function (dobSel) {
        'use strict';
        dobSel = dobSel || [this.dobMonthSel, this.dobDaySel, this.dobYearSel];

        var hasDobFields = true;
        $.each(dobSel, function (index, selector) {
            if ($(selector).length < 1) {
                hasDobFields = false;
            }
        });
        return hasDobFields;
    },

    /**
     * Returns true if all of the DOB fields have a real selection
     *
     * @param {Object} dobSel DOB field selectors
     *
     * @return {Boolean}
     */
    hasValidDob: function (dobSel) {
        'use strict';
        dobSel = dobSel || [this.dobMonthSel, this.dobDaySel, this.dobYearSel];

        var isValid = true;
        $.each(dobSel, function (index, selector) {
            if ($(selector).val() === 'none') {
                isValid = false;
            }
        });
        return isValid;
    },

    /**
     * Returns the current setting of the COPPA Compliance lockout cookie
     *
     * @return {Boolean}
     */
    getCoppaLockout: function () {
        'use strict';
        return $.userPrefs.getPrefs(this.coppaComplianceCookie, 'permaPrefs');
    },

    /**
     * Sets the COPPA Compliance lockout cookie
     */
    setCoppaLockout: function () {
        'use strict';
        $.userPrefs.savePrefs(this.coppaComplianceCookie, true, 'permaPrefs');
        $.bfg.header.sallig.fire_event('sallig_coppa_lockout_set', {
           event_type: 'coppa_lockout'
        });
    },

    /**
     * Removes DOB errors from the form
     *
     * @param {String} dobWrapper DOB wrapper selector
     */
    clearDobError: function (dobWrapper) {
        'use strict';
        dobWrapper = dobWrapper || '.f_reg_dob';

        $(dobWrapper).removeClass('wrong');
        $(dobWrapper).find('.wrong').removeClass('wrong');
        $(dobWrapper).find('.formErrors').remove();
    },

    /**
     * Sets the DOB error messaging on the form
     *
     * @param {String} dobWrapper    DOB wrapper
     * @param {Array}  fieldWrappers DOB selection field wrappers
     */
    setDobError: function (dobWrapper, fieldWrappers) {
        'use strict';
        dobWrapper = dobWrapper || '.f_reg_dob';
        fieldWrappers = fieldWrappers || ['.f_reg_dob_month', '.f_reg_dob_day', '.f_reg_dob_year'];

        $.each(fieldWrappers, function (index, selector) {
            $(dobWrapper + ' ' + selector).addClass('wrong');
        });
        $(dobWrapper).addClass('wrong');
        $(dobWrapper).prepend('<div class="formErrors">' + $(dobWrapper).data('error') + '</div>');
    },

    /**
     * Updates the button HTML to use the new button styles
     *
     * @param {Array} buttonSel Button selectors
     */
    updateButtons: function (buttonSel) {
        'use strict';
        buttonSel = buttonSel || ['#forgot_submit', '#login_submit', '#reg_submit'];

        $.each(buttonSel, function (index, selector) {
            $(selector).addClass('btn btn-blue').text($(selector).find('.btn_center').text());
        });
    },

    /**
     * Updates the pointy tip / hints to use the new icon styles
     */
    updateTooltips: function () {
        'use strict';
        var $hints = $('.q_icon').find('span').filter(function () {
                return $(this).data('q_icon');
            });
        $hints.each(function () {
            var $icon = $('<i class="fa fa-question-circle fa-lg" data-q_icon="' + $(this).data('q_icon') + '"></i>');
            $(this).before($icon);
            $(this).remove();
        });
    },

    /**
     * Trigger custom events, ensuring defaults.
     *
     * @param string eventName
     * @param object ob Event data.
     * @return void
     */
    fire_event: function (eventName, ob) {
        'use strict';
        if (!eventName || !ob) {
            return;
        }

        ob = ob || {};

        var final_ob = $.extend({
            view: 'bfg_header', // The current overlay view showing.
            from: false, // ?? Where we were?
            result: false, // What just happened.
            to: false, // What will happen next.
            data: false  // Data to use in the DOM.
        }, ob);

        if($.bfg && $.bfg.tracking && $.bfg.tracking.frogger && $.bfg.tracking.frogger.send_event) {
            $.bfg.tracking.frogger.send_event(final_ob);
        }

        $('body').trigger(eventName, final_ob);
    }

};

/**
 * Genre dropdowns
 *
 * iOS has the nested dropdown behavior already built into their client:
 *
 *     "Mouse events are delivered in the same order you'd expect in other web
 *      browsers illustrated in Figure 6-4. If the user taps a nonclickable
 *      element, no events are generated. If the user taps a clickable element,
 *      events arrive in this order: mouseover, mousemove, mousedown, mouseup,
 *      and click. The mouseout event occurs only if the user taps on another
 *      clickable item. Also, if the contents of the page changes on the
 *      mousemove event, no subsequent events in the sequence are sent. This
 *      behavior allows the user to tap in the new content."
 *
 * We needed a way to get Android to behave the same without destroying the
 * default iOS behavior.
 *
 */

$(function() {

    var isTouchDevice = "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch;

    // We are only applying this script to touch devices
    if (isTouchDevice) {

        var $dropdownLinks = $('.bfg-primary-nav .bfg-nav-toggle > a');

        // Only register a click when the dropdown is already open
        $dropdownLinks.click(function(e) {
            if ($(this).data('status') !== 'open') {
                e.preventDefault();
                $dropdownLinks.data('status', '');
                $(this).data('status', 'open');
            }
        });

        // The dropdowns should close when you click on an element outside of it,
        // so we're targeting anything in the main container and the user nav.
        $('#container, .bfg-header .bfg-user-nav').click(function() {
            $('.bfg-header').blur();
            $dropdownLinks.data('status', '');
        });

    }

});
