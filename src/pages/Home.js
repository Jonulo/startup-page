const Home = () => {
    const view = `
        <div class="main-page">
            <hr>
            <div class="form-content">
                <form id="channel-form">
                    <input type="text" placeholder="Enter Channel Name" id="channel-input">
                    <input type="submit" placeholder="Get Channel Data" class="channel-submit"
                        value="Add"
                        id="channelFormButton"
                    >
                </form>
                <div class="channels-icons" id="icon-wrapper"></div>
                <div class="updatebtn-wrapper">
                    <input type="button" value="Update" id="updateVideos">
                </div>
            </div>
            <div class="carousel">
                <div id="video-container" class="wrapper-video"></div>
            </div>
        </div>
    `
    return view
}

export default Home