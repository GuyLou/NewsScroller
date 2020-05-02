class lostandfound {
	/*
	(c) Guy Louzon, guylou@outlook.com, GNU 3
	https://www.github.com/GuyLou
	*/
	constructor() {
	}
	
	objSlice (obj,sStart,sEnd) {
		var returnObject = {};
		if (typeof obj === 'object' && obj !== null && !isNaN(sStart) && !isNaN(sEnd)) {
			if (0 <= sStart && sStart < obj.length && sEnd <= obj.length && sStart < sEnd) {
				for (var i = sStart;i < sEnd; i++) {
					returnObject[i] = obj[i];
				}
			}
		}
		return returnObject;
	}
	
	isError(param,retvar) {
	    
	    var ret = param;
	    if (typeof param === "undefined") {
	        ret = retvar;
	    }
	    return ret;
	    
	}
	
	objUnionAll (obj1,obj2, haskey = false) {
	    // obj1 will go 1st
	    
	    if (haskey) {
            for (var key in obj2) {
    	      obj1[key] = obj2[key];
    	    }
	    } else {
    	    var i = Object.keys(obj1).length;
    	    for (var key in obj2) {
    	      obj1[i] = obj2[key];
    	      i++;
    	    }	        
	    }

	    

	    return obj1;
	}

    objectSerialize(object) {
        // object to url
        var serialized = '';
        for (var key in object){
            serialized += key + '=' + object[key] + '&';
        }
        serialized = serialized.substring(0,serialized.length - 1);
        return serialized;
    }
    
    objectBinSearch(arr, x, start, end) {
       
    // Base Condition 
    if (start > end) return (-1*start); 
   
    // Find the middle index 
    let mid=Math.floor((start + end)/2); 
   
    // Compare mid with given key x 
    if (arr[mid]===x) return x; 
          
    // If element at mid is greater than x, 
    // search in the left half of mid 
    if(arr[mid] > x)  
        return objectBinSearch(arr, x, start, mid-1); 
    else
  
        // If element at mid is smaller than x, 
        // search in the right half of mid 
        return objectBinSearch(arr, x, mid+1, end); 
    }
    
    objectifySeries(series) {
      series = series.replace(new RegExp('=', 'g'), '":"');
      series = '{"' + series.replace(new RegExp('&', 'g'), '","') + '"}';
      return JSON.parse(series);

    }
    
    urlDecode(urlencoded) {
        
        var urlDecoded = {};
        
    }
    
    replaceAll(str, find, replace) {
        return str.replace(new RegExp(find, 'g'), replace);
    }
    
    isJSON(data) {
        try {
            if (typeof a_string === 'string') {
                JSON.parse(data);  
            } else {
                JSON.stringify(data);
            }
        } catch (e) {
            return false;
        }
        return true;
    }    
    /*
    isJSON(data) {
        // https://stackoverflow.com/questions/3710204/how-to-check-if-a-string-is-a-valid-json-string-in-javascript-without-using-try/3710226
        if (/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').
        replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
        replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
        
          //the json is ok
        
        }else{
        
          //the json is not ok
        
        }
    }
    */
	
}