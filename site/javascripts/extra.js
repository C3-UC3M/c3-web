function loadVideo(element, videoId) {
  const wrapper = document.createElement('div');
  wrapper.className = 'video-block';
  wrapper.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  element.replaceWith(wrapper);
}


function openPresentation(presentationPath) {
  const viewerUrl =
    `/c3-web/assets/pdfjs/web/viewer.html?file=${encodeURIComponent(presentationPath)}#presentationMode=true`;

  window.open(viewerUrl, "_blank", "noopener,noreferrer");
}
