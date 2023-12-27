
    
            
            
/* ::: BAYMAX Media Player :::::::: */
/* ::: version: 1.0.8  :::::::::::: */
/* ::: developer: Tanvir Haider ::: */

//const { Hls } = require("./HLS");


class Media {
  constructor (data) {

    //console.log("video creation data: ",data);

    let Scope = this;
    Scope.data = data;
    let wrapper;
    let Q0 = true;
    let Q1 = true;
    let Q2 = true;
    let Q3 = true;
    let Q4 = true;
    let playerStyle = "video-style";
    let MediaPlayButton;
    let MediaPauseButton;
    let MediaMuteButton;
    let MediaUnMuteButton;
    let MediaFullScreenButton;
    let MediaFullScreenCloseButton;
    let videoContainerWidth;
    let videoContainerHeight;
    let vdoEndScreen;
    
    let posterBG;
    let HLSCDN = " https://static01.nytimes.com/ads/adplatforms/cdn/hls.js"; 
    /* "https://cdn.jsdelivr.net/npm/hls.js@latest" */
    //let HLSCDN = 'https://cdn.jsdelivr.net/npm/hls.js';
    let genericPlayButton = "https://static01.nytimes.com/ads/adplatforms/user-interface-elements/video-icons/play.svg";
    let genericPauseButton = "https://static01.nytimes.com/ads/adplatforms/user-interface-elements/video-icons/pause.svg";
    let genericMuteButton = "https://static01.nytimes.com/ads/adplatforms/user-interface-elements/video-icons/audio-on.svg";
    let genericUnMuteButton = "https://static01.nytimes.com/ads/adplatforms/user-interface-elements/video-icons/audio-off.svg";
    let genericFullscreenButton = "https://static01.nytimes.com/ads/adplatforms/user-interface-elements/video-icons/fullscreen-on.svg";
    let genericFullscreenCloseButton = "https://static01.nytimes.com/ads/adplatforms/user-interface-elements/video-icons/fullscreen-off.svg";
    let progressBarStats = false;
    let progBar;
    let TrackingFunction0;
    let TrackingFunction25;
    let TrackingFunction50;
    let TrackingFunction75;
    let TrackingFunction100;
    let replaystats = false;
    Scope.replaystats = replaystats;
    let videoEnded = false;
    let autoplaystats = false;
    let playerVolumeStat;
    let hlsInitPlay = false;
    Scope.hlsInitPlay = hlsInitPlay;

    if (data.VideoTracking) {
        TrackingFunction0 = data.VideoTracking["0%"];
        TrackingFunction25 = data.VideoTracking["25%"];
        TrackingFunction50 = data.VideoTracking["50%"];
        TrackingFunction75 = data.VideoTracking["75%"];
        TrackingFunction100 = data.VideoTracking["100%"];
    }

    let clickOutFunction = data.clickOutFunction;
    let duration;
    let vidUnits;
    let mediaParentContainer = document.getElementById(data.container);
    mediaParentContainer.classList.add(playerStyle);
    mediaParentContainer.classList.add("beginning-state");
    mediaParentContainer.classList.add("pause-state");
    let tempMediaPlayer =  document.createElement('video');
    Scope.mediaParentContainer = mediaParentContainer;

    tempMediaPlayer.setAttribute('webkit-playsinline', '');
    tempMediaPlayer.setAttribute('playsinline', '');
    tempMediaPlayer.setAttribute('type', 'video/mp4');

    let vidID;
    if (data.id) {vidID = data.id;} else {vidID = "basic-player";}
    tempMediaPlayer.setAttribute('id', 'videoPlayer-' + vidID);
    mediaParentContainer.appendChild(tempMediaPlayer); 
    Scope.video = tempMediaPlayer;
    Scope.playerVolumeStat = playerVolumeStat;

    if (data.wrapper) {
        wrapper = data.wrapper;
        Scope.wrapper = data.wrapper;
        if (data.maxwidth) { wrapper.classList.add("beginning-state"); }
    }
    
    if (data.progressBar) {
        progressBarStats = data.progressBar;
        if (data.progressBar == true) {
            progBar =  document.createElement('div');
            progBar.setAttribute('id', 'progress-bar-' + vidID);
            mediaParentContainer.appendChild(progBar); 
            progBar.classList.add("progress-bar");
            Scope.progBar = progBar;
        }
    }

    /* :::::::: PLAY BUTTON ::::::::::::::::: */
    /* :::::::::::::::::::::::::::::::::::::: */

    if (data.playbutton) {
        if (typeof data.playbutton === 'object') { MediaPlayButton = data.playbutton;}

        else if (typeof data.playbutton === 'string') {

            MediaPlayButton = Scope.MakeElements ({
                "type": "div",
                "id": "video-play-button",
                "class": "default-play-buttom"
            });

            mediaParentContainer.appendChild(MediaPlayButton); 
            Scope.AssignBackgroundImage (MediaPlayButton, data.playbutton);
        }
    }
    else {

        MediaPlayButton = Scope.MakeElements ({
            "type": "div",
            "id": "video-play-button",
            "class": "default-play-buttom"
        });

        mediaParentContainer.appendChild(MediaPlayButton); 
        Scope.AssignBackgroundImage (MediaPlayButton, genericPlayButton);
    }

    Scope.MediaPlayButton = MediaPlayButton;
    MediaPlayButton.addEventListener('click', function() {Scope.PlayVideo();});

    /* :::::::: PAUSE BUTTON :::::::::::::::: */
    /* :::::::::::::::::::::::::::::::::::::: */

    if (data.pausebutton) {
        if (typeof data.pausebutton === 'object') { MediaPauseButton = data.pausebutton;}

        else if (typeof data.pausebutton === 'string') {

            MediaPauseButton = Scope.MakeElements ({
                "type": "div",
                "id": "video-pause-button",
                "class": "default-pause-buttom"
            });

            mediaParentContainer.appendChild(MediaPauseButton); 
            Scope.AssignBackgroundImage (MediaPauseButton, data.pausebutton);
        }
    }
    else {

        MediaPauseButton = Scope.MakeElements ({
            "type": "div",
            "id": "video-pause-button",
            "class": "default-pause-buttom"
        });

        mediaParentContainer.appendChild(MediaPauseButton); 
        Scope.AssignBackgroundImage (MediaPauseButton, genericPauseButton);
    }

    Scope.MediaPauseButton = MediaPauseButton;
    MediaPauseButton.addEventListener('click', function() {Scope.PauseVideo();});

    /* :::::::: MUTE BUTTON ::::::::::::::::: */
    /* :::::::::::::::::::::::::::::::::::::: */

    if (data.mutebutton) {
        if (typeof data.mutebutton === 'object') { MediaMuteButton = data.mutebutton;}

        else if (typeof data.mutebutton === 'string') {

            MediaMuteButton = Scope.MakeElements ({
                "type": "div",
                "id": "video-mute-button",
                "class": "default-mute-buttom"
            });

            mediaParentContainer.appendChild(MediaMuteButton); 
            Scope.AssignBackgroundImage (MediaMuteButton, data.mutebutton);
        }
       
    }
    else {

        MediaMuteButton = Scope.MakeElements ({
            "type": "div",
            "id": "video-mute-button",
            "class": "default-mute-buttom"
        });

        mediaParentContainer.appendChild(MediaMuteButton); 
        Scope.AssignBackgroundImage (MediaMuteButton, genericMuteButton);
    }

    Scope.MediaMuteButton = MediaMuteButton;
    MediaMuteButton.addEventListener('click', function() {
        Scope.MuteVideo();
        mediaParentContainer.classList.add("mute-state");
        mediaParentContainer.classList.remove("un-mute-state");

        if (data.wrapper) {
            if (data.maxwidth) {
                wrapper.classList.add("mute-state");
                wrapper.classList.remove("un-mute-state");
            }
        }
    });

   

    /* :::::::: UNMUTE BUTTON ::::::::::::::: */
    /* :::::::::::::::::::::::::::::::::::::: */

    if (data.unmutebutton) {
        if (typeof data.unmutebutton === 'object') { MediaUnMuteButton = data.unmutebutton;}

        else if (typeof data.unmutebutton === 'string') {

            MediaUnMuteButton = Scope.MakeElements ({
                "type": "div",
                "id": "video-unmute-button",
                "class": "default-un-mute-buttom"
            });

            mediaParentContainer.appendChild(MediaUnMuteButton); 
            Scope.AssignBackgroundImage (MediaUnMuteButton, data.unmutebutton);
        }
    }
    else {

        MediaUnMuteButton = Scope.MakeElements ({
            "type": "div",
            "id": "video-unmute-button",
            "class": "default-un-mute-buttom"
        });


        mediaParentContainer.appendChild(MediaUnMuteButton); 
        Scope.AssignBackgroundImage (MediaUnMuteButton, genericUnMuteButton);
    }

    Scope.MediaUnMuteButton = MediaUnMuteButton;
    MediaUnMuteButton.addEventListener('click', function() {
        Scope.UnMuteVideo();
        mediaParentContainer.classList.remove("mute-state");
        mediaParentContainer.classList.add("un-mute-state");

        if (data.wrapper) {
            if (data.maxwidth) {
                wrapper.classList.remove("mute-state");
                wrapper.classList.add("un-mute-state");
            }
        }

    });

    
    /* :::::::::::::: getting media source ::::::::::: */

   let hlsready = false;
   let hlsversion;
   let mp4version;

   if (data.media) {
        let mediaFiles = data.media.split("|");
        for (var m = 0; m < mediaFiles.length; m++) {
            let checkingForHLS = mediaFiles[m].search(".m3u8");
            let checkingForMP4 = mediaFiles[m].search(".mp4");


                if (checkingForHLS >= 0) { 
                    hlsversion = mediaFiles[m]; 
                    hlsready = true;
                    let HLSscript = document.createElement('script');
                    HLSscript.id = "HLS-script";
                    HLSscript.src = HLSCDN;
                    document.head.appendChild(HLSscript); 
                    HLSscript.onload = function () {
                        window.HLSplaya = new Hls({
                            /*
                            pLoader: function (config) {
                                let loader = new Hls.DefaultConfig.loader(config);
                            
                                Object.defineProperties(this, {
                                  stats: {
                                    get: () => loader.stats,
                                  },
                                  context: {
                                    get: () => loader.context,
                                  },
                                });
                            
                                this.abort = () => loader.abort();
                                this.destroy = () => loader.destroy();
                                this.load = (context, config, callbacks) => {
                                  let { type, url } = context;
                            
                                  if (type === 'manifest') {
                                    console.log(`Manifest ${url} will be loaded.`);
                                  }
                            
                                  loader.load(context, config, callbacks);
                                };
                              },
                            */
                        });
                        console.group("::HLS detetails::");
                        console.debug(Hls.version);
                        console.debug("latency: ",Hls.latency);
                        console.groupEnd();

                      
                        
                    };
                    HLSscript.onerror = function () { console.debug("error");}
                }
            else if (checkingForMP4 >= 0) { mp4version = mediaFiles[m]; }
        }
   }
   else {
        if (data["mp4"]) { mp4version = data["mp4"];}
        else {console.debug(" video file is missing ");}
       
   }

  
   console.group("%c :: media files ::","color:#cceeaa");
   console.debug("HLS file: ",hlsversion);
   console.debug("MP4 file: ",mp4version);
   console.groupEnd();


   /* :::::::::: Full Screen Options ::::::::::::: */

    if (data.enableFullScreen == "true") {

        console.debug(" :::: enable full screen mode ::::")

        //MediaFullScreenButton = Scope.MakeElements("div","video-fullscreen-button");
        MediaFullScreenButton = this.MakeElements ({
            "type": "div",
            "id": "video-fullscreen-button",
            "class": "video-fullscreen-button"
        });


        mediaParentContainer.appendChild(MediaFullScreenButton); 

        if (data.fullscreenbutton) { Scope.AssignBackgroundImage (MediaFullScreenButton, data.fullscreenbutton);}
        else { Scope.AssignBackgroundImage (MediaFullScreenButton, genericFullscreenButton); }

        MediaFullScreenButton.classList.add("default-fullscreen-buttom");

        MediaFullScreenButton.addEventListener('click', function() {
            console.debug(":::: open fullscreen ::::");
            if (data.callbackfunction.onFullScreen) { data.callbackfunction.onFullScreen (); }
            mediaParentContainer.classList.add("fullscreen");
            if (data.wrapper) { wrapper.classList.add("fullscreen-state"); }
        });

        MediaFullScreenCloseButton = this.MakeElements ({
            "type": "div",
            "id": "video-fullscreen-close-button",
            "class": "video-fullscreen-close-button"
        });

        //MediaFullScreenCloseButton = Scope.MakeElements("div","video-fullscreen-close-button");
        mediaParentContainer.appendChild(MediaFullScreenCloseButton); 

        if (data.fullscreenclosebutton){ 
            let vidBGimg = Scope.AssignBackgroundImage (MediaFullScreenCloseButton, data.fullscreenclosebutton); 
            console.debug("vid bg image: ",vidBGimg);
        }
        else { 
            let vidBGimg =  Scope.AssignBackgroundImage (MediaFullScreenCloseButton, genericFullscreenCloseButton); 
            console.debug("vid bg image: ",vidBGimg);
        }

        MediaFullScreenCloseButton.classList.add("default-fullscreen-close-buttom");

        MediaFullScreenCloseButton.addEventListener('click', function() {
            console.debug(":::: close fullscreen ::::");
            if (data.callbackfunction.onCloseFullScreen) { data.callbackfunction.onCloseFullScreen (); }
            mediaParentContainer.classList.remove("fullscreen");

            if (data.wrapper) { wrapper.classList.remove("fullscreen-state"); }
        });
    }
   


    /* ::::::::: Autoplay settings ::::::::::: */
    /* :::::::::::::::::::::::::::::::::::::: */

    if (data["autoplay"] === "true") {

        if (mp4version != undefined) {
            console.debug("====== this is an AUTOPLAY UNIT yo ====== ");
            Scope.Show( Scope.MediaUnMuteButton);
            Scope.Show( Scope.MediaPauseButton);
    
            Scope.Hide( Scope.MediaMuteButton);
            Scope.Hide(Scope.MediaPlayButton);
            Scope.playerVolumeStat = 0;
            autoplaystats = true;
            Scope.videostats = "autoplay";
            tempMediaPlayer.muted = true;
            tempMediaPlayer.setAttribute("muted","");
            tempMediaPlayer.autoplay = true;
            tempMediaPlayer.src = mp4version;
            autoplaystats = true;
            mediaParentContainer.classList.add("auto-play-state");
            if (data.wrapper) {Scope.SetState (wrapper,"auto-play-state");}
    
            if (data.callbackfunction) if (data.callbackfunction.onAutoPlay) { 
                if (autoplaystats) {data.callbackfunction.onAutoPlay();}
            }

            Scope.SetSoundStatus (Scope.mediaParentContainer, "sound-off");
            if (Scope.wrapper) { Scope.SetSoundStatus (Scope.wrapper,"sound-off");}
            
        }
        else {
            autoplaystats = false;
            console.debug("this WONT autoplay");
            Scope.Hide( Scope.MediaUnMuteButton); 
            Scope.Hide( Scope.MediaPauseButton);
           
        }
    }

    else { 
        autoplaystats = false;
        console.debug("this is not autoplay unit");
        Scope.Hide( Scope.MediaUnMuteButton); 
        Scope.Hide( Scope.MediaPauseButton);
        if (hlsversion == undefined) {tempMediaPlayer.src = mp4version;}
        
    }



    /* ::::::::: Mute settings :::::::::::::: */
    /* :::::::::::::::::::::::::::::::::::::: */

    if (data.muted == true) {
        Scope.Hide( Scope.MediaMuteButton);
        Scope.Show( Scope.MediaUnMuteButton);
        tempMediaPlayer.muted = true;
        tempMediaPlayer.volume = 0;
        mediaParentContainer.classList.add("mute-state");

        Scope.SetSoundStatus (Scope.mediaParentContainer, "sound-off");
        if (Scope.wrapper) { Scope.SetSoundStatus (Scope.wrapper,"sound-off");}
    }


    if (data.controls) { tempMediaPlayer.controls = true;}
  

    setTimeout(function(){  settingRationWithDelay (); }, 50);

    function settingRationWithDelay () {
        var tempWidth = mediaParentContainer.clientWidth;
        var tempHeight = mediaParentContainer.clientHeight;

        if ((data.ratio == "square") || (data.ratio == "1:1")) {
            mediaParentContainer.classList.add("video-1x1");
        }
        else if ((data.ratio == "widescreen") || (data.ratio == "16:9")) {
            mediaParentContainer.classList.add("video-16x9");
        }

        else if ((data.ratio == "anamorphic") || (data.ratio == "2.4:1")) {
            mediaParentContainer.classList.add("video-anamorphic");
        }

        else if (data.ratio == "custom") {mediaParentContainer.classList.add("custom");}
        else {mediaParentContainer.classList.add("custom");}
    }

    tempMediaPlayer.addEventListener("click", function() {
        tempMediaPlayer.volume = 0;
        tempMediaPlayer.pause();
        if (data.clickOutFunction) {clickOutFunction();}
        
    });

    (function () {
        if (data["poster"]) {
            console.debug("poster frame is present");
            vdoEndScreen = Scope.MakePoster({"id":"video-end-frame"});
            posterBG = Scope.MakePosterBG(vidID, data.poster);
            Scope.vdoEndScreen = vdoEndScreen;
            console.debug("poster BG: ",posterBG);
            Scope.posterBG = posterBG;
            let posterPlayBtn;

            if (data.posterPlayButton) {
                posterPlayBtn = Scope.MakePlayButtonOverPoster ("poster-play-button", data.posterPlayButton);
                vdoEndScreen.appendChild(posterPlayBtn);
                Scope.posterPlayBtn = posterPlayBtn;
            }

            else {
                posterPlayBtn = Scope.MakePlayButtonOverPoster ("poster-play-button", genericPlayButton);
                vdoEndScreen.appendChild(posterPlayBtn);
                Scope.posterPlayBtn = posterPlayBtn;
            }

            posterPlayBtn.addEventListener('click', function() {

                console.debug("poster frame play button clicked: 2");
                if (hlsready == true) {loadHLScontent (hlsversion);}
                let currentTime = Scope.video.currentTime;
                console.log(currentTime);
                if (currentTime == 0) { Scope.PlayVideo(0.2); }
                else { Scope.PlayVideo(); }
                
            });
            
            vdoEndScreen.classList.add("poster-frame");
            vdoEndScreen.appendChild(posterBG);
            mediaParentContainer.appendChild(vdoEndScreen);  

            if (data.ratio != "custom") {
                vdoEndScreen.style.width = videoContainerWidth;
                vdoEndScreen.style.height = videoContainerHeight;
            }
            
            posterBG.addEventListener("click", function() {if (data.clickOutFunction) {clickOutFunction();}});

            if ((data.autoplay === "true") && (mp4version != undefined)) { 
                vdoEndScreen.style.display = "none";
            }
            else { 
                if (data.poster) { 
                    tempMediaPlayer.setAttribute('poster', data.poster ); 
                }
                tempMediaPlayer.style.display = "none";
            }
        }
    })();

    //setTimeout(function(){  settingUpEndFrame (); }, 50);
   // settingUpEndFrame ();        


    /* ::::::::::: checking file mime type :::::::: */

    
    const loadHLScontent = (function() {
        let executed = false;
        return function(fileLocation) {
            if (!executed) {
                executed = true;
                console.debug("load HLS stuff ::::::::::::: ");
                const hls = new Hls();
                hls.loadSource(fileLocation);
                hls.attachMedia(tempMediaPlayer);

                /*
                Scope.posterBG.classList.add("hide");
                Scope.vdoEndScreen.classList.add("hide");
                */

                hls.on(Hls.Events.MANIFEST_PARSED, function(event) { 
                   console.debug(event);
                   if (event == "hlsManifestParsed") {
                    console.debug("::: Good to Go :::");
                   
                   /*
                    setTimeout(function(){  
                        Scope.posterBG.classList.remove("hide");
                        Scope.vdoEndScreen.classList.remove("hide");
                    }, 500);
                    */

                   }
                });

                hls.on(Hls.Events.ERROR, function (event, data) {
                    var errorType = data.type;
                    var errorDetails = data.details;
                    var errorFatal = data.fatal;
                  
                    switch (data.details) {
                        case Hls.ErrorDetails.FRAG_LOAD_ERROR:
                        // ....
                        break;
                        default:
                        break;
                    }
                });
            }
        };
    })();
    



    /* ::::::::::: end of mime type checking ::::::: */
    

    tempMediaPlayer.addEventListener('play', (event) => {
       if (data.debug) {}
       //console.log("HLS init play: ",hlsInitPlay);
       
    });

    tempMediaPlayer.addEventListener('pause', (event) => {
        autoplaystats = false;

        if (data.debug) {}
        if (data.poster) {vdoEndScreen.style.display = "block";}
        Scope.Show( Scope.MediaPlayButton);
        Scope.Hide( Scope.MediaPauseButton);

        if (data.callbackfunction) if (data.callbackfunction.onPause) { 
            if (!videoEnded) {data.callbackfunction.onPause();}
        }
     

        Scope.SetState (mediaParentContainer,"pause-state");
        if (data.wrapper) {Scope.SetState (wrapper,"pause-state");}

    });

    tempMediaPlayer.addEventListener('loadedmetadata', (event) => {
      
        duration = event.target.duration;
        vidUnits = duration / 100;
        if (data.debug) {}
    });

    tempMediaPlayer.addEventListener('loadeddata', (event) => {
      if (data.debug) {}
    });

    tempMediaPlayer.addEventListener('error', (event) => {if (data.debug) {}});

    tempMediaPlayer.addEventListener('ended', (event) => {
    
        replaystats = true;
        autoplaystats = false;
        Scope.replaystats = replaystats;
        Scope.videostats = "ended";

        Q0 = true;
        Q1 = true;
        Q2 = true;
        Q3 = true;
        Q4 = true;

        if (data.poster) {vdoEndScreen.style.display = "block";}
        Scope.Show( Scope.MediaPlayButton);
        Scope.Hide( Scope.MediaPauseButton);

        if (data.callbackfunction) if (data.callbackfunction.onEnd) { data.callbackfunction.onEnd (); }
        if (Scope.wrapper) {
            Scope.SetState (Scope.wrapper,"end-state");
            Scope.wrapper.classList.remove("sound-off");
            Scope.wrapper.classList.remove("sound-on");
            Scope.wrapper.classList.remove("fullscreen-state");           
        }

        mediaParentContainer.classList.remove("sound-off");
        mediaParentContainer.classList.remove("sound-on");
        mediaParentContainer.classList.remove("fullscreen");
        Scope.SetState (mediaParentContainer,"end-state");

    });

    tempMediaPlayer.addEventListener('emptied', (event) => {if (data.debug) {}});
    tempMediaPlayer.addEventListener('durationchange', (event) => {if (data.debug) {}});
    tempMediaPlayer.addEventListener('canplaythrough', (event) => {if (data.debug) {}});
    tempMediaPlayer.addEventListener('canplay', (event) => {if (data.debug) {}});
    tempMediaPlayer.addEventListener('abort', (event) => {if (data.debug) {}});
    tempMediaPlayer.addEventListener('progress', (event) => {if (data.debug) {}});
    tempMediaPlayer.addEventListener('ratechange', (event) => {if (data.debug) {}});
    tempMediaPlayer.addEventListener('seeking', (event) => {if (data.debug) {}});
    tempMediaPlayer.addEventListener('stalled', (event) => {if (data.callbackfunction.onStalled) { data.callbackfunction.onStalled (); }});
    tempMediaPlayer.addEventListener('suspend', (event) => {if (data.callbackfunction.onSuspend) { data.callbackfunction.onSuspend (); }});
    tempMediaPlayer.addEventListener('volumechange', (event) => {if (data.debug) {}});
    tempMediaPlayer.addEventListener('waiting', (event) => {if (data.debug) {} });
    tempMediaPlayer.addEventListener('loadstart', (event) => {if (data.debug) {}});
    tempMediaPlayer.addEventListener('timeupdate', (event) => {

        let CurTime = event.target.currentTime;
        let CurPercent = CurTime / vidUnits;
        let curPerRounded = Math.round(CurPercent);

        if (progressBarStats) {
            progBar.style.width = curPerRounded + "%";
        }

        if ((curPerRounded >= 1) && (curPerRounded < 25) && (Q0)) {
            if (data.debug) {}
            if (data.VideoTracking) {TrackingFunction0();}   
            Q0 = false;
        }

        if ((curPerRounded >= 25) && (curPerRounded < 50) && (Q1)) {
            if (data.debug) {}
            if (data.VideoTracking) {TrackingFunction25();}   
            Q1 = false;
        }

        if ((curPerRounded >= 50) && (curPerRounded < 75) && (Q2)) {
            if (data.debug) {}
            if (data.VideoTracking) {TrackingFunction50();}   
            Q2 = false;
        }

        if ((curPerRounded >= 75) && (curPerRounded < 95) && (Q3)) {
            if (data.debug) {}
            if (data.VideoTracking) {TrackingFunction75();}   
            Q3 = false;
        }

        if ((curPerRounded >= 95)&& (Q4)) {
            if (data.debug) {}
            if (data.VideoTracking) {TrackingFunction100();}
            Q4 = false;
            videoEnded = true;
        }
        
        if (data.debug) {}

        if (data.callbackfunction) if (data.callbackfunction.onProgress) { 
           data.callbackfunction.onProgress(CurTime);
        }

    });

    tempMediaPlayer.addEventListener('playing', (event) => {
        if (videoEnded) {videoEnded = false;}
        if (data.debug) {}
        if (data.poster) {vdoEndScreen.style.display = "none";}
        tempMediaPlayer.style.display = "block";
        Scope.Hide( Scope.MediaPlayButton);
        Scope.Show( Scope.MediaPauseButton);
        if (data.callbackfunction) if (data.callbackfunction.onPlay) 
          { if (!autoplaystats) { data.callbackfunction.onPlay(); }}

        Scope.SetState (mediaParentContainer,"play-state");

    });

  }

