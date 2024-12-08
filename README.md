[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/ATV5e7Id)


# Welcome to the Treasure Hunt Game

Welcome to the Treasure Hunt Game, an exciting adventure where players explore a vibrant map filled with hidden clues! As you navigate through various intriguing locations, you'll gather hints that lead you closer to the ultimate treasure. Each clue you discover will point you to the next destination, creating a thrilling chain of exploration and discovery. The game is designed to challenge your problem-solving skills and encourage strategic thinking as you piece together the connections between clues. With a beautiful interactive map powered by Leaflet, every click unveils new possibilities and surprises. Can you gather all the clues and unlock the treasure before time runs out? Embark on this captivating journey and put your detective skills to the test!

## Game Mechanics

- **Tasks**: The user is given a clue at each stage, which generally describes the location of the treasure on the map.
- **Fake Treasure Markers**: As the user progresses, some fake markers appear on the map to confuse them. If the user clicks on the wrong markers before finding the real treasure, they lose points.
- **Time Limit**: Each stage has a limited time. The user must quickly reach the correct point while avoiding clicks on fake markers.

## Difficulty Levels

- **Fake Clues**: In advanced stages, in addition to real clues, misleading fake clues are added.
- **View Restrictions**: When the user clicks on the wrong places, certain restrictions are applied on the map, such as being able to view the map only at a specific zoom level.

## Development Steps

1. **Map Creation**: Create the initial map using Leaflet or OpenLayers. Define the hidden "treasure point" and set up the clue system.
2. **Adding Fake Treasure Markers**: Define the fake markers and correct clues in a JSON file that appears at each stage.
3. **Setting Difficulty Levels and Penalty Mechanism**: Implement score reduction for wrong choices and enforce view restrictions.
4. **Result and Score Screen**: Display a score table summarizing the user's completion status and all incorrect choices.

