import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const host = 'https://ciphervault-backend.onrender.com/'
    const navigate = useNavigate();

    const [value, setValue] = useState({ name: "", email: "", password: "", cPassword: "" })

    const onChange = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value })
    }

    const createUser = async () => {

        try {
            const response = await fetch(`${host}api/auth/createuser`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(value),
                })
            const json = await response.json()
            localStorage.setItem("authtoken", JSON.stringify(json.jwtToken))
            navigate("/");
        } catch (error) {
            console.error({ error })
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (value.password !== value.cPassword) {
            return alert("Password and Confirm password does not match")
        }
        createUser()
        setValue({ name: "", email: "", password: "", cPassword: "" })
    }

    useEffect(() => {
        props.state("Signup")
    }, [props])


    return (
        <>
            <div>
                <div className="Login mt-5 d-flex flex-column flex-md-row align-items-top justify-content-center container mt-4 gap-4" style={{ height: "80vh" }}>
                    {/* Logo */}
                    <div className="logo col-md-6 d-flex signupLogo align-items-center" >
                        <div className=" " >
                            <h1 className="text-center">CipherVault</h1>
                        </div>
                    </div>


                    {/* Login Form */}
                    <div className="form col-md-4 p-4 shadow mb-5 bg-body-tertiary rounded">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="Name" className="form-label">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Name"
                                    aria-describedby="emailHelp"
                                    name="name"
                                    value={value.name}
                                    onChange={onChange}
                                    required
                                />
                            </div>
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
                            <div className="mb-3">
                                <label htmlFor="confirmPassword" className="form-label">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="confirmPassword"
                                    name="cPassword"
                                    value={value.cPassword}
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

export default Signup;