  /* ::::::::::: public functions here ::::::::::::: */
  /* ::::::::::::::::::::::::::::::::::::::::::::::: */

  
    status () {
        var Scope = this;
        var status = {};
        status.volume = Scope.video.volume;
        status.playing =  String(Scope.videostats);
        status.replaystats = Scope.replaystats;
        status.mute = Scope.video.muted;
        status.currentTime = Scope.video.currentTime;
        return status;
    }

    isSafari () {
        var areyouSafari = false;
        var ua = navigator.userAgent.toLowerCase(); 
        if (ua.indexOf('safari') != -1) { 
            if (ua.indexOf('chrome') > -1) { areyouSafari = false;} 
            else { areyouSafari = true; }
        }
        return areyouSafari;
    }

    isApp () {
        var returnVal = false;
        var safeFrame = window["$sf"];
        if (safeFrame != undefined) { returnVal = true;}
        return returnVal;
    }

    ToggleSoundBtnImages () {

        let MuteBtn = document.getElementById("mute-btn");
        let UnMuteBtn = document.getElementById("unmute-btn");

        if (MuteBtn.style.display == "block") {
            MuteBtn.style.display = "none";
            UnMuteBtn.style.display = "block";
        }
        else {
            MuteBtn.style.display = "block";
            UnMuteBtn.style.display = "none";
        }
      }

