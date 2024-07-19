import { notify } from "./alert";

export const getAllSchools = async () => {
  try {
    const response = await fetch(process.env.DOMAIN + "/api/school", {
      method: "GET",
      cache: "no-store",
    });
    const data = await response.json();
    return data && data.schools ? data.schools : [];
  } catch (error) {
    console.log(error)
    return [];
  }
}


export const addNewSchool = async (schoolData) => {
  try {
    const response = await fetch("/api/school", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(schoolData),
    });
    const data = await response.json();
    if (data && data.success) {
      return data.success;
    }
    return;
  } catch (error) {
    notify(error, "error")
    return;
  }
}