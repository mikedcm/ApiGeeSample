function SearchYoutube() {
var request=gapi.client.youtube.search.list({
	part:"snippet",
	fields:"pageInfo(totalResults),items(id(videoId),snippet(title,description))",
	chart:"mostPopular",
	regionCode:"GB",
	type:"video",
	q:encodeURIComponent("Jaguar"),
	order:"viewCount",
	publishedAfter:"2015-01-01T00:00:00Z"
});
request.execute(function(response)
{
	var videoIds=[];
	for(var i=0;i<response.result.items.length;i++)
		videoIds[i]=response.result.items[i].id.videoId;
	QueueVideos(videoIds);
	console.log(response);
	var str=JSON.stringify(response.result,'',4);
	document.getElementById('results').textContent=str;
	//alert(str);
});
}

function OnClientLoad() {
gapi.client.setApiKey('AIzaSyDwL3jYlaDEMhFVIZq8UJk-FpUlFfjufIs');
gapi.client.load('youtube', 'v3',function()
{
	SearchYoutube();
});
}
