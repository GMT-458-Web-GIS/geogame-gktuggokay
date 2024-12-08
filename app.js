// HTML Elements
const questionEl = document.getElementById("question-text");
const hintTextEl = document.getElementById("hint-text");
const correctCountEl = document.getElementById("correct-count");
const wrongCountEl = document.getElementById("wrong-count");
const hintCountEl = document.getElementById("hint-count");
const timerEl = document.getElementById("timer");

let currentStoryIndex = 0;
let currentHintIndex = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let hintsUsed = 0;
let timerInterval;
let totalTime = 180; // Total time in seconds
const maxHints = 5;
const maxCorrectAnswers = 8;
const maxWrongAnswers = 5;

// Treasure Messages
const treasureMessages = [
  "Congratulations! You have discovered the Lost Crown of Charlemagne!",
  "Amazing! You’ve unearthed the Golden Chalice of Avalon!",
  "Bravo! You have found the Viking’s Hidden Treasure Chest!",
  "Fantastic! You’ve reclaimed the Jewels of the Byzantine Empire!",
  "Incredible! You uncovered the Pharaoh's Sapphire Staff!"
];

// Game Data
const stories = [
  { 
      name: "Norway", 
      hints: [
          "A Viking ship was last seen in the fjords of this country.",
          "This country is known for its beautiful fjords and northern lights.",
          "Its capital city is Oslo, a hub of culture and history."
      ], 
      lat: 59.9139, 
      lng: 10.7522 
  },
  { 
      name: "Italy", 
      hints: [
          "An artist left a mysterious painting near the Colosseum.",
          "This country is famous for its pasta, pizza, and Renaissance art.",
          "Its capital city is Rome, where ancient meets modern."
      ], 
      lat: 41.9028, 
      lng: 12.4964 
  },
  { 
      name: "France", 
      hints: [
          "The secret of the Eiffel Tower holds a part of the story.",
          "This country is famous for its wine, cheese, and romantic destinations.",
          "Its capital city is Paris, known as the city of lights."
      ], 
      lat: 48.8566, 
      lng: 2.3522 
  },
  { 
      name: "Germany", 
      hints: [
          "A golden key was hidden during Oktoberfest in this country.",
          "This country is known for its beer culture and engineering excellence.",
          "Its capital city is Berlin, where history whispers at every corner."
      ], 
      lat: 52.5200, 
      lng: 13.4050 
  },
  { 
      name: "Spain", 
      hints: [
          "The Sagrada Familia holds clues to the treasure.",
          "This country is famous for flamenco dancing, tapas, and bullfighting.",
          "Its capital city is Madrid, where passion fills the streets."
      ], 
      lat: 40.4168, 
      lng: -3.7038 
  },
  { 
      name: "United Kingdom", 
      hints: [
          "A crown jewel is missing from the Tower of London.",
          "This country is known for its royal family and historic landmarks.",
          "Its capital city is London, where tradition and innovation coexist."
      ], 
      lat: 51.5074, 
      lng: -0.1278 
  },
  { 
      name: "Greece", 
      hints: [
          "A philosopher once buried a scroll near the Parthenon.",
          "This country is famous for its ancient ruins, mythology, and olive oil.",
          "Its capital city is Athens, the cradle of Western civilization."
      ], 
      lat: 37.9838, 
      lng: 23.7275 
  },
  { 
      name: "Iceland", 
      hints: [
          "Legends say the northern lights hide a clue about the treasure.",
          "This country is famous for its geysers, hot springs, and volcanic landscapes.",
          "Its capital city is Reykjavik, where nature's wonders await."
      ], 
      lat: 64.1355, 
      lng: -21.8954 
  },
  { 
      name: "Portugal", 
      hints: [
          "A ship carrying spices from India never returned. Its last known port was in this country.",
          "This country is famous for its port wine, sunny beaches, and fado music.",
          "Its capital city is Lisbon, a city of explorers and discoveries."
      ], 
      lat: 38.7223, 
      lng: -9.1393 
  },
  { 
      name: "Belgium", 
      hints: [
          "A mysterious golden statue was last seen in the Grand Place of this country.",
          "This country is famous for its chocolate, waffles, and medieval towns.",
          "Its capital city is Brussels, the heart of the European Union."
      ], 
      lat: 50.8503, 
      lng: 4.3517 
  },
  { 
      name: "Switzerland", 
      hints: [
          "A secret code is hidden in the peaks of the Alps.",
          "This country is famous for its chocolate, watches, and pristine lakes.",
          "Its capital city is Bern, a picturesque and tranquil place."
      ], 
      lat: 46.9481, 
      lng: 7.4474 
  },
  { 
      name: "Poland", 
      hints: [
          "A legendary knight left his shield near Krakow.",
          "This country is famous for its pierogi, bison, and medieval castles.",
          "Its capital city is Warsaw, where resilience shapes the skyline."
      ], 
      lat: 52.2297, 
      lng: 21.0122 
  },
  { 
      name: "Sweden", 
      hints: [
          "A Viking helmet was last seen in Stockholm.",
          "This country is known for its innovative design, music, and IKEA.",
          "Its capital city is Stockholm, spread across 14 islands."
      ], 
      lat: 59.3293, 
      lng: 18.0686 
  },
  { 
      name: "Finland", 
      hints: [
          "An ancient map was found in Helsinki.",
          "This country is known as the land of a thousand lakes and home to Santa Claus.",
          "Its capital city is Helsinki, where nature meets modernity."
      ], 
      lat: 60.1699, 
      lng: 24.9384 
  },
  { 
      name: "Denmark", 
      hints: [
          "A mermaid statue near the harbor holds the next clue.",
          "This country is famous for Lego, fairy tales, and its bike culture.",
          "Its capital city is Copenhagen, a hub of happiness and hygge."
      ], 
      lat: 55.6761, 
      lng: 12.5683 
  },
  { 
      name: "Austria", 
      hints: [
          "A symphony by Mozart has a hidden note. The answer lies in this country.",
          "This country is known for its classical music, Alps, and coffeehouses.",
          "Its capital city is Vienna, a city of elegance and culture."
      ], 
      lat: 48.2082, 
      lng: 16.3738 
  },
  { 
      name: "Netherlands", 
      hints: [
          "A windmill hides the key to the treasure.",
          "This country is famous for its tulips, canals, and Vincent van Gogh.",
          "Its capital city is Amsterdam, where art and freedom flourish."
      ], 
      lat: 52.3676, 
      lng: 4.9041 
  },
  { 
      name: "Russia", 
      hints: [
          "The secrets of the Red Square might reveal the treasure's location.",
          "This country is known for its vast landscapes, ballet, and literature.",
          "Its capital city is Moscow, a city of power and grandeur."
      ], 
      lat: 55.7558, 
      lng: 37.6173 
  },
  { 
      name: "Czechia", 
      hints: [
          "A mysterious astronomical clock in Prague holds a part of the story.",
          "This country is known for its beer, castles, and cobblestone streets.",
          "Its capital city is Prague, a city of a hundred spires."
      ], 
      lat: 50.0755, 
      lng: 14.4378 
  },
  { 
      name: "Ireland", 
      hints: [
          "A leprechaun’s pot of gold was hidden near Dublin.",
          "This country is famous for its green landscapes, music, and Guinness beer.",
          "Its capital city is Dublin, a vibrant and literary haven."
      ], 
      lat: 53.3498, 
      lng: -6.2603 
  },
  { 
      name: "Hungary", 
      hints: [
          "The thermal baths of Budapest hide a clue.",
          "This country is famous for its paprika, goulash, and Danube River.",
          "Its capital city is Budapest, a gem of Central Europe."
      ], 
      lat: 47.4979, 
      lng: 19.0402 
  },
  { 
      name: "Turkey", 
      hints: [
          "The Bosphorus Bridge connects this country between two continents.",
          "This country is known for its kebabs, history, and bazaars.",
          "Its largest city is Istanbul, a gateway between East and West."
      ], 
      lat: 41.0082, 
      lng: 28.9784 
  },
  { 
    name: "Croatia", 
    hints: [
        "A treasure was rumored to be hidden in the walls of Dubrovnik.",
        "This country is famous for its stunning coastline along the Adriatic Sea.",
        "Its capital city is Zagreb, but Dubrovnik is a top tourist attraction."
    ], 
    lat: 45.8150, 
    lng: 15.9819 
  },
  { 
    name: "Slovakia", 
    hints: [
        "The Tatras Mountains hide a secret clue about the treasure.",
        "This country is known for its castles and beautiful natural landscapes.",
        "Its capital city is Bratislava, located along the Danube River."
    ], 
    lat: 48.1486, 
    lng: 17.1077 
  },
  { 
    name: "Serbia", 
    hints: [
        "A relic from the Ottoman era is said to be hidden in Belgrade Fortress.",
        "This country is famous for its vibrant nightlife and rich history.",
        "Its capital city is Belgrade, located at the confluence of two rivers."
    ], 
    lat: 44.8176, 
    lng: 20.4569 
  },
  { 
    name: "Albania", 
    hints: [
        "A hidden tunnel in Berat Castle is said to hold a part of the story.",
        "This country is known for its stunning beaches and ancient ruins.",
        "Its capital city is Tirana, a blend of modern and traditional."
    ], 
    lat: 41.3275, 
    lng: 19.8189 
  },
  { 
    name: "Bosnia and Herzegovina", 
    hints: [
        "The famous Stari Most (Old Bridge) in Mostar holds a clue.",
        "This country is known for its diverse culture and Ottoman heritage.",
        "Its capital city is Sarajevo, where East meets West."
    ], 
    lat: 43.8563, 
    lng: 18.4131 
  },
  { 
    name: "Montenegro", 
    hints: [
        "The Bay of Kotor is said to hide a sunken ship with a secret map.",
        "This country is famous for its dramatic mountains and medieval villages.",
        "Its capital city is Podgorica, but Kotor is its most famous destination."
    ], 
    lat: 42.4410, 
    lng: 19.2626 
  },
  { 
    name: "Lithuania", 
    hints: [
        "A mysterious hill filled with crosses holds part of the story.",
        "This country is known for its medieval history and amber jewelry.",
        "Its capital city is Vilnius, famous for its baroque architecture."
    ], 
    lat: 54.6872, 
    lng: 25.2797 
  },
  { 
    name: "Estonia", 
    hints: [
        "The medieval Old Town of Tallinn is said to hide a secret chest.",
        "This country is known for its digital advancements and beautiful forests.",
        "Its capital city is Tallinn, a perfectly preserved medieval city."
    ], 
    lat: 59.4370, 
    lng: 24.7536 
  },
  { 
    name: "Latvia", 
    hints: [
        "Riga’s Art Nouveau district hides a key to the treasure.",
        "This country is famous for its wooden architecture and vast forests.",
        "Its capital city is Riga, located along the Daugava River."
    ], 
    lat: 56.9496, 
    lng: 24.1052 
  },
  { 
    name: "Malta", 
    hints: [
        "The ancient temples of Malta are said to hide a piece of the story.",
        "This island nation is famous for its turquoise waters and historic sites.",
        "Its capital city is Valletta, a UNESCO World Heritage site."
    ], 
    lat: 35.8997, 
    lng: 14.5146 
  },
  { 
    name: "Cyprus", 
    hints: [
        "Aphrodite’s Rock is said to hold a secret clue.",
        "This island country is known for its beautiful beaches and ancient history.",
        "Its capital city is Nicosia, divided between two cultures."
    ], 
    lat: 35.1856, 
    lng: 33.3823 
  },
  { 
    name: "Luxembourg", 
    hints: [
        "A golden crown was said to be hidden in the Casemates underground tunnels.",
        "This country is known for its wealth, medieval towns, and fortresses.",
        "Its capital city is Luxembourg City, built on dramatic cliffs."
    ], 
    lat: 49.8153, 
    lng: 6.1296 
  },
  { 
  name: "San Marino", 
  hints: [
      "This tiny country sits atop Mount Titano, overlooking the Italian peninsula.",
      "It is one of the world's oldest republics, known for its medieval architecture.",
      "Its capital city shares the same name, San Marino."
  ], 
  lat: 43.9336, 
  lng: 12.4507 
  },
  { 
  name: "Monaco", 
  hints: [
      "The Formula 1 Grand Prix races through the streets of this tiny country.",
      "It is famous for its luxury casinos and harbor filled with yachts.",
      "Its capital city is Monaco, located on the French Riviera."
  ], 
  lat: 43.7384, 
  lng: 7.4246 
  },
  { 
  name: "Andorra", 
  hints: [
      "Nestled in the Pyrenees, this country is famous for its ski resorts.",
      "This tiny country is known for its duty-free shopping and mountain trails.",
      "Its capital city is Andorra la Vella, Europe's highest capital."
  ], 
  lat: 42.5078, 
  lng: 1.5211 
  },
  { 
  name: "Vatican City", 
  hints: [
      "This country is the spiritual center of Catholicism.",
      "It is home to St. Peter's Basilica and the Sistine Chapel, with Michelangelo's famous ceiling.",
      "It is the smallest country in the world, entirely surrounded by Rome."
  ], 
  lat: 41.9029, 
  lng: 12.4534 
  },
  { 
  name: "Liechtenstein", 
  hints: [
      "This tiny Alpine country is sandwiched between Switzerland and Austria.",
      "It is known for its medieval castles, like Vaduz Castle.",
      "Its capital city is Vaduz, a peaceful place surrounded by mountains."
  ], 
  lat: 47.1416, 
  lng: 9.5215 
  },
  { 
  name: "Kosovo", 
  hints: [
      "The ancient city of Prizren holds a clue to the treasure.",
      "This country is known for its rich Ottoman heritage and Balkan cuisine.",
      "Its capital city is Pristina, the youngest capital in Europe."
  ], 
  lat: 42.6629, 
  lng: 21.1655 
  },
  { 
  name: "North Macedonia", 
  hints: [
      "The ancient city of Ohrid, known as the Jerusalem of the Balkans, holds a secret.",
      "This country is famous for its lakes, mountains, and archaeological treasures.",
      "Its capital city is Skopje, with a mix of modern and historical landmarks."
  ], 
  lat: 41.9981, 
  lng: 21.4254 
  },
  { 
  name: "Bulgaria", 
  hints: [
      "The Rila Monastery is said to hold part of the story.",
      "This country is known for its rose oil production and stunning Black Sea coast.",
      "Its capital city is Sofia, a place of ancient ruins and modern vibrancy."
  ], 
  lat: 42.6977, 
  lng: 23.3219 
  },
  { 
  name: "Belarus", 
  hints: [
      "The Mir Castle, a UNESCO site, hides a piece of the treasure.",
      "This country is known for its vast forests, castles, and traditional crafts.",
      "Its capital city is Minsk, a city rebuilt after World War II."
  ], 
  lat: 53.9006, 
  lng: 27.5590 
  },
  { 
  name: "Romania", 
  hints: [
      "The legendary Dracula is said to have lived in Bran Castle in this country.",
      "This country is famous for its Carpathian Mountains and painted monasteries.",
      "Its capital city is Bucharest, also known as Little Paris."
  ], 
  lat: 44.4268, 
  lng: 26.1025 
  },
  { 
  name: "Slovenia", 
  hints: [
      "Lake Bled, with its tiny island and church, holds a clue to the treasure.",
      "This country is famous for its caves, lakes, and mountains.",
      "Its capital city is Ljubljana, a charming and green city."
  ], 
  lat: 46.0569, 
  lng: 14.5058 
  },
  { 
  name: "Georgia", 
  hints: [
      "The ancient wine region of Kakheti is said to hold a secret.",
      "This country is known for its hospitable culture and stunning mountain landscapes.",
      "Its capital city is Tbilisi, where old meets new in a dramatic setting."
  ], 
  lat: 41.7151, 
  lng: 44.8271 
  },
  { 
  name: "Armenia", 
  hints: [
      "Mount Ararat is a sacred symbol for this country.",
      "This country is famous for its ancient churches and monasteries.",
      "Its capital city is Yerevan, one of the world's oldest continuously inhabited cities."
  ], 
  lat: 40.1792, 
  lng: 44.4991 
  },
  { 
  name: "Azerbaijan", 
  hints: [
      "The Maiden Tower in Baku holds a secret to the treasure.",
      "This country is known for its fire mountains and Caspian Sea coastline.",
      "Its capital city is Baku, where modern skyscrapers meet ancient history."
  ], 
  lat: 40.4093, 
  lng: 49.8671 
  }
  ];