      ToggleSound () {
        var Scope = this;
        let currentVolume = Scope.video.volume;
        let currentVideoVolumeStats = Scope.video.muted;
        if (currentVideoVolumeStats == true) {
            Scope.video.volume = 1;
            Scope.video.muted = false;	
            if (data.callbackfunction) if (Scope.data.callbackfunction.onUnMute) {Scope.data.callbackfunction.onUnMute();}		
        }
        else {
            Scope.video.volume = 0;
            Scope.video.muted = true;	
            if (data.callbackfunction) if (Scope.data.callbackfunction.onMute) {Scope.data.callbackfunction.onMute();}
        }

        Scope.ToggleSoundBtnImages();
    }

    MuteVideo () {
        var Scope = this;
        Scope.video.volume = 0;
        Scope.video.muted = true;	
        Scope.Hide( Scope.MediaMuteButton);
        Scope.Show( Scope.MediaUnMuteButton);

        Scope.playerVolumeStat = 0;
        if (Scope.data.callbackfunction) if (Scope.data.callbackfunction.onMute) {Scope.data.callbackfunction.onMute();}

        Scope.SetSoundStatus (Scope.mediaParentContainer, "sound-off");
        if (Scope.wrapper) { Scope.SetSoundStatus (Scope.wrapper,"sound-off");}
    }

