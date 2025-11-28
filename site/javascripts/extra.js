function loadVideo(element, videoId) {
  const wrapper = document.createElement('div');
  wrapper.className = 'video-wrapper';
  wrapper.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1" allowfullscreen></iframe>`;
  element.replaceWith(wrapper);
}