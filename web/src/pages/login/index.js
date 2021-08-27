/*
import React, { useState } from "react";

import api from "../../services/api";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";

const Login = () => {
  const [credenciais, setCredenciais] = useState({
    email: "",
    senha: "",
  });
  const login = async (res) => {
    try {
      const response = await api.post("usuario/login", credenciais);
      const res = response.data;

      //Se der erro, não continuar o Codigo
      if (res.error) {
        alert(res.message);
        return false;
      }

      localStorage.setItem("@user", JSON.stringify(res.usuario));
      window.location.reload();
    } catch (err) {
      alert(res.message);
      return false;
    }
  };
  return (
    <>
      <div
        class="container-fluid bg_itens"
        style={{
          position: "fixed",
          height: "100%",
        }}
      >
        <div id="caixa_login" class="col-4 offset-4">
          <h1 class="text-white">Entrar</h1>
          <br />
          <>
            <input
              onChange={(e) => {
                setCredenciais({ ...credenciais, email: e.target.value });
              }}
              type="email"
              class="form-control form-control-lg"
              placeholder="Email "
            />
            <br />
            <input
              onChange={(e) => {
                setCredenciais({ ...credenciais, senha: e.target.value });
              }}
              type="password"
              class="form-control form-control-lg"
              placeholder="Senha"
            />
            <br />
            <button onClick={login} class="btn btn-lg btn-block btn-danger">
              Entrar
            </button>
            <div class="row mt-4">
              <div class="col text-muted">
                <input type="checkbox" /> Lembrar de mim.
              </div>
              <div class="col text-right">
                <a href="javascript:void(0)" class="text-muted">
                  Precisa de ajuda?
                </a>
              </div>
            </div>
          </>
        </div>
      </div>
      <div className="testeModal">
        <Button onClick={() => this.handleModal()}> Abrir Modal</Button>
      </div>
    </>
  );
};
export default Login;

/*
import React, { useState, useEffect } from 'react';
import api from '../../services/api';

function Login() {
  const [credenciais, setCredenciais] = useState({ email: '', senha: '' });

  const login = async () => {
    try {
      const response = await api.post('/usuario/login', credenciais);
      const res = response.data;

      if (res.error) {
        alert(res.message);
        return false;
      }

      localStorage.setItem('@user', JSON.stringify(res.usuario));
      window.location.reload();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div
      class="container-fluid bg_filmes"
      style={{
        position: 'fixed',
        height: '100%',
      }}
    >

      <div id="caixa_login" class="col-4 offset-4">
        <h1 class="text-white">Entrar</h1>
        <br />
        <>
          <input
            onChange={(e) => {
              setCredenciais({ ...credenciais, email: e.target.value });
            }}
            type="email"
            class="form-control form-control-lg"
            placeholder="Email ou número de telefone"
          />
          <br />
          <input
            onChange={(e) => {
              setCredenciais({ ...credenciais, senha: e.target.value });
            }}
            type="password"
            class="form-control form-control-lg"
            placeholder="Senha"
          />
          <br />
          <button onClick={login} class="btn btn-lg btn-block btn-danger">
            Entrar
          </button>
          <div class="row mt-4">
            <div class="col text-muted">
              <input type="checkbox" /> Lembrar de mim.
            </div>
            <div class="col text-right">
              <a href="javascript:void(0)" class="text-muted">
                Precisa de ajuda?
              </a>
            </div>
          </div>
        </>
      </div>
    </div>
  );
}

export default Login;
*/