    UnMuteVideo () {
        var Scope = this;
        Scope.video.volume = 1;
        Scope.video.muted = false;	
        Scope.Show( Scope.MediaMuteButton);
        Scope.Hide( Scope.MediaUnMuteButton);

        Scope.playerVolumeStat = 1;
        if (Scope.data.callbackfunction) if (Scope.data.callbackfunction.onUnMute) {Scope.data.callbackfunction.onUnMute();}
        

        Scope.SetSoundStatus (Scope.mediaParentContainer, "sound-on");
        if (Scope.wrapper) { Scope.SetSoundStatus (Scope.wrapper,"sound-on");}

    }

    PlayVideo (time = undefined) {
        //console.log(this);
        var Scope = this;

        Scope.vdoEndScreen.classList.add("hide");
        setTimeout(function(){  Scope.vdoEndScreen.classList.remove("hide");}, 500);

        console.group("PublicFunc:PlayVideo");
        console.debug("PlayVideo ---- ");
        console.debug("hls init play 2:",Scope.hlsInitPlay);
        console.groupEnd();
        if (Scope.hlsInitPlay == false) { Scope.hlsInitPlay = true;}

        setTimeout(function(){  
            if (time != undefined) { Scope.video.currentTime = time; }
            Scope.video.play(); 
        }, 50);

        /* :::::: code to play with audio onPlay ::::: */
        Scope.video.volume = 1;
        Scope.video.muted = false;	

        Scope.Show( Scope.MediaMuteButton);
        Scope.Hide( Scope.MediaUnMuteButton);
        Scope.Hide( Scope.MediaPlayButton);

        Scope.videostats = "playing";

        if (Scope.replaystats) {
            if (Scope.data.callbackfunction) if (Scope.data.callbackfunction.onRePlay) {Scope.data.callbackfunction.onRePlay();}
        }

        if (Scope.wrapper) {Scope.SetState (Scope.wrapper,"play-state");}

        
    }

