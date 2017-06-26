window.onload = () => {
  const inputFile = document.querySelector('.inputFile');
  const displayResults = document.querySelector('.results');
  const resultPanel = displayResults.parentNode;

  // parse input word using regex
  const parseWord = (word) => {
    return word.replace(/\W/g, '').toLowerCase();
  }

  const lineToWords = (lines) => {
    return lines.reduce((result, ind) => {
      return result.concat(ind.split(' ').map(item => parseWord(item)).sort());
    }, []);
  }

  const wordsToDictionary = (array) => {
    let wordDict = {};
    array.forEach(word => {
      if (word === '') return;
      !wordDict[word] ? wordDict[word] = 1 : wordDict[word]++;
    })
    return wordDict;
  }

  const dictionaryToTuple = (dict) => {
    const resultArray = [];
    for (var key in dict) {
      resultArray.push([key, dict[key]]);
    }
    return resultArray;
  }

  const sortByOccurence = (tuple) => {
    tuple.sort((last, next) => (
      last[1] < next[1] ? 1 : last[1] > next[1] ? -1 : 0
    ));
  }

  // this function doesn't work
  const sortByAlphabet = (tuple) => {
    let maxCount = tuple[0][1];
    let idx = 0;
    let sortedArray = [];
    let updatingArray = [];
    while (maxCount > 0 && idx < tuple.length) {
      if (tuple[idx][1] === maxCount) {
        updatingArray.push(tuple[idx]);
      } else {
        maxCount--;
        updatingArray = updatingArray.sort((last, next) => {
          const [wordL, countL] = last;
          const [wordN, countN] = next;
          return wordL > wordN ? 1 : -1;
        });
        sortedArray = sortedArray.concat(updatingArray);
        updatingArray = [];
      }
      idx++;
    }
    return sortedArray;
  }

  inputFile.addEventListener('change', e => {
    const file = inputFile.files[0];
    const fileTypeRegex = /text.*/;
    resultPanel.classList.value = 'panel panel-default';

    if (file.type.match(fileTypeRegex)) {
      let reader = new FileReader();

      // create a display element for input file
      const inputValues = document.createElement('div');
      inputValues.setAttribute('class', 'panel-footer inputValues');
      if (inputFile.nextElementSibling) {
        inputFile.nextElementSibling.remove();
      };
      inputFile.insertAdjacentElement('afterend', inputValues);

      reader.onloadend = (e) => {
        displayResults.innerText = '';
        inputValues.innerText = e.target.result;
        const line = e.target.result.split('\n');
        const words = lineToWords(line);
        const wordDictionary = wordsToDictionary(words);
        const wordTuple = dictionaryToTuple(wordDictionary);
        sortByOccurence(wordTuple);
        // const wordResults = sortByAlphabet(wordTuple);

        resultPanel.classList.remove('panel-default');
        resultPanel.classList.add('panel-success');
        wordTuple.forEach((item) => {
          displayResults.innerText += `${item[0]} ${item[1]} \n`
        });
      }
      reader.readAsText(file);
    }
  })
}
