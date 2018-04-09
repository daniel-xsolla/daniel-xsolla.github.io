function checkall(Element,name)
{
	var checkboxes = document.getElementsByTagName('input');
	for (i = 1; i<checkboxes.length; i++)
		if (checkboxes[i].name.substring(0,name.length)==name)
			checkboxes[i].checked = Element.checked;
}

function number_format(number,decimals,dec_point,thousands_sep)
{
	number = (number + '').replace(/[^0-9+\-Ee.]/g,'');
	var n = !isFinite(+number) ? 0 : +number ;
	var prec = !isFinite(+decimals) ? 0 : Math.abs(decimals) ;
	var	sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep ;
	var dec = (typeof dec_point === 'undefined') ? '.' : dec_point ;
	var s = '';
	var toFixedFix = function (n,prec)
	{
		var k = Math.pow(10,prec);
		return '' + (Math.round(n * k) / k).toFixed(prec);
	};
	// Fix for IE parseFloat(0.55).toFixed(0) = 0;
	s = (prec ? toFixedFix(n,prec) : '' + Math.round(n) ).split('.');
	if (s[0].length>3)
		s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g,sep);
	if ((s[1] || '').length<prec)
	{
		s[1] = s[1] || '';
		s[1] += new Array(prec - s[1].length + 1).join('0');
	}
	
	return s.join(dec);
}

function dots(value)
{
	return number_format(value,0,'','.');
}