const DEBUG_MODE = true;         // Displays various debugging info
const DEBUG_STATS = true;         // Displays debugging values
const DEBUG_WEATHER = true;       // Turns on the weather when in debug mode
const DEBUG_WEATHER_TYPE = false; // Debugging for weather type
const DEBUG_NIGHT = true;        // Turns on night mode when in debug mode

// Weather related parameters
const WEATHER_DEST_SIZE = 50;       // Rain droplet size
const WEATHER_MAX_PARTICLES = 2500; // Max number of particles

// Rain parameters
const RAIN_OPACITY = 0.6;          // Opacity of the rain
const RAIN_LENGTH = 2;             // Length of each raindrop
const RAIN_WIDTH = 5;              // Width of each raindrop
const RAIN_SPEED = 1;              // Speed of the raindrops
const RAIN_COLOUR = "skyblue";     // Colour of the raindrops

// Snow parameters
const SNOW_OPACITY = 0.8;          // Opacity of the snow
const SNOW_LENGTH = 0.5;           // Length of each snow particle
const SNOW_WIDTH = 10;             // Width of each snow particle
const SNOW_SPEED = 0.3;            // Speed of the snow
const SNOW_COLOUR = "white";       // Colour of the snow

// Cycle Controls
const WEATHER_TYPE_TIME = 10000; // Based on ms, adjust H-Stretch of sin 10000
const WEATHER_TIME = 30000;      // Based on ms, adjust H-Stretch of sin 40000
const DAY_TIME = 15000;          // Based on ms, adjust H-Stretch of sin 15000

// Game parameters
const DECREASE_HP = 1.25;       // Easy value is 0.5, fast value is 10
const MAX_HEALTH = 100;         // Max health for each hobo
const MAX_WIDTH = 1000;         // Max screen width

const NPC_FRAME_SPEED = 0.05;   // NPC animation frame speed
const PC_FRAME_SPEED = 0.11;    // Playable hobo animation frame speed

const OTHER_HOBOS = 2;          // Number of Non-Playable hobos
const NUM_GRASS = 200;          // Number of grass elements to spawn
const NUM_TRACKS = 5;           // Number of tracks in the game
const NUM_TRAINS = 1;           // Number of trains to spawn
const TRAIN_LENGTH = 1250;      // Length of each train in pixels 1250
const TRAIN_SPEED = 25;         // Distance each train travels

const COOLDOWN_COLOURS = ["yellow", "orange", "blue"];
const HEALTH_COLOURS = ["red", "orange", "green"];
const HOBO_NAMES = ["Bob", "Frank", "Ethan", "Joe", "Anna", "Michael", "Timothy", "COVID-19", "Sarah", "Trevor", "Jacky", "Seyon", "Jawwad", "Hamdan", "Leslie"];