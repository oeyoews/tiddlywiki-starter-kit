<script>
let time;
setInterval(() => {
time = new Date().toLocaleTimeString();
const clocks = document.getElementsByClassName('live-time');
[...clocks].forEach((elm,ind,ary) => {elm.innerHTML = time;});
}, 1000);
</script>