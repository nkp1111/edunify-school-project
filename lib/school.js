import { notify } from "./alert";

export const getAllSchools = async () => {
  try {
    // const response = await fetch(process.env.DOMAIN + "/api/school", {
    //   method: "GET",
    //   cache: "no-store",
    // });
    // const data = await response.json();
    // return data && data.schools ? data.schools : [];
    return [];
  } catch (error) {
    console.log(error)
    return [];
  }
}


export const addNewSchool = async (schoolData) => {
  try {
    const response = await fetch("/api/school", {
      method: "POST",
      body: JSON.stringify(schoolData),
      headers: {
        "Content-Type": "application/json",
      }
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