## Image About The In-Site Game
![image](https://github.com/user-attachments/assets/2486741e-fe8b-4f61-bd54-54e971121944)


## Technology Used

I chose to use the **Leaflet** library for my treasure hunt game because it provides a simple and intuitive API that makes developing map applications easy. Additionally, its lightweight structure enhances performance while offering a rich feature set that allows me to add markers and interactive pop-ups. The easy integration with various map sources like OpenStreetMap also enables me to enhance visual diversity.


## Three Event Handlers in the Project
## 1. Map Click Event
Purpose: This event handler listens for a user's click on the map. It determines if the clicked location is correct based on the question's target location.
##### Implementation:
![image](https://github.com/user-attachments/assets/f4bc62a0-a9bc-45bb-b888-0b0b79841408)
### How It Works:
When a user clicks on the map, the coordinates of the clicked point (e.latlng) are compared to the correct coordinates of the current story (currentStory.lat and currentStory.lng).
If the clicked point is close enough to the target location, it counts as a correct answer; otherwise, it's incorrect.

## 2. Question Update Event
Purpose:
This event updates the game with a new question after the player answers the current question (correctly or incorrectly).
##### Implementation:
![image](https://github.com/user-attachments/assets/ba5d6191-84ef-485b-97d0-1e195d3d1af4)
### How It Works:
A new question is selected randomly from the remainingQuestions array.
The question’s hint is updated in the DOM (questionEl.textContent).
The map is reset to listen for the next click using map.once('click', ...).
Outcome:
This event handler ensures the game progresses smoothly by preparing the next question and resetting the map interaction logic.

### 3. Hint Button Event
Purpose: Allows the player to reveal additional hints for the current question.
##### Implementation:
![image](https://github.com/user-attachments/assets/607f8618-eb5b-4ac1-a871-089951cab671)
### How It Works:

Each question has a set of hints. When the player clicks the "Use Hint" button, the next hint is displayed in the UI.
If all hints have already been shown, the game informs the user that no more hints are available.
Outcome: Adds a layer of strategy and support for the player, making the game more engaging and accessible.


## How Closures Were Used in the Project
Closures were utilized in the project to maintain the game’s state across event handlers and ensure that the relevant data for each question was preserved while awaiting user input.
________________________________________
### 1. Updating the Current Question
### Where Closures Were Used:
The updateQuestion function creates a closure over the current question (currentStory) to bind the question's data (like hints and coordinates) to the next map click event.
#### Example:
![image](https://github.com/user-attachments/assets/f1006cce-75d6-476e-b5c0-500c2772f4b0)
#### How It Works:
- currentStory is captured in the scope of the updateQuestion function.
- Even though updateQuestion finishes execution, currentStory is retained for use inside the map.once('click', ...) handler.
- This ensures the correct question data (hints, coordinates, etc.) is preserved when the user clicks on the map.
#### Benefit:
- Prevents global variables or excessive parameter passing, making the code cleaner and reducing potential bugs.
- Links the map click event to the specific question seamlessly.

### 2. Hint System
### Where Closures Were Used:
The showHint function relies on the closure to keep track of which hint has already been shown for the current question.
#### Example:
![image](https://github.com/user-attachments/assets/34f6ed1f-b32f-4e6c-b4bf-211b1e401d4d)
### How It Works:
- currentStory is captured in the scope of showHint.
- This allows the function to access the current question's hints array while tracking the currentHintIndex across multiple button clicks.
### Benefit:
- Avoids recalculating or re-fetching the current question's data.
-	Dynamically adjusts the hints displayed without requiring additional global state.

## Overall Benefits of Closures in the Project
### 1.	State Management:
-	Closures allow each question to retain its context and state without relying on global variables.
-	This ensures that questions remain independent and do not overwrite each other.
### 2.	Code Modularity:
-	By capturing the question’s data in a closure, event handlers are dynamically scoped, making the code cleaner and easier to maintain.
### 3.	Scalability:
-	The use of closures simplifies adding more features (e.g., additional hint mechanics or scoring rules) without requiring major rewrites.

Closures enhanced the code's maintainability, interactivity, and performance by dynamically linking game events to the appropriate data.

## What I Learned from AI (ChatGPT)
### 1. Hint System Design
####	What I Learned: 
-	AI guided me in implementing a hint system where multiple hints could be stored in an array and accessed sequentially. It also helped me design logic to display "no more hints" when the hints were exhausted.
-	Example: 
![image](https://github.com/user-attachments/assets/a8e4809f-699b-43ec-9909-d1f2c49f67a7)

### 2. Gameplay Enhancements
#### What I Learned: 
-	AI provided creative ideas to improve gameplay, such as: 
 -	Limiting the number of wrong answers (e.g., 5 wrong answers end the game).
 -	Adding randomized win conditions for treasure-related rewards.
 -	Integrating animations and UI feedback to enhance user engagement.
- These ideas made the game more interactive and immersive.

## How I Interacted with the DOM
The project heavily relies on DOM manipulation to ensure a dynamic and interactive user experience. Below are the key ways I interacted with the DOM in the game:

________________________________________
### 1. Capturing User Input
#### What I Did:
-	The player's username is captured from an input field when the game starts, and it is displayed alongside their score.
####	Code Example:
![image](https://github.com/user-attachments/assets/609e7766-e0b1-4a6d-bdbb-1e4b219b9962)
#### How It Works:
-	The usernameInput field lets the user input their name.
-	This value is trimmed and stored, then displayed on the scoreboard or in end-of-game messages.
________________________________________
### 2. Managing the Scoreboard
####	What I Did:
-	The scoreboard dynamically updates after each correct or incorrect answer. Both the number of correct and wrong answers are updated in the DOM.

####	Code Example:
![image](https://github.com/user-attachments/assets/796da283-b343-4685-8c4f-0290e3ba0ff5)
#### How It Works:
-	correctEl and wrongEl are DOM elements that display the player's score.
-	Every time the player answers, the associated values are incremented and the DOM elements are updated in real time.
________________________________________
### 3. Game Over or Win Animations
####	What I Did:
- Used DOM manipulation to display animated messages when the player wins or loses the game. These messages are shown by toggling the display property of a message element.
![image](https://github.com/user-attachments/assets/8f12eb30-95dd-4dbe-9053-d27a537903a6)
#### How It Works:
-	The message is dynamically updated based on whether the player wins or loses.
-	The display property is toggled to ensure visibility only when needed.

## Summary of DOM Interactions
### 1.	Input Handling:
-	The player's username is captured from the DOM and displayed during the game.
### 2.	Scoreboard Updates:
-	Correct and wrong answers are tracked and displayed in real-time.
### 3.	Feedback and Animations:
-	Used DOM elements to show win/loss messages with animations.
  
These interactions ensure the game remains dynamic, interactive, and engaging for players.

## MY GEOGAME LINK: https://gmt-458-web-gis.github.io/geogame-gktuggokay/





  














