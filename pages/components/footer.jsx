export default function Footer(){
    return (

        <>
        <div className="navbar navbar-expand-lg navbar-light px-lg-0">
          <div className="container-boxed flex-1">
            <div className="text-center d-lg-none w-100">
              <button
                type="button"
                className="navbar-toggler dropdown-toggle"
                data-toggle="collapse"
                data-target="#navbar-third"
              >
                <i className="icon-menu mr-2" />
                Bottom navbar
              </button>
            </div>
            <div className="navbar-collapse collapse" id="navbar-third">
              <span className="navbar-text">
                © 2015 - 2018. <a href="#">Limitless Web App Kit</a>
                <a href="https://themeforest.net/user/Kopyov">
                  Eugene Kopyov
                </a>
              </span>
              <ul className="navbar-nav ml-lg-auto">
                <li className="nav-item">
                  <a href="#" className="navbar-nav-link">
                    Link
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="navbar-nav-link">
                    <i className="icon-stack2" />
                  </a>
                </li>
                <li className="nav-item dropup">
                  <a href="#" className="navbar-nav-link" data-toggle="dropdown">
                    <i className="icon-more2 d-none d-lg-inline-block" />
                    <span className="d-lg-none">Menu</span>
                  </a>
                  <div className="dropdown-menu dropdown-menu-right">
                    <a href="#" className="dropdown-item">
                      Item 1
                    </a>
                    <a href="#" className="dropdown-item">
                      Item 2
                    </a>
                    <a href="#" className="dropdown-item">
                      Item 3
                    </a>
                    <div className="dropdown-divider" />
                    <a href="#" className="dropdown-item">
                      Item 4
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
      

    )
}