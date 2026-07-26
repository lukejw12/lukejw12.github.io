// the yellow splash text. 90% of the time its one of the two normal ones and the
// other 10% grabs somethin from the rare list. chuck new ones in here or delete em
// and every page picks it up. keep em short so they dont wrap
window.SPLASH_MAIN = [
  "Java 1.21.11!",
  "Thanks for using this tool!"
];
window.SPLASH_RARE = [
  "Not affiliated with Mojang!",
  "No warranty!",
  "May contain traces of dirt!",
  "No creepers in here!",
  "Not a bug, it's a feature!",
  "I see you",
  "<s>Bug-Free!</s>",
  "Leave a rating!"
];

// slap a splash into the #splash thing, just call this once when the page loads
window.pickSplash = function(){
  var e = document.getElementById("splash");
  if(!e) return;
  var pool = Math.random() < 0.9 ? window.SPLASH_MAIN : window.SPLASH_RARE;
  e.innerHTML = pool[Math.random()*pool.length|0];
};
