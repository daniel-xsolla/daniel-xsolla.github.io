
    function getDocumentWidth() {
        var myWidth = 0;
        if( typeof( window.innerWidth ) == 'number' ) {
        //Non-IE
            myWidth = window.innerWidth;
        } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
            //IE 6+ in 'standards compliant mode'
            myWidth = document.documentElement.clientWidth;
        } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
            //IE 4 compatible
            myWidth = document.body.clientWidth;
        }
        return myWidth;
    }

    function getDocumentHeight() {
        var myHeight = 0;
        if( typeof( window.innerWidth ) == 'number' ) {
        //Non-IE
            myHeight = window.innerHeight;
        } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
            //IE 6+ in 'standards compliant mode'
            myHeight = document.documentElement.clientHeight;
        } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
            //IE 4 compatible
            myHeight = document.body.clientHeight;
        }
        return myHeight;
    }


	window.onresize = resize;
	makelimit ();
    $('#tableMain').css("height", (getDocumentHeight()-455)+"px");

    function resize()
    {
        $('.left-panel').hide();
        $('.left-panel').show();
        $('#tableMain').height=screen.availHeight;
        makelimit ();
        $('#tableMain').css("height", (getDocumentHeight()-455)+"px");
        $('#status').hide();
        $('#status').show();
        $('div.sliderdiv').hide();
        $('div.sliderdiv').show();
    }
