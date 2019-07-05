const recorderContainer = document.getElementById("jsRecorderContainer");
const recordButton = document.getElementById("jsRecordButton");
const videoPreview = document.getElementById("jsVideoPreview");

let streamObject;

const startRecording = () =>{
    console.log(streamObject);
}

const getRecordedVideo = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio:true,
            video: true
        });
        videoPreview.srcObject = stream;
        videoPreview.muted = true;
        videoPreview.play();
        recordButton.innerHTML = "Stop Recording";
        streamObject = stream;
        startRecording();
    } catch (error) {
        recordButton.innerHTML = " Cannot Record ";
    }   finally {
        recordButton.removeEventListener("click", getRecordedVideo);
    }
}

function init(){
    recordButton.addEventListener("click", getRecordedVideo);
}

if(recorderContainer){
    init();
}
