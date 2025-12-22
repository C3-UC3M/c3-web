function loadVideo(element, videoId) {
  const wrapper = document.createElement('div');
  wrapper.className = 'video-block';
  wrapper.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  element.replaceWith(wrapper);
}

function loadPresentation(element, presentationPath) {
  const wrapper = document.createElement('div');
  wrapper.className = 'pdf-presentation';
  wrapper.innerHTML = `<iframe src="/c3-web/assets/pdfjs/web/viewer.html?file=${presentationPath}#page=1&zoom=page-fit" allowfullscreen</iframe>`;
  element.replaceWith(wrapper);
}