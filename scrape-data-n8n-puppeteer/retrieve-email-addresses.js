// This JavaScript code retrieves email addresses from input string using regular expression.
// Use it in "Function" node in n8n. 

// VIDEO TUTORIAL
// Complete video guide available on my YouTube: https://youtu.be/YonNJqAAxdg

// INFO
// If you like my work, please subscirbe to my YouTube channel: https://www.youtube.com/@workfloows
// And/or to my newsletter: https://workfloows.com/

// Thank you for your support! 



// Assigning the value of $json.data (output of previous node) to the variable 'str'
let str = $json.data;

// Creating a regular expression pattern to match email addresses
let expression = new RegExp('\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}\\b', 'gm');

// Using the regular expression to find all matches in the 'str' string
let found = Array.from(str.matchAll(expression)).flat().filter(n => n);

// Removing duplicate email addresses using a Set
let uniqueValues = [...new Set(found)];

// Returning an object containing the unique email addresses as 'foundEmails' property
return { json: { foundEmails: uniqueValues } };