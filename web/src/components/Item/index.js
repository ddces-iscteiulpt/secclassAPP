import React, { useState } from "react";
//import Comentarios from "../Comentarios/comentarios"; // COMENTADO - módulo sem exports

import { Modal } from "react-bootstrap";
const url = "https://toolkit.thenbs.com/uniclass/";

const Item = ({ item }) => {
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
                <div class="col-9">{item.code_tabela}</div>
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
                  {/* <console className="log" value={url}>
                    {" "}
                  </console> */}
                  <a href={url + item.code_item} target="_blank" rel="noreferrer">
                    {item.title_item}
                  </a>
                </div>
              </div>
              <div class="row">
                <div class="col-3">
                  <b>Versão SECClasS</b>
                </div>
                <div class="col-9">{item?.versao_secclas}</div>
              </div>
              <div class="row">
                <div class="col-3">
                  <b>Versão Uniclass</b>
                </div>
                <div class="col-9">{item?.Versao_Uniclass}</div>
              </div>
              <div class="row">
                <div class="col-3">
                  <b>Estado</b>
                </div>
                <div class="col-9">{item?.Status_Version}</div>
              </div>
              <div>
              {(() => {
                  if ( item.WBS !== undefined ) {
                    if (item.WBS.Level_1 !== undefined) {
                      return (
                        <div class="row">
                          <div class="col-3">
                            <b>Level(s) WBS Nível 1</b>
                          </div>
                          <div class="col-8">{item.WBS.Level_1.titulo}</div>
                        </div>
                      )
                    }
                  }
              })()}
              {(() => {
                    if ( item.WBS !== undefined ) {
                      if (item.WBS.Level_2?.titulo !== "") {
                        return (
                          <div class="row">
                            <div class="col-3">
                              <b>Level(s) WBS Nível 2</b>
                            </div>
                            <div class="col-8">{item.WBS.Level_2.titulo}</div>
                          </div>
                        )
                      }
                    }
                })()}
                {(() => {
                      if ( item.WBS !== undefined ) {
                        if (item.WBS.Level_3?.titulo !== "") {
                          return (
                            <div class="row">
                              <div class="col-3">
                                <b>Level(s) WBS Nível 3</b>
                              </div>
                              <div class="col-8">{item.WBS.Level_3.titulo}</div>
                            </div>
                          )
                        }
                      }
                  })()}
              </div>
              {/*
              {(() => {
                    if ( item.descricao_SECClasS !== undefined ) {
                      return (
                        <div class="row">
                        <div class="col-3">
                        <b>Descrição</b>
                      </div>
                      <div class="col-8">{item.descricao_SECClasS}</div>
                      </div>
                    )
                }
            })()}
            */}
            {/*
              <div className="row">
                <div className="col">
                  <Comentarios id_idtem_secclass={item._id} />
                </div>
              </div>
            */}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="row">
              <div className="col">
                <button className="btn-secondary" onClick={mostrarItem}>
                  Fechar
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
    console.log("Item completo:", item); // DEBUG: Ver todos os campos disponíveis
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
      <td>{item.review}</td>
      <td>{item?.titulo_SECClasS}</td>
      <td>{item?.title_item}</td>
      <td align="center">{item.tabela_id?.nome_secclass}</td>
      <td align="center">{item.nivel_item}</td>
      <td className="text-center">
        <button className="btn btn-mostrar" onClick={mostrarItem}>
          Mostrar
        </button>
      </td>
    </tr>
  );
};

export default Item;