(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&c(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function c(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();function o(){document.getElementById("burger-menu-icon").classList.toggle("open"),document.body.classList.toggle("burger-open"),document.getElementById("burger-menu").classList.toggle("is-active")}document.getElementById("burger-menu-icon").addEventListener("click",o);document.getElementById("burger-go-menu-button").addEventListener("click",o);document.querySelectorAll(".burger-menu-navigation a").forEach(i=>{i.addEventListener("click",o)});window.addEventListener("resize",function(){window.innerWidth>=769&&(document.getElementById("burger-menu-icon").classList.remove("open"),document.body.classList.remove("burger-open"),document.getElementById("burger-menu").classList.remove("is-active"))});
