$('#search-btn').on('click', function() {
  var returnVal = "";
  $('div#display-text').html('&lt;loading... (max 4 secs)&gt;');

  // input
  // var toSearchRaw = $('#search1').val().trim().toLowerCase();
  // var logicRaw = $('#logic').val().trim().toLowerCase();
  // var toSearch2Raw = $('#search2').val().trim().toLowerCase();

  // sanitise ... >_>
  // var toSearch = toSearchRaw.replace(/[^a-zA-Z0-9.。、,:．\n\s]/, '');
  // var logic = logicRaw.replace(/[^a-zA-Z0-9.。、,:．\n\s]/, '');
  // var toSearch2 = toSearch2Raw.replace(/[^a-zA-Z0-9.。、,:．\n\s]/, '');

  var toSearch = $('#search1').val().trim().toLowerCase();
  var logic = $('#logic').val().trim().toLowerCase();
  var toSearch2 = $('#search2').val().trim().toLowerCase();

  // console.log("`" + toSearch + "` `" + logic + "` `" + toSearch2 + "`");

  // search
  hash = new Object();
  var fileName = 'hb5.txt';
  try {
    $.get(fileName, function(data) {
        // Break result into line by line
        var lines = data.split("\n");
        for (var i=0; i<lines.length; i++) {
          var line = lines[i];
          var lineLower = line.toLowerCase();
          var split = line.split("|");

          // [start logic]
          if (logic == "xor") {
            // 0. XOR
            if (lineLower.match(new RegExp(".*" + toSearch + ".*" + toSearch2 + ".*"))) {
              continue;
            } else if (lineLower.match(new RegExp(".*" + toSearch2 + ".*" + toSearch + ".*"))) {
              continue;
            } else if (lineLower.match(new RegExp(".*" + toSearch + ".*"))) {
              if (split.length == 1) {
                returnVal += line + "<br/>";
              } else {
                name = split[0];
                value = split[1];
                returnVal += name + " " + value + "<br/>";
              }
            }
          } else if (logic == "or") {
            // 1. OR
            if (lineLower.match(new RegExp(".*" + toSearch + ".*" + toSearch2 + ".*"))) {
              if (split.length == 1) {
                returnVal += line + "<br/>";
              } else {
                name = split[0];
                value = split[1];
                returnVal += name + " " + value + "<br/>";
              }
            } else if (lineLower.match(new RegExp(".*" + toSearch2 + ".*" + toSearch + ".*"))) {
              if (split.length == 1) {
                returnVal += line + "<br/>";
              } else {
                name = split[0];
                value = split[1];
                returnVal += name + " " + value + "<br/>";
              }
            } else if (lineLower.match(new RegExp(".*" + toSearch + ".*"))) {
              if (split.length == 1) {
                returnVal += line + "<br/>";
              } else {
                name = split[0];
                value = split[1];
                returnVal += name + " " + value + "<br/>";
              }
            } else if (lineLower.match(new RegExp(".*" + toSearch2 + ".*"))) {
              if (split.length == 1) {
                returnVal += line + "<br/>";
              } else {
                name = split[0];
                value = split[1];
                returnVal += name + " " + value + "<br/>";
              }
            } 
          } else if (logic == "and") {
            // 2. AND
            if (lineLower.match(new RegExp(".*" + toSearch + ".*" + toSearch2 + ".*"))) {
              if (split.length == 1) {
                returnVal += line + "<br/>";
              } else {
                name = split[0];
                value = split[1];
                returnVal += name + " " + value + "<br/>";
              }
            } else if (lineLower.match(new RegExp(".*" + toSearch2 + ".*" + toSearch + ".*"))) {
              if (split.length == 1) {
                returnVal += line + "<br/>";
              } else {
                name = split[0];
                value = split[1];
                returnVal += name + " " + value + "<br/>";
              }
            }
            // [end logic]
          }
        }
    }, 'text');
  } catch (e) {
    console.warn(e);
  }

  setTimeout(function() {
    $('#display-text').html(returnVal);
    if (returnVal == '') {
      $('#display-text').html("Couldn't be found: \"" + toSearch + "\" " + logic.toUpperCase() + " \"" + toSearch2 + "\".");
    }
  }, 4000);
});

// function addToResults() {

// }