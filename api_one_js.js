function SearchYoutube(){
var request=gapi.client.youtube.search.list({
	part:"snippet",
	type:"video",
	q:encodeURIComponent("nice"),
	order:"viewCount",
	publishedAfter:"2015-01-01T00:00:00Z"
});
request.execute(function(respone)
{
	console.log(response);
	var str=JSON.stringify(respone.result);
	alert(str);
});
};

function OnClientLoad()
{
gapi.client.setApiKey('AIzaSyDwL3jYlaDEMhFVIZq8UJk-FpUlFfjufIs');
gapi.client.load('youtube', 'v3',function()
{
	SearchYoutube();
});
}
