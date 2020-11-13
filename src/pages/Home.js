const Home = () => {
    const view = `
        <div class="main-page">
            <h2>YouTube</h2>
            <p id="ytError"></p>
            <hr class="home-separateContent">
            <div class="form-content">
                <form id="channel-form">
                    <input type="text" placeholder="Enter Channel Name" id="channel-input" autocomplete="off">
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

            <h2>News</h2>
            <hr class="home-separateContent">
            <div class="news-wrapper">
                <a href="https://www.forbes.com/innovation/"
                target="_blank"
                >
                    Forbes.com/<span>innovation</span>
                </a>
            </div>
        </div>
    `
    return view
}

export default Home
