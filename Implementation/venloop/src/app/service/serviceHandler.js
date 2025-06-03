export async function handle(promise, context) {
    try {
        return await promise;
    } catch (err) {
        console.error(`Error ${context}:`, err);
        return null;
    }
}