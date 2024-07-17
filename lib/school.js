export const getAllSchools = async () => {
  try {
    const response = await fetch("/api/school");
    const data = await response.json();
    return data || [];
  } catch (error) {
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
    return;
  }
}