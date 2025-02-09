import dayjs from "dayjs";
import api from "../utils/api";
const Openings = ({ data, jwt, onEdit }) => {
  function desativarVaga() {
    api.patch(`/vagas/${data?.idVaga}`,{},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      }
    ).catch((err) => {
      console.error(err);
    }).finally(() => {
      onEdit(true);
    });
  }
  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-2xl  rounded-lg shadow-sm p-6 border">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{data?.cnpjNavigation.idUsuarioNavigation.nome}</h2>
            <h3 className="text-gray-600 mt-1 text-left">{data?.descricao}</h3>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">
              Data final para candidatura: <span className="font-medium">{dayjs(data?.dataFim).format("DD/MM/YYYY")}</span>
            </p>
          </div>
        </div>

        <div className="mt-6">
          {jwt.email == data?.cnpjNavigation.idUsuarioNavigation.email ? (<button onClick={desativarVaga} className="bg-[#002B5B] text-white px-6 py-2 rounded text-sm font-medium hover:bg-[#003875] transition-colors">
            {data?.disponivel === true ? "DESATIVAR" : "ATIVAR"}
          </button>) : ''}
          {jwt.role == "candidato" ? (<button className="bg-[#1570BF] text-white px-6 py-2 rounded text-sm font-medium hover:bg-[#003875] transition-colors">
            SE CANDIDATAR
          </button>) : ''}
        </div>
      </div>
    </div>
  );
};
export default Openings;
