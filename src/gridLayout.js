/**
 * Grid layout algorithm – computes card positions & spans for the dashboard grid.
 * Pure functions with zero React / UI dependencies.
 */

/**
 * Determine how many grid columns a card should span.
 *
 * @param {string} cardId
 * @param {Function} getCardSettingsKey  (cardId) => settingsKey
 * @param {Object}  cardSettings         Full card-settings map
 * @param {string}  activePage           Current active page id
 * @returns {number} 1 | 2 | 4
 */
export const getCardGridSpan = (cardId, getCardSettingsKey, cardSettings, activePage) => {
  if (cardId.startsWith('automation.')) {
    const settingsKey = getCardSettingsKey(cardId);
    const settings = cardSettings[settingsKey] || cardSettings[cardId] || {};
    const typeSetting = settings.type;
    if (typeSetting === 'sensor' || typeSetting === 'entity' || typeSetting === 'toggle') {
      return settings.size === 'small' ? 1 : 2;
    }
    return 1;
  }

  if (cardId.startsWith('calendar_card_')) {
    const settingsKey = getCardSettingsKey(cardId);
    const sizeSetting = cardSettings[settingsKey]?.size || cardSettings[cardId]?.size;
    return sizeSetting === 'small' ? 1 : (sizeSetting === 'medium' ? 2 : 4);
  }

  if (cardId.startsWith('light_') || cardId.startsWith('light.')) {
    const settingsKey = getCardSettingsKey(cardId);
    const sizeSetting = cardSettings[settingsKey]?.size || cardSettings[cardId]?.size;
    return sizeSetting === 'small' ? 1 : 2;
  }

  if (cardId === 'car' || cardId.startsWith('car_card_')) {
    const settingsKey = getCardSettingsKey(cardId);
    const sizeSetting = cardSettings[settingsKey]?.size || cardSettings[cardId]?.size;
    return sizeSetting === 'small' ? 1 : 2;
  }

  const settingsKey = getCardSettingsKey(cardId);
  const sizeSetting = cardSettings[settingsKey]?.size || cardSettings[cardId]?.size;
  if (sizeSetting === 'small') return 1;

  if (cardId.startsWith('weather_temp_')) return 2;

  if (activePage === 'settings' && !['car'].includes(cardId) && !cardId.startsWith('media_player')) {
    return 1;
  }

  return 2;
};

/**
 * Build a position map for a list of card ids.
 *
 * @param {string[]}  ids       Ordered card ids
 * @param {number}    columns   Number of grid columns
 * @param {Function}  spanFn    (cardId) => number  – pre-bound getCardGridSpan
 * @returns {Object}  { [cardId]: { row, col, span } }
 */
export const buildGridLayout = (ids, columns, spanFn) => {
  if (!columns || columns < 1) return {};
  const occupancy = [];
  const positions = {};

  const ensureRow = (row) => {
    if (!occupancy[row]) occupancy[row] = Array(columns).fill(false);
  };

  const canPlace = (row, col, span) => {
    for (let r = row; r < row + span; r += 1) {
      ensureRow(r);
      if (occupancy[r][col]) return false;
    }
    return true;
  };

  const place = (row, col, span) => {
    for (let r = row; r < row + span; r += 1) {
      ensureRow(r);
      occupancy[r][col] = true;
    }
  };

  const placeSingle = (id, span) => {
    let placed = false;
    let row = 0;
    while (!placed) {
      ensureRow(row);
      for (let col = 0; col < columns; col += 1) {
        if (canPlace(row, col, span)) {
          place(row, col, span);
          positions[id] = { row: row + 1, col: col + 1, span };
          placed = true;
          break;
        }
      }
      if (!placed) row += 1;
    }
  };

  for (let i = 0; i < ids.length; i += 1) {
    const id = ids[i];
    const span = spanFn(id);
    placeSingle(id, span);
  }

  return positions;
};
