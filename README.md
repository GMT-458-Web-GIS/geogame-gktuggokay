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
