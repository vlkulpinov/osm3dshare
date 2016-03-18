# osm3dshare
Share, visualize and convert 3d models for OSM

According to Summer of Code idea "Web application for sharing 3D-Models to use in OSM-related 3D-Applications"
Tool for import standart 3d models (like .3ds, .obj format) into formats available for rendering on number of geo visualization programs (like OSM2World, OSM-3D and so on).

Also provide socializaton: user can share their 3d models, vote for models of another users.

#### Also provide
*This section mostly written by Peda (https://wiki.openstreetmap.org/wiki/User:Peda)*

##### Storage
* Metadata (real size, number of floors)
* Position/Heading of model (high precision)
* Models

#####User experience
* Voting of 3D models
* Comments on Models
* "Moderation" of models (e.g. delete bad models,..)
* OAuth for login with OSM-credentials
* Statistic page/frontpage (e.g. "new models", "best models", ...)

#####Functionality
* Level of Detail of model (e.g. "easy", "normal" and "complex")
* License selection
* Fault-tolerant storage and archive (everybody can download)
* Upload/Download a model
* Query models or show on a map for which buildings there are models,..
* Upload/Download/Comment/... of texture files
* Search functionality
* 3D models for furniture (e.g. street lamps, post boxes,... stuff that does not have a fixed position but can be used more generally)
* Online-Viewer for models


### Suggested scheme to start
Having simple NodeJS web server, two databases: one for user information, comments, likes etc. and another for storing models and meta.

Monthly created archives and torrents (sharding over different zones). It hard to estimate required place to store of all models but seems it enough to start with one instance with hdd.

### Current
**Techologies and libraries:** NodeJS (web-server), leafletJS for map processing, bootstrap for ui, CesiumJS for 3d-visualization, PhotonJS and typeaheadJS for geosuggest.

Since it's only prototype approaches will evolve.

### Prototype 
**What for now:** auth through OSM API, adding models, viewing, mapping into 3d-coordinates.

**Where:** Amazon micro instance with http://ec2-52-37-61-19.us-west-2.compute.amazonaws.com

### Contribution
You are welcome to create issues, pr and just contact authors with ideas
