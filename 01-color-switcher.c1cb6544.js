!function(){var t,e=document.querySelector("[data-start]"),n=document.querySelector("[data-stop]");e.addEventListener("click",(function(){t||(e.disabled=!0,t=setInterval((function(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}),1e3))})),n.addEventListener("click",(function(){clearInterval(t),t=null,e.disabled=!1}))}();
//# sourceMappingURL=01-color-switcher.c1cb6544.js.map
