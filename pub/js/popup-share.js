class popupShare {
	
	
	constructor(/*sharelink = window.location.href, tmpltId = 'popup-share-bar', destinations = {}/**//**/params = {}/**/) {

	    if (!params.hasOwnProperty("sharelink")) {
	        this.sharelink = window.location.href;
	    } else {
		    this.sharelink = params.sharelink;
	    }
	    if (!params.hasOwnProperty("tmpltId")) {
	        this.tmpltId = 'popup-share-bar';
	    } else {
	        this.tmpltId = params.tmpltId;
	    }

	    if (!params.hasOwnProperty("destinations") || (Object.entries(params.destinations).length === 0 && params.destinations.constructor === Object) ) {
    	    this.destinations = {
              	"email": {
            		"bootstrap":"warning",
            		"textcolor": "#ffe330",
					"fa":"envelope",
					"icon":"envelope",
					"linkbase":"mailto:?Body=",
					"classes":""
            	},
              	"whatsapp": {
            		"bootstrap":"success",
            		"textcolor": "#ffffff",
            		"background":"#25D366",
					"fa":"whatsapp",
					"icon":"whatsapp",
            		"linkbase":"whatsapp://send?text=",
					"classes":""		
            	},
            	"twitter": {
            		"bootstrap":"info",
            		"textcolor": "#ffffff",
            		"background":"#1da1f2",
					"fa":"twitter-square",
					"icon":"twitter-square",
            		"linkbase":"https://twitter.com/share?url=",
					"classes":""
            	},
              	"facebook": {
            		"bootstrap":"primary",
            		"textcolor": "#ffffff",
            		"background":"#3b5998",
					"icon":"facebook",
            		"linkbase":"https://www.facebook.com/sharer/sharer.php?u=",
					"classes":"" 		
            	},
            	"linkedin": {
            		"textcolor": "#ffffff",
            		"background":"#0e76a8",
					"icon":"linkedin",
            	    "linkbase":"https://www.linkedin.com/shareArticle?mini=true&url=",
					"classes":""
            	}
            	
            };
	    } else {
	        this.destinations = params.destinations;
	    }
	    
	    if (!params.hasOwnProperty("attachment")) {
	        this.attachment = document.body;
	    } else {
		    this.attachment = document.getElementById(params.attachment);
	    }

        /**/
        

         var IsEle = document.getElementById(this.tmpltId);
            if(IsEle){
                IsEle.remove();
            }


        /**/

		let frag = document.createRange().createContextualFragment('<template id="' + this.tmpltId + '"></template>');
		this.attachment.append(frag); // document.body.append(frag);
		this.popup = this.drawTemplate();
		frag = document.createRange().createContextualFragment(this.popup);
		document.getElementById(this.tmpltId).append(frag);
	}
	
	updatePopUp(sharelink) {
		this.sharelink = sharelink;
		//this.destinations = socials; // ? maybe get an array of keys, which socials to presenst
		this.popup = this.drawTemplate();
		document.getElementById(this.tmpltId).innerHTML = this.popup;
	}
	
	drawTemplate(){
		let bar = '';
		bar += '<div class="social-icons" style="text-align: center; font-weight: 300;"><ul style="list-style: none; margin: 0px 0px 5px 0px; padding: 2px; float: right;">' + '\n';
		for (var key in this.destinations) {
		    let linkstyle = '';
		    if (this.destinations[key].hasOwnProperty("background")) { // obj.hasOwnProperty("key")
		        linkstyle +=  'background: ' + this.destinations[key]['background'] + '; ';
		    }
		    if (this.destinations[key].hasOwnProperty("textcolor")) {
		        linkstyle += 'color: ' + this.destinations[key]['textcolor'] + '; ';
		    }
			bar += '<li style="display: inline-block; zoom: 1; *display: inline; vertical-align: middle;"><a href="' + this.destinations[key].linkbase + this.sharelink + '" style="' + linkstyle + '" class="btn ' + this.destinations[key].classes + '"><span class="icon-' + this.destinations[key].icon + '"></span></a></li>'; //  text-' + this.destinations[key].bootstrap + '"

		}
		bar += '</ul></div>' + '\n';
		return bar;
	}


   /*
    var popsocs = ["email","facebook","whatsapp","twitter"];
    if (typeof ppshparams !== 'undefined') {
        if (ppshparams.hasOwnProperty('sharelink')) {
          var sharelink = ppshparams.sharelink;
        }
        if (ppshparams.hasOwnProperty('popsocs')) {
          var popsocs = ppshparams.popsocs;
        }
    }
    */

}