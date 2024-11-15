import axios from "axios";

useEffect(() => {
    axios.get("http://localhost:8000/api/get_sorting_data/")
    .then((response) => {
        setValues(response.data.values);
    })
    .catch((error) => console.error("Error fetching data", error));
}, []);