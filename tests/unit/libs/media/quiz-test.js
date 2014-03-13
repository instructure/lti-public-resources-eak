import Quiz from 'appkit/libs/media/quiz';

var data, originalReturnTypes;

module('Unit: lib/media/quiz', {
  setup: function() {
    originalReturnTypes = Ember.get('ENV.RETURN_TYPES');
    data = {
      return_types: [
        {
          driver: "quizlet",
          remote_id: 34978186,
          url: "http://quizlet.com/34978186/education-flash-cards/",
          text: "Education",
          title: "Education",
          return_type: "url"
        },
        {
          driver: "quizlet",
          remote_id: 34978186,
          url: "https://quizlet.com/34978186/flashcards/embedv2",
          text: "Flashcards",
          title: "Education",
          width: "100%",
          height: 410,
          return_type: "iframe"
        }
      ],
      kind: "quiz",
      id: 34978186,
      title: "Education",
      description: "The Sociology of Education, Education and Globalization, Education and Inequality, The Sociology of Higher Education, Education Inc. , Education in the 21st Century",
      url: "http://quizlet.com/34978186/education-flash-cards/",
      username: null,
      term_count: 7,
      created_date: "2014-01-26",
      has_images: false,
      subjects: ["subject1", "subject2"]
    };
  },
  teardown: function() {
    Ember.set('ENV.RETURN_TYPES', originalReturnTypes);
  }
});

test('createFromData', function() {
  expect(11);
  var quiz = Quiz.createFromData(data);
  equal(quiz.get('mediaType'), 'quiz');
  equal(quiz.get('id'), 34978186);
  equal(quiz.get('title'), 'Education');
  equal(quiz.get('description'), 'The Sociology of Education, Education and Globalization, Education and Inequality, The Sociology of Higher Education, Education Inc. , Education in the 21st Century');
  equal(quiz.get('thumbnailUrl'), undefined);
  equal(quiz.get('url'), 'http://quizlet.com/34978186/education-flash-cards/');
  equal(quiz.get('termCount'), 7);
  equal(quiz.get('createdDate'), '2014-01-26');
  equal(quiz.get('hasImages'), false);
  ok(quiz.get('subjects').contains('subject1'));
  ok(quiz.get('subjects').contains('subject2'));
});

test('createFromData with returnTypes: url, iframe', function() {
  Ember.set('ENV.RETURN_TYPES', ['url', 'iframe']);
  var quiz = Quiz.createFromData(data);
  var returnTypes = quiz.get('returnTypes');
  equal(returnTypes.get('length'), 2);

  var iframe = returnTypes.findBy('returnType', 'iframe');
  equal(iframe.get('returnable'), true);
  equal(iframe.get('driver'), 'quizlet');
  equal(iframe.get('remoteId'), 34978186);
  equal(iframe.get('returnType'), 'iframe');
  equal(iframe.get('url'), 'https://quizlet.com/34978186/flashcards/embedv2');
  equal(iframe.get('text'), 'Flashcards');
  equal(iframe.get('title'), 'Education');
  equal(iframe.get('width'), '100%');
  equal(iframe.get('height'), 410);

  var url = returnTypes.findBy('returnType', 'url');
  equal(url.get('returnable'), true);
  equal(url.get('driver'), 'quizlet');
  equal(url.get('remoteId'), 34978186);
  equal(url.get('returnType'), 'url');
  equal(url.get('text'), 'Education');
  equal(url.get('title'), 'Education');
  equal(url.get('url'), 'http://quizlet.com/34978186/education-flash-cards/');
});

test('createFromData with returnTypes: iframe', function() {
  Ember.set('ENV.RETURN_TYPES', ['iframe']);
  var quiz = Quiz.createFromData(data);
  var returnTypes = quiz.get('returnTypes');
  equal(returnTypes.get('length'), 2);

  var iframe = returnTypes.findBy('returnType', 'iframe');
  equal(iframe.get('returnable'), true);
  var url = returnTypes.findBy('returnType', 'url');
  equal(url.get('returnable'), false);
});

test('createFromData with returnTypes: url', function() {
  Ember.set('ENV.RETURN_TYPES', ['url']);
  var quiz = Quiz.createFromData(data);
  var returnTypes = quiz.get('returnTypes');
  equal(returnTypes.get('length'), 2);

  var iframe = returnTypes.findBy('returnType', 'iframe');
  equal(iframe.get('returnable'), false);
  var url = returnTypes.findBy('returnType', 'url');
  equal(url.get('returnable'), true);
});

test('createFromData with returnTypes: []', function() {
  Ember.set('ENV.RETURN_TYPES', []);
  var quiz = Quiz.createFromData(data);
  var returnTypes = quiz.get('returnTypes');
  equal(returnTypes.get('length'), 2);

  var iframe = returnTypes.findBy('returnType', 'iframe');
  equal(iframe.get('returnable'), false);
  var url = returnTypes.findBy('returnType', 'url');
  equal(url.get('returnable'), false);
});

test('createFromData with returnTypes: lti_launch_url', function() {
  Ember.set('ENV.RETURN_TYPES', ['lti_launch_url']);
  var quiz = Quiz.createFromData(data);
  var returnTypes = quiz.get('returnTypes');
  equal(returnTypes.get('length'), 2);

  var iframe = returnTypes.findBy('returnType', 'iframe');
  equal(iframe.get('returnable'), false);
  var ltiLaunchUrl = returnTypes.findBy('returnType', 'ltiLaunchUrl');
  equal(ltiLaunchUrl.get('returnable'), true);
});