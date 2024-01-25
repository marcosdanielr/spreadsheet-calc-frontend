import { api } from "../lib/axios"

export async function UploadCSVService(file: File) {
    const formData = new FormData()
    formData.append('file', file)
    
    const { data } = await api.post('/charges', file);

    return data
}
