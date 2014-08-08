var cardObjects=[];
var cardsDisplay=[];
var allPossibleTags=[];
function cardDataObject(adder,title,details,tags){
	this.adder=adder;
	this.title=title;
	this.details=details;
	this.tags=tags;
	
}
function showMenu(){
	$('#menu').toggle('slide',200);
}


$('#showHideTags').change(function(){
	
});

$('#menuHead').click(function(){
	var selected=$('.selctedMenuTab');
	selected.siblings().addClass('selctedMenuTab');
	selected.removeClass();
	showSubMenu();
});

function showSubMenu(){
	if($('.selctedMenuTab').html().toUpperCase()=='SEARCH'){
		$('.subMenu').hide();
		$('#searchTabMenuOpt').show();
	}else{
		$('.subMenu').hide();
		$('#profileTabMenuOpt').show();
	}
}


$(document).mouseup(function (e)
{
    var container = $("#aboutApp");

    if (!container.is(e.target) 
        && container.has(e.target).length === 0)
    {
        container.hide();
    }

    
     var container = $("#largeCard");

    if (!container.is(e.target) 
        && container.has(e.target).length === 0)
    {
        container.hide();
    }


        var container = $("#menu");

    if (!container.is(e.target) 
        && container.has(e.target).length === 0 && !$('#menuButton').is(e.target))
    {
        container.hide();
    }
});
function updatePossibleTags(){
	for(var v=0;v<cardObjects.length;v++){
		for(var k=0;k<cardObjects[v].tags.length;k++){
			if(allPossibleTags.indexOf(cardObjects[v].tags[k])==-1)
			allPossibleTags.push(cardObjects[v].tags[k]);
		}
	}
}
//$('.toggle').toggles({on:true});
$( document ).ready(function() {
	//$('#menu').toggle('slide',200);
	console.log('aa');
	createData();
	$('#playList').fancySelect();
	$('#example-a').barrating('show');
	updatePossibleTags();
	//$().toastmessage('showNoticeToast', 'some message here');
	//$('#example-a').barrating();
	//addTag('A');
	//addTag('A');
	$( "#tagAddInput" ).autocomplete({
      source: allPossibleTags
    });
	addTag('Heven');
	showTheCards();
	
});
function newGuyDemo(){
	$('#tagHolder').children().remove();
	addTag('Fun');
	


	showTheCards();
	$('#menu').toggle('slide',200);
}

function backToSearchDemo(){
	$('#cardsHolderDiv').children().remove()
	showTheCards();
	$('#menu').toggle('slide',200);
}

function showTheCards(){
	$('#cardsHolderDiv').children().remove()
	cardsDisplay=[];
	var newTags=[];
	$('.searchTag').each(function(){
		newTags.push($(this).find('span').html().toUpperCase());
	});
	for(var v=0;v<cardObjects.length;v++){
		for(var k=0;k<cardObjects[v].tags.length;k++){
			for(var i=0;i<newTags.length;i++){
				if(cardObjects[v].tags[k].toUpperCase()==newTags[i])
					cardsDisplay.push(cardObjects[v]);
			}
		}
	}
	for(var v=0;v<cardsDisplay.length;v++){
		$('#cardsHolderDiv').append(generateCardFromObj(cardsDisplay[v]));
	}
}



function addNewCard(){
	var v=$('#editTags').val();
	var tags=v.split(',');
	
	var card= new cardDataObject('Prateek Chawla', $('#editTitle').val(), $('#editDesc').val(),tags);
	$('#cardsHolderDiv').append(generateCardFromObj(card));
	cardObjects.push(card);	
	updatePossibleTags();
	//$('#editOrUpdateCard').hide();
	$().toastmessage('showSuccessToast', 'Your Data has been Added');
	cancelCardAdd();
	showTheCards();
}
function cancelCardAdd(){
	$('#editTags').val('');
	$('#editTitle').val('');
	$('#editDesc').val('');
	$('#editOrUpdateCard').hide();
}
function showAboutApp(){
$("#menu").hide();
$('#aboutApp').show();
};

function showLargeCard(addedBy,name, info,tags){

	processedTags="Tags:";
	for(var v=0;v<tags.length;v++){
		processedTags+=tags[v]
		if(v!=tags.length-1)
		processedTags+=', ';
	}
	var desc="<span style='font-size:115%'>"+name+":  </span>"+info;
	$('#largeCard .lrgName').html(addedBy);
	$('#largeCard .lrdTags').html(processedTags);
	$('#largeCard .largeDesc').html(desc);
	$('#largeCard').show();
};
function addTag(input){
	$('#tagHolder').append(createTagUI(input));	
}
function createTagUI(input){
	var returnStr="<div class='searchTag'><button type='button' onclick='tagRemoved($(this));$(this).closest(\".searchTag\").remove()'>X</button><span>";
	returnStr+=input;
	returnStr+="</span></div>"
	return returnStr;
}


function addnewTag(){
	if($('#tagAddInput').val()!="")
	 addTag($('#tagAddInput').val());

	$('#tagAddInput').val('')
	showTheCards();
}
var varia="";
function tagRemoved(input){
	input=$(input).closest('.searchTag');
	var tagDeleted=input.find('span').html().toUpperCase();
	var tagRemaining=getRemainingtags(input);
	var elem="";
	var elemTags="";
	var flag=false;
	$('.card').each(function(){
		varia=this;
		flag=false;
		elem=$(this);
		elemTags=$(elem).find('.tagsDisp p').html().toUpperCase();
		if(elemTags.indexOf(tagDeleted)!=-1){
			for(var v=0;v<tagRemaining.length;v++){
				if(elemTags.indexOf(tagRemaining[v])!=-1){
					flag=true;
				}
			}
			if(flag!=true){
				elem.remove();
			}
		}
	})
}

function getRemainingtags(input){
	var returnStr=[];
	$(input).siblings().each(function(){
		returnStr.push($(this).find('span').html().toUpperCase());
	})
	return returnStr;
}


















