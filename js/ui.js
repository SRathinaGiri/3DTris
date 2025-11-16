import { GameRenderer } from './gameRenderer.js';

export function initUI(gameState) {
  const pauseButton = document.querySelector('[data-action="pause"]');
  const restartButton = document.querySelector('[data-action="restart"]');
  const viewSelect = document.getElementById('viewMode');
  const eyeDistanceInput = document.getElementById('eyeDistance');
  const focusDepthInput = document.getElementById('focusDepth');
  const fovInput = document.getElementById('fov');
  const stereoGrid = document.querySelector('[data-stereo-grid]');
  const messageEl = document.querySelector('[data-panel-message]');
  const nextPieceContainer = document.querySelector('[data-next-piece]');
  const progressFill = document.querySelector('[data-progress-fill]');
  const progressLabel = document.querySelector('[data-progress-label]');
  const eyeValue = document.querySelector('[data-eye-value]');
  const focusValue = document.querySelector('[data-focus-value]');
  const fovValue = document.querySelector('[data-fov-value]');
  const stats = {
    score: document.querySelector('[data-stat="score"]'),
    level: document.querySelector('[data-stat="level"]'),
    layers: document.querySelector('[data-stat="layers"]'),
  };

  const renderer = new GameRenderer(document.getElementById('gameCanvas'));

  const pauseHandler = () => gameState.togglePause();
  const restartHandler = () => gameState.resetGame();
  const viewHandler = (event) => gameState.updateView(event.target.value);
  const eyeHandler = (event) => gameState.updateStereoSettings({ eyeDistance: Number(event.target.value) });
  const focusHandler = (event) => gameState.updateStereoSettings({ focusDepth: Number(event.target.value) });
  const fovHandler = (event) => gameState.updateStereoSettings({ fov: Number(event.target.value) });

  pauseButton.addEventListener('click', pauseHandler);
  restartButton.addEventListener('click', restartHandler);
  viewSelect.addEventListener('change', viewHandler);
  eyeDistanceInput.addEventListener('input', eyeHandler);
  focusDepthInput.addEventListener('input', focusHandler);
  fovInput.addEventListener('input', fovHandler);

  const renderNextPiece = (piece) => {
    if (!piece) {
      nextPieceContainer.innerHTML = '<p>No piece queued</p>';
      return;
    }
    nextPieceContainer.innerHTML = piece.cells
      .map(() => '<span>■</span>')
      .join('');
  };

  const render = (state) => {
    pauseButton.textContent = state.isPaused ? 'Resume' : 'Pause';
    stats.score.textContent = state.score.toLocaleString();
    stats.level.textContent = state.level;
    stats.layers.textContent = state.linesCleared;

    const toNext = Math.max(0, 5 - (state.linesCleared % 5));
    const filled = ((5 - toNext) / 5) * 100;
    progressFill.style.width = `${filled}%`;
    const progressText = toNext === 0 ? 'Level up imminent!' : `${toNext} layers to next level`;
    progressLabel.textContent = `Level ${state.level} • ${progressText}`;

    renderNextPiece(state.nextPiece);
    viewSelect.value = state.viewType;
    eyeDistanceInput.value = state.stereoSettings.eyeDistance;
    focusDepthInput.value = state.stereoSettings.focusDepth;
    fovInput.value = state.stereoSettings.fov;
    eyeValue.textContent = `${state.stereoSettings.eyeDistance.toFixed(3)}m`;
    focusValue.textContent = `${state.stereoSettings.focusDepth.toFixed(1)}m`;
    fovValue.textContent = `${state.stereoSettings.fov.toFixed(0)}°`;

    if (state.viewType === 'stereo') {
      stereoGrid.removeAttribute('hidden');
    } else {
      stereoGrid.setAttribute('hidden', 'hidden');
    }

    if (state.message) {
      messageEl.textContent = state.message;
      messageEl.removeAttribute('hidden');
    } else {
      messageEl.setAttribute('hidden', 'hidden');
    }

    renderer.update(state);
  };

  const destroy = () => {
    pauseButton.removeEventListener('click', pauseHandler);
    restartButton.removeEventListener('click', restartHandler);
    viewSelect.removeEventListener('change', viewHandler);
    eyeDistanceInput.removeEventListener('input', eyeHandler);
    focusDepthInput.removeEventListener('input', focusHandler);
    fovInput.removeEventListener('input', fovHandler);
    renderer.destroy();
  };

  return { render, destroy };
}
