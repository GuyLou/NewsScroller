/*
	get a section
	number of iterations
	items
	
	loop through the divs, for each div:
		for each items[i] key:
			if isset(div[i][key])
				div[i][key] = items[i][key]

		
/**/



    //jQuery required
    
	function itemsfiller(items,domdiv,divitems) {
    	var item = {};
    	const forto = Math.min(items.length,divitems);
    	for (i = 0;i < forto;i++) {
    		item = items[i];
			divs = document.getElementsByClassName(divitems);
			
    		for (let j = 0;j < divs.length;j++) {
				divs[j].getElementsByClassName('title')
    			$("." domdiv + " ."+ key + "_html_" + (i + 1)).html(item[key]);
    			//$(".item_" + key + "_attr_" + (i + 1)).attr(item[key]);
    		}
    	}
	}


let i = 0;
for (i = 0;i < Math.min(items.length,7);i++) {

}

/*
.slider-tittle  7
#myCarousel 4
popular post 10
latest 9
category1 4
category2 4
recent 3 
*/