<script>
window.onload = function () {
	// Variable Definitions
        var time = document.querySelector("#time");
        var dateElem = document.querySelector("#date");
        var wallpaper = document.querySelector("#wallpaper");

        // Date Configurations
        var currentDate = new Date();
        var hours = currentDate.getHours();
        var minutes = currentDate.getMinutes();
        var month = currentDate.getMonth();
        var day = currentDate.getDay();
        var dateOfMonth = currentDate.getDate();

        var dayOfWeek = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        var monthOfYear = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "Decemeber",
        ];

        // hours
        if (hours < 10) {
          time.innerHTML = "0" + hours + ":" + minutes;
        } else {
          time.innerHTML = hours + ":" + minutes;
        }

        // minutes
        if (minutes < 10) {
          time.innerHTML = hours + ":" + "0" + minutes;
        } else {
          time.innerHTML = hours + ":" + minutes;
        }
	
  dateElem.innerHTML =
    dayOfWeek[day] + ", " + monthOfYear[month] + " " + dateOfMonth;

  // Key Events
  document.addEventListener("keypress", (e) => {
    console.log("key pressed", e.keyCode);
    // Enter Key
    if (e.keyCode === 13) {
      wallpaper.classList.remove("slideDown");
      wallpaper.classList.add("slideUp");
    }
    // Spacebar Key
    else if (e.keyCode === 32) {
      wallpaper.classList.remove("slideUp");
      wallpaper.classList.add("slideDown");
    } else {
      return null;
    }
  });
};
</script>		