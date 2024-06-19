var chosenFile = 'hb5.txt';
var delimiter = '|';

$('select#files').change(function () {
  chosenFile = $('select#files').val();
});

$('#search-btn').on('click', function () {
  var results = '';
  $('div#display-text').html(
    '&lt;loading... (max 4 secs)&gt;',
  );

  // input
  // var toSearchRaw = $('#search1').val().trim().toLowerCase();
  // var logicRaw = $('#logic').val().trim().toLowerCase();
  // var toSearch2Raw = $('#search2').val().trim().toLowerCase();

  // sanitise ... >_>
  // var toSearch = toSearchRaw.replace(/[^a-zA-Z0-9.。、,:．\n\s]/, '');
  // var logic = logicRaw.replace(/[^a-zA-Z0-9.。、,:．\n\s]/, '');
  // var toSearch2 = toSearch2Raw.replace(/[^a-zA-Z0-9.。、,:．\n\s]/, '');

  var toSearch = $('#search1')
    .val()
    .trim()
    .toLowerCase();
  var logic = $('#logic')
    .val()
    .trim()
    .toLowerCase();
  var toSearch2 = $('#search2')
    .val()
    .trim()
    .toLowerCase();

  // console.log("`" + toSearch + "` `" + logic + "` `" + toSearch2 + "`");

  // search
  hash = new Object();
  var fileName = 'hb5.txt';

  // change, but want hardcoded values
  // instead of leaving file name up to #files' value.
  if (chosenFile == 'hb5') {
    fileName = 'hb5.txt';
    delimiter = '|';
  } else if (chosenFile == 'cuv-ibs') {
    fileName = 'cuv-ibs.bt';
    delimiter = '\t';
  }

  try {
    $.get(
      fileName,
      function (data) {
        // Break result into line by line
        var lines = data.split('\n');
        for (var i = 0; i < lines.length; i++) {
          var line = lines[i];

          if (line.match(new RegExp('^#'))) {
            // it's a commented line
            continue;
          }

          var lineLower = line.toLowerCase();

          // [start logic]
          if (logic == 'xor') {
            // 0. XOR
            if (
              lineLower.match(
                new RegExp(
                  '.*' +
                    toSearch +
                    '.*' +
                    toSearch2 +
                    '.*',
                ),
              )
            ) {
              continue;
            } else if (
              lineLower.match(
                new RegExp(
                  '.*' +
                    toSearch2 +
                    '.*' +
                    toSearch +
                    '.*',
                ),
              )
            ) {
              continue;
            } else if (
              lineLower.match(
                new RegExp(
                  '.*' + toSearch + '.*',
                ),
              ) ||
              lineLower.match(
                new RegExp(
                  '.*' + toSearch2 + '.*',
                ),
              )
            ) {
              results += addToResults(line);
            }
          } else if (logic == 'or') {
            // 1. OR
            if (
              lineLower.match(
                new RegExp(
                  '.*' +
                    toSearch +
                    '.*' +
                    toSearch2 +
                    '.*',
                ),
              ) ||
              lineLower.match(
                new RegExp(
                  '.*' +
                    toSearch2 +
                    '.*' +
                    toSearch +
                    '.*',
                ),
              ) ||
              lineLower.match(
                new RegExp(
                  '.*' + toSearch + '.*',
                ),
              ) ||
              lineLower.match(
                new RegExp(
                  '.*' + toSearch2 + '.*',
                ),
              )
            ) {
              results += addToResults(line);
            }
          } else if (logic == 'and') {
            // 2. AND
            if (
              lineLower.match(
                new RegExp(
                  '.*' +
                    toSearch +
                    '.*' +
                    toSearch2 +
                    '.*',
                ),
              ) ||
              lineLower.match(
                new RegExp(
                  '.*' +
                    toSearch2 +
                    '.*' +
                    toSearch +
                    '.*',
                ),
              )
            ) {
              results += addToResults(line);
            }
          } else if (logic == 'not') {
            // 3. AND NOT
            if (
              lineLower.match(
                new RegExp(
                  '.*' + toSearch + '.*',
                ),
              ) &&
              !lineLower.match(
                new RegExp(
                  '.*' + toSearch2 + '.*',
                ),
              )
            ) {
              results += addToResults(line);
            }
            // [end logic]
          }
        }
      },
      'text',
    );
  } catch (e) {
    console.warn(e);
  }

  setTimeout(function () {
    $('#display-text').html(results);
    if (results == '') {
      $('#display-text').html(
        'Couldn\'t be found: "' +
          toSearch +
          '" ' +
          logic.toUpperCase() +
          ' "' +
          toSearch2 +
          '".',
      );
    }
  }, 4000);
});

function addToResults(line) {
  var split = line.split(delimiter);
  var returnVal = '';

  if (split.length == 1) {
    returnVal = line + '<br/>';
  } else {
    name = split[0];
    value = split[1];
    returnVal = name + ' ' + value + '<br/>';
  }

  return returnVal;
}
