import { useEffect, useState } from "react";
import api from "../utils/api";

const GetJobs = ({ userData, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [vagaData, setVagaData] = useState([]); // 🔹 Inicializado como array

    // Garantindo que userData.cnpj não cause erro
    useEffect(() => {
        if (userData?.cnpj) { // 🔹 Verifica se userData e cnpj existem
            getJobs(userData.cnpj);
        }
    }, [userData?.cnpj]); // 🔹 Observa apenas userData.cnpj

    async function getJobs(cnpj) {
        try {
            const resposta = await api(`Vagas/${cnpj}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });

            if (resposta.status === 200 && resposta.data?.$values) { // 🔹 Verifica se há dados válidos
                setVagaData(resposta.data.$values);
            } else {
                console.warn("Nenhuma vaga encontrada.");
                setVagaData([]); // 🔹 Evita que vagaData fique undefined
            }
        } catch (erro) {
            console.error("Erro ao buscar vagas:", erro);
        }
    }

    return (
        <div className='bg-white shadow rounded-lg p-6 mb-6'>
            <h2 className='text-xl font-semibold mb-4'>Vagas abertas</h2>

            {vagaData.length > 0 ? (
                vagaData.map((vaga) => (
                    <div className='list' key={vaga.idVaga}>
                        <hr></hr>
                        <div style={{ display: "flex", flexDirection: "column", margin: '0.5rem 0'}}>
                            <div style={{ fontSize: '1.5em' }}>
                                <span className="list__title">{vaga.titulo}</span> - <span >{vaga.senioridade}</span>
                            </div>

                            <span style={{ margin: '0.5rem 0 ' }}>Modelo de trabalho: {vaga.modeloTrabalho}</span>

                            <div style={{ display: "flex", flexDirection: "column"}}>
                                <span >Descrição: </span>
                                <span>{vaga.descricao}</span>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">Nenhuma vaga disponível no momento.</p>
            )}
        </div>
    );
};

export default GetJobs;
