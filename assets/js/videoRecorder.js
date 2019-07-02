const recorderContainer = document.getElementById("jsRecorderContainer");
const recordButton = document.getElementById("jsRecordButton");
const videoPreview = document.getElementById("jsVideoPreview");

const handleRecordButton = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio:true,
            video: {width: 1280, height: 780}
        });
        videoPreview.srcObject = stream;
        videoPreview.muted = true;
        videoPreview.play();
        videoPreview.save(); 
    } catch (error) {
        recordButton.innerHTML = " Cannot Record ";
        recordButton.removeEventListener("click", handleRecordButton);
    }
}

function init(){
    recordButton.addEventListener("click", handleRecordButton);
}

if(recorderContainer){
    init();
}
