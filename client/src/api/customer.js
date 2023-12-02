export const getProduct = async () => {
    try {
        const response = await fetch(API_URL + "/api/product/", {
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


export const search = async (search) => {
    try {
        const response = await fetch(API_URL + "/api/product/search/" + search, {
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