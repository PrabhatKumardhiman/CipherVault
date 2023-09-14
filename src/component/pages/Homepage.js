import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const HomePage = (props) => {
  const host = 'https://ciphervault-backend.onrender.com/'
  const navigate = useNavigate()
  let authtoken = localStorage.getItem('authtoken')

  // all State
  const [state, setState] = useState([])
  const [value, setValue] = useState({ username: "", website: "", password: "" })


  // Functions 
  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value })
  }

  // Get all Saved Password 
  const getPassword = async () => {
    // API call
    try {
      const response = await fetch(`${host}api/pass/fetchallpass`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'authtoken': authtoken
        },
      });
      // Resposne from Backend
      const json = await response.json();
      // Filling Received Pass into state
      setState(json.allPass)
    } catch (error) {
      console.error(error.message)
    }
  }
// Saving Passwords onto Cloud
  const addPasswords = async () => {
    // API Call
    try {
      const response = await fetch(`${host}api/pass/addpass`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authtoken": authtoken
        },
        body: JSON.stringify(value),
      });
      // Response from Backend
      await response.json();
      // Calling fetchallpass once again to get new added Pass in state
      getPassword()
    } catch (error) {
      console.error(error.message)
    }
  }

  //  Save Password Button 
  const handleSubmit = (e) => {
    e.preventDefault();
    addPasswords()
    setValue({ username: "", website: "", password: "" })
  }

  // Delete a Password 
  const deletePassword = async (id) => {
    // API Call 
     try {
      const response = await fetch(`${host}api/pass/deletepass/${id}`, {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "authtoken": authtoken
        },
      });
      // Response From Backend if sucessfull : {sucess , deleted note}
      const json = await response.json()
      alert(json.Sucess)
      // Calling fetchallpass once again to get new added Pass in state
      getPassword();
    } catch (error) {
      console.error(error.message)
    }
  }

  // Copy Text 
  const copyText = (text) => {
    navigator.clipboard.writeText(text)
  }

  //  Mask Password 
  const maskPassword = (length) => {
    let str = ""
    for (let index = 0; index < length; index++) {
      str += "*"
    }
    return str
  }



  // useState Function to render on load
  useEffect(() => {
    props.state("home")
    if (!localStorage.getItem("authtoken")) {
      return navigate('/login')
    }
    getPassword()// eslint-disable-next-line
  }, [props])
  return (
    <div>
      {/* Main Body for application */}
      <div className="container">
        {/* Table start */}
        <div className=" table-responsive">
          <table className="table table-bordered table-hover my-3">
            <thead>
              <tr className='table-dark'>
                <th scope="col">#</th>
                <th scope="col">Website </th>
                <th scope="col">Username or Email</th>
                <th scope="col">Password</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {state.length !== 0 ? state.map(((elem, index) => {
                return <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{elem.website}</td>
                  <td>{elem.username} <span><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="currentColor"
                    className="bi bi-clipboard"
                    viewBox="0 0 16 16"
                    onClick={() => {
                      copyText(elem.username)
                    }}
                  >
                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                  </svg>
                  </span>
                  </td>
                  <td>{maskPassword(elem.password.length)} <span><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="currentColor"
                    className="bi bi-clipboard"
                    viewBox="0 0 16 16"
                    onClick={() => {
                      copyText(elem.password)
                    }}
                  >
                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                  </svg>
                  </span>
                  </td>
                  <td>{<button className="btn btn-sm btn-dark" onClick={() => deletePassword(elem._id)}> Delete</button>}</td>
                </tr>
              }))
                :
                <tr>
                  <th scope="row">1</th>
                  <td colSpan="4">No Data to Display, Fill details below to add!</td>
                </tr>
              }

            </tbody>
          </table>
        </div>
      </div>
      {/* Table Ends */}

      {/* Add Password Form Start*/}

      <div className="container d-md-flex justify-content-center ">
        <div className="card  col-md-6">
          <div className="card-body ">
            <h5 className="card-title">Add a Password to Remember </h5>
            <form onSubmit={handleSubmit}>
              {/* Input for website */}
              <div className="mb-3">
                <label htmlFor="website" className="form-label">
                  Website
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="website"
                  name='website'
                  aria-describedby="emailHelp"
                  value={value.website}
                  onChange={onChange}
                />
              </div>
              {/* Input for username */}
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name='username'
                  aria-describedby="emailHelp"
                  value={value.username}
                  onChange={onChange}

                />
              </div>
              {/* Input for password */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name='password'
                  value={value.password}
                  onChange={onChange}
                />
              </div>
              {/* Caption Text */}
              <div id="emailHelp" className="form-text">
                We'll never share your email and password with anyone else.
              </div>
              {/* Save Btn */}
              <button type="submit" className="btn btn-dark mt-3">
                Save Password
              </button>
            </form>
          </div>
        </div>

      </div>
      {/* Add Password Form Ends*/}

      {/* Main Body for application Ends*/}


    </div>
  )
}

export default HomePage