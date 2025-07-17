// import React, { useState, useEffect } from "react";
// import CommentInput from "./ComentariosInput/CommentInput";
// import CommentList from "./CommentList/CommentList";
//import Pagination from "../Pagination/Pagination";
// import api from "../../services/api";

// Componente temporário até ser implementado
const Comentarios = () => {
  return null;
};

export default Comentarios;

/*
const Comentarios = ({ id_idtem_secclass }) => {
  const [comment, setComment] = useState([]);
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    ListComment();
    console.log("Carregou comment");
  }, []);
  const MostrarInput = (showInput) => {
    MostrarInput = setShowInput(!showInput);
  };

  const ListComment = async () => {
    try {
      const response = await api.get(`/comment/iditem/${id_idtem_secclass}`);
      const res = response.data;

      if (res.error) {
        alert(res.message);
        return false;
      }
      setComment([...res.data]);
      console.log("Lista do Comentario", res.data);
    } catch (err) {
      alert(err.message);
      return false;
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <a> </a>
        </div>
      </div>
      <br />

      <div className="comment-input " display="none">
        <br />
        <CommentInput comment_idItem={id_idtem_secclass} />
      </div>

      <div className="container">
        <table className="table table-striped table-lg">
          <tr>
            <th scope="col-2">Data</th>
            <th scope="col-2">Comentário</th>
            <th scope="col-4">Autor</th>
            <th scope="col-4">Instituição</th>
          </tr>

          <tbody className="table-striped">
            {comment.map((comentario) => {
              //Exibindo Todas as Tabelas

              return <CommentList comment_id={comentario} />;
            })}{" "}
          </tbody>
          <tfoot>
            <span>- </span>
          </tfoot>
        </table>
      </div>
      <div className="row">
        <div className="col"></div>
      </div>
    </div>
  );
};

// export default Comentarios; // REMOVIDO - já exportado acima
*/
/*
      <div className="comment-button-comand row">
<div className="col-3">
<button className="btn btn-primary" onClick={ListComment}>
  Ver Comentários
</button>
</div>
<div className="col-4">
<button className="btn btn-success">Enviar Comentário</button>
</div>
</div>
*/
