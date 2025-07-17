import React, { useState } from "react";
//import Comentarios from "../Comentarios/comentarios";

import { Modal } from "react-bootstrap";
const url = "https://toolkit.thenbs.com/uniclass/";

const Lista = ({ item }) => {
  const [showModal, setShowModal] = useState(false);

  const ModalOriginal = (props) => {
    return (
      <>
        <Modal
          show={showModal}
          onHide={mostrarItem}
          backdrop="static"
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>{item?.titulo_SECClasS}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <script>var={item.code_item}</script>

            <div>
              <div class="row">
                <div class="col-3">
                  <b>Tabela</b>
                </div>
                <div class="col-9">{item.tabela_id.nome_secclass}</div>
              </div>
              <div class="row">
                <div class="col-3">
                  <b>Código</b>
                </div>
                <div class="col-8">{item.code_item}</div>
              </div>
              <div class="row">
                <div class="col-3">
                  <b>Título SECClasS </b>
                </div>
                <div class="col-8">{item?.titulo_SECClasS}</div>
              </div>
              <div class="row">
                <div class="col-3">
                  <b>Título Uniclass 2015</b>
                </div>
                <div class="col-8">
                  <console className="log" value={url}>
                    {" "}
                  </console>
                  <a href={url + item.code_item} target="_blank" rel="noreferrer">
                    {item.title_item}
                  </a>
                </div>
              </div>
              <div class="row">
                <div class="col-3">
                  <b>Versão SECClasS</b>
                </div>
                <div class="col-8">{item.versao_secclas}</div>
              </div>
              <div class="row">
                <div class="col-3">
                  <b>Descrição</b>
                </div>
                <div class="col-8">{item.descricao_SECClasS}</div>
              </div>
              <div className="row">
                <div className="col">
                  {/*<Comentarios id_idtem_secclass={item._id} /> */}
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="row">
              <div className="col">
                <button className="btn-secondary" onClick={mostrarItem}>
                  Cancelar
                </button>
                <br />
              </div>
            </div>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  //Funções

  const mostrarItem = () => {
    //alert(item.titulo_SECClasS);
    console.log("Mudar State Modal", showModal);
    setShowModal(!showModal);
    //ListarComentarios();
  };

  //

  //Listar os Comentários
  /*
  const ListarComentarios = async () => {
    try {
      const url_comment = `/comment/iditem/${item._id}`;
      const responseComment = await api.get(`/comment/iditem/${item._id}`);
      const resComment = responseComment.data;
      console.log("Function ListarComentarios ", resComment);
      console.log("url ", url_comment);
      //Testa que não tem erro
      if (resComment.error) {
        alert(resComment.message);
        return false;
      }
    } catch (err) {
      alert(err.message);
      return false;
    }
  };
  */
  return (
    <tr class="table table-striped">
      {showModal && <ModalOriginal props={item} />}
      <td>{item?.code_item}</td>

      <td>{item?.titulo_SECClasS}</td>

      <td align="center">{item.code_tabela}</td>
      <td align="center">{item.nivel_item}</td>
      <td className="text-center">
        <button className="btn btn-mostrar" onClick={mostrarItem}>
          Mostrar
        </button>
      </td>
    </tr>
  );
};

export default Lista;
