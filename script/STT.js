let mediaRecorder;
let chunks = [];

function startRecording() {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(function(stream) {
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();

      mediaRecorder.addEventListener('dataavailable', function(e) {
        chunks.push(e.data);
      });
    })
    .catch(function(error) {
      console.log('Error accessing microphone:', error);
    });
}

function stopRecording() {
  mediaRecorder.stop();
  mediaRecorder.addEventListener('stop', function() {
    const audioBlob = new Blob(chunks, { type: 'audio/webm' });
    const audioUrl = URL.createObjectURL(audioBlob);
    
    // Відправка аудіофайлу на сервер
    sendAudioToServer(audioBlob);
    
    chunks = [];
  });
}

function sendAudioToServer(audioBlob) {
  const formData = new FormData();
  formData.append('audio', audioBlob);

  fetch('/path/to/server', {
    method: 'POST',
    body: formData
  })
  .then(function(response) {
    return response.text();
  })
  .then(function(text) {
    // Отриманий текст з сервера
    console.log('Розпізнаний текст:', text);
  })
  .catch(function(error) {
    console.log('Помилка при відправці аудіо на сервер:', error);
  });
}

document.querySelector('.round-button.left-button').addEventListener('mousedown', function() {
  startRecording();
});

document.querySelector('.round-button.left-button').addEventListener('mouseup', function() {
  stopRecording();
});
