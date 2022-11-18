<script>
document.onkeydown = function (event) {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e.keyCode == 76 && e.ctrlKey) {
          // document.getElementById("message_div").innerHTML = "你按下了ctrl+l,开发的时候可以跳到一个锁屏的页面";
           window.location.href = './example.html';
          return false;
        }
      };
</script>