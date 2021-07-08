import React, { useState, useEffect } from "react";
import Item from "../../components/Item";
import Modalitem from "../../components/ModalItem";
import api from "../../services/api";

const Pesquisa = () => {
  //Filtros Defaut
  const [filtros, setFiltros] = useState({
    //filtroTabela: "Complexos",
    filtroTabela: "SECClasS",
    filtroNivel: 1,
  });

  console.log("Filtros Selecionados ", filtros);
  const [itens, setItens] = useState([]);
  const [item, setItem] = useState({
    code_item: "",
    title_item: "",
    nivel_item: null,
  });

  //Visualizar
  const visualizar = async () => {
    try {
      const response = await api.get("/");
      const res = response.data;
      console.log("res ", res.itens);
      console.log("Carregou os Filtros");
      //Testa que não tem erro
      if (res.error) {
        alert(res.message);
        return false;
      }

      setItens([...res.itens]);
      console.log("Outra  Exibição", res.itens.length);
    } catch (err) {
      alert(err.message);
    }
  };

  const getHome = async () => {
    try {
      const response = await api.get("/");
      const res = response.data;
      console.log("Home ", res.itens);
      console.log("Carregou a Pagina");
      //Testa que não tem erro
      if (res.error) {
        alert(res.message);
        return false;
      }

      setItens([...res.itens]);
      console.log("Primeira Exibição");
    } catch (err) {
      alert(err.message);
    }
  };

  // Usamos para regarregar a pagina
  useEffect(() => {
    // getHome();
  }, []);
  //Retorna o Componente
  return (
    <div className="container">
      <br />
      <Modalitem />
      <div className="jumbotron">
        <div className="row">
          <div className="col">
            <h3> Pesquisar Termo </h3>

            <input
              className="form-control"
              placeholder="Informe Termo para Pesquisa"
            ></input>
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
                  filtroTabela: e.target.value,
                });
              }}
            >
              <option value="">Todos</option>
              <option value="Complexos">Complexos (Co)</option>
              <option value="Entidades">Entidades (En)</option>
              <option value="Actividades">Atividades (Ac)</option>
              <option value="Espaços/ locais">Espaços/ locais (SL)</option>
              <option value="Elementos/ funções">Elementos/ funções (EF)</option>
            </select>
          </div>
          <div className="col-4">
            <label> Nível</label>
            <select
              className="form-control"
              onChange={(e) => {
                setFiltros({
                  ...filtros,
                  filtroNivel: Number(e.target.value),
                });
              }}
            >
              <option value="1">1 - Grupo</option>
              <option value="2">2 - Sub-Grupo</option>
              <option value="3">3 - Secção</option>
              <option value="4">4 - Objeto</option>
            </select>
          </div>
        </div>
        <br />
        <button onClick={visualizar} className="btn btn-info btn-lg btn-block">
          Visualizar
        </button>
        <br />
      </div>
      <table className="table table-striped table-bordered table-sm">
        <thead>
          <tr>
            <th scope="col-4">Código</th>
            <th scope="col-4">Título</th>

            <th class="text-center" scope="col-2">
              Tabela
            </th>
            <th class="text-center" scope="col-2">
              Nível
            </th>

            <th class="text-center" scope="col-2">
              Ações
            </th>
          </tr>
        </thead>

        <tbody>
          {itens.map((item) => {
            //console.log("filtro NIvel", typeof filtros.filtroNivel);
            //console.log("Item Nivel", typeof item.nivel_item);

            if (
              filtros.filtroTabela === item.code_tabela &&
              filtros.filtroNivel === 1 && // Sempre Exibir  primeiro Nivel
              filtros.filtroNivel === item.nivel_item
            ) {
              console.log("1 if", item);
              return <Item item={item} />;
            } else {
              if (
                filtros.filtroTabela === item.code_tabela &&
                filtros.filtroNivel != 1 && // Sempre Exibir  primeiro Nivel
                filtros.filtroNivel >= item.nivel_item
              ) {
                console.log("2 if", item);
                return <Item item={item} />;
              }
            }
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Pesquisa;
