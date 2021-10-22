String.prototype.toTitleCase = function(){
  var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;

  return this.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function(match, index, title){
    if (index > 0 && index + match.length !== title.length &&
      match.search(smallWords) > -1 && title.charAt(index - 2) !== ":" &&
      (title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') &&
      title.charAt(index - 1).search(/[^\s-]/) < 0) {
      return match.toLowerCase();
    }

    if (match.substr(1).search(/[A-Z]|\../) > -1) {
      return match;
    }

    return match.charAt(0).toUpperCase() + match.substr(1);
  });
};

function isAlphaNumeric(char) {
  code = char.charCodeAt(0);
  if (!(code > 47 && code < 58) && // numeric (0-9)
      !(code > 64 && code < 91) && // upper alpha (A-Z)
      !(code > 96 && code < 123)) { // lower alpha (a-z)
    return false;
  }
  return true;
}

var on = false;
// Start-up Sequence
$(document).ready(function() {
  var testStr = "BEST best";
  var result = testStr.search(/best/i);
  console.log(result);
  /* Upper Case ------------------------------------------------------ */
  $("#upper-btn").on("click",function() {
    var input = $("#input-area").val();
    $("#output-area").val(input.toUpperCase());
  })
  /* Lower Case ------------------------------------------------------ */
  $("#lower-btn").on("click",function() {
    var input = $("#input-area").val();
    $("#output-area").val(input.toLowerCase());
  })
  /* Sentence Case ------------------------------------------------------ */
  $("#sentence-btn").on("click",function() {
    var input = $("#input-area").val().toLowerCase();
    var output = "";
    var newSentence = true
    for(var i = 0; i < input.length; i++) {
      if(newSentence && isAlphaNumeric(input[i])
         || (input[i] == 'i' 
         && !isAlphaNumeric(input[i - 1])
         && !isAlphaNumeric(input[i + 1]))) {
          output += input[i].toUpperCase();
          newSentence = false;
        } else {
          output += input[i];
        }
      if(input[i] == '.' || input[i] == '?' || input[i] == '!' || input[i] == ':')
        {
          newSentence = true;
        }
    }
    $("#output-area").val(output);
  })
  /* Proper Case ------------------------------------------------------ */
  $("#proper-btn").on("click",function() {
    var input = $("#input-area").val();
    var output = "";
    var newWord = true;
    for(var i = 0; i < input.length; i++) {
      if(newWord)
        output += input[i].toUpperCase();
        else
          output += input[i];
      if(input[i] == ' ')
        newWord = true;
        else
          newWord = false;
    }
    $("#output-area").val(output);
  })
  /* Title Case ------------------------------------------------------ */
  $("#title-btn").on("click",function() {
    var input = $("#input-area").val();
    var lines = input.split("\n");
    var output = "";
    for(var i = 0; i < lines.length; i++) {
      if(i != 0) output += "\n";
      output += lines[i].toTitleCase();
    }
    $("#output-area").val(output);
  })
})