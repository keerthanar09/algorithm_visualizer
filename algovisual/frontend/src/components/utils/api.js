import axios from "axios";

export const fetchSortingData = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/get_sorting_data/");
    return response.data.values;
  } catch (error) {
    console.error("Error fetching sorting data", error);
    return [];
  }
};
