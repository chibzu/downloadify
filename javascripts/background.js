var downloads = [];
var active = true;

var downloadSong = function(url, tabid){
  if( chrome.webRequest.onBeforeRequest.hasListeners() )
      chrome.webRequest.onBeforeRequest.removeListener(findmp3);

	  if (active)
		chrome.tabs.sendMessage( tabid , {action: "getSong", url : url} );
  
  setTimeout(function(){ startListener(); },500)
}

var findmp3 = function(details){
  if( details.url.indexOf("cloudfront.net/mp3/") === -1 && downloads.indexOf(details.url) ) return;
  
  downloadSong(details.url, details.tabId)
};

var startListener = function(){
  chrome.webRequest.onBeforeRequest.addListener(
    findmp3,
    {urls: ["*://*.cloudfront.net/mp3/*"]},
    ['blocking']
  );
};
startListener();

chrome.browserAction.onClicked.addListener(function(tab){
	if (active)
		chrome.browserAction.setIcon({path: "icon_48_gray.png"});
	else
		chrome.browserAction.setIcon({path: "icon_48.png"});
		
	active = !active;
});
