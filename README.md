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

#####Additional
* Simple 3d editor
* Visualize nearest 3d models for better matching

### REST API
Thoughts about future backand handles
####Meta
#####GET /models-metadata-bbox
Params:
*min-lat
*min-lon
*max-lat
*max-lon
Returns:
Meta data of modeles (model\_id, license, bounding\_poly, user\_id, upload\_time, quality, floors_num, etc)

#####GET /users-metadata
Params:
* used_id
Returns:
user metadata

####Models
#####GET /models-export
Params:
*model_id list
*quality
Returns:
Multiparty

#####POST /model-data-create
Params: 
* user_id
* auth key
* model_name
* center_latlng
* multiparty
* show (True/False)
Returns:
Code

#####POST /model-data-update
Params:
* user_id
* auth_key
* transformation {'angle': '', zoom\_x: '', zoom\_y: ''}
* center_latlng {lat: '', lng: ''}
* show (True/False)
Returns:
Code


### Suggested scheme to start
Having simple NodeJS web server, two databases: one for user information, comments, likes etc. and another for storing models and meta.

Monthly created archives and torrents (sharding over different zones). It hard to estimate required place to store of all models but seems it enough to start with one instance with hdd.

### Current
**Techologies and libraries:** NodeJS (web-server), leafletJS for map processing, bootstrap for ui, CesiumJS for 3d-visualization, PhotonJS and typeaheadJS for geosuggest.

Since it's only prototype approaches will evolve.

### Prototype 
**What for now:** ~~auth through OSM API~~(near future), adding models, viewing, mapping into 3d-coordinates.

**Where:** Amazon micro instance with http://ec2-52-37-61-19.us-west-2.compute.amazonaws.com

### Contribution
You are welcome to create issues, pr and just contact authors with ideas

### Contact
Vladimir Kulpinov, 4th year student of Moscow State University (Moscow Russia). Field of study: computer vision (as part of Laboratory of Computer Graphics and Multimedia). I used to work at Yandex company, Russia, as part of Map Department.
I'm familiar with a lot of back-end libraries and frameworks (and a bit front-end). Prefered languages: C++, Python, JavaScript. I've done a lot of visualization that used OpenGL, OpenMP. I've participated in a lot of programming contests.

*skype:* deformas
