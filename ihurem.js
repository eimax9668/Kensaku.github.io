function loadIframe() {
    const urlInput = document.getElementById('urlInput');
    const iframe = document.getElementById('myIframe');
    const url = urlInput.value;
  
    if (isValidUrl(url)) {
      iframe.src = url;
    } else {
      alert('有効なURLを入力してください。');
    }
  }
  
  function isValidUrl(urlString) {
    const pattern = new URL(urlString);
    return pattern.hostname !== '';
  }