/**
 * @name		jQuery PointPoint
 * @author		Martin Angelov
 * @version 	1.0
 * @license		MIT License
 */

(function($){

	// Определяем наш плагин jQuery

	$.fn.pointPoint = function(prop){

		// Параметры по умолчанию
	    
		var options = $.extend({
			"class"		: "pointPointArrow",
			"distance"	: 30
		},prop);
		
		var pointers = [];
		
		// Если трансформации CSS не поддерживаются, то выходим
		
		if(!$.support.transform){
			this.destroyPointPoint = function(){};
			return this;
		}
		
		this.each(function(){
		
			var findMe = $(this),
				point = $('<div class="'+options['class']+'">').appendTo('body'),
				offset, center = {}, mouse = {}, props = {}, a, b, h, deg, op,
				pointHidden = true, rad_to_deg = 180/Math.PI;
			
			pointers.push(point);
		
			// Вычисляем положение указателя при перемещении курсора мыши
		
			$('html').bind('mousemove.pointPoint',function(e){
			
				if(pointHidden){
					point.show();
					pointHidden = false;
				}
				
				offset = findMe.offset();
				
				// Центр элемента, на который мы указываем
				center.x = offset.left + findMe.outerWidth()/2;
				center.y = offset.top + findMe.outerHeight()/2;
				
				mouse.x = e.pageX;
				mouse.y = e.pageY;
				
				// Мы используем положение курсора мыши и центральную точку 
				// для построения прямоугольного треугольника.
				// h - гипотенуза, или расстояние между двумя точками.
				
				a = mouse.y - center.y;
				b = center.x - mouse.x;
				h = Math.sqrt(a*a + b*b);
				
				// Вычисляем угол(в радианах),
				// указатель надо повернуть на:
				deg = Math.atan2(a,b);
				
				// Уменьшаем непрозрачность указателя в зависимости от дистанции до центральной точки
				
				op = 1;				
				if(h < 50){
					op = 0;
				} else if(h < 160){
					op = (h - 50) / 110;
				}
				
				// Перемещаем и вращаем указатель
				
				props.marginTop  = mouse.y-options.distance*Math.sin(deg);
				props.marginLeft = mouse.x+options.distance*Math.cos(deg);
				props.transform  = 'rotate('+(-deg*rad_to_deg)+'deg)';
				props.opacity    = op;
				
				point.css(props);

			}).bind('mouseleave.pointPoint',function(){
				point.hide();
				pointHidden = true;
			});

		});

		this.destroyPointPoint = function(){
		    
		    // Отсоединяем все обработчики событий
		    // и удаляем указатель с помощью метода remove()
		    
			$('html').unbind('.pointPoint');
			        
			$.each(pointers,function(){
				this.remove();
			});
		
		};
		
		return this;
	};
    
})(jQuery);