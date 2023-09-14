import React from 'react'

const Navbar = (props) => {
    
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand h1" href="/">
                        CipherVault
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">
                                    Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/about">
                                    About
                                </a>
                            </li>
                            {props.state === "home" && <li className="nav-item">
                                <a className="nav-link" href="/" onClick = {() => localStorage.clear()}>
                                    Logout
                                </a>
                            </li>}
                            {props.state === "Login" && <li className="nav-item">
                                <a className="nav-link" href="/signup">
                                    Signup
                                </a>
                            </li>}
                            {props.state === "Signup" && <li className="nav-item">
                                <a className="nav-link" href="/login">
                                    Login
                                </a>
                            </li>}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar