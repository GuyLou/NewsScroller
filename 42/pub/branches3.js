class branches {
	/*
	(c) Guy Louzon, guylou@outlook.com, GNU 3
	https://www.github.com/GuyLou/branches.js/
	*/
	
	/*
	con1: no params (!arguments.length): masterNode = document, masterClass = branch
	con2: masterNode, masterClass
	con3: masterNode = tmplt, url, masterClass
	new branches by: template fmasterNode, document default
	*/
	const defaults = {
		"type":"branches", // can be branches or leaves
		//"masterNode":"default", // any element: either #id, .class or tag
		"masterClass":"branches", // default class name to work on
		"tmplt":"", // if empty, the innerHTML of masterNode is taken
		"tmplt_url":"" // optional - source of the template
	}
	
	constructor2(params = {}) {
		
		if (params == {}) {
			this.type = defaults.type;
			this.masterNode = defaults.masterNode;
			this.masterClass = defaults.masterClass;
		} else {
			if (params.masterNode != undefined) {
				on error resume next;
				try {
					switch (params.masterNode.substring(0,1)) {
						case '#':
							this.masterNode = document.getElementById(params.masterNode.substring(1,params.masterNode.length));
						break;
						case '.':
							this.masterNode = document.getElementsByClassName(params.masterNode.substring(1,params.masterNode.length))[0];
						break;
						default:
							this.masterNode = document.getElementsByTagName(params.masterNode)[0];
						break;
					}
				} catch {
					this.masterNode = document; // default
				}
			}
			
			if (params.masterClass != undefined) {
				this.masterClass = params.masterClass;
			} else {
				this.masterClass = defaults.masterClass;
			}
			
			if (params.type == 'leaves') {
				this.type = 'leaves';
			} else {
				this.type = defaults.type;
			}
			
			if (params.tmplt != undefined) {
				this.tmplt = params.tmplt;
			} else if (params.tmplt_url != undefined) {
				this.tmplt = loadTemplate(params.tmplt_url);
			} else {
				this.tmplt = '';
			}
			
			if (this.tmplt.length > 0) {
				if (this.type == 'branches') {
					this.masterNode.innerHTML = this.tmplt;
				} else {
					let nods = this.masterNode.getElementsByClassName(masterClass);
					for (let i = 0;i < nods.length; i++) {
						nods[i].tempHTML = 'template' + tmplt + '</template>';
					}
				}
				
			}
		}
		
	}
	
	constructor(masterNode = 'document',masterClass = 'branches', masterLeaves = 'leaves') {
		if (masterNode = 'document') {
			this.masterNode = document;
		} else {
			document.getElementById(masterNode);
		}
		// if !masterNode - console.log Bang! break
		this.masterClass = masterClass;
		this.initBranches();
		this.leaves = {};
		this.initLeaves();
	}
	

	initBranches() {
	 var branch = {};
	 var tempstr = "";
	 var comment = "";
	 var nods = this.masterNode.getElementsByClassName(this.masterClass);
		for (var i = 0;i < nods.length;i++) {

		  tempstr = nods[i].innerHTML;
		  var varNames = tempstr.match(/\{\$(.*?)\}/i); // match groups! use exec
		  if (varNames !== null) {
			nods[i].classList.add("branch_html_" + varNames[1]);
			comment = document.createComment(tempstr);
			nods[i].insertBefore(comment, nods[i].firstChild);
		  }
		 
				if (nods[i].hasAttributes()) {
					var attribs = nods[i].attributes;
			  var tempstr2 = '';
			  var varNames2 = [];
			  var attr = [];
			  var newattrname = '';
			  var newattr2add = [];
					for (var j = 0;j < attribs.length;j++) {
						tempstr2 = attribs[j].value;
				varNames2 = tempstr2.match(/\{\$(.*?)\}/i);
				if (varNames2 !== null)  {
				
				newattrname = attribs[j].name;
				attr = [attribs[j].name, varNames2[1], tempstr2]; //name,varname,org
				newattr2add.push(attr);        
				}
					}
			  
			  for (j = 0;j < newattr2add.length;j++) {
				attr = newattr2add.pop();
				nods[i].setAttribute("branch_attrib_key_" + attr[1] , attr[2]);
				nods[i].setAttribute("branch_attrib_key_name" , attr[0]);
				nods[i].classList.add("branch_attrib_" + attr[1]);

			  }
			  
			}
		  
		  }
	  }
  
	plantHTML(key,value) {
   var nods = this.masterNode.getElementsByClassName("branch_html_" + key);
   var tempstr = "";
   var tempcomment = "";
   var tempcomment2 = "";
   var comment = "";
   // get elements by class name branch_key
   for (var i = 0;i < nods.length;i++) {
   	tempcomment = nods[i].childNodes[0].nodeValue;

    comment = document.createComment(tempcomment);
  
    tempstr = tempcomment.replace("{$"+ key +"}",value);
    nods[i].innerHTML = tempstr;
    nods[i].insertBefore(comment, nods[i].firstChild);
  	
   }
  }
  
    plantAttrib(key,value) {
  	var nods = this.masterNode.getElementsByClassName("branch_attrib_" + key);
    	var aname = '';
      var avalue = '';
      var org = '';
    for (var i = 0;i < nods.length;i++) {
    	aname = nods[i].getAttribute("branch_attrib_key_name");
      org = nods[i].getAttribute("branch_attrib_key_" + key);
    	avalue = org.replace("{$"+ key +"}",value);
      nods[i].setAttribute(aname, avalue);

    }
  
  }

  
	climbABranch(bran) {
		for (var i in bran) {
			this.plantHTML(i,bran[i]);
			this.plantAttrib(i,bran[i]);
		}
	  
	}
	
	/*
		<div class="leaves" id="abc">
			<div class="template">{$var1}
				<span>{$var2}</span>
			</div>
		
		</div>
	*/
	
	initLeaves(tmplt = '') {
		var nods = this.masterNode.getElementsByClassName(masterLeaves);
		// use template
		for (var i = 0;i < nods.length;i++) {
			var leafId = nods[i].getAttribute("id");
			if (leafId == undefined) break;
			var tempstr = nods[i].innerHTML;
			var leaf = {};
			leaf['leafId'] = leafId;
			leaf['tmplt'] = tempstr;
			leaf['vars'] = tempstr.match(/\{\$(.*?)\}/ig);
			this.leaves[leafId] = leaf;
		}
	}
	
	initLeaf(tmplt) {
		// get a string template parse and return it
	}
	
	
	sprout(leafId,params) {
		let tempstr = this.leaves[leafId].tmplt;
		let vars = this.leaves[leafId].vars;
		for (var i in params) {
			tempstr = tempstr.replace('{$' + i + '}',params[i]);			
		}
		return tempstr;
	}
  
	leavesLuv(leafId,itemsjson,append = 1) {
		// get object and leaf
		// call sprout for each object's objects
		// aggregate the results to 1 string
		// add or replace the string as the leaf innerHTML
		var Luv = '';
		for (var key in itemsjson) {
			Luv += this.sprout(leafId,itemsjson[key]);
		}
		var elem = this.masterNode.getElementById(leafId);
		
		tempHTML = '';
		if (append == 1) {
			var tempHTML = elem.innerHTML;
		}
		elem.innerHTML = tempHTML + Luv;
		
	}

	renderTemplate() {
		
	}
	
	loadTemplate() {
		
	}
	
}