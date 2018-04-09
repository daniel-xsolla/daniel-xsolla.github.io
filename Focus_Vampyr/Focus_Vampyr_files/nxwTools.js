/*!
 *
 * Nexway JavaScript Library tools v1.0.0
 *
 */


function nxwValidePromoCode(aAlert) {
  var frm=document.getElementById("CADDIE_PROMO");
  if(frm.Code_TFR.value != "") {
    frm.submit();
  } else {
    alert(aAlert);
    frm.Code_TFR.focus();
  }
}

function nxwIsEmail(lemail) {
  var filter = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
  return (filter.test(lemail));
}

function nxwIsBlank(s) {
  if (s == null){return true;}
  for(var i=0;i<s.length;i++) {
    var c = s.charAt(i);
    if ((c != ' ') && (c !='\n') && (c != '\t')) return false;
  }
  return true;
}


var dateFormat = function () {
  var  token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
    timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
    timezoneClip = /[^-+\dA-Z]/g,
    pad = function (val, len) {
      val = String(val);
      len = len || 2;
      while (val.length < len) val = "0" + val;
      return val;
    };

  // Regexes and supporting functions are cached through closure
  return function (date, mask, utc) {
    var dF = dateFormat;

    // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
    if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
      mask = date;
      date = undefined;
    }

    // Passing date through Date applies Date.parse, if necessary
    date = date ? new Date(date) : new Date;
    if (isNaN(date)) {
      return false;
    }
//    if (isNaN(date)) throw SyntaxError("invalid date");

    mask = String(dF.masks[mask] || mask || dF.masks["default"]);

    // Allow setting the utc argument via the mask
    if (mask.slice(0, 4) == "UTC:") {
      mask = mask.slice(4);
      utc = true;
    }

    var  _ = utc ? "getUTC" : "get",
      d = date[_ + "Date"](),
      D = date[_ + "Day"](),
      m = date[_ + "Month"](),
      y = date[_ + "FullYear"](),
      H = date[_ + "Hours"](),
      M = date[_ + "Minutes"](),
      s = date[_ + "Seconds"](),
      L = date[_ + "Milliseconds"](),
      o = utc ? 0 : date.getTimezoneOffset(),
      flags = {
        d:    d,
        dd:   pad(d),
        ddd:  dF.i18n.dayNames[D],
        dddd: dF.i18n.dayNames[D + 7],
        m:    m + 1,
        mm:   pad(m + 1),
        mmm:  dF.i18n.monthNames[m],
        mmmm: dF.i18n.monthNames[m + 12],
        yy:   String(y).slice(2),
        yyyy: y,
        h:    H % 12 || 12,
        hh:   pad(H % 12 || 12),
        H:    H,
        HH:   pad(H),
        M:    M,
        MM:   pad(M),
        s:    s,
        ss:   pad(s),
        l:    pad(L, 3),
        L:    pad(L > 99 ? Math.round(L / 10) : L),
        t:    H < 12 ? "a"  : "p",
        tt:   H < 12 ? "am" : "pm",
        T:    H < 12 ? "A"  : "P",
        TT:   H < 12 ? "AM" : "PM",
        Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
        o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
        S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
      };

    return mask.replace(token, function ($0) {
      return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
    });
  };
}();

