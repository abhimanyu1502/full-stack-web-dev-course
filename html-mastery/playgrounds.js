/**
 * Interactive Visual Playgrounds for Difficult CSS Concepts
 * Supports:
 * 1. Box Model Playground (padding, margin, border, width, height, box-sizing)
 * 2. Flexbox Playground (flex-direction, justify-content, align-items, gap, flex-wrap)
 * 3. Grid Playground (columns, rows, gap, alignment)
 * 4. Position Playground (position, top, right, bottom, left, z-index)
 */

(function () {
    const CSSPlaygrounds = {
        /**
         * 1. BOX MODEL PLAYGROUND
         */
        renderBoxModel: function (target) {
            const container = typeof target === 'string' ? document.querySelector(target) : target;
            if (!container) return;

            let state = {
                margin: 24,
                border: 8,
                padding: 24,
                width: 220,
                height: 120,
                boxSizing: 'content-box'
            };

            const root = document.createElement('div');
            root.className = 'playground-root box-model-playground';

            root.innerHTML = `
                <div class="playground-header">
                    <div class="playground-title-group">
                        <span class="playground-icon">📦</span>
                        <div>
                            <h4>Box Model Interactive Visualizer</h4>
                            <span class="playground-subtitle">Manipulate margins, borders, padding, and box-sizing</span>
                        </div>
                    </div>
                </div>

                <div class="playground-grid-layout">
                    <!-- Controls Column -->
                    <div class="playground-controls-panel">
                        <div class="control-group">
                            <label>
                                <span>Margin: <strong id="val_bm_margin">${state.margin}px</strong></span>
                                <input type="range" id="range_bm_margin" min="0" max="50" value="${state.margin}">
                            </label>
                        </div>
                        <div class="control-group">
                            <label>
                                <span>Border Width: <strong id="val_bm_border">${state.border}px</strong></span>
                                <input type="range" id="range_bm_border" min="0" max="25" value="${state.border}">
                            </label>
                        </div>
                        <div class="control-group">
                            <label>
                                <span>Padding: <strong id="val_bm_padding">${state.padding}px</strong></span>
                                <input type="range" id="range_bm_padding" min="0" max="50" value="${state.padding}">
                            </label>
                        </div>
                        <div class="control-group">
                            <label>
                                <span>Content Width: <strong id="val_bm_width">${state.width}px</strong></span>
                                <input type="range" id="range_bm_width" min="140" max="300" value="${state.width}">
                            </label>
                        </div>
                        <div class="control-group">
                            <label>
                                <span>Content Height: <strong id="val_bm_height">${state.height}px</strong></span>
                                <input type="range" id="range_bm_height" min="80" max="200" value="${state.height}">
                            </label>
                        </div>
                        <div class="control-group">
                            <label>
                                <span>Box-Sizing:</span>
                                <div class="btn-toggle-group">
                                    <button type="button" class="btn-toggle active" data-sizing="content-box">content-box</button>
                                    <button type="button" class="btn-toggle" data-sizing="border-box">border-box</button>
                                </div>
                            </label>
                        </div>
                    </div>

                    <!-- Visual Stage Column -->
                    <div class="playground-stage-panel">
                        <div class="computed-dimensions-banner" id="bm_computed_banner">
                            Total Rendered Space: <strong>320px × 220px</strong>
                        </div>

                        <!-- 4-Layer Nested Diagram -->
                        <div class="box-model-stage-wrapper">
                            <div class="layer-margin" id="bm_layer_margin">
                                <span class="layer-label margin-label">MARGIN</span>
                                <div class="layer-border" id="bm_layer_border">
                                    <span class="layer-label border-label">BORDER</span>
                                    <div class="layer-padding" id="bm_layer_padding">
                                        <span class="layer-label padding-label">PADDING</span>
                                        <div class="layer-content" id="bm_layer_content">
                                            <span class="content-text">CONTENT</span>
                                            <span class="content-dims" id="bm_content_dims">${state.width} × ${state.height}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Live Generated CSS Code -->
                        <div class="playground-code-output">
                            <div class="code-output-header">
                                <span>Generated CSS</span>
                                <button type="button" class="btn-copy-css" id="btn_bm_copy">📋 Copy</button>
                            </div>
                            <pre><code id="bm_css_output"></code></pre>
                        </div>
                    </div>
                </div>
            `;

            container.innerHTML = '';
            container.appendChild(root);

            // Elements
            const rangeMargin = root.querySelector('#range_bm_margin');
            const rangeBorder = root.querySelector('#range_bm_border');
            const rangePadding = root.querySelector('#range_bm_padding');
            const rangeWidth = root.querySelector('#range_bm_width');
            const rangeHeight = root.querySelector('#range_bm_height');
            const sizingButtons = root.querySelectorAll('[data-sizing]');

            const layerMargin = root.querySelector('#bm_layer_margin');
            const layerBorder = root.querySelector('#bm_layer_border');
            const layerPadding = root.querySelector('#bm_layer_padding');
            const layerContent = root.querySelector('#bm_layer_content');
            const contentDims = root.querySelector('#bm_content_dims');
            const computedBanner = root.querySelector('#bm_computed_banner');
            const cssOutput = root.querySelector('#bm_css_output');

            function update() {
                root.querySelector('#val_bm_margin').textContent = `${state.margin}px`;
                root.querySelector('#val_bm_border').textContent = `${state.border}px`;
                root.querySelector('#val_bm_padding').textContent = `${state.padding}px`;
                root.querySelector('#val_bm_width').textContent = `${state.width}px`;
                root.querySelector('#val_bm_height').textContent = `${state.height}px`;

                // Update diagram layers
                layerMargin.style.padding = `${state.margin}px`;
                layerBorder.style.padding = `${state.border}px`;
                layerPadding.style.padding = `${state.padding}px`;

                let finalContentW = state.width;
                let finalContentH = state.height;

                if (state.boxSizing === 'border-box') {
                    // border-box absorbs padding and border
                    const innerDeductW = (state.padding * 2) + (state.border * 2);
                    const innerDeductH = (state.padding * 2) + (state.border * 2);
                    finalContentW = Math.max(20, state.width - innerDeductW);
                    finalContentH = Math.max(20, state.height - innerDeductH);
                }

                layerContent.style.width = `${finalContentW}px`;
                layerContent.style.height = `${finalContentH}px`;
                contentDims.textContent = `${finalContentW}px × ${finalContentH}px`;

                // Total calculated space occupied
                const totalW = state.boxSizing === 'border-box'
                    ? state.width + (state.margin * 2)
                    : state.width + (state.padding * 2) + (state.border * 2) + (state.margin * 2);

                const totalH = state.boxSizing === 'border-box'
                    ? state.height + (state.margin * 2)
                    : state.height + (state.padding * 2) + (state.border * 2) + (state.margin * 2);

                computedBanner.innerHTML = `Total Rendered Space: <strong>${totalW}px × ${totalH}px</strong> (${state.boxSizing})`;

                const cssStr = `.box {\n  box-sizing: ${state.boxSizing};\n  width: ${state.width}px;\n  height: ${state.height}px;\n  padding: ${state.padding}px;\n  border: ${state.border}px solid #f59e0b;\n  margin: ${state.margin}px;\n}`;
                cssOutput.textContent = cssStr;
            }

            rangeMargin.addEventListener('input', (e) => { state.margin = parseInt(e.target.value, 10); update(); });
            rangeBorder.addEventListener('input', (e) => { state.border = parseInt(e.target.value, 10); update(); });
            rangePadding.addEventListener('input', (e) => { state.padding = parseInt(e.target.value, 10); update(); });
            rangeWidth.addEventListener('input', (e) => { state.width = parseInt(e.target.value, 10); update(); });
            rangeHeight.addEventListener('input', (e) => { state.height = parseInt(e.target.value, 10); update(); });

            sizingButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    sizingButtons.forEach(b => b.classList.remove('active'));
                    e.currentTarget.classList.add('active');
                    state.boxSizing = e.currentTarget.getAttribute('data-sizing');
                    update();
                });
            });

            root.querySelector('#btn_bm_copy').addEventListener('click', () => {
                navigator.clipboard.writeText(cssOutput.textContent);
                const btn = root.querySelector('#btn_bm_copy');
                btn.textContent = '✅ Copied!';
                setTimeout(() => { btn.textContent = '📋 Copy'; }, 1500);
            });

            update();
        },

        /**
         * 2. FLEXBOX PLAYGROUND
         */
        renderFlexbox: function (target) {
            const container = typeof target === 'string' ? document.querySelector(target) : target;
            if (!container) return;

            let state = {
                direction: 'row',
                justify: 'flex-start',
                alignItems: 'center',
                gap: 16,
                wrap: 'nowrap',
                itemCount: 4
            };

            const root = document.createElement('div');
            root.className = 'playground-root flexbox-playground';

            root.innerHTML = `
                <div class="playground-header">
                    <div class="playground-title-group">
                        <span class="playground-icon">↔️</span>
                        <div>
                            <h4>Flexbox Interactive Visualizer</h4>
                            <span class="playground-subtitle">Experiment with 1D layout direction, distribution, and alignment</span>
                        </div>
                    </div>
                </div>

                <div class="playground-grid-layout">
                    <!-- Controls Column -->
                    <div class="playground-controls-panel">
                        <div class="control-group">
                            <label>
                                <span>flex-direction:</span>
                                <select id="sel_flex_dir">
                                    <option value="row">row (Default: Horizontal →)</option>
                                    <option value="row-reverse">row-reverse (← Horizontal)</option>
                                    <option value="column">column (Vertical ↓)</option>
                                    <option value="column-reverse">column-reverse (↑ Vertical)</option>
                                </select>
                            </label>
                        </div>
                        <div class="control-group">
                            <label>
                                <span>justify-content (Main Axis):</span>
                                <select id="sel_flex_justify">
                                    <option value="flex-start">flex-start (Pack to start)</option>
                                    <option value="center">center (Pack to center)</option>
                                    <option value="flex-end">flex-end (Pack to end)</option>
                                    <option value="space-between">space-between (Edges flush)</option>
                                    <option value="space-around">space-around (Equal edges)</option>
                                    <option value="space-evenly">space-evenly (Equal spacing)</option>
                                </select>
                            </label>
                        </div>
                        <div class="control-group">
                            <label>
                                <span>align-items (Cross Axis):</span>
                                <select id="sel_flex_align">
                                    <option value="stretch">stretch (Default: Fill height)</option>
                                    <option value="flex-start">flex-start (Align top/start)</option>
                                    <option value="center" selected>center (Center vertically)</option>
                                    <option value="flex-end">flex-end (Align bottom/end)</option>
                                    <option value="baseline">baseline (Text baseline)</option>
                                </select>
                            </label>
                        </div>
                        <div class="control-group">
                            <label>
                                <span>gap: <strong id="val_flex_gap">${state.gap}px</strong></span>
                                <input type="range" id="range_flex_gap" min="0" max="40" value="${state.gap}">
                            </label>
                        </div>
                        <div class="control-group">
                            <label>
                                <span>flex-wrap:</span>
                                <select id="sel_flex_wrap">
                                    <option value="nowrap">nowrap (Single line)</option>
                                    <option value="wrap">wrap (Allow multiple lines)</option>
                                    <option value="wrap-reverse">wrap-reverse (Wrap upwards)</option>
                                </select>
                            </label>
                        </div>
                        <div class="control-group flex-items-counter">
                            <span>Flex Items:</span>
                            <div class="counter-actions">
                                <button type="button" class="btn-counter" id="btn_flex_remove">− Remove</button>
                                <strong id="val_flex_count">${state.itemCount}</strong>
                                <button type="button" class="btn-counter" id="btn_flex_add">+ Add</button>
                            </div>
                        </div>
                    </div>

                    <!-- Visual Stage Column -->
                    <div class="playground-stage-panel">
                        <!-- Axis Indicators -->
                        <div class="flex-axis-legend">
                            <span class="legend-pill main-axis-pill">➡️ Main Axis: <strong id="txt_main_axis">Left to Right</strong></span>
                            <span class="legend-pill cross-axis-pill">⬇️ Cross Axis: <strong id="txt_cross_axis">Top to Bottom</strong></span>
                        </div>

                        <div class="flex-stage-container" id="flex_stage"></div>

                        <!-- Live Code -->
                        <div class="playground-code-output">
                            <div class="code-output-header">
                                <span>Generated CSS</span>
                                <button type="button" class="btn-copy-css" id="btn_flex_copy">📋 Copy</button>
                            </div>
                            <pre><code id="flex_css_output"></code></pre>
                        </div>
                    </div>
                </div>
            `;

            container.innerHTML = '';
            container.appendChild(root);

            const selDir = root.querySelector('#sel_flex_dir');
            const selJustify = root.querySelector('#sel_flex_justify');
            const selAlign = root.querySelector('#sel_flex_align');
            const rangeGap = root.querySelector('#range_flex_gap');
            const selWrap = root.querySelector('#sel_flex_wrap');
            const stage = root.querySelector('#flex_stage');
            const cssOutput = root.querySelector('#flex_css_output');
            const txtMainAxis = root.querySelector('#txt_main_axis');
            const txtCrossAxis = root.querySelector('#txt_cross_axis');

            function update() {
                root.querySelector('#val_flex_gap').textContent = `${state.gap}px`;
                root.querySelector('#val_flex_count').textContent = state.itemCount;

                stage.style.display = 'flex';
                stage.style.flexDirection = state.direction;
                stage.style.justifyContent = state.justify;
                stage.style.alignItems = state.alignItems;
                stage.style.gap = `${state.gap}px`;
                stage.style.flexWrap = state.wrap;

                // Update Axis text
                if (state.direction.includes('column')) {
                    txtMainAxis.textContent = state.direction === 'column' ? 'Top to Bottom ↓' : 'Bottom to Top ↑';
                    txtCrossAxis.textContent = 'Left to Right →';
                } else {
                    txtMainAxis.textContent = state.direction === 'row' ? 'Left to Right →' : 'Right to Left ←';
                    txtCrossAxis.textContent = 'Top to Bottom ↓';
                }

                // Render items
                stage.innerHTML = '';
                for (let i = 1; i <= state.itemCount; i++) {
                    const card = document.createElement('div');
                    card.className = 'flex-item-card';
                    card.innerHTML = `<span class="item-num">#${i}</span><span class="item-title">Card</span>`;
                    stage.appendChild(card);
                }

                const cssStr = `.container {\n  display: flex;\n  flex-direction: ${state.direction};\n  justify-content: ${state.justify};\n  align-items: ${state.alignItems};\n  gap: ${state.gap}px;\n  flex-wrap: ${state.wrap};\n}`;
                cssOutput.textContent = cssStr;
            }

            selDir.addEventListener('change', (e) => { state.direction = e.target.value; update(); });
            selJustify.addEventListener('change', (e) => { state.justify = e.target.value; update(); });
            selAlign.addEventListener('change', (e) => { state.alignItems = e.target.value; update(); });
            rangeGap.addEventListener('input', (e) => { state.gap = parseInt(e.target.value, 10); update(); });
            selWrap.addEventListener('change', (e) => { state.wrap = e.target.value; update(); });

            root.querySelector('#btn_flex_add').addEventListener('click', () => {
                if (state.itemCount < 8) { state.itemCount++; update(); }
            });
            root.querySelector('#btn_flex_remove').addEventListener('click', () => {
                if (state.itemCount > 1) { state.itemCount--; update(); }
            });

            root.querySelector('#btn_flex_copy').addEventListener('click', () => {
                navigator.clipboard.writeText(cssOutput.textContent);
                const btn = root.querySelector('#btn_flex_copy');
                btn.textContent = '✅ Copied!';
                setTimeout(() => { btn.textContent = '📋 Copy'; }, 1500);
            });

            update();
        },

        /**
         * 3. GRID PLAYGROUND
         */
        renderGrid: function (target) {
            const container = typeof target === 'string' ? document.querySelector(target) : target;
            if (!container) return;

            let state = {
                columns: 'repeat(3, 1fr)',
                rows: 'repeat(2, 100px)',
                gap: 15,
                justifyItems: 'stretch',
                alignItems: 'stretch',
                itemCount: 6
            };

            const root = document.createElement('div');
            root.className = 'playground-root grid-playground';

            root.innerHTML = `
                <div class="playground-header">
                    <div class="playground-title-group">
                        <span class="playground-icon">▦</span>
                        <div>
                            <h4>CSS Grid Interactive Visualizer</h4>
                            <span class="playground-subtitle">Master 2D layout tracks, columns, rows, and gap spacing</span>
                        </div>
                    </div>
                </div>

                <div class="playground-grid-layout">
                    <!-- Controls Column -->
                    <div class="playground-controls-panel">
                        <div class="control-group">
                            <label>
                                <span>grid-template-columns:</span>
                                <select id="sel_grid_cols">
                                    <option value="repeat(3, 1fr)" selected>repeat(3, 1fr) — 3 Equal Cols</option>
                                    <option value="repeat(2, 1fr)">repeat(2, 1fr) — 2 Equal Cols</option>
                                    <option value="1fr 2fr 1fr">1fr 2fr 1fr — Wide Center</option>
                                    <option value="200px 1fr">200px 1fr — Sidebar + Content</option>
                                    <option value="repeat(4, 1fr)">repeat(4, 1fr) — 4 Compact Cols</option>
                                </select>
                            </label>
                        </div>
                        <div class="control-group">
                            <label>
                                <span>grid-template-rows:</span>
                                <select id="sel_grid_rows">
                                    <option value="repeat(2, 100px)" selected>repeat(2, 100px) — Fixed Height</option>
                                    <option value="auto">auto — Dynamic Content Height</option>
                                    <option value="80px 140px">80px 140px — Header + Body</option>
                                </select>
                            </label>
                        </div>
                        <div class="control-group">
                            <label>
                                <span>gap: <strong id="val_grid_gap">${state.gap}px</strong></span>
                                <input type="range" id="range_grid_gap" min="0" max="40" value="${state.gap}">
                            </label>
                        </div>
                        <div class="control-group">
                            <label>
                                <span>justify-items (Horizontal Alignment):</span>
                                <select id="sel_grid_justify">
                                    <option value="stretch" selected>stretch (Fill track width)</option>
                                    <option value="start">start</option>
                                    <option value="center">center</option>
                                    <option value="end">end</option>
                                </select>
                            </label>
                        </div>
                        <div class="control-group">
                            <label>
                                <span>align-items (Vertical Alignment):</span>
                                <select id="sel_grid_align">
                                    <option value="stretch" selected>stretch (Fill track height)</option>
                                    <option value="start">start</option>
                                    <option value="center">center</option>
                                    <option value="end">end</option>
                                </select>
                            </label>
                        </div>
                        <div class="control-group flex-items-counter">
                            <span>Grid Tiles:</span>
                            <div class="counter-actions">
                                <button type="button" class="btn-counter" id="btn_grid_remove">− Remove</button>
                                <strong id="val_grid_count">${state.itemCount}</strong>
                                <button type="button" class="btn-counter" id="btn_grid_add">+ Add</button>
                            </div>
                        </div>
                    </div>

                    <!-- Visual Stage Column -->
                    <div class="playground-stage-panel">
                        <div class="grid-stage-container" id="grid_stage"></div>

                        <!-- Live Code Output -->
                        <div class="playground-code-output">
                            <div class="code-output-header">
                                <span>Generated CSS</span>
                                <button type="button" class="btn-copy-css" id="btn_grid_copy">📋 Copy</button>
                            </div>
                            <pre><code id="grid_css_output"></code></pre>
                        </div>
                    </div>
                </div>
            `;

            container.innerHTML = '';
            container.appendChild(root);

            const selCols = root.querySelector('#sel_grid_cols');
            const selRows = root.querySelector('#sel_grid_rows');
            const rangeGap = root.querySelector('#range_grid_gap');
            const selJustify = root.querySelector('#sel_grid_justify');
            const selAlign = root.querySelector('#sel_grid_align');
            const stage = root.querySelector('#grid_stage');
            const cssOutput = root.querySelector('#grid_css_output');

            function update() {
                root.querySelector('#val_grid_gap').textContent = `${state.gap}px`;
                root.querySelector('#val_grid_count').textContent = state.itemCount;

                stage.style.display = 'grid';
                stage.style.gridTemplateColumns = state.columns;
                stage.style.gridTemplateRows = state.rows;
                stage.style.gap = `${state.gap}px`;
                stage.style.justifyItems = state.justifyItems;
                stage.style.alignItems = state.alignItems;

                stage.innerHTML = '';
                for (let i = 1; i <= state.itemCount; i++) {
                    const tile = document.createElement('div');
                    tile.className = 'grid-item-tile';
                    tile.innerHTML = `<strong>Tile ${i}</strong><span>Track Col/Row</span>`;
                    stage.appendChild(tile);
                }

                const cssStr = `.grid-container {\n  display: grid;\n  grid-template-columns: ${state.columns};\n  grid-template-rows: ${state.rows};\n  gap: ${state.gap}px;\n  justify-items: ${state.justifyItems};\n  align-items: ${state.alignItems};\n}`;
                cssOutput.textContent = cssStr;
            }

            selCols.addEventListener('change', (e) => { state.columns = e.target.value; update(); });
            selRows.addEventListener('change', (e) => { state.rows = e.target.value; update(); });
            rangeGap.addEventListener('input', (e) => { state.gap = parseInt(e.target.value, 10); update(); });
            selJustify.addEventListener('change', (e) => { state.justifyItems = e.target.value; update(); });
            selAlign.addEventListener('change', (e) => { state.alignItems = e.target.value; update(); });

            root.querySelector('#btn_grid_add').addEventListener('click', () => {
                if (state.itemCount < 12) { state.itemCount++; update(); }
            });
            root.querySelector('#btn_grid_remove').addEventListener('click', () => {
                if (state.itemCount > 1) { state.itemCount--; update(); }
            });

            root.querySelector('#btn_grid_copy').addEventListener('click', () => {
                navigator.clipboard.writeText(cssOutput.textContent);
                const btn = root.querySelector('#btn_grid_copy');
                btn.textContent = '✅ Copied!';
                setTimeout(() => { btn.textContent = '📋 Copy'; }, 1500);
            });

            update();
        },

        /**
         * 4. POSITION PLAYGROUND
         */
        renderPosition: function (target) {
            const container = typeof target === 'string' ? document.querySelector(target) : target;
            if (!container) return;

            let state = {
                position: 'relative',
                top: 20,
                left: 30,
                zIndex: 1
            };

            const root = document.createElement('div');
            root.className = 'playground-root position-playground';

            root.innerHTML = `
                <div class="playground-header">
                    <div class="playground-title-group">
                        <span class="playground-icon">📍</span>
                        <div>
                            <h4>CSS Position & z-index Interactive Visualizer</h4>
                            <span class="playground-subtitle">Understand normal flow vs offsets with live ghost tracking</span>
                        </div>
                    </div>
                </div>

                <div class="playground-grid-layout">
                    <!-- Controls Column -->
                    <div class="playground-controls-panel">
                        <div class="control-group">
                            <label>
                                <span>position:</span>
                                <select id="sel_pos_mode">
                                    <option value="static">static (Normal Document Flow)</option>
                                    <option value="relative" selected>relative (Offset from original spot)</option>
                                    <option value="absolute">absolute (Removed from flow; relative to parent)</option>
                                    <option value="sticky">sticky (Scroll-relative pinned)</option>
                                </select>
                            </label>
                        </div>
                        <div class="control-group">
                            <label>
                                <span>top: <strong id="val_pos_top">${state.top}px</strong></span>
                                <input type="range" id="range_pos_top" min="-40" max="100" value="${state.top}">
                            </label>
                        </div>
                        <div class="control-group">
                            <label>
                                <span>left: <strong id="val_pos_left">${state.left}px</strong></span>
                                <input type="range" id="range_pos_left" min="-40" max="150" value="${state.left}">
                            </label>
                        </div>
                        <div class="control-group">
                            <label>
                                <span>z-index: <strong id="val_pos_z">${state.zIndex}</strong></span>
                                <input type="range" id="range_pos_z" min="-1" max="10" value="${state.zIndex}">
                            </label>
                        </div>
                        <div class="position-tip-box">
                            <span id="pos_explanation_text"></span>
                        </div>
                    </div>

                    <!-- Visual Stage Column -->
                    <div class="playground-stage-panel">
                        <div class="position-stage-container" id="pos_stage">
                            <div class="pos-ref-box box-a">
                                <strong>Box A</strong>
                                <span>Normal Flow</span>
                            </div>

                            <!-- Ghost Box shows original position in document flow -->
                            <div class="pos-ghost-box" id="pos_ghost">
                                <span>Original Flow Slot</span>
                            </div>

                            <!-- Target Box being moved -->
                            <div class="pos-target-box" id="pos_target">
                                <strong>Box B (Target)</strong>
                                <span id="pos_badge_label">position: relative</span>
                            </div>

                            <div class="pos-ref-box box-c">
                                <strong>Box C</strong>
                                <span>Normal Flow</span>
                            </div>
                        </div>

                        <!-- Live Code -->
                        <div class="playground-code-output">
                            <div class="code-output-header">
                                <span>Generated CSS</span>
                                <button type="button" class="btn-copy-css" id="btn_pos_copy">📋 Copy</button>
                            </div>
                            <pre><code id="pos_css_output"></code></pre>
                        </div>
                    </div>
                </div>
            `;

            container.innerHTML = '';
            container.appendChild(root);

            const selMode = root.querySelector('#sel_pos_mode');
            const rangeTop = root.querySelector('#range_pos_top');
            const rangeLeft = root.querySelector('#range_pos_left');
            const rangeZ = root.querySelector('#range_pos_z');
            const targetBox = root.querySelector('#pos_target');
            const ghostBox = root.querySelector('#pos_ghost');
            const expText = root.querySelector('#pos_explanation_text');
            const cssOutput = root.querySelector('#pos_css_output');
            const badgeLabel = root.querySelector('#pos_badge_label');

            function update() {
                root.querySelector('#val_pos_top').textContent = `${state.top}px`;
                root.querySelector('#val_pos_left').textContent = `${state.left}px`;
                root.querySelector('#val_pos_z').textContent = state.zIndex;

                targetBox.style.position = state.position;
                targetBox.style.zIndex = state.zIndex;

                if (state.position === 'static') {
                    targetBox.style.top = 'auto';
                    targetBox.style.left = 'auto';
                    ghostBox.style.display = 'none';
                    badgeLabel.textContent = 'position: static';
                    expText.textContent = '💡 Static elements ignore top, right, bottom, left, and z-index. They sit directly in normal document flow.';
                } else if (state.position === 'relative') {
                    targetBox.style.top = `${state.top}px`;
                    targetBox.style.left = `${state.left}px`;
                    ghostBox.style.display = 'block';
                    badgeLabel.textContent = `relative (${state.top}px, ${state.left}px)`;
                    expText.textContent = '💡 Relative elements remain in normal flow (notice the dashed ghost slot holding its space), but shift visually from that spot.';
                } else if (state.position === 'absolute') {
                    targetBox.style.top = `${state.top}px`;
                    targetBox.style.left = `${state.left}px`;
                    ghostBox.style.display = 'block';
                    badgeLabel.textContent = `absolute (top:${state.top}px, left:${state.left}px)`;
                    expText.textContent = '💡 Absolute elements are completely pulled out of normal flow! Other elements collapse into its previous space.';
                } else if (state.position === 'sticky') {
                    targetBox.style.top = `${state.top}px`;
                    targetBox.style.left = `${state.left}px`;
                    ghostBox.style.display = 'block';
                    badgeLabel.textContent = 'sticky';
                    expText.textContent = '💡 Sticky acts as relative until the viewport/container scrolls to the specified offset threshold, where it pins.';
                }

                const cssStr = `.target-box {\n  position: ${state.position};\n  top: ${state.position === 'static' ? 'auto' : `${state.top}px`};\n  left: ${state.position === 'static' ? 'auto' : `${state.left}px`};\n  z-index: ${state.zIndex};\n}`;
                cssOutput.textContent = cssStr;
            }

            selMode.addEventListener('change', (e) => { state.position = e.target.value; update(); });
            rangeTop.addEventListener('input', (e) => { state.top = parseInt(e.target.value, 10); update(); });
            rangeLeft.addEventListener('input', (e) => { state.left = parseInt(e.target.value, 10); update(); });
            rangeZ.addEventListener('input', (e) => { state.zIndex = parseInt(e.target.value, 10); update(); });

            root.querySelector('#btn_pos_copy').addEventListener('click', () => {
                navigator.clipboard.writeText(cssOutput.textContent);
                const btn = root.querySelector('#btn_pos_copy');
                btn.textContent = '✅ Copied!';
                setTimeout(() => { btn.textContent = '📋 Copy'; }, 1500);
            });

            update();
        }
    };

    window.CSSPlaygrounds = CSSPlaygrounds;
})();
