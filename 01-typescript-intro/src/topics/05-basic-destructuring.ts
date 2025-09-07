//Destructuracion de objetos -----------------------------
interface AudioPlayer {
  audioVolume: number;
  songDuration: number;
  song: string;
  details: Details;
}

interface Details {
  author: string;
  year: number;
}

const audioPlayer: AudioPlayer = {
  audioVolume: 90,
  songDuration: 36,
  song: 'Let me get there',
  details: {
    author: 'Hope Sandoval',
    year: 2010,
  },
};

const song = 'New Song';

const { song: anotherSong, songDuration: duration, details } = audioPlayer;

const { author } = details; //Se desestructura primero details, y sobre ese se obtiene el author

console.log('Song:', song); // New Song
console.log('Another Song:', anotherSong); //Let me get there
console.log('Song duration:', duration); // 36
console.log('Author:', author); // Hope Sandoval

//Desustructuracion de arreglos -------------------------
const [, , juan = 'Not found']: string[] = ['Kokun', 'Vegeta777'];

console.log('Personaje 3:', juan); //Not found

export {};
