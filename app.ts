import axios from "axios";
import type { AxiosResponse } from "axios";
import 'dotenv/config';

const API_URL = process.env.API_URL;

axios.defaults.baseURL = API_URL
axios.defaults.timeout = 60 * 1000
axios.defaults.headers.common.Accept = 'application/vnd.api+json'
axios.defaults.headers.common['Content-Type'] = 'application/json'

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            return error.response
        }
        if (error.request) {
            return error.request
        }
        return Promise.reject(error)
    }
)

const getForm = async (formId: Number, id: Number, token: string): Promise<AxiosResponse | null> => {
    try {
        const response = await axios.get(`/forms/${formId}/versions/${id}`, {
        // response = await axios.get(`/forms/{formId}/versions/{id}`, {
            headers: {
                Authorization: token,
            },
        })
        return response
    } catch (err) {
        console.log(err)
        return null
    }

}

const main = async () => {
  console.log("Iniciando busca de formulários...");

  const meuToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpbmljaXVzb2xpdmVpcmFzcDIyQGdtYWlsLmNvbSIsInN1YiI6NCwiaWF0IjoxNzYzMzgzOTIzLCJleHAiOjE3NjM0NzAzMjN9.azIuk3lAs4YKU1R8qIv2MdfsIe9IYo3A_zzZKpUFduc";

  // Chama a função e espera o resultado
  const resposta = await getForm(2, 3, meuToken);
  // Exibe a resposta da API
    console.log(resposta?.data)
};

// Executa a função main
main();