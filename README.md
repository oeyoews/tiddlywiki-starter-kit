# TOC

<!-- toc -->

- [Intro](#intro)
- [Preview](#preview)
- [Deploy](#deploy)
- [Run](#run)

<!-- tocstop -->

<div align="center">

<h1>Neotw</h1>

</div>

<center>
<!-- badges -->
<a href="https://gitter.im/oeyoews/neotw?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge" target="_blank">
  <img src="https://img.shields.io/gitter/room/oeyoews/neotw?logo=gitter&color=50BA9A" />
</a>
<a href="https://github.com/oeyoews/neotw" target="_blank">
  <img src="https://img.shields.io/badge/Powered by-Neotw-green?style=flat&logo=data:image/svg%2bxml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM6c2VyaWY9Imh0dHA6Ly93d3cuc2VyaWYuY29tLyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDIxMTUgMjQ4MSIgdmVyc2lvbj0iMS4xIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KICA8cGF0aCBpZD0iUG9seWdvbi0xIiBkPSJNMTA1Ny4yMywwbDEwNTcuMjMsNjIwLjA3OWwwLDEyNDAuMTZsLTEwNTcuMjMsNjIwLjA3OWwtMTA1Ny4yMywtNjIwLjA3OWwtMCwtMTI0MC4xNmwxMDU3LjIzLC02MjAuMDc5Wm00MDkuMzk1LDE4NDguNzdsMTUuODczLC0yLjExYzExLjY5OSwtNC4zNTQgMjIuNjQ1LC04LjM2OSAyOS44MDQsLTE5LjU5M2MyMy40MDEsLTMzLjk4OCAtMzYuOTA2LC00Ny43NjUgLTU4LjUwOCwtODUuNDIzYy0yMS42MDYsLTM3LjY1NSAtMTEwLjcxNiwtMjQ0LjMxOSAtNDMuMjA4LC0zMDIuMTg1YzY3LjUxMiwtNTcuODY1IDE0MC40MjQsLTgxLjc0NSAxNjguMzI2LC0xMzUuOTM3YzEyLjA4MiwtMjQuNDQxIDI0LjYxNSwtNDkuMSAyNy44MDQsLTc2LjczNmMxNi40MzksMTMuNjQ0IDI5LjI4OCwyNi40MjMgNTEuNDA3LDI3LjEzN2M1OC41MDgsMy42NzUgMTA4LjkxOCwtNjcuOTY4IDEzNS4wMjEsLTEzNS45MzZjMTMuOTQ5LC00MS43MTggMjUuMjMyLC04NS45NTUgMjIuNTcsLTEyNi43Yy03LjE1OSwtNzguNTIxIDEuMzQsLTE2My40MzIgNjMuOTk0LC0yMTUuNjI0Yy02MS44MywzMS4yMDkgLTEyMC41ODIsNzEuMzI5IC0xOTAuNTk1LDgxLjQ2N2MtMzguNjcyLC0xMS43NDQgLTc3LjU2NywtMjIuMzI1IC0xMTguNTIxLC0yMC42NjVjLTIwLjA2OSwtMjYuMTQxIC00Ny4xODIsLTc1LjA2OCAtODIuMzY4LC04MC43MzljLTU5Ljk1MiwyMS40NTQgLTYxLjc0LDExNC4xMjggLTg3LjAzLDIzOS44NjdjLTM5LjA2OSwtMTAuNjI0IC03OC44MzIsLTE4LjA4MyAtMTE5LjMyNSwtMTkuOTczYy01NS44MDgsLTMuNjc1IC0xNDYuNzIyLDEzLjc3NyAtMjEwLjYzMiwxMS45NGMtNjMuOTA4LC0xLjgzNyAtMTg5LjY4OSwtNTguMDkzIC0yOTQuMzQyLC00NS45MjRjLTQyLjA3Nyw1LjE3NCAtODQuNDc2LDEyLjM1NiAtMTIzLjUzOCwzMC4wNTZjLTIzLjg5NywxMC44MjkgLTU4LjM5NSw0My40OTUgLTc1Ljc0MSw0OC4zNDZjLTE3NC43NjgsNDguODYgLTQ1OS4wNzUsNDYuODM5IC00MDAuOTA0LC0yMTcuMjA2YzQuNTMsLTIwLjI4MSA1LjgyMywtMzguNTY5IC0zLjE4MSwtNDMuMTI4Yy0xMS4yMTksLTUuNjgyIC0xNy41MTQsNi4yMTUgLTI0LjEzMiwxOS4zMDFjLTEwMS43NjcsMjIwLjk4MyA3OC45NjQsMzYzLjE2OSAyODQuNDc1LDM2My44MTFjNjQuNTMxLC00Ljk4MSAzMy40MjMsLTAuNzE4IDkzLjQxMSwtMTIuMTc3bC0xLjUzLDguNDczYy00LjIzOSw3My4xOTggMjguNDEzLDEzNy44MTggODkuMzgsMTc3LjUxM2MtMjcuOTcsNzkuNzM1IC04My4yNTMsMTQzLjUyMiAtMTIxLjIwMiwyMTYuNzVjMTQuMjY1LDkxLjA0MSAxMDYuNTI1LDIxMi41OTggMTQ0LjcwNywyMjkuOTFjMzMuNjEsMTUuMjQyIDEwNy4wMDIsMTUuMzkyIDEyMy45NzEsLTkuMTM3YzYuMDYsLTExLjUzNSAyLjA3NSwtMzYuMzI0IC00LjYwNywtNDkuMDIyYzI4LjcwMSwzMS43OTggNjcuMzMsNzYuMDg5IDEwNC43MzIsOTcuMzkzYzIyLjM5NywxMC42OCA0NC44NjMsMTcuNjA1IDY5Ljk5NywxOC40NjhsMzEuOTQyLC0xLjUzMmMxNS45NjgsLTMuNDQxIDM0Ljc2MywtNi4wMTggNDUuNDU2LC0yMC4yMTljMTIuMDgyLC0yMC41NDggMC44MDYsLTc4LjA3OCAtNDkuMTMxLC04Mi4xODdjLTQ5LjkzOCwtNC4xMTQgLTgyLjE1NSwtMjMuMDEyIC0xMjguMDY1LC05MS4yMjhjLTM3LjgyMiwtNjUuOTQ4IDcuOTM2LC0xNTYuNzczIDIzLjMzLC0yMjEuNjYzYzc4Ljk5NiwxMi43MTMgMTU4LjU2OCwyMi43MjQgMjM4LjY4MywyMi45MjRjMzQuNzU3LC0xLjc2NyA2OS4yMDMsLTMuMDIyIDEwMy40NjMsLTkuNjA0YzEwLjkyOCwyNy45MTUgNDEuNTE5LDEwNS45OTYgNDEuNzgsMTI4LjA1NWMwLjczNyw2Mi4xNDIgLTIyLjYyNCwxMjQuNTkyIC0xMi41NjksMTg2LjcyMmM2LjI4NiwxOC4zMDMgMC41NjIsNTIuOTQ1IDM2LjI5Miw1NC4zNjRjMjEuMzcsMS4wODUgOC4wMjEsMC40MjcgNDAuMDUzLDEuODc5bDI3LjUyLC0wLjgwNWMzNS4zMSw1OS4yNDkgNjUuODA1LDU5LjA3NyAxMzUuMTM4LDYxLjA3N1ptLTc3Ni45NzksLTE3MS41bC02LjUxNywtNS44MDNjLTE5LjA0NCwtMjAuNTAzIC02OC4xNTcsLTU2LjI3NyAtNTkuMTM2LC04OS40MzRjNy43MDksLTI0LjU3NyAyMi4wNTEsLTQ3LjI3NCAzMy4zNTMsLTcwLjYyMmwtMC40MDcsMi40MTNjLTIuMDI0LDI5LjE2NiAtNi4wNCw1Ny45MTYgMy4zNzEsODYuNDg3YzI4LjY3MiwyMy42IDY4LjQ2OCw2MS4wMzQgOTQuODg0LDg2LjUyNmMtMTQuMzQ2LC0zLjk1OSAtNDEuMzg4LC0xMi4wNTcgLTU0Ljg0MiwtNi44MThsLTEwLjcwNiwtMi43NDlaIi8+Cjwvc3ZnPgo=" />
</a>
<a href="https://github.com/oeyoews/neotw" target="_blank">
  <img src="https://img.shields.io/github/v/tag/oeyoews/neotw?color=lightgreen?style=flat" />
</a>
<a href="https://github.com/oeyoews/neotw" target="_blank">
  <img src="https://img.shields.io/website?down_color=red&down_message=offline&label=Neotw&up_color=9cf&up_message=online&url=https%3A%2F%2Fneotw.netlify.app%2F&logo=netlify" />
</a>
<img src="https://img.shields.io/badge/License-MIT-blueviolet.svg?style=flat&color=blue" alt="project-license">
<a target="_blank" href="https://app.netlify.com/sites/neotw/deploys">
<img src="https://api.netlify.com/api/v1/badges/7654bd58-2df9-4962-9a81-4cca9cf78b9c/deploy-status" alt="Netlify Status" >
 </a>
</center>

## Intro

> A modern style notebook based on `tiddlywiki`

## Preview

<center>
<img src="./img/011.png" height=256 alt="011">
<img src="./img/012.png" height=245 alt="012">
</center>

<!-- - 一键部署 -->

## Deploy

<!-- https://vercel.com/docs/deploy-button -->
<a target="_blank" href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Foeyoews%2Fneotw">
<img src="https://vercel.com/button" alt="Deploy with Vercel" />
</a>

<!-- https://docs.netlify.com/site-deploys/create-deploys/ -->
<a target="_blank" href="https://app.netlify.com/start/deploy?repository=https://github.com/oeyoews/neotw">
<img src="https://www.netlify.com/img/deploy/button.svg">
</a>

## Run

```bash
git clone --depth 1 https://github.com/oeyoews/neotw.git
yarn install && yarn start # or use `npx tiddlywiki --listen` directly
```

<details>
  <summary>FileStruct</summary>

```bash
Neotw
├──📁archive
├──📁CITATION.cff
├──📁dev
├──📁dist
├──📁files
├──📁img
├──📁LICENSE
├──📁makefile
├──📁netlify.toml
├──📁node_modules
├──📁output
├──📁package.json
├──📁patch
├──📁README.md
├──📁scripts
├──📁src
├──📁static
├──📁templates
├──📁test
├──📁tiddlers
├──📁tiddlywiki.info
├──📁vercel.json
└──📁yarn.lock
# This structure may not be up to date
```

</details>

<details>
<summary>Preview</summary>

- https://neotw.oeyoewl.top
- https://oeyoews.github.io/neotw
- https://neotw.tiddlyhost.com
- https://neotw.vercel.app
- https://neotw.netlify.app/
- https://neotw.onrender.com

</details>

---

<div align="center">
<img src="./img/cat.svg" alt="cat"/>
</div>
