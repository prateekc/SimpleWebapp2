/***********constants*******/
var autoCompleteTags=["Release"," ",""];
var favsAndPlaylists=["Fav", "Release","Bug Related", "New Guy"]

 $( "#tagAddInput" ).autocomplete({
      source: favsAndPlaylists
    });
/****************************/
function generateCard(addedBy,name, info, tags, favs){
	var cardCode="<div class='card' onclick=''>";
	cardCode+="<div class='markers'>";
	cardCode+="<select> "
	var flag="";
	for(var v=0;v<favsAndPlaylists.length;v++){
		flag=false;
		for(var k=0;k<favs.length;k++){
			if(favs[k]==favsAndPlaylists[v])
				flag=true;
		}
		if(flag==false)
			cardCode+="<option>"+favsAndPlaylists[v]+"</option>"
	}
	cardCode+="</select><span class='spanButton' style=''>+</span>"
	cardCode+="</div><div class='clear'></div>";
	cardCode+="<table class='cardRows' onclick='showLargeCard(\""+addedBy+"\",\""+name+"\",\""+info+"\","+JSON.stringify(tags)+")'>"
	cardCode+="<tr><td><p style='font-size:130%'>"+addedBy+"</p></td></tr>"
	cardCode+="<tr><td class='tagsDisp'><p>Tags:"
	for(var v=0;v<tags.length;v++)
		if(v!=tags.length-1)
			cardCode+=tags[v]+',';
		else
			cardCode+=tags[v];
	cardCode+="</p></td></tr>"
	cardCode+="<tr><td><p information='"+info+"'><span style='font-size:115%'>"+name+'</span>:  '+compressInfo(info)+"</p></td></tr>"
	cardCode+="</table>";
	return cardCode;
}
function generateCardFromObj(input){
	return generateCard(input.adder,input.title,input.details,input.tags,['']);
}

function compressInfo(input){
	if(input.length>30){
		return input.substring(0,28)+'...';
	}
	return input;
}