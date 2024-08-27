// Array to hold the correct sequence of images
var correctSequence = [
    "foundation", 
    "shadow_n_highlight", 
    "eyeshadow", 
    "eyeliner", 
    "eyesbrow", 
    "blush", 
    "lipstick"
];

// Array to hold the center images corresponding to the sequence
var centerImages = [
    "images/no_makeup.png",
    "images/fdt.png",
    "images/fdtsdhl.png",
    "images/4.png",
    "images/5.png",
    "images/6.png",
    "images/7.png",
    "images/8.png"
];

var currentImageIndex = 0;  // Keeps track of the current correct step
var gameCompleted = false;  // Keeps track of whether the game is completed

// Function to handle the drag event
function drag(event) {
    if (gameCompleted) return;  // Prevent dragging if the game is completed
    event.dataTransfer.setData("text", event.target.id);  // Set the dragged element's ID
}

// Function to handle the drop event
function drop(event) {
    event.preventDefault();  // Prevent the default behavior
    if (gameCompleted) return;  // Prevent dropping if the game is completed
    
    var draggedElementId = event.dataTransfer.getData("text");  // Get the dragged element's ID
    
    // Check if the dragged image matches the correct image in the sequence
    if (draggedElementId === correctSequence[currentImageIndex]) {
        // Correct sequence, move to the next image
        currentImageIndex++;
        document.getElementById("centerImage").src = centerImages[currentImageIndex];
        
        // Check if the sequence is completed
        if (currentImageIndex === correctSequence.length) {
            gameCompleted = true;  // Mark the game as completed
            showSuccessMessage("Makeup completed successfully!");
            disablePanel();  // Disable further interactions
        }
    } else {
        // Incorrect sequence, show error message and vibrate
        showErrorMessage("The wrong makeup tool is used. Please try again");
        navigator.vibrate(200);  // Vibrate for 200ms
    }
}

// Function to allow dropping
function allowDrop(event) {
    if (gameCompleted) return;  // Prevent allowing drop if the game is completed
    event.preventDefault();  // Prevent the default behavior to allow dropping
}

// Function to show error message
function showErrorMessage(message) {
    var messageBox = document.createElement("div");
    messageBox.innerText = message;
    messageBox.style.position = "fixed";
    messageBox.style.top = "50%";
    messageBox.style.left = "50%";
    messageBox.style.transform = "translate(-50%, -50%)";
    messageBox.style.backgroundColor = "red";
    messageBox.style.color = "white";
    messageBox.style.padding = "20px";
    messageBox.style.borderRadius = "10px";
    messageBox.style.zIndex = "1000";
    
    document.body.appendChild(messageBox);
    
    // Hide the message after 2 seconds
    setTimeout(function() {
        document.body.removeChild(messageBox);
    }, 2000);
}

// Function to show success message
function showSuccessMessage(message) {
    var messageBox = document.createElement("div");
    messageBox.innerText = message;
    messageBox.style.position = "fixed";
    messageBox.style.top = "50%";
    messageBox.style.left = "50%";
    messageBox.style.transform = "translate(-50%, -50%)";
    messageBox.style.backgroundColor = "green";
    messageBox.style.color = "white";
    messageBox.style.padding = "20px";
    messageBox.style.borderRadius = "10px";
    messageBox.style.zIndex = "1000";
    
    document.body.appendChild(messageBox);
    
    // Hide the message after 3 seconds
    setTimeout(function() {
        document.body.removeChild(messageBox);
    }, 3000);
}

// Function to disable the panel after game completion
function disablePanel() {
    var panelImages = document.querySelectorAll(".panel img");  // Get all images in the panel
    panelImages.forEach(function(image) {
        image.setAttribute("draggable", "false");  // Disable dragging for each image
    });
    
    // Optionally, you can add a message or visual indication that the game is completed
}

// Function to hide the instruction message
function hideInstructionMessage() {
    var instructionMessage = document.getElementById("instructionMessage");
    if (instructionMessage) {
        instructionMessage.style.display = "none";
    }
}

// Show instruction message and then hide it after 5 seconds
function showAndHideInstructionMessage() {
    var instructionMessage = document.getElementById("instructionMessage");
    if (instructionMessage) {
        // Show the instruction message
        instructionMessage.style.display = "block";
        
        // Hide it after 5 seconds
        setTimeout(hideInstructionMessage, 5000);
    }
}

// Call showAndHideInstructionMessage when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    showAndHideInstructionMessage();
});
;
