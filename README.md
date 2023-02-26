# Map_app
Basic React application that takes two adresses and returns (via .HERE api) route on the Leaflet map, estimated duration of trip and length of route.
It also contains basic calculation of cost trip (based of user input - cost per kilometer), state history of routes search and availability of exporting it to PDF.

## Functionality
- pages with routing (using react-router-dom)
- tagret/destionation form
- Leaflet map with route and markers given by .HERE Api
- Basic calculation
- Estimated duration and length of route
- PDF Download (scale needs to be fixed/functionality to be rewritten)
- Routes History

## ToDo
### Functionality
- specific route instructions (using .HERE return=instructions from /routes)
### Tests
- .HERE Api axios tests
- Formik validation tests




