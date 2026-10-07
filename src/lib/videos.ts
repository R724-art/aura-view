import handsInClay from "@/assets/hands-in-clay.jpg";
import rooftopsAfterRain from "@/assets/rooftops-after-rain.jpg";
import saltAndSpeed from "@/assets/salt-and-speed.jpg";
import weightOfLight from "@/assets/weight-of-light.jpg";

export type Video = {
  id: string;
  title: string;
  channel: string;
  image: string;
  duration: string;
  views: string;
  category: string;
  progress?: number;
};

export const featuredVideo: Video = {
  id: "weight-of-light",
  title: "The Weight of Light",
  channel: "Northlight Films",
  image: weightOfLight,
  duration: "92 min",
  views: "2.4M views",
  category: "Documentary",
};

export const videos: Video[] = [
  { id: "rooftops-after-rain", title: "Rooftops After Rain", channel: "Aperture Weekly", image: rooftopsAfterRain, duration: "18:42", views: "84K views", category: "Architecture", progress: 62 },
  { id: "hands-in-the-clay", title: "Hands in the Clay", channel: "Studio Meridian", image: handsInClay, duration: "08:41", views: "21K views", category: "Documentary", progress: 28 },
  { id: "salt-and-speed", title: "Salt & Speed", channel: "Northlight Films", image: saltAndSpeed, duration: "12:04", views: "48K views", category: "Sport", progress: 81 },
  { id: "concrete-chords", title: "Concrete Chords", channel: "Northlight Films", image: weightOfLight, duration: "26:19", views: "63K views", category: "Architecture", progress: 45 },
  { id: "quiet-crossing", title: "The Quiet Crossing", channel: "Aperture Weekly", image: rooftopsAfterRain, duration: "15:30", views: "34K views", category: "Experimental" },
  { id: "earth-in-motion", title: "Earth in Motion", channel: "Studio Meridian", image: handsInClay, duration: "11:08", views: "76K views", category: "Documentary" },
  { id: "the-last-mile", title: "The Last Mile", channel: "Northlight Films", image: saltAndSpeed, duration: "19:16", views: "102K views", category: "Sport" },
  { id: "weather-systems", title: "Weather Systems", channel: "Aperture Weekly", image: weightOfLight, duration: "24:31", views: "55K views", category: "Experimental" },
];

export const categories = ["All", "Documentary", "Shorts", "Architecture", "Sport", "Experimental"];