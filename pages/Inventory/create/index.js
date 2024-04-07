export default async function AddProduct(){
    try {
        const insert_value = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                name: 'name test',
                description: 'testing insertion',
                category_id: 1,
                price: 681.51,
                stock: 681,
            })
        }
        const response = await fetch('/api/inventory/create', insert_value);
        const data = await response.json();
        
    } catch (error) {
        setError(error.message);
    } finally {
        setIsLoading(false);
    }
}