

    const popupShareItem = {"attachment":"main","tmpltId" : "itemSharer"};

    function drawitem(item, chtypes) {
        
        let defaults = {};
        defaults['description'] = '';
        defaults['profile_pic'] = 'http://icons.iconarchive.com/icons/iconshock/hitchhikers-guide/256/Hitchhiker-Symbol-icon.png';
        defaults['handle'] = '';
        defaults['retailer_full_name'] = '';
        
        item = Object.assign(defaults, item); // defaults will be run over by the item attributes. but we eliminates undefines...
        if (typeof item.description == 'undefined') {
            item.description = '';
        }
        dirclass = 'directionl';
        rtlDirCheck = new RegExp('^[^'+'A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF'+'\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF'+']*['+'\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC'+']');
        if (rtlDirCheck.test(item.title)) {
                dirclass = 'directionr';
        }
        
        let tgsme = '';
        let isme = 0;
        if (item.retailer_id == me) {
            isme = 1;
            tgsme = `<li><button class="btn btn-link item-trash${item.bulk}" id="trash_item_${item.item_id}"><i class="fa fa-trash"></i></button></li>`;
        }
    var tmplt = `<div id ="item_${item.item_id}" class="sitem${item.bulk}">
                    <div class="media media-item"><div class="media-heading">
                    <div class="media-left"><a href="#" id="href_item_${item.item_id}" class="route2" routeto2="ftype=stream&fid=${item.retailer_id}"><img alt="" class="media-object img-rounded" src="${item.profile_pic}" style="max-width: 32px;"></a></div>
                    <div class="media-body" style="vertical-align: middle;"><h4 class="media-heading"><a href="#" id="href_item_${item.item_id}" class="route2 link-unstyled" routeto2="ftype=stream&fid=${item.retailer_id}"><span style="font-size: 70%; color:#999999; font-style: italic;">@${item.handle} </span> <span style="font-weight: bold;">${item.retailer_full_name}</span></a></h4></div></div>
                    <div class="media-body ${dirclass}"  style="padding-left: 10px;">
                    <h4 class="media-heading"><a href="${item['link']}">${item.title}</a></h4>`;
        tmplt += `<p>${item.description}<img class="media-body-image" src="${item.image_url}" onerror="if (this.src != '/image/catalog/42/42knots.png') this.src = '/image/catalog/42/42knots.png';"></p>
                    <ul class="nav nav-pills nav-pills-custom">
                    <li><button class="btn btn-link item-share${item.bulk}" id="share_item_${item.item_id}" routeto="${item['link']}"><i class="fa fa-share"></i></button></li>
                    <li><button class="btn btn-link item-star${item.bulk}" id="star_item_${item.item_id}"><i class="fa fa-star"></i></button></li>
                    <li><button class="btn btn-link item-tag${item.bulk}" id="${isme}_tag_item_${item.item_id}"><i class="fa fa-tags"></i></button></li>
                    ${tgsme}
                    </ul>
                    </div>

                </div>
            </div>
    `;
    return tmplt;

    }

        var itemEventsTriggers = function( bulk = 0, popupShareId = 'itemSharer') {

		$(".sitem" + bulk).on('submit','.tagsform',function(e) {
			e.preventDefault();
			var actn = $(this).attr('action');
			var fitem_id = $(this).attr('id').substring(12, $(this).attr('id').length);
			let tags0 = $("#tagsform_id_" + fitem_id).find('input[name="tags"]').val();
			
			$.ajax({
			   type: "POST",
			   url: actn,
			   data: $(this).serialize(),
			   dataType: "json",
			   success: function(data)
			   {
				$('#formtag_' + fitem_id).remove();
				tagsarray[fitem_id] = tags0;
			   },
				error: function(data) {
					console.log('error updating tag: ' + data);
					$('#formtag_' + fitem_id).remove();
				}
				
			   });
			 
		 });


		$(".item-tag" + bulk).click(function(){
			var data = {};
            data.item_id = $(this).attr('id');
            data.isme = data.item_id.substring(0, 1);
            data.item_id = data.item_id.substring(11, data.item_id.length);
			if ($("#" + "formtag_" + data.item_id).length > 0) {
				$("#" + "formtag_" + data.item_id).remove();
			} else {
				data.otype = ctrlr.otype;
				newitem = addform(data);
				let frag = document.createRange().createContextualFragment(newitem);
				document.getElementById("item_" + data.item_id).append(frag);
				//$("#item_" + data.item_id).append(newitem);
			}
		});
		
		$(".item-trash" + bulk).click(function(){
			var data = {};
			let rusure = confirm("are you sure you want to remove the item ?");
			data.item_id = $(this).attr('id');
			data.item_id = data.item_id.substring(11, data.item_id.length);

            if (rusure) {
                fetch('/?route=retailer/stream/switcher' , {
                  method: 'POST',
                  headers: new Headers({
                             'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
                    }),
                    body: laf.objectSerialize(data), // body data type must match "Content-Type" header
                })
                .then(function(response) { return response.json(); })
                .then(function(json) {
                    if (json.status == 1) {
                        $("#item_" + data.item_id).remove();
                    } else {
                        console.log("failed trashing item!");
                        console.log(json);
                    }
                });

            }
            
		});
		
        $(".sitem" + bulk + " .route2").click(function(e){
            e.preventDefault();
            routeto2($(this).attr('id'));
            
        });		

        $(".item-share" + bulk).click(function(){
            if (webshare) {
                const shareData = {url: $(this).attr('routeto')};
                navigator.share(shareData)
                .then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing', error));
            } else {
                $(".item-share" + bulk).popover({
                    placement: 'right',
                    container: 'body',
                    html: true,
                    content: function() {
                      popup.updatePopUp($(this).attr('routeto'));
                      return document.getElementById('itemSharer').innerHTML;
                    }
              });
            }
        });
        
/*

*/

	};
