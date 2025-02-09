import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import dayjs from "dayjs";

const OpeningForm = ({userData}) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const { mutate: signUpMutation } = useMutation({
        mutationFn: async (formData) => {
            const formattedData = new FormData();
            formattedData.append('cnpj', userData.cnpj);
            formattedData.append('disponivel', true);
            formattedData.append('dataInicio', dayjs().format("YYYY-MM-DD"));
            Object.entries(formData).forEach(([key, value]) => {
                if (value) {
                    formattedData.append(key, value);
                }
            });

            const res = await axiosInstance.post("/vagas", formattedData)

            return res.data;
        },
        onSuccess: () => {
            toast.success("Vaga criada com sucesso");
            navigate("/home");
            queryClient.invalidateQueries({ queryKey: ["authUser"] });
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || "Algo deu errado");
        },
    });

    const onSubmit = (data) => {
        setIsLoading(true);
        signUpMutation(data, { onSettled: () => setIsLoading(false) });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <input
                {...register("titulo", { required: "Título é obrigatório" })}
                placeholder="Informe o título da vaga"
                className="input input-bordered w-full mb-2"
            />
            {errors.titulo && (
                <span className="text-red-500 text-sm">{errors.titulo.message}</span>
            )}

            <select
                {...register("modeloTrabalho", {
                    required: "Modelo de trabalho é obrigatório",
                    validate: (value) => value !== "0" || "Modelo de trabalho é obrigatório",
                })}
                className="select select-bordered w-full mb-2"
                defaultValue={"0"}
            >
                <option value="0" disabled>
                    Selecione um modelo
                </option>
                <option value="Presencial">Presencial</option>
                <option value="Remoto">Remoto</option>
                <option value="Híbrido">Híbrido</option>
            </select>
            {errors.modeloTrabalho && (
                <span className="text-red-500 text-sm">{errors.modeloTrabalho.message}</span>
            )}
            <select
                {...register("senioridade", { required: "Senioridade é obrigatória", validate: (value) => value !== "0" || "Senioridade é obrigatória", })}
                className="select select-bordered w-full mb-2"
                defaultValue={"0"}
            >
                <option value="0" disabled>
                    Selecione a senioridade
                </option>
                <option value="es">Estágio</option>
                <option value="jr">Junior</option>
                <option value="pl">Pleno</option>
                <option value="sr">Sênior</option>
            </select>
            {errors.senioridade && (
                <span className="text-red-500 text-sm">{errors.senioridade.message}</span>
            )}

            <textarea
                {...register("descricao", { required: "Descrição é obrigatória" })}
                placeholder="Informe a descrição da vaga"
                className="textarea textarea-bordered w-full mb-2"
            />
            {errors.descricao && (
                <span className="text-red-500 text-sm">{errors.descricao.message}</span>
            )}

            <input type="date" {...register("dataFim", { required: "Data de finalização é obrigatório" })} min={dayjs().format("YYYY-MM-DD")}  placeholder="Data de finalização" className="input input-bordered w-full mt-2" />
            {errors.dataFim && <span className="text-red-500">{errors.dataFim.message}</span>}


            <button type="submit" className="btn btn-primary w-full text-white">
                {isLoading ? <Loader className='size-5 animate-spin' /> : "Cadastrar"}
            </button>
        </form>
    );
};

export default OpeningForm;
