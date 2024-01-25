import { api } from "../lib/axios"

export async function uploadCSVService(file: File) {
  const formData = new FormData()
  formData.append("file", file)

  const { data } = await api.post("/charges", formData)

  return data
}
