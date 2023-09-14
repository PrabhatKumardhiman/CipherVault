import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const host = 'https://ciphervault-backend.onrender.com/'

    const navigate = useNavigate();
    const [value, setValue] = useState({ email: "", password: "" })
    const [user, setUser] = useState({ email: "", password: "" })

    const onChange = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setUser(value)
        loginUser(user)
    }

    useEffect(() => {
       props.state("Login")
    }, [props])

    const loginUser = async () => {
        try {
            const response = await fetch(`${host}api/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(value),
                })
            const json = await response.json()
            if (json.jwtToken) {
                localStorage.setItem("authtoken", JSON.stringify(json.jwtToken))
                navigate("/");
            }
            else if (json.msg){
                alert("Invalid User Credentials, Please Login agin!")
            }
        } catch (error) {
            console.error({ error })
        }
    }


    return (

        <>
            <div>
                <div className="Login mt-5 d-flex flex-column flex-md-row align-items-center justify-content-center container mt-4 gap-4" style={{ height: "80vh" }} >
                    {/* Logo */}
                    <div className="logo d-flex align-items-center col-md-6">
                        <h1>CipherVault</h1>
                    </div>
                    {/* Login Form */}
                    <div className="form col-md-4 p-4 shadow mb-5 bg-body-tertiary rounded">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    name="email"
                                    value={value.email}
                                    onChange={onChange}
                                    required
                                />
                                <div id="emailHelp" className="form-text">
                                    We'll never share your email with anyone else.
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    name="password"
                                    value={value.password}
                                    onChange={onChange}
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-dark">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;