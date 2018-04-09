var ie = (navigator.appName == 'Microsoft Internet Explorer') && document.documentElement.clientWidth;

// ----------
// limits page width for ie
function makelimit ()
{
	document.getElementById('page-wrapper').style.width = ((document.documentElement.clientWidth < 1000) ? '1000px' : '100%');

}

var to_hide = new Array ();

// ----------
// highlight event handle
// removes current submenu form the list to hide and hides other opened submenues
function menu_highlight_2 (li)
{	
	li.className = 'active';

	for (i=0; i<to_hide.length; i++)
	{
		if (to_hide[i] == li)
		{
			to_hide.splice (i, 1);
		}
	}

	menu_cancel ();
}

// ----------
// hides unactive submenues
function menu_cancel ()
{
	for (i=0; i<to_hide.length; i++)
	{
		to_hide[i].className = '';
	}
}

// ----------
// lost focus submenu event handle
// puts the submenu to the list to hide in some milliseconds
function menu_lostfocus_2 (li)
{
	to_hide.push (li);
	setTimeout ('menu_cancel()', 500);
}



function hidehint(type,pageid,act,user)
{

	document.getElementById('hintbutton1').style.display=(document.getElementById('hintbutton1').style.display=='none')?'block':'none';
	document.getElementById('hintbutton2').style.display=(document.getElementById('hintbutton2').style.display=='none')?'block':'none';
	document.getElementById('hint').style.display=(document.getElementById('hint').style.display=='none')?'block':'none';

		JsHttpRequest.query('/ajax_functions.php',
		{
			'function': 'hidehint', 
			'type': type, 
			'page': pageid,
			'act': act,
			'user': user
		}, 
		function(result, answer) 
		{

		},true);
}


function getElementByName(id)
{
	var ar=document.getElementsByName(id);
	return ar[0];	
}

function checknumeric()
{
if(window.event)
{
  var key = window.event.keyCode; 
  if (key <48 || key >57) window.event.returnValue = false; 
}
}

function FocusIN(obj)
{
  obj.style.backgroundColor="#F1DAA4";
}
function FocusOUT(obj)
{
  obj.style.backgroundColor="#FFFFFF";
}

function clock() {
if (!document.getElementById && !document.all) return;

var hours = digital.getHours();
var minutes = digital.getMinutes();
var seconds = digital.getSeconds();

var m;

digital.setSeconds( seconds+1 );

//if (hours <= 9) minutes = "0" + hours;
if (minutes <= 9) minutes = "0" + minutes;
if (seconds <= 9) seconds = "0" + seconds;


dispTime =hours + ":" + minutes ;

if (hours <= 9) dispTime = "0" + dispTime;

if(document.getElementById('clock')) document.getElementById('clock').innerHTML=dispTime;

setTimeout("clock()", 1000);


}