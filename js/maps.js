export async function loadIndex() {

    const response =
        await fetch('maps/index.json');

    return await response.json();
}

export async function loadLayout(
    className,
    layoutId
) {

    try {
        const response = await fetch(
            `maps/${className}/${layoutId}.json`
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error loading layout:', error);
        return null;
    }
}