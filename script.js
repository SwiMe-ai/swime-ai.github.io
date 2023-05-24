const CLIENT_ID = '924258763370-vb4af8620mtabrrcsc4o7speg6b5btqn.apps.googleusercontent.com';
const SCOPES = 'https://www.googleapis.com/auth/drive.file';
const REDIRECT_URI = 'https://SwiMe-ai.github.io/website/oauth2callback';

function handleAuthResult(authResult) {
  if (authResult && !authResult.error) {
    loadDriveAPI();
  } else {
    console.error('Authorization error:', authResult.error);
  }
}

function handleAuthClick() {
  gapi.auth.authorize(
    {
      client_id: CLIENT_ID,
      scope: SCOPES,
      immediate: false,
      redirect_uri: REDIRECT_URI
    },
    handleAuthResult
  );
}

function loadDriveAPI() {
  gapi.client.load('drive', 'v3', () => {
    console.log('Google Drive API loaded.');
  });
}

function uploadFile() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  if (!file) {
    console.error('No file selected.');
    return;
  }

  const metadata = {
    name: file.name,
    mimeType: file.type,
    parents: ['1RuWaX7smjSdF7EhM0VGtGsaDJndR4WA6'] // Replace with the desired parent directory ID
  };

  const reader = new FileReader();
  reader.onload = (e) => {
    const data = e.target.result;
    const boundary = '-------314159265358979323846';
    const delimiter = "\r\n--" + boundary + "\r\n";
    const closeDelimiter = "\r\n--" + boundary + "--";

    const requestBody =
      delimiter +
      'Content-Type: application/json\r\n\r\n' +
      JSON.stringify(metadata) +
      delimiter +
      'Content-Type: ' + file.type + '\r\n' +
      'Content-Transfer-Encoding: base64\r\n' +
      '\r\n' +
      data.replace(/^.*?,/, '') +
      closeDelimiter;

    const request = gapi.client.request({
      path: '/upload/drive/v3/files',
      method: 'POST',
      params: { uploadType: 'multipart' },
      headers: {
        'Content-Type': 'multipart/related; boundary=' + boundary,
      },
      body: requestBody
    });

    request.execute((response) => {
      console.log('File uploaded successfully:', response);
    });
  };

  reader.readAsDataURL(file);
}