    PauseVideo () {
        var Scope = this;
        Scope.video.pause();
        Scope.videostats = "userpaused";

        if (Scope.wrapper) {Scope.SetState (Scope.wrapper,"pause-state");}
        
    }

    AutoPauseVideo () {
        var Scope = this;
        Scope.video.pause();
        Scope.videostats = "autopaused";
    }

    LoadVideo (data) {
        var Scope = this;
        Scope.video.src = data;
        Scope.video.load();
        Scope.videostats = "playing";
    }


    MakeElements (data) {
        var Element = document.createElement(data.type); 
        if (data.id) { Element.setAttribute('id',data.id);}
       /* if (data.class) { Element.classList.add(data.class);} */
        if (data.class) {Element.setAttribute('class',data.class)}
        return Element;
    }

   
    
    AssignBackgroundImage (object, imgLoc) {
        object.style.backgroundImage = 'url(' + imgLoc + ')';
        object.style.backgroundSize = "contain";
        object.style.backgroundPosition = "center";
        object.style.backgroundRepeat = "no-repeat";
        return object;
    }

    AssignSize (object, width, height) {
        object.style.width = width;
        object.style.height = height;
    }

    MakePoster (data) {

        let poster = this.MakeElements ({
            "type": "div",
            "id": data.id,
            "class": "poster"
        });

        return poster;
    }

