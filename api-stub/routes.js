module.exports = function(server) {
//
//  var ltiApps = {
//    "lti_apps": [
//      {"id": "youtube", "name":"YouTube","description":"Search publicly available YouTube videos. A new icon will show up in your course rich editor letting you search YouTube and click to embed videos in your course material.","tool_id":"youtube","tool_type":"search","icon_path":"youtube_icon.png","image_url":"youtube_banner.png"},
//      {"id": "vimeo", "name":"Vimeo","description":"Vimeo is a video sharing website on which users can upload, share, and view videos. The community of Vimeo includes indie, professional, and novice filmmakers.","tool_id":"vimeo","tool_type":"search","icon_path":"vimeo_icon.png","image_url":"vimeo_banner.png"},
//      {"id": "schooltube", "name":"SchoolTube","description":"SchoolTube is a public, searchable collection of videos uploaded from schools. Videos can be inserted as links or embedded in course material.","tool_id":"schooltube","tool_type":"search","icon_path":"schooltube_icon.png","image_url":"schooltube_banner.png"},
//      {"id": "khan_academy", "name":"Khan Academy","description":"Search for and embed Khan Academy lessons and exercise into course material. Khan Academy focuses on short lessons on math, science, etc. Uses the embedded player so students earn points for watching videos.","tool_id":"khan_academy","tool_type":"browse","icon_path":"khan_academy_icon.png","image_url":"khan_academy_banner.png"},
//      {"id": "quizlet", "name":"Quizlet","description":"Search for and embed publicly available flashcards and question sets from Quizlet. Questions can be embedded directly into content as flash cards, review, or as a study game.","tool_id":"quizlet","tool_type":"search","icon_path":"quizlet_icon.png","image_url":"quizlet_banner.png"}
//    ]
//  };
//   
//  // Create an API namespace, so that the root does not 
//  // have to be repeated for each end point.
//  server.namespace('/api/v1', function() {
//
//    server.get('/lti_apps', function(req, res) {
//      res.send(ltiApps);
//    });
//
//    server.get('/lti_apps/:id', function(req, res) {
//      var toolId = req.params.id;
//      var data = ltiApps.lti_apps.filter(function(obj) { return obj.tool_id === toolId; })[0];
//      res.send({ "lti_app": data });
//    });
//
//    server.get('/lti_apps/search?', function(req, res) {
//      console.log(req.params);
//      var toolId = req.params.tool_id;
//      var query = req.params.query;
//      if (toolId === 'youtube' && query === 'education') {
//        res.send({
//          "driver_response": {
//            "criteria": {
//              "query": "education",
//              "page": 1,
//              "content_filter": "none",
//              "sort": "relevance"
//            },
//            "next_criteria": {
//              "query": "education",
//              "page": 26,
//              "per_page": 25
//            },
//            "total_items": 1000000,
//          }
//        });
//      }
//    });
//  });
};
