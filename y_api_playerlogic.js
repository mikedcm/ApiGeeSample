// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    //height: '390',
    //width: '640',
    //videoId: 'M7lc1UVf-VE',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });

}
/*var videoList=['x00O3wHIP0Q','ttl-kF8Rbuo','0x1UDHnOvxA'];
var i=0;
function CueNextVideo() {
  if(i<videoList.length){
    player.cueVideoById({videoId:videoList[i],
              startSeconds:25,
              endSeconds:35,
              suggestedQuality:'large'});
    i++;
  }
}*/
// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  //event.target.setVolume(50);
  player.loadVideoById({'videoId': 'bHQqvYy5KYo',
       'startSeconds': 5,
       'endSeconds': 60,
       'suggestedQuality': 'large'});
  //event.target.playVideo();
}
var theVideos=[];
var i=0;
function QueueVideos(videoIds) {
  theVideos=videoIds;
}
function GetNextId() {
  return theVideos[i];
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.CUED)
  {
    event.target.setVolume(50);
    event.target.playVideo();
  }
  if (event.data == YT.PlayerState.PAUSED && !done) {
    player.stopVideo();
    player.loadVideoById({'videoId': GetNextId(i),
         'startSeconds': 5,
         'endSeconds': 60,
         'suggestedQuality': 'large'});
    i++;
    //setTimeout(stopVideo, 6000);
    //done = true;
  }
  if (event.data == YT.PlayerState.PLAYING && !done) {
    //setTimeout(stopVideo, 6000);
    //done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}
