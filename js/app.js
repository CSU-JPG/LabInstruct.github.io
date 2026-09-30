(() => {
  'use strict';
  const data = window.LABINSTRUCT;
  const paper = window.LABINSTRUCT_PAPER;
  const config = window.LABINSTRUCT_CONFIG;
  const sources = window.LABINSTRUCT_SOURCES || {};
  const names = {agronomy: 'Agronomy', materials_science: 'Materials science', chemistry: 'Chemistry', biology: 'Biology', physics: 'Physics'};
  const companies = {
    'Wan 2.2': ['Alibaba', 'alibaba.svg'], 'Wan 3.0': ['Alibaba', 'alibaba.svg'],
    'LTX 2.3': ['Lightricks', 'lightricks.svg'],
    'Cosmos3 Nano': ['NVIDIA', 'nvidia.svg'], 'Cosmos3 Super': ['NVIDIA', 'nvidia.svg'],
    'LingBot Video': ['Robbyant', 'robbyant.png'], 'MiniMax H3': ['MiniMax', 'minimax.svg'],
    'Seedance 2.0': ['ByteDance', 'bytedance.svg'],
  };
  const $ = id => document.getElementById(id);
  const url = (base, path) => base ? `${base.replace(/\/$/, '')}/${path}` : path;
  const element = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  function modelLabel(model) {
    const label = element('span', 'model-label');
    const [company, file] = companies[model.name];
    const logo = element('img', 'company-logo');
    logo.src = `assets/logos/${file}`; logo.alt = ''; logo.title = company;
    logo.width = 22; logo.height = 22;
    label.append(logo, element('span', '', model.name + (model.commercial ? ' †' : '')));
    return label;
  }
  let current = data.samples[0];
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reducedMotion.matches;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(({target, isIntersecting}) => {
      if (isIntersecting && !paused && !document.hidden) target.play().catch(() => {});
      else target.pause();
    });
  }, {threshold: 0.15});

  // A task's source id is the third segment of its task_id (042_L1_037_biology -> 037).
  const sourceOf = sample => sources[sample.task_id.split('_')[2]] || null;
  function openSource(sample) {
    const source = sourceOf(sample);
    const dialog = $('source-dialog');
    if (!source || typeof dialog.showModal !== 'function') return;
    $('source-dialog-title').textContent = source.dataset;
    $('source-dialog-lead').textContent = `Recorded reference for “${sample.title}”`;
    $('source-dialog-note').textContent = source.note ? `File in the ${source.dataset} dataset: ${source.note}` : '';
    const link = $('source-dialog-link');
    link.href = source.dataset_url;
    link.textContent = `${source.dataset} dataset ↗`;
    dialog.showModal();
  }
  $('source-dialog-close').addEventListener('click', () => $('source-dialog').close());
  $('source-dialog').addEventListener('click', event => {
    if (event.target === $('source-dialog')) $('source-dialog').close();
  });
  // Recordings link straight out; dataset clips have no single video page, so they
  // open the dialog with the clip's path inside the dataset instead.
  function sourceControl(sample, label = 'source') {
    const source = sourceOf(sample);
    if (!source) return null;
    if (source.kind === 'dataset') {
      const button = element('button', 'source-link', label);
      button.type = 'button';
      button.title = `Source: reference clip from the ${source.dataset} dataset`;
      button.addEventListener('click', () => openSource(sample));
      return button;
    }
    const link = element('a', 'source-link', `${label} ↗`);
    link.href = source.url;
    link.target = '_blank'; link.rel = 'noopener';
    link.title = `Original recording: ${source.url}`;
    return link;
  }
  function mediaCard(sample, model, wall = false) {
    const clip = sample.videos[model];
    const card = element('figure', `media-card${model === 'reference' ? ' reference' : ''}`);
    const video = element('video');
    video.src = url(config.mediaBase, clip.preview);
    video.poster = url(config.mediaBase, clip.poster);
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.controls = true;
    video.preload = 'metadata';
    video.setAttribute('aria-label', `${model === 'reference' ? 'Recorded reference' : data.models[model]}: ${sample.title}`);
    video.addEventListener('error', () => {
      if (!card.querySelector('.media-error')) {
        card.appendChild(element('p', 'media-error', 'Video unavailable. Please check the media connection and reload.'));
      }
    });
    card.appendChild(video);
    if (wall) observer.observe(video);
    else {
      // Wall previews run themselves; the comparison videos play on click instead.
      // Clicks landing on the native control strip are left to the browser.
      video.addEventListener('click', event => {
        if (event.offsetY > Math.max(48, video.clientHeight * .12)) return;
        if (video.paused) video.play().catch(() => {}); else video.pause();
      });
    }
    const caption = element('figcaption', 'caption');
    const title = element(wall ? 'a' : 'strong', '', wall ? sample.short_title : model === 'reference' ? 'Recorded reference' : data.models[model]);
    if (wall) {
      title.href = '#explore';
      title.addEventListener('click', () => {current = sample; render();});
    }
    if (wall) {
      const row = element('div', 'title-row');
      row.appendChild(title);
      const source = sourceControl(sample);
      if (source) row.appendChild(source);
      caption.appendChild(row);
    } else caption.appendChild(title);
    const meta = element('div', 'meta');
    if (!wall && model === 'reference') meta.appendChild(sourceControl(sample, 'Source procedure') || element('span', '', 'Source procedure'));
    else meta.appendChild(element('span', '', wall ? data.models[model] : 'Model generation'));
    if (wall) meta.appendChild(element('span', '', sample.split === 'L1' ? 'Level 1' : 'Level 2'));
    else if (config.originalBase) {
      const link = element('a', '', 'Full resolution ↗');
      link.href = url(config.originalBase, clip.original);
      link.target = '_blank'; link.rel = 'noopener';
      meta.appendChild(link);
    }
    caption.appendChild(meta); card.appendChild(caption);
    return card;
  }

  // The looping laboratory clip behind the hero. It plays only while motion is
  // welcome, and falls back to the green background if the file cannot be decoded.
  const heroVideo = $('hero-bg');
  function syncHero() {
    if (!heroVideo.isConnected) return;
    if (paused || document.hidden) heroVideo.pause();
    else heroVideo.play().catch(() => {});
  }
  heroVideo.muted = true;
  heroVideo.addEventListener('error', () => heroVideo.remove());
  heroVideo.addEventListener('canplay', syncHero, {once: true});

  // Only the wall is auto-played; the comparison videos are click-to-play.
  function syncPlayback() {
    $('playback').textContent = paused ? 'Play previews' : 'Pause previews';
    $('playback').setAttribute('aria-pressed', String(paused));
    syncHero();
    $('video-wall').querySelectorAll('video').forEach(video => {
      if (paused || document.hidden) video.pause();
      else {
        const rect = video.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < innerHeight) video.play().catch(() => {});
      }
    });
  }
  $('playback').addEventListener('click', () => {paused = !paused; syncPlayback();});
  reducedMotion.addEventListener('change', event => {paused = event.matches; syncPlayback();});
  document.addEventListener('visibilitychange', syncPlayback);
  // Rewinds the comparison videos to their first frame; nothing plays until clicked.
  $('restart').addEventListener('click', () => {
    $('explore').querySelectorAll('video').forEach(video => {
      video.pause();
      video.currentTime = 0;
    });
  });

  function control(container, label, active, action) {
    const button = element('button', 'chip', label);
    button.type = 'button';
    button.setAttribute('aria-pressed', String(active));
    button.addEventListener('click', action);
    container.appendChild(button);
  }
  function render() {
    // Preserve focus when rebuilding controls after a keyboard selection.
    const focus = document.activeElement;
    const focusGroup = focus?.parentElement?.id;
    const focusText = focus?.textContent;
    $('disciplines').replaceChildren();
    Object.entries(names).forEach(([key, name]) => control($('disciplines'), name, current.discipline === key, () => {
      current = data.samples.find(s => s.discipline === key && s.split === current.split)
        || data.samples.find(s => s.discipline === key);
      render();
    }));
    $('level-controls').replaceChildren();
    const levelNames = {L1: 'Level 1 (Single Experimental Step)', L2: 'Level 2 (Short Experimental Task)'};
    ['L1', 'L2'].forEach(level => control($('level-controls'), levelNames[level], current.split === level, () => {
      current = data.samples.find(s => s.discipline === current.discipline && s.split === level);
      render();
    }));
    $('task-controls').replaceChildren();
    data.samples.filter(s => s.discipline === current.discipline && s.split === current.split).forEach(sample => {
      control($('task-controls'), sample.short_title, sample.task_id === current.task_id, () => {
        current = sample; render();
      });
      $('task-controls').lastElementChild.title = sample.title;
    });
    if (['disciplines', 'level-controls', 'task-controls'].includes(focusGroup)) {
      [...$(focusGroup).children].find(b => b.textContent === focusText)?.focus({preventScroll: true});
    }
    $('task-title').textContent = current.title;
    $('prompt').textContent = current.prompt_for_gen;
    const grid = $('compare-grid');
    $('explore').querySelectorAll('video').forEach(video => {observer.unobserve(video); video.pause(); video.removeAttribute('src'); video.load();});
    grid.replaceChildren();
    $('reference-video').replaceChildren(mediaCard(current, 'reference'));
    Object.keys(current.videos).filter(model => model !== 'reference').forEach(model => grid.appendChild(mediaCard(current, model)));
  }

  $('paper-abstract').textContent = paper.abstract;
  Object.entries(data.stats.levels).forEach(([level, count]) => $('levels').appendChild(element('span', '', `${level} · ${count} tasks`)));
  Object.entries(names).forEach(([key, name]) => {
    const count = data.stats.disciplines[key];
    const row = element('div', 'bar-row');
    row.appendChild(element('span', '', name));
    const track = element('div', 'bar-track');
    const fill = element('div', 'bar-fill');
    fill.style.width = `${count / Math.max(...Object.values(data.stats.disciplines)) * 100}%`;
    track.appendChild(fill); row.appendChild(track);
    row.appendChild(element('b', '', count)); $('distribution').appendChild(row);
  });
  const wallSamples = data.wall_tasks.map(id => data.samples.find(sample => sample.task_id === id));
  const preferredWallModels = ['minimax-h3', 'seedance2.0', 'wan3.0'];
  wallSamples.forEach((sample, index) => {
    const availablePreferred = preferredWallModels.filter(model => sample.videos[model]);
    const models = availablePreferred.length ? availablePreferred : Object.keys(sample.videos).filter(m => m !== 'reference');
    $('video-wall').appendChild(mediaCard(sample, models[index % models.length], true));
  });
  let scoreView = 'summary';
  let sortColumn = 10;
  let descending = true;
  let sortEvaluator = 'vlm';
  const scoreLabels = {
    summary: ['Core', 'Completion', 'Scene', 'Safety', 'Overall'],
    core: ['Object', 'Action', 'State', 'Physics', 'Core'],
  };
  const scoreTitles = {
    summary: ['Core Quality', 'Critical Completion factor', 'Scene Consistency gate validity rate', 'Visual Safety gate validity rate', 'Completion-aware Overall'],
    core: ['Object Consistency', 'Action Fidelity', 'State Correctness', 'Physical Plausibility', 'Core Quality'],
  };
  // The two evaluators are rendered as separate tables that share the view toggle and
  // the row order, so they can be read against each other line by line.
  const evaluatorLabels = {vlm: 'GPT-5.6 Sol', human: 'human evaluation'};
  const valuesOf = (model, evaluator, view) => evaluator === 'human' ? model.human[view] : model[view];
  function renderScores() {
    const focused = document.activeElement;
    const viewFocus = focused?.parentElement?.id === 'score-views' ? focused.textContent : null;
    $('score-views').replaceChildren();
    [['summary', 'Completion & Overall'], ['core', 'Core Visual Quality']].forEach(([view, label]) => {
      control($('score-views'), label, scoreView === view, () => {
        scoreView = view; sortColumn = view === 'summary' ? 10 : 4;
        descending = true; renderScores();
      });
    });
    if (viewFocus) [...$('score-views').children].find(b => b.textContent === viewFocus)?.focus({preventScroll: true});
    for (const [id, evaluator] of [['scores', 'vlm'], ['human-scores', 'human']]) {
      const table = $(id);
      table.replaceChildren();
      table.appendChild(element('caption', 'sr-only',
        `${scoreView === 'summary' ? 'Completion and Overall' : 'Core Quality'} scores under ${evaluatorLabels[evaluator]}.`));
      const head = element('thead');
      const group = element('tr');
      const modelHead = element('th', 'model-col', 'Model');
      modelHead.rowSpan = 2; modelHead.scope = 'col'; group.appendChild(modelHead);
      for (const level of ['Level 1 · 101 tasks', 'Level 2 · 103 tasks']) {
        const th = element('th', 'level-group', level); th.colSpan = 5; th.scope = 'colgroup'; group.appendChild(th);
      }
      const sortable = (label, index, title) => {
        const active = index === sortColumn && evaluator === sortEvaluator;
        const th = element('th', active ? 'sorted' : ''); th.scope = 'col';
        th.setAttribute('aria-sort', active ? descending ? 'descending' : 'ascending' : 'none');
        const button = element('button', '', `${label}${active ? descending ? ' ↓' : ' ↑' : ''}`);
        button.type = 'button'; button.title = title;
        button.setAttribute('aria-label', `Sort by ${title}`);
        button.dataset.column = index;
        button.addEventListener('click', () => {
          descending = sortColumn === index && sortEvaluator === evaluator ? !descending : true;
          sortColumn = index; sortEvaluator = evaluator;
          renderScores();
          $(id).querySelector(`[data-column="${index}"]`)?.focus({preventScroll: true});
        });
        th.appendChild(button); return th;
      };
      if (scoreView === 'summary') {
        const pooled = sortable('Pooled Overall', 10, 'Pooled Overall across all 204 tasks');
        pooled.rowSpan = 2; group.appendChild(pooled);
      }
      head.appendChild(group);
      const columns = element('tr');
      for (let index = 0; index < 10; index++) {
        columns.appendChild(sortable(scoreLabels[scoreView][index % 5], index,
          `Level ${index < 5 ? 1 : 2} ${scoreTitles[scoreView][index % 5]}`));
      }
      head.appendChild(columns); table.appendChild(head);
      // Rows are ordered by whichever table's heading was last clicked, so both
      // tables stay aligned on the same model order.
      const ranked = [...paper.models].sort((a, b) =>
        (valuesOf(b, sortEvaluator, scoreView)[sortColumn] - valuesOf(a, sortEvaluator, scoreView)[sortColumn]) * (descending ? 1 : -1));
      const values = model => valuesOf(model, evaluator, scoreView);
      const best = Array.from({length: scoreView === 'summary' ? 11 : 10}, (_, index) =>
        [...new Set(paper.models.map(m => values(m)[index]))].sort((a,b) => b-a).slice(0,2));
      const body = element('tbody');
      ranked.forEach(model => {
        const row = element('tr');
        const name = element('th'); name.appendChild(modelLabel(model)); name.scope = 'row'; row.appendChild(name);
        values(model).forEach((value, index) => {
          const classes = [index === sortColumn && evaluator === sortEvaluator ? 'sorted' : '',
            value === best[index][0] ? 'best' : value === best[index][1] ? 'second' : '',
            index === 5 ? 'level-start' : ''].filter(Boolean).join(' ');
          row.appendChild(element('td', classes, value.toFixed(1)));
        });
        body.appendChild(row);
      });
      table.appendChild(body);
    }
    const sortLabel = sortColumn === 10 ? 'Pooled Overall' : `Level ${sortColumn < 5 ? 1 : 2} ${scoreTitles[scoreView][sortColumn % 5]}`;
    $('ranking-status').textContent = `Sorted by ${sortLabel} under ${evaluatorLabels[sortEvaluator]}, ${descending ? 'highest' : 'lowest'} first.`;
  }
  // The consensus table behind the tiers: the per-view ranks the mean is taken over,
  // so the grouping can be checked rather than taken on faith.
  function renderTiers() {
    const table = $('tiers');
    table.replaceChildren();
    table.appendChild(element('caption', 'sr-only', 'Cross-evaluator consensus: rank within each evaluation view, mean rank, and tier.'));
    const head = element('thead');
    const group = element('tr');
    const modelHead = element('th', 'model-col', 'Model');
    modelHead.rowSpan = 2; modelHead.scope = 'col'; group.appendChild(modelHead);
    for (const label of ['Human evaluation', 'GPT-5.6 Sol']) {
      const th = element('th', 'level-group', label); th.colSpan = 3; th.scope = 'colgroup'; group.appendChild(th);
    }
    for (const label of ['Mean Rank', 'Tier']) {
      const th = element('th', '', label); th.rowSpan = 2; th.scope = 'col'; group.appendChild(th);
    }
    head.appendChild(group);
    const columns = element('tr');
    for (let group = 0; group < 2; group++) {
      for (const label of ['Level 1', 'Level 2', 'Overall']) {
        const th = element('th', '', label); th.scope = 'col'; columns.appendChild(th);
      }
    }
    head.appendChild(columns); table.appendChild(head);
    const body = element('tbody');
    let previous;
    [...paper.models].sort((a, b) => a.meanRank - b.meanRank).forEach(model => {
      const row = element('tr');
      if (previous !== undefined && model.tier !== previous) row.className = 'tier-start';
      previous = model.tier;
      const name = element('th'); name.appendChild(modelLabel(model)); name.scope = 'row'; row.appendChild(name);
      for (const evaluator of ['human', 'vlm']) {
        for (const level of ['L1', 'L2', 'Overall']) {
          row.appendChild(element('td', '', model.ranks[evaluator][level]));
        }
      }
      row.appendChild(element('td', 'mean-rank', model.meanRank.toFixed(2)));
      row.appendChild(element('td', 'tier', model.tier));
      body.appendChild(row);
    });
    table.appendChild(body);
  }
  let breakdownView = 'discipline';
  let breakdownLevel = 'Overall';
  let breakdownSort = 0;
  let breakdownDescending = true;
  function renderBreakdowns() {
    const focused = document.activeElement;
    const focusGroup = focused?.parentElement?.id;
    const focusText = focused?.textContent;
    $('breakdown-views').replaceChildren();
    [['discipline', 'Scientific Discipline'], ['domain', 'Operation Domain'], ['viewpoint', 'Viewpoint']].forEach(([key, label]) => {
      control($('breakdown-views'), label, breakdownView === key, () => {
        breakdownView = key; breakdownSort = 0; breakdownDescending = true; renderBreakdowns();
      });
    });
    $('breakdown-levels').replaceChildren();
    [['Overall', 'Overall'], ['L1', 'Level 1'], ['L2', 'Level 2']].forEach(([key, label]) => {
      control($('breakdown-levels'), label, breakdownLevel === key, () => {
        breakdownLevel = key; renderBreakdowns();
      });
    });
    if (['breakdown-views', 'breakdown-levels'].includes(focusGroup)) {
      [...$(focusGroup).children].find(b => b.textContent === focusText)?.focus({preventScroll: true});
    }
    const groups = paper.breakdowns[breakdownView];
    const table = $('breakdown-scores'); table.replaceChildren();
    table.appendChild(element('caption', 'sr-only', `${breakdownView} breakdown, ${breakdownLevel}, Overall scores under GPT-5.6 Sol`));
    const head = element('thead'); const headers = element('tr');
    const nameHead = element('th', '', 'Model'); nameHead.scope = 'col'; headers.appendChild(nameHead);
    groups.forEach((group, index) => {
      const th = element('th'); th.scope = 'col';
      th.setAttribute('aria-sort', index === breakdownSort ? breakdownDescending ? 'descending' : 'ascending' : 'none');
      const button = element('button', '', group.name + (index === breakdownSort ? breakdownDescending ? ' ↓' : ' ↑' : ''));
      button.type = 'button'; button.dataset.group = index;
      button.setAttribute('aria-label', `Sort breakdown by ${group.name}`);
      button.addEventListener('click', () => {
        breakdownDescending = breakdownSort === index ? !breakdownDescending : true;
        breakdownSort = index; renderBreakdowns();
        table.querySelector(`[data-group="${index}"]`).focus({preventScroll: true});
      });
      th.appendChild(button); headers.appendChild(th);
    });
    head.appendChild(headers); table.appendChild(head);
    const indices = paper.models.map((_, i) => i).sort((a,b) =>
      (groups[breakdownSort].scores[breakdownLevel][b] - groups[breakdownSort].scores[breakdownLevel][a]) * (breakdownDescending ? 1 : -1));
    const best = groups.map(g => [...new Set(g.scores[breakdownLevel])].sort((a,b) => b-a).slice(0,2));
    const body = element('tbody');
    indices.forEach(index => {
      const row = element('tr'); const name = element('th'); name.scope = 'row';
      name.appendChild(modelLabel(paper.models[index])); row.appendChild(name);
      groups.forEach((group, col) => {
        const value = group.scores[breakdownLevel][index];
        row.appendChild(element('td', value === best[col][0] ? 'best' : value === best[col][1] ? 'second' : '', value.toFixed(1)));
      });
      body.appendChild(row);
    });
    table.appendChild(body);
    $('breakdown-status').textContent = `${breakdownLevel === 'Overall' ? 'All task levels' : breakdownLevel === 'L1' ? 'Level 1' : 'Level 2'} · Sorted by ${groups[breakdownSort].name}, ${breakdownDescending ? 'highest' : 'lowest'} first.`;
  }
  renderBreakdowns();
  renderScores();
  renderTiers();
  render(); syncPlayback();
})();
