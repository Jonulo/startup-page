function authenticate(update=false){
    return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/youtube.readonly"})
        .then(() => loadClient(update),
              err => console.error("Error signing in", err))
}

function loadClient(update) {
    gapi.client.setApiKey("AIzaSyBFjag67DgGeZU4OrPfRwpmBKoCkNJCsRE")
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(() => {
            if(update){
                getVideos(update)
            }else {
                let channelName = document.getElementById("channel-input")
                const channel = channelName.value
                getChannel(channel)
                channelName.value = ""
            }
            console.log("GAPI client loaded for API")
        },
            err => console.error("Error loading GAPI client for API", err))
}

gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: "90672568920-r6vap67mmst6jl68hkj5rqbq6a55p7tk.apps.googleusercontent.com"});
})

function getChannel(channel) {
    const errorMgs = document.getElementById("ytError")
    let currentData = JSON.parse(localStorage.getItem("userChannelData")) || ""

    if(currentData.length == 5){
        errorMgs.innerHTML = "You only can add 5 YT channels."
        setTimeout(() => {
            errorMgs.innerHTML = ""
        },2500)
        return
    }

    return gapi.client.youtube.channels.list({
        "part": [
        "snippet,contentDetails"
        ],
        "forUsername": channel
    })
    .then((response) => {
        let channelsData = []
        if(currentData){
            let newChannelId = response.result.items[0].id
            let channelDuplicated = currentData.find(channel => channel.channelId === newChannelId)

            if(!channelDuplicated){
                let channelFinalData = {
                    channelId: response.result.items[0].id,
                    channelName: response.result.items[0].snippet.title,
                    channelDescription: response.result.items[0].snippet.description,
                    playListId: response.result.items[0].contentDetails.relatedPlaylists.uploads,
                    icon: response.result.items[0]. snippet.thumbnails.default.url
                }
                currentData.push(channelFinalData)
                localStorage.setItem("userChannelData", JSON.stringify(currentData))
                getVideos()
            }else {
                errorMgs.innerHTML = "This channel already exists in your tracked list."
                setTimeout(() => {
                    errorMgs.innerHTML = ""
                },3000)
            }
        }else {
            let channelFinalData = {
                channelId: response.result.items[0].id,
                channelName: response.result.items[0].snippet.title,
                channelDescription: response.result.items[0].snippet.description,
                playListId: response.result.items[0].contentDetails.relatedPlaylists.uploads,
                icon: response.result.items[0]. snippet.thumbnails.default.url
            }
            channelsData.push(channelFinalData)
            localStorage.setItem("userChannelData", JSON.stringify(channelsData))
            getVideos()
        }
    })
    .catch(err => {
        console.log("error channel", err)
        errorMgs.innerHTML = "We could not find the YT user."
        setTimeout(() => {
            errorMgs.innerHTML = ""
        },3000)
    })
}

function getVideos() {
    const channelData = JSON.parse(localStorage.getItem("userChannelData")) || ""
    const requestOptions = {
        playlistId: "",
        part: 'snippet',
        maxResults: 2
    }
    let videosId = []
    let icons = []

    let promisePlayList = new Promise((resolve, reject) => {
        channelData.forEach((channel, index, array) => {
            requestOptions.playlistId = channel.playListId
            let request = gapi.client.youtube.playlistItems.list(requestOptions)
            
            request.execute(({ items }) => {
                icons.push(channel.icon)
                items.forEach(item => {
                    let videoData = {
                        playListId: channel.playListId,
                        videoId: item.snippet.resourceId.videoId
                    }
                    videosId.push(videoData)
                })
                localStorage.setItem("userTrackedList", JSON.stringify(videosId))
                localStorage.setItem("channelIcons", JSON.stringify(icons))
            })
            if (index === array.length -1) resolve();
        })
    })
    promisePlayList.then(() => {
        setTimeout(() => {
            showVideos()
        },2000)
    })
}

function showVideos() {
    const playListVideos = JSON.parse(localStorage.getItem("userTrackedList")) || ""
    const channelIcons = JSON.parse(localStorage.getItem("channelIcons")) || ""
    const videoContainer = document.getElementById("video-container")
    const iconWrapper = document.getElementById("icon-wrapper")

    if(playListVideos) {
        let iconOutput = ""
        let output = ""
        let iconPos = 0
        playListVideos.forEach((video, index) => {
            if(index % 2 === 0) {
                iconOutput += `
                    <img width="48" class="channels-icons__item"
                        src="${channelIcons[iconPos]}">
                `
                iconPos++
            }
            output += `
                <div class="wrapper-video__item">
                    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${video.videoId}"
                    frameborder="0" autoplay; clipboard-write; encrypted-media;
                    gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            `
        })
        videoContainer.innerHTML = output
        iconWrapper.innerHTML = iconOutput
        iconsChannelManagment()
    }
    if(playListVideos.length == 0) {
        console.log("there is nothing", playListVideos)
        videoContainer.innerHTML= "Please add your favorite YT channels to show you its latest videos"
    }
}

function iconsChannelManagment() {
    const iconsElements = document.getElementsByClassName("channels-icons__item")
    for(const icon of iconsElements) {
        icon.addEventListener("click", () => {
            let channelData = JSON.parse(localStorage.getItem("userChannelData")) || ""
            let playListVideos = JSON.parse(localStorage.getItem("userTrackedList")) || ""
            let channelIcons = JSON.parse(localStorage.getItem("channelIcons")) || ""

            let removeChannel = channelData.find(channel => channel.icon === icon.src)

            channelData = channelData.filter(channel => channel.icon !== icon.src)
            playListVideos = playListVideos.filter(video => video.playListId !== removeChannel.playListId)
            channelIcons = channelIcons.filter(icon => icon !== removeChannel.icon)

            localStorage.setItem("userChannelData", JSON.stringify(channelData))
            localStorage.setItem("userTrackedList", JSON.stringify(playListVideos))
            localStorage.setItem("channelIcons", JSON.stringify(channelIcons))
            
            showVideos()
        })
    }
}
function videosManagment() {
    const channelForm = document.getElementById("channel-form")
    const updateButton = document.getElementById("updateVideos")

    showVideos()

    channelForm.addEventListener("submit", e => {
        const channelFormButton = document.getElementById("channelFormButton")
        channelFormButton.disabled = true
        channelFormButton.style.cursor = "not-allowed"
        e.preventDefault()
        authenticate()
        channelFormButton.disabled = false
        channelFormButton.style.cursor = "pointer"
    })

    updateButton.addEventListener("click", () => authenticate(true))
    iconsChannelManagment()

}

export {
    videosManagment
}