    MakePosterBG (ID, imageurl) {  

        var posterBG = this.MakeElements ({
            "type": "div",
            "id": "background-" + ID,
            "class": "poster-background"
        });

        posterBG.style.backgroundImage = 'url(' + imageurl + ')';
        return posterBG;
    }

    MakePlayButtonOverPoster (ID, imageurl) {

        var playBtn = this.MakeElements ({
            "type": "div",
            "id": ID,
            "class": "poster-frame-playBtn"
        });
        
        playBtn.style.backgroundImage = 'url(' + imageurl + ')';
        return playBtn;
    }

    FirePixel(x) {
        var pixel = x;
        var img = document.createElement("img");
        img.setAttribute("src", pixel);
        img.setAttribute("style", "display:none");
        document.body.appendChild(img);
        console.debug("impressions pixel is firing");
    }

    Show (item) {
        try {item.classList.add("show");} catch (Error) {}
        try {item.classList.remove("hide");} catch (Error) {}
    }

    Hide (item) {
        try { item.classList.add("hide");} catch (Error) {}
        try { item.classList.remove("show");} catch (Error) {}
    }

    SetSoundStatus (item, whichState) {
        var allStates = ["sound-on","sound-off"];
        for (var i = 0; i < allStates.length; i++) {
            if (allStates[i] == whichState) {item.classList.add(whichState);}
            else { item.classList.remove(allStates[i]); }
        }
    }

    SetState (item,whichState) {
        var allStates = ["play-state","beginning-state","pause-state","end-state","auto-play-state","non-auto-play-state","low-power-mode"];
        for (var i = 0; i < allStates.length; i++) {
            if (allStates[i] == whichState) {item.classList.add(whichState);}
            else { item.classList.remove(allStates[i]); }
        }
    }
}




/* :::::::::::::::::::::::::::::::::::::::::::: */
/* :::::::: END OF VIDEO PLAYER CODE :::::::::: */

