import React, { useState, useEffect } from "react";
import { FormCheck } from "react-bootstrap";
// import Item from "../../components/Item";
import SearchInput from "../../components/SearchInput";
const Mostrar = () => {
  //Filtros Defaut
  const [filtros, setFiltros] = useState({
    code_tabela: "Todos",
    nivel_item: 1,
    titulo_SECClasS: "",
  });

  // const [itens, setItens] = useState([]);
  // const [info, setInfo] = useState([]);
  const [pesquisa, setPesquisa] = useState([]);
  /* Exemplos de Pesquisas
        http://193.136.189.87:5003/search?pesquisa=&nivel=&tabela=&revisao=false
  */
  // const url = "search?pesquisa=&nivel=&tabela=&revisao=false";
  //Nova Função de Pesquisa
  useEffect(() => {});

  const visualizar = () => {};

  //Retorna o Componente
  return (
    <div className="container">
      <br />

      <div className="jumbotron">
        <div className="row">
          <div className="col">
            <h3> Pesquisar Termo </h3>

            <SearchInput value={pesquisa} onChange={(search) => setPesquisa} />
            <br />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label> Tabela</label>
            <select
              className="form-control"
              onChange={(e) => {
                setFiltros({
                  ...filtros,
                  code_tabela: e.target.value,
                });
              }}
            >
              <option value="Todos">Todos</option>
              <option value="Complexos">Complexos (Co)</option>
              <option value="Entidades">Entidades (En)</option>
              <option value="Actividades">Actividades (Ac)</option>
            </select>
          </div>
          <div className="col-4">
            <label> Nível</label>
            <select
              className="form-control"
              onChange={(e) => {
                setFiltros({
                  ...filtros,
                  nivel_item: Number(e.target.value),
                });
              }}
            >
              <option value="1">1 - Grupo</option>
              <option value="2">2 - Sub-Grupo</option>
              <option value="3">3 - Secção</option>
              <option value="4" selected>
                4 - Objecto
              </option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <FormCheck
              className="form-control"
              type="switch"
              id="custom-em-revisao"
              label="Em Revisão"
            ></FormCheck>
          </div>
        </div>
        <br />
        <button onClick={visualizar} className="btn btn-info btn-lg btn-block">
          Visualizar
        </button>
        <br />
      </div>
      <table className="table table-striped table-sm ;">
        <thead>
          <tr>
            <th scope="col-4">Código</th>
            <th scope="col-4">Título</th>

            {/* <th class="text-center" scope="col-2">
              Tabela
            </th> */}
            <th class="text-center" scope="col-2">
              Nível
            </th>

            <th class="text-center" scope="col-2">
              Ações
            </th>
          </tr>
        </thead>

        <tbody className="table-hover">
          {/* {itens.map((item) => {
            return <Item item={item} />;
          })} */}
        </tbody>
      </table>
    </div>
  );
};

export default Mostrar;
