# nokia-challenge

### how to run

open index.html

click Choose file and import a .txt file


### EXTRA Q&A

Question 3: Consider the program from question 1. How would you create a web service that provides the same functionality, by receiving text files over the
Internet and returning the results?

- ~~Make a button to upload their local .txt file and with the help of AJAX library, parse them into strings.~~
- By leveraging **HTML5 FileReader** instead of XMLHttpRequest to create a virtual file that can be used in DOM format.

Question 4: Imagine that we have a customer interested in using our program from question 1 in a computer cluster, where each node has access to an input
file and the output should be the combination of the outputs of each node. How would you modify your solution to fulfill the customer's
requirements?

- I have a function that takes line as input and use Hash table to store each unique words from the input. I will make a button on the website where a customer can upload multiple files first. Build another function that takes multiple files and parse each file's text into one text. And with already built functionalities, I would not need to modify the logic.


Question 5: How would you test the program from question 1?

- ~~I would need to implement a way to parse a txt file utilizing XMLHttpRequest or other modules, as far as I know, JavaScript works that way. Since each functions were tested with custom strings and they work individually as intended, the program will work.~~
- Run the program with different .txt files

Question 6: Suppose that you are working on a web application that needs to display a web page including a table showing five numbers. Each of these
numbers can be obtained through a call to a different REST API, accessible by your application. How would you implement your application so
that it gathers all 5 numbers before rendering the webpage to the user? Describe your solution in detail.

- I will implement the functionality using Promises. Since the purpose of this is to gather information before rendering, I will need a spinner that would keep the user stay on the page instead of making them staring at an idle page. In the order of importance and server stability, on success callbacks will move to next API in sequence until all five is successfully called. Then use .then Promises to render the website and the fetched data from the REST API.
