# Odyssey Site Maps

Having used the incredibly helpful Odyssey Map Guide (OMG) by CMDR Quizengine https://github.com/Quizengine/OMG I've felt that there are a few things that I would like to see added.
Sadly CMDR Quizengine passed away and the code that remains is very hard to follow.  It was created in Adobe Animate CC and uses a very flat structure that although efficient doesn't lend itself to easy extension.

This project is very much about building on what CMDR Quizengine created and I'm using the same maps, thumbnails, and help images as the basis.

I've created this version using simple technologies that should work on all platforms and are easy to understand and to extend. It will be straight-forward to add any new sites that FDev might create in the future, and maybe even different types of maps (let's see what Operations brings).

Additional elements added to maps
- Data ports (which may not raliably spawn in the same place - feedback needed).
- Powerplay containers.

I've also remed the markers for the power core as it's always in the power building. There have been a few markers that I've corrected in moving them from OMG but would love to get any further corrections or additions.  

Much of the code used here is coming from various AI tools and I am using this as an opportunity to learn some new skills and hopefully add back to the Elite Dangerous player community.

## Extensible Marker System

The application now supports multiple **location types** with category-specific marker definitions. This allows you to add maps for any type of location (not just Odyssey sites) and define custom marker types appropriate for each location type.

### Adding a New Location Type

To add a new location type (e.g., "hospitals", "museums", "resources"):

#### 1. Create the category directory
Create a folder under `maps/{categoryName}/`:
```
maps/hospitals/
maps/hospitals/markers.json
```

#### 2. Define marker types in `maps/{categoryName}/markers.json`

This file defines the available marker types for your category:

```json
{
  "markers": [
    {
      "id": "emergency_room",
      "label": "Emergency Room",
      "color": "#FF0000"
    },
    {
      "id": "surgery",
      "label": "Surgery",
      "color": "#FF6600"
    },
    {
      "id": "pharmacy",
      "label": "Pharmacy",
      "color": "#0099FF"
    }
  ]
}
```

**Marker type schema:**
- `id` (string, required): Unique identifier for the marker type within the category
- `label` (string, required): Display name shown in the toolbar
- `color` (string, required): Hex color code for the marker

#### 3. Add category to `maps/index.json`

Add an entry to the category list:

```json
{
  "tourist": [...],
  "agriculture": [...],
  "hospitals": [
    {
      "id": "hospital_01",
      "name": "Hospital 1",
      "thumbnail": "images/thumbnails/hospital_01.png"
    }
  ]
}
```

#### 4. Create map files in `maps/{categoryName}/{mapId}.json`

Individual map files use the marker type IDs defined in `markers.json`:

```json
{
  "id": "hospital_01",
  "name": "Hospital 1",
  "class": "hospitals",
  "version": 1,
  "toolbarPosition": "bottom-left",
  "keyPosition": "top-right",
  "image": {
    "full": "images/full/hospital_01.png",
    "width": 1280,
    "height": 720
  },
  "markers": [
    {
      "id": "er_01",
      "type": "emergency_room",
      "color": "#FF0000",
      "size": 20,
      "x": 400,
      "y": 300,
      "z": 0,
      "label": "Emergency Department",
      "description": "24/7 emergency services",
      "image": ""
    }
  ]
}
```

**Marker schema:**
- `type` (string): References a marker type ID from `markers.json`
- All other fields match the existing marker format (coordinates, colors, labels, etc.)

#### 5. Access the map

Open the viewer with the URL pattern:
```
viewer.html?class=hospitals&map=hospital_01
```

The browser will automatically:
- Load the category's marker types from `maps/hospitals/markers.json`
- Populate the toolbar with buttons for each marker type
- Allow filtering by marker type

### How It Works

1. **Initialization**: When a map loads, the viewer fetches the category-specific `markers.json`
2. **Dynamic Toolbar**: The toolbar is built dynamically from the loaded marker types
3. **Filtering**: Users can toggle each marker type on/off using the toolbar buttons
4. **Rendering**: Only visible markers (based on filters) are displayed on the map

### Examples

- **Odyssey Sites** (tourism, agriculture, etc.): Use marker types like "Airlock", "Data Port", "Terminal"
- **Resources** (new example): Use marker types like "Storage", "Equipment", "Water", "Minerals"
- **Hospitals** (hypothetical): Could use "Emergency Room", "Surgery", "Pharmacy", "Entrance"

### Backward Compatibility

All existing Odyssey Site maps continue to work unchanged. The marker type system gracefully handles categories that don't have a `markers.json` by using sensible defaults.

