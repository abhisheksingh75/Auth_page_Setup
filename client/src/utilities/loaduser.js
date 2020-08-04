import axios from "axios"

export const loaduser = async () => {
  if (localStorage.getItem("token") === null) {
    return false
  }
  try {
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }

    const res = await axios.get("/api/auth/home", config)
    if (res.data) {
      return res.data
    }
  } catch (error) {
    return false
  }
  return false
}
