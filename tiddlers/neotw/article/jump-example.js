<script>
document.onkeydown = function (event) {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e.keyCode == 76 && e.ctrlKey) {
          // document.getElementById("message_div").innerHTML = "Hello, Neotw";
           window.location.href = './example.html';
          return false;
        }
      };
</script>