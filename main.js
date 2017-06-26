
// main function that will log each unique words paired with its count
function uniqueWords(textPath) {
  // function which does an xmlhttprequest and return text
  let text = handleTextFile(textPath);

  let arrayOfLines = text.split('\n');

  let wordDict = {};
  for (var i = 0; i < arrayOfLines.length; i++) {
    let line = arrayOfLines[i];
    wordDict = updateWordHash(line);
  }
  let wordTuple = sortDict(wordDict);

  for (var i = 0; i < wordTuple.length; i++) {
    console.log(wordTuple[i][0], wordTuple[i][1]);
  }
}

// Taking the input as each line in the text file
// Using hash table to store each word as a key and its count as value
function updateWordHash(line) {
  let words = line.split(' ');
  for (var i = 0; i < words.length; i++) {
    // parse each word in the arr using the helper function
    let parsed = parseWord(words[i]);
    if (wordDict[parsed] === undefined) {
      wordDict[parsed] = 1;
    } else if (parsed in wordDict) {
      wordDict[parsed]++;
    }
  }
  return wordDict;
}

// parse input word using regex
function parseWord(word) {
  return word.replace(/\W/g, '').toLowerCase();
}

// implemented tuple with sort method to order hash key in descending order
// and values in ascending order
function sortDict(hash) {
  let result = [], max;
  for (var key in hash) {
    result.push([key, hash[key]]);
  }
  result.sort();
  result.sort((a,b) => a[1] < b[1] ? 1 : a[1] > b[1] ? -1 : 0);
  return result;
}

// sortDict(uniqueWords("This is a test example. A short example of a valid input."))
uniqueWords('./example.txt');
