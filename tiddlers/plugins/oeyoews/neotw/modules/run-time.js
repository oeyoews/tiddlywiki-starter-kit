`<script>`
    function secondToDate(second) {
        if (!second) {
            return 0;
        }
        var time = new Array(0, 0, 0, 0, 0);
        if (second >= 365 * 24 * 3600) {
            time[0] = parseInt(second / (365 * 24 * 3600));
            second %= 365 * 24 * 3600;
        }
        if (second >= 24 * 3600) {
            time[1] = parseInt(second / (24 * 3600));
            second %= 24 * 3600;
        }
        if (second >= 3600) {
            time[2] = parseInt(second / 3600);
            second %= 3600;
        }
        if (second >= 60) {
            time[3] = parseInt(second / 60);
            second %= 60;
        }
        if (second > 0) {
            time[4] = second;
        }
        return time;
    }
    `</script>`
    `<script>`
    function setTime() {
        var create_time = Math.round(new Date(Date.UTC(2021, 12, 27, 6, 6, 6)).getTime() / 1000);
        var timestamp = Math.round((new Date().getTime() + 8 * 60 * 60 * 1000) / 1000);
        currentTime = secondToDate((timestamp - create_time));
        currentTimeHtml = currentTime[0] + ' years ' + currentTime[1] + ' day '
                + currentTime[2] + ' hours ' + currentTime[3] + ' minutes ' + currentTime[4]
                + ' seconds';
        document.getElementById("htmer_time").innerHTML = currentTimeHtml;
    }    setInterval(setTime, 1000);
    `</script>`