// Some common format strings
dateFormat.masks = {
  "default":      "ddd mmm dd yyyy HH:MM:ss",
  shortDate:      "m/d/yy",
  mediumDate:     "mmm d, yyyy",
  longDate:       "mmmm d, yyyy",
  fullDate:       "dddd, mmmm d, yyyy",
  shortTime:      "h:MM TT",
  mediumTime:     "h:MM:ss TT",
  longTime:       "h:MM:ss TT Z",
  isoDate:        "yyyy-mm-dd",
  isoTime:        "HH:MM:ss",
  isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
  isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
  dayNames: [
    "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ],
  monthNames: [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ]
};

// For convenience...

Date.prototype.format = function (mask, utc) {
  return dateFormat(this, mask, utc);
};

/**
*
* jquery library for validating forms in a beautiful manner
*
*/
var nxwGenericValidator = function(id)
{
    // PAS DE RETOUR A LA LIGNE POUR L'ACCOLADE
    return {
        /* Store rules internally so they can accessed later */
        _rules : {},
        _attached : false,
        _opt : {},
        _handler : function(e)
        {
            var _self = e.data.self; //jquery is really ugly no automatic scope correction :(
            //Process the validation stuff
            return _self.processRules();
        },
        _fieldHandler : {},
        validate : function(opt)
        {
            this._opt = opt;
            if(this._opt.rules)
            {
                this._rules = this._opt.rules;
            }
            this._attachEvents();
            //If we told the validator to act on submit, attach the behavior to the submit event
            if(opt.submit)
            {
                //Override the submit event
                $(id).bind('submit', {self:this}, this._handler);
            }
            return this;
        },
        _detachEvents : function()
        {
            $(id).unbind('submit', this._handler);

            var _self = this;
            $.each(this._rules, function(fieldName, rule)
            {
                $('#' + fieldName).unbind('blur', _self._fieldHandler[fieldName]);
            });
        },
        _attachEvents : function()
        {
            var _self = this;
            $.each(this._rules, function(fieldName, rule)
            {
                _self._fieldHandler[fieldName] = function(e)
                {
                    _self.processRules(fieldName);
                };
                $('#' + fieldName).bind('blur', _self._fieldHandler[fieldName]);
            });
        },
        processRules : function(fieldName)
        {
            var _err = false;
            var _single = fieldName || false;
            var _self = this;
            $.each(this._rules, function(fieldName, rule)
            {
                var _field_err = false;
                if(_single && _single !== fieldName)
                {
                    return;
                }
                /* Process rule validation */
                $.each(rule, function(type, val)
                {
                  var _formElement = $('#' + fieldName), _fieldVal = $.trim(_formElement.val());
                    if (!!!_formElement[0])
                    {
                        return;
                    }
                    switch(type)
                    {
                        case 'required':
                            switch (_formElement[0].type)
                            {
                                case 'checkbox':
                                    if (!_formElement[0].checked)
                                    {
                                        _err = true;
                                        _field_err = val.i18n;
                                    }
                                    break;
                                case 'select-one':
                                case 'select':
                                    if(_fieldVal === 'false')
                                    {
                                        _err = true;
                                        _field_err = val.i18n;
                                    }
                                    break;
                                default:
                                    if (typeof val.cond=='string') {
                                      if ($(val.cond).css('display')!='block') {
                                        break;
                                      }
                                    }
                                    if(_fieldVal === '')
                                    {
                                        _err = true;
                                        _field_err = val.i18n;
                                    }
                                    break;
                            }
                            break;
                         case 'email':
                            if(!_fieldVal.match(/^([A-Za-z0-9_\-.]+)@([A-Za-z0-9_\-.]+)\.([A-Za-z]{2,4})$/))
                            {
                                _err = true;
                                _field_err = val.i18n;
                            }
                            break;
                        case 'compare_field':
                            var _fieldCompare = $(val.cond);
                            if($.trim($(_fieldCompare).val()) !== _fieldVal)
                            {
                                _err = true;
                                _field_err = val.i18n;
                            }
                            break;
                        case 'custom':
                            if(!_fieldVal.match(val.cond))
                            {
                                _err = true;
                                _field_err = val.i18n;
                            }
                            break;

                        case 'vat':
                            if (val.cond) {
                              if ($(val.cond).css('display')!='block') {
                                break;
                              }
                            }
                            if(_fieldVal === '') {
                              _err = true;
                              _field_err = val.i18n;
                            } else {
                              var _fieldCountry = val.country;
                              $.ajax({
                                url: '/nxwSourceAjax.html?action=vatValidator&country=' + _fieldCountry + '&vatnumber=' + _fieldVal,
                                async: false,
                                success: function(data) {
                                  var aDatas = $.parseJSON(data);
                                  if (aDatas.IsValidVATNumber==true) {
                                    _field_err = '';
                                  } else {
                                    _err = true;
                                    _field_err = val.i18nNotValid;
                                  }
                                }
                              });
                            }
                            break;

                        case 'date':
                            var _separator = val.separator || '/'
                            var _format = val.formatdate.split(_separator);
                            var _validformat = new RegExp('^\\' + 'd{' + _format[0].length + '}' + '\\' + _separator  + '\\d{' + _format[1].length + '}' + '\\' + _separator + '\\d{' + _format[2].length + '}' + '$');

                            if (_fieldVal!='') {
                              if (!_fieldVal.match(_validformat)) {
                                _err = true;
                                _field_err = val.i18n;
                              } else {
                                for (var _idx in _format) {
                                  if (_format[_idx]=='dd')
                                    var _dayfield  = _fieldVal.split(_separator)[_idx];
                                  if (_format[_idx]=='mm')
                                    var _monthfield= _fieldVal.split(_separator)[_idx];
                                  if (_format[_idx]=='yyyy')
                                    var _yearfield = _fieldVal.split(_separator)[_idx];
                                }
                                var _dayobj = new Date(_yearfield, _monthfield-1, _dayfield)
                                if ((_dayobj.getMonth()+1!=_monthfield)||(_dayobj.getDate()!=_dayfield)||(_dayobj.getFullYear()!=_yearfield)) {
                                  _err = true;
                                  _field_err = val.i18n;
                                }
                              }
                            }
                            if (!_err) {
                              if (val.sucess)
                                val.sucess();
                            } else {
                              if (val.error)
                                val.error();
                            }
                            break;
                    }
                });
                if(_field_err)
                {
                    if(_self._opt.container)
                    {
                        var _ct = $('#' + fieldName).parents(_self._opt.container).find(_self._opt.placeholder);
                        if(_ct)
                        {
                            _ct.removeClass(_self._opt.classes.valid_img_display).addClass(_self._opt.classes.mandatory_img_display);
                            if(!_single)
                            {
                                _ct.bt(_field_err, _self._opt.toolstyle).btOn();
                            }
                            else
                            {
                                _ct.bt(_field_err, _self._opt.toolstyle);
                            }
                        }
                    }
                    //Flag the field as erroneous
                    $('#' + fieldName).removeClass(_self._opt.classes.valid_field).addClass(_self._opt.classes.mandatory_field);
                }
                else
                {
                    if(_self._opt.container)
                    {
                        var _ct = $('#' + fieldName).parents(_self._opt.container).find(_self._opt.placeholder);
                        if(_ct)
                        {
                            _ct.removeClass(_self._opt.classes.mandatory_img_display).addClass(_self._opt.classes.valid_img_display);
                            _ct.bt().btOff();
                        }
                    }
                    $('#' + fieldName).removeClass(_self._opt.classes.mandatory_field).addClass(_self._opt.classes.valid_field);
                }
            });
            return !_err;
        }
    };
};

function nxwShareFacebook(url, title) {
  if (!url)
    url=location.href;
  if (!title)
    title=document.title;
  window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(url)+'&t='+encodeURIComponent(title),'fbsharer','toolbar=0,status=0,width=626,height=436');
  return false;
}

function nxwShareTwitter(status) {
  if (!status) {
    status=document.title;
  }
  window.open('http://twitter.com/home?status='+encodeURIComponent(status),'twsharer','toolbar=0,status=0,width=626,height=436');
  return false;
}

function nxwShareTuenti(url, title) {
  if (!url)
    url=location.href;
  if (!title)
    title=document.title;
  window.open('http://www.tuenti.com/share?url='+encodeURIComponent(url)+'&suggested-text='+encodeURIComponent(title),'fbtuenti','toolbar=0,status=0,width=626,height=436');
  return false;
}