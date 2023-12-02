export const findById = async (id) => {
    try {
        console.log(id)
        const response = await fetch(API_URL + "/api/product/find/" + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error(error);
    }
};