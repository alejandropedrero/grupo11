import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { Modal } from "react-bootstrap";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [modal, setModal] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password || !name) {
      setError("Debes completar todos los campos");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message);
        setModal(true);
        setTimeout(function () {
          navigate("/");
        }, 2000);
        
      } else {
        console.log(data.error);
        setError(data.error);
      }
    
    } catch (error) {
      console.error(error);
      setError("Error de conexión");
    }
    
  };
  
  const handleModal = () => {
    setModal(false);
  };

  return (
    <div className="register-form">
      <div className="wrapper-lr">
        <div className="container main-lr">
          <div className="row row-lr">
            <div className="col-md-6 side-image-register">
              <img src="" alt="" />
            </div>

            <div className="col-md-6 right-lr">
              <div className="input-box-lr">
                <form onSubmit={handleSubmit}>
                  <header>
                    <h1 className="h1-lr">
                      <span className="underline">Crea tu cuenta</span>
                    </h1>
                  </header>
                  <div className="input-field-lr">
                    <input
                      type="email"
                      className="input-lr"
                      id="email-input"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="off"
                    />
                    <label htmlFor="email">Email</label>
                  </div>
                  <span id="email-error" className="error-lr"></span>
                  <div className="input-field-lr">
                    <input
                      type="password"
                      className="input-lr"
                      id="password-input"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="password">Contraseña</label>
                  </div>
                  <span id="password-error" className="error-lr"></span>
                  <div className="input-field-lr">
                    <input
                      type="text"
                      className="input-lr"
                      id="name-input"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="name">Nombre completo</label>
                  </div>
                  <span id="name-error" className="error-lr span-lr"></span>
                  <div className="input-field-lr">
                    <button className="submit-lr" id="submitBtn">
                      Crear cuenta nueva
                    </button>
                  </div>
                  <div className="signin-lr">
                    <span className="span-lr">
                      ¿Ya tienes una cuenta?
                      <Link to="/"> Inicia sesión</Link>
                    </span>
                  </div>
                </form>
                <div className="signin-lr z-3 text-center mt-3">
                  <span id="error-container" className="text-danger fw-bold">
                    {error}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={modal} onHide={handleModal}>
        <Modal.Header>
          <Modal.Title>¡Usuario registrado correctamente!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <button className="rounded-pill"
        style={{ backgroundColor: "palevioletred", color: "white" }} onClick={handleModal}>
            Cerrar
          </button>
        </Modal.Body>
      </Modal>
    </div>
    
  );
}

export default Register;
