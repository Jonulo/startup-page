const Header = () => {
    const view = `
      <div class="header__top">
        <div class="header__title">
            <h1>
              Startup Page
            </h1>
        </div>
        <div class="header__socials">
          <ul>
            <li>
              <a
                target="_blank"
                href="https://twitter.com/Jonuulo"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://www.linkedin.com/in/jorge-nu%C3%B1ez-lopez-aba94a184/"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="header__bot">
        <div class="header__menu">
          <ul>
            <li>
              <a href="#/">Home</a>
            </li>
            <li>
              <a href="#/english">Verbs Test</a>
            </li>
          </ul>
        </div>
      </div>
    `
    return view
  }

  export default Header