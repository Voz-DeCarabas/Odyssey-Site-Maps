(function () {
/**
 * Dynamic marker type management
 * Loads marker type definitions from category-specific config files
 */

const markerTypeCache = {};

/**
 * Load marker types for a specific category
 * @param {string} categoryName - The category name (e.g., 'tourism', 'agriculture')
 * @returns {Promise<Array>} Array of marker type objects with id, label, color
 */
async function loadMarkerTypes(categoryName) {
    // Return cached result if available
    if (markerTypeCache[categoryName]) {
        return markerTypeCache[categoryName];
    }

    try {
        const data = globalThis.ODYSSEY_MAP_DATA.markerTypes[categoryName];
        if (!data) {
            console.warn(`Marker types not found for category: ${categoryName}, using defaults`);
            return getDefaultMarkerTypes();
        }
        const markerTypes = data.markers || [];
        
        // Cache the result
        markerTypeCache[categoryName] = markerTypes;
        return markerTypes;
    } catch (error) {
        console.error(`Error loading marker types for ${categoryName}:`, error);
        return getDefaultMarkerTypes();
    }
}

/**
 * Get default marker types (fallback for categories without markers.json)
 * @returns {Array} Default marker types
 */
function getDefaultMarkerTypes() {
    return [
        {
            id: 'airlock',
            label: 'Airlock',
            color: '#0f02fa'
        },
        {
            id: 'securityDoor',
            label: 'Inner Doors',
            color: '#02c2f7'
        },
        {
            id: 'dataPort',
            label: 'Data Ports',
            color: '#8400ff'
        },
        {
            id: 'terminal',
            label: 'Terminals',
            color: '#00ff66'
        },
        {
            id: 'alarmPanel',
            label: 'Alarm Panel',
            color: '#f0fc05'
        },
        {
            id: 'container',
            label: 'PP Containers',
            color: '#dd8ef5'
        },
        {
            id: 'hint',
            label: 'Hints',
            color: '#16ac09'
        }
    ];
}

/**
 * Convert marker types array into a filters object
 * Used to initialize filter state for the viewer
 * @param {Array} markerTypes - Array of marker type objects
 * @returns {Object} Filters object with all marker types set to false by default
 */
function createDefaultFilters(markerTypes) {
    const filters = {};
    markerTypes.forEach(markerType => {
        filters[markerType.id] = false;
    });
    return filters;
}

globalThis.OdysseyMaps = globalThis.OdysseyMaps || {};
Object.assign(globalThis.OdysseyMaps, {
    loadMarkerTypes,
    createDefaultFilters
});
})();