// Timer Function
function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        totalTime--;
        timerEl.textContent = `Time Left: ${totalTime} seconds`;
        if (totalTime <= 0) {
            clearInterval(timerInterval);
            alert("Time's up! Game Over.");
            endGame(false);
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    totalTime = 180;
    timerEl.textContent = `Time Left: ${totalTime} seconds`;
}

// Show Hint
function showHint() {
    const currentStory = stories[currentStoryIndex];
    if (hintsUsed < maxHints) {
        hintTextEl.textContent = currentStory.hints[currentHintIndex];
        currentHintIndex = (currentHintIndex + 1) % currentStory.hints.length;
        hintsUsed++;
        hintCountEl.textContent = `Hints Remaining: ${maxHints - hintsUsed}`;
    } else {
        alert("No hints remaining!");
    }
}

function handleAnswer(e) {
  const clickedLat = e.latlng.lat;
  const clickedLng = e.latlng.lng;
  const correctLat = stories[currentStoryIndex].lat;
  const correctLng = stories[currentStoryIndex].lng;

  // Latitude ve Longitude farkına göre kontrol
  if (
      Math.abs(clickedLat - correctLat) <= 1 && // Enlem farkı 1 derece içinde
      Math.abs(clickedLng - correctLng) <= 1 // Boylam farkı 1 derece içinde
  ) {
      alert("Correct! You guessed the right country.");
      correctAnswers++;
      document.getElementById("correct-count").textContent = `Correct Answers: ${correctAnswers}`;

      if (correctAnswers === maxCorrectAnswers) {
          endGame(true);
          return;
      }
  } else {
      alert(`Wrong! The correct country was ${stories[currentStoryIndex].name}.`);
      wrongAnswers++;
      document.getElementById("wrong-count").textContent = `Wrong Answers: ${wrongAnswers}`;

      if (wrongAnswers === maxWrongAnswers) {
          endGame(false);
          return;
      }
  }

  currentStoryIndex++;
  currentHintIndex = 1; // İpuçlarını sıfırla
  updateQuestion();
}


