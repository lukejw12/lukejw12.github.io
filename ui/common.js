// all the stuff every page needs, the dirt/deepslate bg, the dark mode button and
// starting the splash. throw quotes.js in first then this. if a page wants to do
// extra when you flip the theme (like the menu recoloring the comments) it can set
// window.onThemeChange and itll call it

// ios safari refuses to do the pixel scaling on a css background so it
// blurs the little 16px tile and u get faint lines between every tile. so i blow it
// up myself in a canvas with the smoothing off and hand it back a clean 64px tile
const TEX_LIGHT="https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/block/dirt.png";
const TEX_DARK="https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/block/deepslate.png";
const TEX_LIGHT_FB="https://cdn.jsdelivr.net/gh/misode/mcmeta@assets/assets/minecraft/textures/block/dirt.png";
const TEX_DARK_FB="https://cdn.jsdelivr.net/gh/misode/mcmeta@assets/assets/minecraft/textures/block/deepslate.png";
const texCache={};
window.applyBg=function(){
  const dark=document.documentElement.classList.contains("dark");
  const url=dark?TEX_DARK:TEX_LIGHT, fb=dark?TEX_DARK_FB:TEX_LIGHT_FB, shade=dark?".55":".62";
  const paint=data=>{document.body.style.backgroundImage=
    "linear-gradient(rgba(0,0,0,"+shade+"),rgba(0,0,0,"+shade+")),url("+data+")";};
  if(texCache[url])return paint(texCache[url]);
  const im=new Image();im.crossOrigin="anonymous";
  im.onload=()=>{
    const c=document.createElement("canvas");c.width=c.height=64;
    const x=c.getContext("2d");x.imageSmoothingEnabled=false;
    x.drawImage(im,0,0,64,64);
    try{texCache[url]=c.toDataURL();paint(texCache[url]);}catch(e){paint(url);}
  };
  im.onerror=()=>{im.onerror=null;im.src=fb;};
  im.src=url;
};

// the dark mode button. the sun/moon swap is done in css so all this does is flip the
// class, remember it, repaint the bg and poke the pages onThemeChange if it set one
(function(){
  const b=document.getElementById("darkBtn");
  const set=on=>{
    document.documentElement.classList.toggle("dark",on);
    try{localStorage.setItem("pvDark",on?"1":"0");}catch(e){}
    window.applyBg();
    if(typeof window.onThemeChange==="function")window.onThemeChange(on);
  };
  set(document.documentElement.classList.contains("dark"));
  if(b)b.onclick=()=>set(!document.documentElement.classList.contains("dark"));
})();

if(typeof pickSplash==="function")pickSplash();
