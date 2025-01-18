/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from "react";
import styles from "./LiveAnbox.module.css";
import { useTranslation } from 'react-i18next';

const prizes = [
  {
    name: "Star Wars A Wing Starfighter",
    description:
      "Lego Star Wars A Wing Starfighter model kit, featuring detailed design and authentic Star Wars universe elements.",
    image: "/prizes/95__Star-Wars-A-Wing-Starfighter-Background-Removed.webp",
    id: 152,
    price: 90.0,
    data: "[]",
  },
  {
    name: "Sackboy: A Big Adventure",
    description:
      "Platforming game featuring Sackboy from LittleBigPlanet, offering cooperative gameplay and imaginative worlds.",
    image: "/prizes/96__Sackboy-A-Big-Adventure-Background-Removed.webp",
    id: 153,
    price: 70.0,
    data: "[]",
  },
  {
    name: "Elden Ring",
    description:
      "Action RPG developed by FromSoftware and George R.R. Martin, featuring a vast open world and immersive storytelling.",
    image: "/prizes/53__Elden-Ring-Background-Removed.webp",
    id: 154,
    price: 68.0,
    data: "[]",
  },
  {
    name: "Control Ultimate Edition",
    description:
      "Definitive edition of Control, a supernatural action-adventure game with enhanced graphics and additional content.",
    image: "/prizes/14__Control-Ultimate-Edition-Background-Removed.webp",
    id: 155,
    price: 40.0,
    data: "[]",
  },
  {
    name: "Cyberpunk 2077 GOG.COM Digital Code",
    description:
      "Digital code for activating Cyberpunk 2077 on GOG.COM, an open-world RPG set in the dystopian Night City.",
    image:
      "/prizes/98__Cyberpunk-2077-GOGCOM-Digital-Code-Background-Removed.webp",
    id: 156,
    price: 30.0,
    data: "[]",
  },
  {
    name: "Jumanji: The Video Game",
    description:
      "Video game based on the Jumanji movie franchise, featuring adventure and multiplayer gameplay.",
    image: "/prizes/17__Jumanji-The-Video-Game-Background-Removed.webp",
    id: 157,
    price: 28.0,
    data: "[]",
  },
  {
    name: "Minecraft: Windows 10 Edition Microsoft Digital Code",
    description:
      "Digital code for activating Minecraft Windows 10 Edition on Microsoft Store, offering cross-platform play and updated features.",
    image:
      "/prizes/99__Minecraft-Windows-10-Edition-Microsoft-Digital-Code-Background-Removed.webp",
    id: 158,
    price: 25.0,
    data: "[]",
  },
  {
    name: "DIRT 5 Steam Digital Code",
    description:
      "Digital code for activating DIRT 5 on Steam, an off-road racing game with dynamic weather and challenging tracks.",
    image: "/prizes/61__DIRT-5-Steam-Digital-Code-Background-Removed.webp",
    id: 159,
    price: 22.0,
    data: "[]",
  },
  {
    name: "Hot Wheels id Time Ataxi",
    description:
      "Special edition Hot Wheels car with NFC-enabled ID for digital gameplay integration.",
    image: "/prizes/18__Hot-Wheels-id-Time-Ataxi-Background-Removed.webp",
    id: 160,
    price: 18.0,
    data: "[]",
  },
  {
    name: "Shadow of the Tomb Raider Steam Digital Code",
    description:
      "Digital code for activating Shadow of the Tomb Raider on Steam, featuring Lara Croft in a thrilling action-adventure game.",
    image:
      "/prizes/19__Shadow-of-the-Tomb-Raider-Steam-Digital-Code-Background-Removed.webp",
    id: 161,
    price: 15.0,
    data: "[]",
  },
  {
    name: "Standard Face (2 Packs)",
    description:
      "Pack of two standard-sized face masks, offering comfortable and breathable protection.",
    image: "/prizes/100__Standard-Face-2-Packs-Background-Removed.webp",
    id: 162,
    price: 13.0,
    data: "[]",
  },
  {
    name: "Control Ultimate Edition Steam Digital Code",
    description:
      "Digital code for activating Control Ultimate Edition on Steam, including all DLCs and expansions.",
    image:
      "/prizes/41__Control-Ultimate-Edition-Steam-Digital-Code-Background-Removed.webp",
    id: 163,
    price: 10.0,
    data: "[]",
  },
  {
    name: "Dragon Ball FighterZ Steam Digital Code",
    description:
      "Digital code for activating Dragon Ball FighterZ on Steam, a fighting game featuring characters from the Dragon Ball universe.",
    image:
      "/prizes/3__Dragon-Ball-FighterZ-Steam-Digital-Code-Background-Removed.webp",
    id: 164,
    price: 10.0,
    data: "[]",
  },
  {
    name: "Dead by Daylight Steam Digital Code",
    description:
      "Digital code for activating Dead by Daylight on Steam, a multiplayer horror game where one player is the killer and the rest are survivors.",
    image:
      "/prizes/42__Dead-by-Daylight-Steam-Digital-Code-Background-Removed.webp",
    id: 165,
    price: 7.0,
    data: "[]",
  },
  {
    name: "Bioshock Infinite Steam Digital Code",
    description:
      "Digital code for activating Bioshock Infinite on Steam, a first-person shooter set in the floating city of Columbia.",
    image:
      "/prizes/22__Bioshock-Infinite-Steam-Digital-Code-Background-Removed.webp",
    id: 166,
    price: 5.0,
    data: "[]",
  },
  {
    name: "DiRT Rally Steam Digital Code",
    description:
      "Digital code for activating DiRT Rally on Steam, a rally racing game with realistic physics and challenging tracks.",
    image: "/prizes/43__DiRT-Rally-Steam-Digital-Code-Background-Removed.webp",
    id: 167,
    price: 4.3,
    data: "[]",
  },
  {
    name: "The Evil Within Steam Digital Code",
    description:
      "Digital code for activating The Evil Within on Steam, a survival horror game with a chilling atmosphere and intense gameplay.",
    image:
      "/prizes/23__The-Evil-Within-Steam-Digital-Code-Background-Removed.webp",
    id: 168,
    price: 3.5,
    data: "[]",
  },
  {
    name: "Worms Clan Wars Steam Digital Code",
    description:
      "Digital code for activating Worms Clan Wars on Steam, a turn-based strategy game with wacky weaponry and destructible environments.",
    image:
      "/prizes/24__Worms-Clan-Wars-Steam-Digital-Code-Background-Removed.webp",
    id: 169,
    price: 3.2,
    data: "[]",
  },
  {
    name: "Warhammer 40,000: Space Marine Steam Digital code",
    description:
      "Digital code for activating Warhammer 40,000: Space Marine on Steam, an intense action-packed shooter set in the Warhammer 40K universe.",
    image:
      "/prizes/25__Warhammer-40,000-Space-Marine-Steam-Digital-code-Background-Removed.webp",
    id: 170,
    price: 2.5,
    data: "[]",
  },
  {
    name: "Hotshot Racing Steam Digital Code",
    description:
      "Digital code for activating Hotshot Racing on Steam, a fast-paced arcade racing game with retro-inspired visuals.",
    image:
      "/prizes/45__Hotshot-Racing-Steam-Digital-Code-Background-Removed.webp",
    id: 171,
    price: 1.75,
    data: "[]",
  },
  {
    name: "Death Squared Steam Digital Code",
    description:
      "Digital code for activating Death Squared on Steam, a cooperative puzzle game where players guide robots through deadly challenges.",
    image:
      "/prizes/26__Death-Squared-Steam-Digital-Code-Background-Removed.webp",
    id: 172,
    price: 1.2,
    data: "[]",
  },
  {
    name: "Nvidia GeForce RTX 4070 Ti Trinity OC",
    description:
      "High-performance graphics card from Nvidia’s RTX 4000 series, featuring overclocked Trinity architecture for gaming and rendering.",
    image:
      "/prizes/101__Nvidia-GeForce-RTX-4070-Ti-Trinity-OC-Background-Removed.webp",
    id: 173,
    price: 960.0,
    data: "[]",
  },
  {
    name: "G915 Wireless TKL",
    description:
      "Wireless mechanical gaming keyboard from Logitech G, offering advanced features and low-profile mechanical switches.",
    image: "/prizes/103__G915-Wireless-TKL-Background-Removed.webp",
    id: 174,
    price: 270.0,
    data: "[]",
  },
  {
    name: "Kiyo Pro",
    description:
      "High-performance webcam with adaptive light sensor and HDR support, designed for streaming and video conferencing.",
    image: "/prizes/105__Kiyo-Pro-Background-Removed.webp",
    id: 175,
    price: 210.0,
    data: "[]",
  },
  {
    name: "BlackWidow V4",
    description:
      "Mechanical gaming keyboard from Razer, featuring Razer HyperSpeed Wireless technology and RGB Chroma lighting.",
    image: "/prizes/106__BlackWidow-V4-Background-Removed.webp",
    id: 176,
    price: 180.0,
    data: "[]",
  },
  {
    name: "Viper Ultimate",
    description:
      "Wireless gaming mouse from Razer, featuring Razer HyperSpeed Wireless technology and lightweight design for competitive gaming.",
    image: "/prizes/108__Viper-Ultimate-Background-Removed.webp",
    id: 177,
    price: 140.0,
    data: "[]",
  },
  {
    name: "Viper 8KHz",
    description:
      "Ambidextrous gaming mouse from Razer, featuring HyperPolling Technology for a polling rate of 8000Hz and responsive performance.",
    image: "/prizes/112__Viper-8KHz-Background-Removed.webp",
    id: 178,
    price: 80.0,
    data: "[]",
  },
  {
    name: "Snowball iCE",
    description:
      "USB microphone from Blue Microphones, offering crystal-clear audio quality for recordings, podcasts, and voice chats.",
    image: "/prizes/113__Snowball-iCE-Background-Removed.webp",
    id: 179,
    price: 75.0,
    data: "[]",
  },
  {
    name: "Basilisk X",
    description:
      "Wireless gaming mouse from Razer, featuring 16,000 DPI optical sensor and long-lasting battery life for extended gaming sessions.",
    image: "/prizes/114__Basilisk-X-Background-Removed.webp",
    id: 180,
    price: 69.0,
    data: "[]",
  },
  {
    name: "Shadow of the Tomb Raider Steam Digital Code",
    description:
      "Digital code for activating Shadow of the Tomb Raider on Steam, featuring Lara Croft in a thrilling action-adventure game.",
    image:
      "/prizes/19__Shadow-of-the-Tomb-Raider-Steam-Digital-Code-Background-Removed.webp",
    id: 181,
    price: 15.0,
    data: "[]",
  },
  {
    name: "$10.0 Voucher",
    description:
      "A voucher offering a discount or special offer on purchases at a specific retailer or service provider.",
    image: "/prizes/6__Voucher-Background-Removed.webp",
    id: 182,
    price: 10.0,
    data: "[]",
  },
  {
    name: "$7.0 Voucher",
    description:
      "A voucher offering a discount or special offer on purchases at a specific retailer or service provider.",
    image: "/prizes/6__Voucher-Background-Removed.webp",
    id: 183,
    price: 7.0,
    data: "[]",
  },
  {
    name: "$5.0 Voucher",
    description:
      "A voucher offering a discount or special offer on purchases at a specific retailer or service provider.",
    image: "/prizes/6__Voucher-Background-Removed.webp",
    id: 184,
    price: 5.0,
    data: "[]",
  },
  {
    name: "DiRT Rally Steam Digital Code",
    description:
      "Digital code for activating DiRT Rally on Steam, a rally racing game with realistic physics and challenging tracks.",
    image: "/prizes/43__DiRT-Rally-Steam-Digital-Code-Background-Removed.webp",
    id: 185,
    price: 4.3,
    data: "[]",
  },
  {
    name: "$4.0 Voucher",
    description:
      "A voucher offering a discount or special offer on purchases at a specific retailer or service provider.",
    image: "/prizes/6__Voucher-Background-Removed.webp",
    id: 186,
    price: 4.0,
    data: "[]",
  },
  {
    name: "The Evil Within Steam Digital Code",
    description:
      "Digital code for activating The Evil Within on Steam, a survival horror game with a chilling atmosphere and intense gameplay.",
    image:
      "/prizes/23__The-Evil-Within-Steam-Digital-Code-Background-Removed.webp",
    id: 187,
    price: 3.5,
    data: "[]",
  },
  {
    name: "SimCity 4 Deluxe Edition Steam Digital Code",
    description:
      "Digital code for activating SimCity 4 Deluxe Edition on Steam, a city-building simulation game with urban planning challenges.",
    image:
      "/prizes/44__SimCity-4-Deluxe-Edition-Steam-Digital-Code-Background-Removed.webp",
    id: 188,
    price: 3.45,
    data: "[]",
  },
  {
    name: "Worms Clan Wars Steam Digital Code",
    description:
      "Digital code for activating Worms Clan Wars on Steam, a turn-based strategy game with wacky weaponry and destructible environments.",
    image:
      "/prizes/24__Worms-Clan-Wars-Steam-Digital-Code-Background-Removed.webp",
    id: 189,
    price: 3.2,
    data: "[]",
  },
  {
    name: "$3.0 Voucher",
    description:
      "A voucher offering a discount or special offer on purchases at a specific retailer or service provider.",
    image: "/prizes/6__Voucher-Background-Removed.webp",
    id: 190,
    price: 3.0,
    data: "[]",
  },
  {
    name: "$2.0 Voucher",
    description:
      "A voucher offering a discount or special offer on purchases at a specific retailer or service provider.",
    image: "/prizes/6__Voucher-Background-Removed.webp",
    id: 191,
    price: 2.0,
    data: "[]",
  },
  {
    name: "$1.25 Voucher",
    description:
      "A voucher offering a discount or special offer on purchases at a specific retailer or service provider.",
    image: "/prizes/6__Voucher-Background-Removed.webp",
    id: 192,
    price: 1.25,
    data: "[]",
  },
  {
    name: "GG Gucci 1977 Sneakers",
    description:
      "Iconic Gucci sneakers with GG pattern and 1977 design, featuring premium leather construction and fashion-forward style.",
    image: "/prizes/115__GG-Gucci-1977-Sneakers-Background-Removed.webp",
    id: 193,
    price: 605.0,
    data: "[]",
  },
  {
    name: "Jordan 1 Retro High",
    description:
      "Iconic basketball shoes from Nike, known for their classic design and cultural significance.",
    image: "/prizes/66__Jordan-1-Retro-High-Background-Removed.webp",
    id: 194,
    price: 520.0,
    data: "[]",
  },
  {
    name: "Jordan 1 Retro High Shattered Backboard 3.0",
    description:
      "Limited edition Jordan 1 Retro High sneakers inspired by the shattered backboard moment, featuring orange and black colorway.",
    image:
      "/prizes/116__Jordan-1-Retro-High-Shattered-Backboard-30-Background-Removed.webp",
    id: 195,
    price: 520.0,
    data: "[]",
  },
  {
    name: "Jordan 1 Low",
    description:
      "Classic low-top Jordan 1 sneakers, offering timeless style and everyday comfort.",
    image: "/prizes/117__Jordan-1-Low-Background-Removed.webp",
    id: 196,
    price: 383.5,
    data: "[]",
  },
  {
    name: "Jordan 1 Low Game Royal",
    description:
      "Classic low-top Jordan 1 sneakers in the Game Royal colorway, featuring blue and black accents.",
    image: "/prizes/118__Jordan-1-Low-Game-Royal-Background-Removed.webp",
    id: 197,
    price: 344.5,
    data: "[]",
  },
  {
    name: "Jordan 1 Mid Triple White 2.0",
    description:
      "Mid-top Jordan 1 sneakers in a Triple White colorway, offering clean and versatile style.",
    image: "/prizes/119__Jordan-1-Mid-Triple-White-20-Background-Removed.webp",
    id: 198,
    price: 182.0,
    data: "[]",
  },
  {
    name: "id Vehicle​​ Rally Finale",
    description:
      "Final vehicle in the id series of collectible Hot Wheels cars, featuring rally-inspired design and performance.",
    image: "/prizes/120__id-Vehicle​​-Rally-Finale-Background-Removed.webp",
    id: 199,
    price: 25.0,
    data: "[]",
  },
  {
    name: "Standard Face (2 Packs)",
    description:
      "Pack of two standard-sized face masks, offering comfortable and breathable protection.",
    image: "/prizes/100__Standard-Face-2-Packs-Background-Removed.webp",
    id: 200,
    price: 13.0,
    data: "[]",
  },
  {
    name: "Control Ultimate Edition Steam Digital Code",
    description:
      "Digital code for activating Control Ultimate Edition on Steam, including all DLCs and expansions.",
    image:
      "/prizes/41__Control-Ultimate-Edition-Steam-Digital-Code-Background-Removed.webp",
    id: 201,
    price: 10.0,
    data: "[]",
  },
  {
    name: "$4.0 Voucher",
    description:
      "A voucher offering a discount or special offer on purchases at a specific retailer or service provider.",
    image: "/prizes/6__Voucher-Background-Removed.webp",
    id: 202,
    price: 4.0,
    data: "[]",
  },
  {
    name: "$0.75 Voucher",
    description:
      "A voucher offering a discount or special offer on purchases at a specific retailer or service provider.",
    image: "/prizes/6__Voucher-Background-Removed.webp",
    id: 203,
    price: 0.75,
    data: "[]",
  },
  {
    name: "$0.25 Voucher",
    description:
      "A voucher offering a discount or special offer on purchases at a specific retailer or service provider.",
    image: "/prizes/6__Voucher-Background-Removed.webp",
    id: 204,
    price: 0.25,
    data: "[]",
  },
  {
    name: "$0.09 Voucher",
    description:
      "A voucher offering a discount or special offer on purchases at a specific retailer or service provider.",
    image: "/prizes/6__Voucher-Background-Removed.webp",
    id: 205,
    price: 0.09,
    data: "[]",
  },
  {
    name: "$0.01 Voucher",
    description:
      "A voucher offering a discount or special offer on purchases at a specific retailer or service provider.",
    image: "/prizes/6__Voucher-Background-Removed.webp",
    id: 206,
    price: 0.01,
    data: "[]",
  },
  {
    name: "Nvidia GeForce RTX 4070 Ti Trinity OC",
    description:
      "High-performance graphics card from Nvidia’s RTX 4000 series, featuring overclocked Trinity architecture for gaming and rendering.",
    image:
      "/prizes/101__Nvidia-GeForce-RTX-4070-Ti-Trinity-OC-Background-Removed.webp",
    id: 207,
    price: 960.0,
    data: "[]",
  },
  {
    name: "Radeon RX 6800",
    description:
      "High-performance graphics card from AMD’s Radeon RX 6000 series, offering powerful gaming and content creation capabilities.",
    image: "/prizes/121__Radeon-RX-6800-Background-Removed.webp",
    id: 208,
    price: 910.0,
    data: "[]",
  },
  {
    name: "Nvidia GeForce RTX 4070 TUF OC",
    description:
      "High-performance graphics card from Nvidia’s RTX 4000 series, featuring TUF Gaming Alliance durability and overclocking.",
    image:
      "/prizes/102__Nvidia-GeForce-RTX-4070-TUF-OC-Background-Removed.webp",
    id: 209,
    price: 850.0,
    data: "[]",
  },
  {
    name: "Xbox Series X (EU Plug)",
    description:
      "Powerful gaming console from Microsoft, offering high-resolution gaming and media streaming capabilities, with EU plug compatibility.",
    image: "/prizes/122__Xbox-Series-X-EU-Plug-Background-Removed.webp",
    id: 210,
    price: 806.0,
    data: "[]",
  },
  {
    name: "Quest 3 (US Plug)",
    description:
      "VR headset from Oculus, offering immersive virtual reality experiences and advanced tracking technology.",
    image: "/prizes/92__Quest-3-US-Plug-Background-Removed.webp",
    id: 211,
    price: 793.0,
    data: "[]",
  },
  {
    name: "Ryzen 9 7950X3D",
    description:
      "High-end desktop processor from AMD’s Ryzen 9 series, featuring advanced multitasking and gaming performance with 3D V-Cache technology.",
    image: "/prizes/123__Ryzen-9-7950X3D-Background-Removed.webp",
    id: 212,
    price: 780.0,
    data: "[]",
  },
  {
    name: "RX 6700 XT",
    description:
      "High-performance graphics card from AMD's Radeon RX 6000 series, designed for gaming and content creation.",
    image: "/prizes/7__RX-6700-XT-Background-Removed.webp",
    id: 213,
    price: 650.0,
    data: "[]",
  },
  {
    name: "PS5 Digital Edition Console (EU Plug)",
    description:
      "Digital edition of PlayStation 5 gaming console with EU plug compatibility, offering high-speed SSD and immersive gaming experiences.",
    image:
      "/prizes/124__PS5-Digital-Edition-Console-EU-Plug-Background-Removed.webp",
    id: 214,
    price: 611.0,
    data: "[]",
  },
  {
    name: "Ryzen 7 7800X3D",
    description:
      "High-performance desktop processor from AMD’s Ryzen 7 series, featuring enhanced gaming and multitasking capabilities with 3D V-Cache technology.",
    image: "/prizes/125__Ryzen-7-7800X3D-Background-Removed.webp",
    id: 215,
    price: 480.0,
    data: "[]",
  },
  {
    name: "Ryzen 5 7600",
    description:
      "High-performance desktop processor from AMD’s Ryzen 5 series, offering efficient gaming and productivity performance for mainstream users.",
    image: "/prizes/126__Ryzen-5-7600-Background-Removed.webp",
    id: 216,
    price: 285.0,
    data: "[]",
  },
  {
    name: "TUF Gaming X570-Plus (Wi-Fi)",
    description:
      "Gaming motherboard from ASUS TUF Gaming series, featuring X570 chipset and WiFi connectivity for high-performance gaming builds.",
    image: "/prizes/127__TUF-Gaming-X570Plus-WiFi-Background-Removed.webp",
    id: 217,
    price: 235.0,
    data: "[]",
  },
  {
    name: "DeathAdder V3 Pro",
    description:
      "Wireless gaming mouse from Razer, featuring advanced sensors and ergonomic design for competitive gaming performance.",
    image: "/prizes/128__DeathAdder-V3-Pro-Background-Removed.webp",
    id: 218,
    price: 180.0,
    data: "[]",
  },
  {
    name: "BlackWidow V4",
    description:
      "Mechanical gaming keyboard from Razer, featuring Razer HyperSpeed Wireless technology and RGB Chroma lighting.",
    image: "/prizes/106__BlackWidow-V4-Background-Removed.webp",
    id: 219,
    price: 180.0,
    data: "[]",
  },
  {
    name: "Kaira Pro",
    description:
      "Wireless gaming headset from Razer, offering immersive audio and lightweight design for gaming on multiple platforms.",
    image: "/prizes/129__Kaira-Pro-Background-Removed.webp",
    id: 220,
    price: 168.0,
    data: "[]",
  },
  {
    name: "Kraken V3",
    description:
      "RGB gaming headset from Razer, offering immersive audio and customizable RGB lighting effects.",
    image: "/prizes/83__Kraken-V3-Background-Removed.webp",
    id: 221,
    price: 113.0,
    data: "[]",
  },
  {
    name: "G403",
    description:
      "Wireless gaming mouse from Logitech G, featuring advanced HERO sensor and ergonomic design for comfortable gaming sessions.",
    image: "/prizes/130__G403-Background-Removed.webp",
    id: 222,
    price: 80.0,
    data: "[]",
  },
  {
    name: "Sackboy: A Big Adventure",
    description:
      "Platforming game featuring Sackboy from LittleBigPlanet, offering cooperative gameplay and imaginative worlds.",
    image: "/prizes/96__Sackboy-A-Big-Adventure-Background-Removed.webp",
    id: 223,
    price: 70.0,
    data: "[]",
  },
  {
    name: "Harpoon Wireless",
    description:
      "Wireless gaming mouse from Corsair, offering high-speed tracking and long-lasting battery life for gaming sessions.",
    image: "/prizes/89__Harpoon-Wireless-Background-Removed.webp",
    id: 224,
    price: 70.0,
    data: "[]",
  },
  {
    name: "Steam 50 EUR Gift Card",
    description:
      "Digital gift card worth 50 EUR for the Steam platform, allowing users to purchase games, software, and other items.",
    image: "/prizes/56__Steam-50-EUR-Gift-Card-Background-Removed.webp",
    id: 225,
    price: 50.0,
    data: "[]",
  },
  {
    name: "G203 Lightsync",
    description:
      "Gaming mouse with RGB lighting customization and advanced tracking technology.",
    image: "/prizes/13__G203-Lightsync-Background-Removed.webp",
    id: 226,
    price: 50.0,
    data: "[]",
  },
  {
    name: "Recon 70",
    description:
      "Wired gaming headset from Turtle Beach, offering clear sound and lightweight comfort for gaming on multiple platforms.",
    image: "/prizes/132__Recon-70-Background-Removed.webp",
    id: 227,
    price: 42.0,
    data: "[]",
  },
  {
    name: "Death Stranding",
    description:
      "Action game where players traverse a post-apocalyptic landscape to reconnect isolated cities and save humanity.",
    image: "/prizes/59__Death-Stranding-Background-Removed.webp",
    id: 228,
    price: 30.0,
    data: "[]",
  },
  {
    name: "No Man's Sky Steam Digital Code",
    description:
      "Digital code for activating No Man's Sky on Steam, an open-world space exploration game with procedurally generated planets.",
    image: "/prizes/60__No-Mans-Sky-Steam-Digital-Code-Background-Removed.webp",
    id: 229,
    price: 25.0,
    data: "[]",
  },
  {
    name: "M185 Wireless",
    description:
      "Wireless mouse from Logitech, featuring compact design and reliable wireless connectivity for everyday use.",
    image: "/prizes/133__M185-Wireless-Background-Removed.webp",
    id: 230,
    price: 20.0,
    data: "[]",
  },
  {
    name: "Shadow of the Tomb Raider Steam Digital Code",
    description:
      "Digital code for activating Shadow of the Tomb Raider on Steam, featuring Lara Croft in a thrilling action-adventure game.",
    image:
      "/prizes/19__Shadow-of-the-Tomb-Raider-Steam-Digital-Code-Background-Removed.webp",
    id: 231,
    price: 15.0,
    data: "[]",
  },
  {
    name: "$3.9 Voucher",
    description:
      "A voucher offering a discount or special offer on purchases at a specific retailer or service provider.",
    image: "/prizes/6__Voucher-Background-Removed.webp",
    id: 232,
    price: 3.9,
    data: "[]",
  },
  {
    name: "$2.1 Voucher",
    description:
      "A voucher offering a discount or special offer on purchases at a specific retailer or service provider.",
    image: "/prizes/6__Voucher-Background-Removed.webp",
    id: 233,
    price: 2.1,
    data: "[]",
  },
  {
    name: "$0.25 Voucher",
    description:
      "A voucher offering a discount or special offer on purchases at a specific retailer or service provider.",
    image: "/prizes/6__Voucher-Background-Removed.webp",
    id: 234,
    price: 0.25,
    data: "[]",
  },
  {
    name: "Nvidia GeForce RTX 4070 Ti Trinity OC",
    description:
      "High-performance graphics card from Nvidia’s RTX 4000 series, featuring overclocked Trinity architecture for gaming and rendering.",
    image:
      "/prizes/101__Nvidia-GeForce-RTX-4070-Ti-Trinity-OC-Background-Removed.webp",
    id: 235,
    price: 960.0,
    data: "[]",
  },
  {
    name: "PS5 Blu-Ray Edition Console (EU Plug)",
    description:
      "Blu-ray edition of PlayStation 5 gaming console with EU plug compatibility, offering 4K gaming and entertainment features.",
    image:
      "/prizes/134__PS5-BluRay-Edition-Console-EU-Plug-Background-Removed.webp",
    id: 236,
    price: 715.0,
    data: "[]",
  },
  {
    name: "PS5 Digital Edition Console (EU Plug)",
    description:
      "Digital edition of PlayStation 5 gaming console with EU plug compatibility, offering high-speed SSD and immersive gaming experiences.",
    image:
      "/prizes/124__PS5-Digital-Edition-Console-EU-Plug-Background-Removed.webp",
    id: 237,
    price: 611.0,
    data: "[]",
  },
  {
    name: "Ryzen 9 7900X",
    description:
      "High-end desktop processor from AMD's Ryzen 9 series, offering powerful computing performance for gaming and professional applications.",
    image: "/prizes/8__Ryzen-9-7900X-Background-Removed.webp",
    id: 238,
    price: 500.0,
    data: "[]",
  },
  {
    name: "Switch Lite Yellow",
    description:
      "Compact and portable gaming console from Nintendo Switch Lite series, featuring a yellow colorway and handheld gaming capabilities.",
    image: "/prizes/135__Switch-Lite-Yellow-Background-Removed.webp",
    id: 239,
    price: 442.0,
    data: "[]",
  },
  {
    name: "Elite Series 2",
    description:
      "High-performance Xbox Wireless Controller from Microsoft’s Elite Series 2, featuring customizable components and enhanced grip.",
    image: "/prizes/136__Elite-Series-2-Background-Removed.webp",
    id: 240,
    price: 247.0,
    data: "[]",
  },
  {
    name: "Naga V2 Pro",
    description:
      "Wireless gaming mouse from Razer, featuring advanced sensors and customizable buttons for MMO gaming.",
    image: "/prizes/137__Naga-V2-Pro-Background-Removed.webp",
    id: 241,
    price: 200.0,
    data: "[]",
  },
  {
    name: "MF120 Halo",
    description:
      "RGB case fans from DeepCool, featuring unique halo-shaped lighting and efficient cooling performance for gaming PCs.",
    image: "/prizes/138__MF120-Halo-Background-Removed.webp",
    id: 242,
    price: 120.0,
    data: "[]",
  },
  {
    name: "Kraken 120",
    description:
      "All-in-one liquid CPU cooler from NZXT, featuring 120mm radiator and RGB lighting for efficient cooling and aesthetic enhancement.",
    image: "/prizes/139__Kraken-120-Background-Removed.webp",
    id: 243,
    price: 105.0,
    data: "[]",
  },
  {
    name: "DeathAdder V2 Mini",
    description:
      "Compact gaming mouse from Razer, featuring lightweight design and responsive performance for competitive gaming.",
    image: "/prizes/140__DeathAdder-V2-Mini-Background-Removed.webp",
    id: 244,
    price: 70.0,
    data: "[]",
  },
  {
    name: "Ride 5 Steam Digital Code",
    description:
      "Digital code for activating Ride 5 on Steam, a motorcycle racing game with realistic physics and extensive customization.",
    image: "/prizes/141__Ride-5-Steam-Digital-Code-Background-Removed.webp",
    id: 245,
    price: 52.0,
    data: "[]",
  },
  {
    name: "Vengeance LPX",
    description:
      "Performance memory module from Corsair’s Vengeance LPX series, offering high-speed and low-profile design for gaming PCs.",
    image: "/prizes/142__Vengeance-LPX-Background-Removed.webp",
    id: 246,
    price: 30.0,
    data: "[]",
  },
  {
    name: "Cyberpunk 2077 GOG.COM Digital Code",
    description:
      "Digital code for activating Cyberpunk 2077 on GOG.COM, an open-world RPG set in the dystopian Night City.",
    image:
      "/prizes/98__Cyberpunk-2077-GOGCOM-Digital-Code-Background-Removed.webp",
    id: 247,
    price: 30.0,
    data: "[]",
  },
  {
    name: "Need for Speed Unbound Steam Digital Code",
    description:
      "Digital code for activating Need for Speed Unbound on Steam, featuring intense street racing and high-speed pursuits.",
    image:
      "/prizes/143__Need-for-Speed-Unbound-Steam-Digital-Code-Background-Removed.webp",
    id: 248,
    price: 23.0,
    data: "[]",
  },
  {
    name: "Need for Speed Shift Origin Digital Code",
    description:
      "Digital code for activating Need for Speed Shift on Origin, a realistic racing simulation game with career mode.",
    image:
      "/prizes/144__Need-for-Speed-Shift-Origin-Digital-Code-Background-Removed.webp",
    id: 249,
    price: 20.0,
    data: "[]",
  },
  {
    name: "Need for Speed Heat Origin Digital Code",
    description:
      "Digital code for activating Need for Speed Heat on Origin, featuring intense street racing and police pursuits.",
    image:
      "/prizes/145__Need-for-Speed-Heat-Origin-Digital-Code-Background-Removed.webp",
    id: 250,
    price: 13.0,
    data: "[]",
  },
  {
    name: "NordVPN Subscription (1 month) Digital Code",
    description:
      "Digital code for activating NordVPN subscription for 1 month, offering secure and private internet browsing.",
    image:
      "/prizes/146__NordVPN-Subscription-1-month-Digital-Code-Background-Removed.webp",
    id: 251,
    price: 12.0,
    data: "[]",
  },
  {
    name: "Fortnite 1000 V-Bucks Digital Code",
    description:
      "Digital code for acquiring 1000 V-Bucks in Fortnite, used for purchasing in-game items and Battle Pass.",
    image:
      "/prizes/147__Fortnite-1000-VBucks-Digital-Code-Background-Removed.webp",
    id: 252,
    price: 10.0,
    data: "[]",
  },
  {
    name: "Nitro Subscription (1 month) Digital Code",
    description:
      "Digital code for activating Nitro subscription for 1 month on Discord, offering enhanced chat features and server boosts.",
    image:
      "/prizes/148__Nitro-Subscription-1-month-Digital-Code-Background-Removed.webp",
    id: 253,
    price: 10.0,
    data: "[]",
  },
  {
    name: "$3.9 Voucher",
    description:
      "A voucher offering a discount or special offer on purchases at a specific retailer or service provider.",
    image: "/prizes/6__Voucher-Background-Removed.webp",
    id: 254,
    price: 3.9,
    data: "[]",
  },
  {
    name: "$2.1 Voucher",
    description:
      "A voucher offering a discount or special offer on purchases at a specific retailer or service provider.",
    image: "/prizes/6__Voucher-Background-Removed.webp",
    id: 255,
    price: 2.1,
    data: "[]",
  },
  {
    name: "$0.25 Voucher",
    description:
      "A voucher offering a discount or special offer on purchases at a specific retailer or service provider.",
    image: "/prizes/6__Voucher-Background-Removed.webp",
    id: 256,
    price: 0.25,
    data: "[]",
  },
  {
    name: "Logo-plaque Detail Shoulder Bag",
    description:
      "Stylish shoulder bag with logo plaque detail, offering functional compartments and trendy design.",
    image:
      "/prizes/151__Logoplaque-Detail-Shoulder-Bag-Background-Removed.webp",
    id: 257,
    price: 455.0,
    data: "[]",
  },
  {
    name: "Sunglasses Pink",
    description:
      "Fashionable pink sunglasses with UV protection lenses, offering stylish eye protection.",
    image: "/prizes/152__Sunglasses-Pink-Background-Removed.webp",
    id: 258,
    price: 364.0,
    data: "[]",
  },
  {
    name: "Dunk High Sail Crimson Tint (W)",
    description:
      "Iconic Nike Dunk High sneakers in a Sail Crimson Tint colorway for women, featuring premium leather construction.",
    image: "/prizes/153__Dunk-High-Sail-Crimson-Tint-W-Background-Removed.webp",
    id: 259,
    price: 162.5,
    data: "[]",
  },
];

