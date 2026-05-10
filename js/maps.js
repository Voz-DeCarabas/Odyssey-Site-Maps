export async function loadIndex() {

    const response =
        await fetch('maps/index.json');

    return await response.json();
}

export async function loadLayout(
    className,
    layoutId
) {

    const response = await fetch(
        `maps/${className}/${layoutId}.json`
    );

    return await response.json();
}