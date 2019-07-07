const recorderContainer = document.getElementById("jsRecorderContainer");
const recordButton = document.getElementById("jsRecordButton");
const videoPreview = document.getElementById("jsVideoPreview");

let streamObject;
let videoRecorder;

const handleRecordedVideoData  = event =>{
    const { data: videoFile } = event; 
    const link = document.createElement("a");
    link.href = URL.createObjectURL(videoFile);
    link.download = "recorded.webm";
    document.body.appendChild(link);
    link.click();
}



const startRecording = () =>{
    videoRecorder = new MediaRecorder(streamObject);
    videoRecorder.start();
    videoRecorder.addEventListener("dataavailable", handleRecordedVideoData);
    recordButton.addEventListener("click", stopRecording);    
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

const stopRecording = () =>{
    videoRecorder.stop();     
    streamObject.stop();
    recordButton.removeEventListener("click", stopRecording);
    recordButton.addEventListener("click", getRecordedVideo);
    recordButton.innerHTML = "Start Recording";
}

function init(){
    recordButton.addEventListener("click", getRecordedVideo);
}

if(recorderContainer){
    init();
}