function addItem(itemsin, allitems) {
  return itemsin.concat(allitems[Math.floor(Math.random() * allitems.length)]);
}
var items = [];
for (let i = 0; i < 20; i++) {
  items = addItem(items, prizes);
}

const LiveAnbox = () => {

  const { t } = useTranslation();


  const [position, setPosition] = React.useState(0);
  const clearRef = React.useRef(null);

  const updatePosition = (pos) => {
    const nextDelay = Math.random() * 10000 + 1000;
    items = addItem(items, prizes);

    setPosition(pos);
    // todo 10000 multipl
    clearRef.current = setTimeout(() => {
      updatePosition(pos + 1);
      clearTimeout(clearRef);
    }, nextDelay);
  };

  useEffect(() => {
    updatePosition(position);
  }, []);
  return (
    <div className={styles.rightbody}>
      <div style={{ backgroundColor: "white", zIndex: "1" }}>
        <h1 className={styles.fatheader}>{t('liveanbox.title')}</h1>
      </div>
      <div style={{ zIndex: "0" }} className={styles.container}>
        <div
          style={{
            position: "relative",
            transform: `translateY(-${position * 12}vw)`,
            transition: `transform 1000ms ease`,
          }}
          className={styles.liveunbox}
        >
          {items.map((prize, i) => (
            <div className={styles.prizeContainer} key={i}>
              <img
                className={styles.liveprize}
                src={
                  /*window.location.origin*/ window.clientConfig.imageUrl +
                  prize.image
                }
              ></img>
              <div className={styles.livePrice}>{"$ " + prize.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveAnbox;
