document.addEventListener('DOMContentLoaded', function() {
    // Load dictionary data
    fetch('dictionary1.json')
        .then(response => response.json())
        .then(dictionary => {
            // Initialize PDF viewer
            var pdfViewer = new PDFViewerLib('pdfViewer');
            pdfViewer.load('file:///C:/Users/lenovo%20user/Documents/project_book_store/Java.pdf');
            pdfViewer.load('file:///C:/Users/lenovo%20user/Documents/project_book_store/os.pdf');
            pdfViewer.load('file:///C:/Users/lenovo%20user/Documents/project_book_store/python.pdf');
            pdfViewer.load('file:///C:/Users/lenovo%20user/Documents/project_book_store/oops.pdf');

            // Attach event listener for word double-click
            pdfViewer.on('wordDoubleClick', function(word) {
                // Handle double-click event on word
                console.log('Double-clicked word:', word);
                // Perform word lookup and display meaning
                displayMeaning(word, dictionary);
            });
        })
        .catch(error => console.error('Error loading dictionary:', error));

    // Function to display meaning of a word
    function displayMeaning(word, dictionary) {
        // Convert word to uppercase for case-insensitive lookup
        var upperWord = word.toUpperCase();
        // Check if the word exists in the dictionary
        if (dictionary.hasOwnProperty(upperWord)) {
            // Get the definition from the dictionary
            var definition = dictionary[upperWord];
            // Display the definition in the tooltip
            document.getElementById("wordTooltipText").textContent = definition;
            // Show the tooltip
            document.getElementById("wordTooltip").style.visibility = "visible";
        } else {
            // If the word is not found in the dictionary, display a message
            document.getElementById("wordTooltipText").textContent = "Definition not found";
            // Show the tooltip
            document.getElementById("wordTooltip").style.visibility = "visible";
        }
    }

    // Hide tooltip when clicking outside of it
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.tooltip')) {
            document.getElementById("wordTooltip").style.visibility = "hidden";
        }
    });
});