function updateQuestion() {
    if (currentStoryIndex >= stories.length) {
        endGame(false);
        return;
    }

    const currentStory = stories[currentStoryIndex];
    questionEl.textContent = `Hint: ${currentStory.hints[0]}`;
    hintTextEl.textContent = "";
}
function endGame(isWin) {
  clearInterval(timerInterval); // Timer'ı durdur

  if (isWin) {
      // Rastgele bir mesaj seç
      const randomMessage = treasureMessages[Math.floor(Math.random() * treasureMessages.length)];
      alert(`Congratulations! ${randomMessage}`);
  } else {
      alert("Game Over! You've used all your chances.");
  }

  resetGame(); // Oyunu sıfırla
}


function resetGame() {
  // Sıfırlama değişkenleri
  correctAnswers = 0;
  wrongAnswers = 0;
  hintsUsed = 0;
  currentStoryIndex = 0;
  currentHintIndex = 0;

  // UI Elemanlarını sıfırla
  correctCountEl.textContent = `Correct Answers: 0`;
  wrongCountEl.textContent = `Wrong Answers: 0`;
  hintCountEl.textContent = `Hints Remaining: ${maxHints}`;
  hintTextEl.textContent = "";
  timerEl.textContent = `Time Left: ${totalTime} seconds`;

  // Timer'ı sıfırla
  resetTimer();

  // Soruları karıştır
  shuffleArray(stories);

  // Başlangıç ekranına dön
  document.getElementById("username-container").style.display = "block";
  document.getElementById("game-info").style.display = "none";

  // Harita üzerindeki tıklama olaylarını sıfırla
  map.off("click");
}


function startGame() {
    const usernameInput = document.getElementById("username").value.trim();

    if (!usernameInput) {
        alert("Please enter your name to start the game.");
        return;
    }

    document.getElementById("username-container").style.display = "none";
    document.getElementById("game-info").style.display = "block";

    startTimer();
    updateQuestion();

    map.on("click", handleAnswer);
}

// Shuffle Function
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

const map = L.map("map").setView([54.526, 15.2551], 4);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
}).addTo(map);

shuffleArray(stories);
resetTimer();
