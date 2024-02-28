function upload() {
    // alert()
    const input = document.createElement("INPUT");
    input.type = "file";
    input.accept = ".mp3";
    input.click();


    input.onchange = function () {
        var song_name = this.files[0].name;
        // console.log(song_name)
        document.querySelector("#file-name").innerHTML = song_name
        // here we are create a url of the given file and access it inside this file
        const url = URL.createObjectURL(this.files[0]);
        console.log(url)
        // create audio tag
        let audio = document.createElement("audio")
        audio.src = url;
        audio.play();
        // document.body.appendChild(audio)
        const header = document.querySelector("header");
        // they work when audio play
        audio.onplay = function () {
            //  select play button
            document.querySelector("#play-pause").className = "fa fa-pause-circle";
            //change header background image
            header.style.backgroundImage = `url(./images/waves.gif)`;
            //pause 
            document.querySelector("#play-pause").onclick = function () {
                // alert()
                audio.pause();
                header.style.backgroundImage = `url(./images/demo.jpg)`;
                document.querySelector("#play-pause").className = "fa fa-pause-circle";
            }

        }

        audio.onpause = function () {
            //play song 
            document.querySelector("#play-pause").className = "fa fa-play-circle";
            header.style.backgroundImage = `url(./images/demo.jpg)`;
            document.querySelector("#play-pause").onclick = function () {
                audio.play();
                header.style.backgroundImage = "url('images/waves.gif')"
            }
        }
        //  update progress bar
        audio.ontimeupdate = function () {
            const duration = this.duration;// console.log("duration", duration);
            const current = this.currentTime;// console.log("current", current);
            let percent = (current * 100) / duration;// console.log("percent", percent);
            //update progress bar
            const progress = document.querySelector("#progress-bar");
            progress.style.width = percent + "%";
            // update duration time
            document.querySelector("#duration").innerHTML = (current / 60).toFixed(2) + " / " + (duration / 60).toFixed(2);
            //onclick update progress bar (this.offsetWindow - use for find wholewidth of the song)
            // console.log(this.offsetWindow)
            document.querySelector("#progress").onclick = function (e) {
                // console.log(this.offsetWidth); // they return the width of the progress bar
                // console.log(e.offsetX / this.offsetWidth); //return progressbarlengthwhenclickon it
                const forward = e.offsetX / this.offsetWidth;
                audio.currentTime = forward * audio.duration;
            }
        }

    }
}