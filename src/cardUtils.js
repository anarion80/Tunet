/**
 * Pure utility functions for card type detection and visibility logic.
 * These are extracted from App.jsx to reduce file size and improve testability.
 */

/**
 * Determine whether a card can be removed from a given page.
 */
export function isCardRemovable(cardId, pageId, { getCardSettingsKey, cardSettings }) {
  if (pageId === 'header') return cardId.startsWith('person.');
  if (pageId === 'settings') {
    if (['car'].includes(cardId)) return false;
    if (cardId.startsWith('media_player')) return false;
    return true;
  }
  const settingsKey = getCardSettingsKey(cardId, pageId);
  const typeSetting = cardSettings[settingsKey]?.type || cardSettings[cardId]?.type;
  if (typeSetting === 'entity' || typeSetting === 'toggle' || typeSetting === 'sensor') return true;
  if (cardId.startsWith('light_')) return true;
  if (cardId.startsWith('light.')) return true;
  if (cardId.startsWith('vacuum.')) return true;
  if (cardId === 'media_player') return true;
  if (cardId.startsWith('media_player.')) return true;
  if (cardId.startsWith('media_group_')) return true;
  if (cardId.startsWith('weather_temp_')) return true;
  if (cardId.startsWith('calendar_card_')) return true;
  if (cardId.startsWith('climate_card_')) return true;
  if (cardId.startsWith('cost_card_')) return true;
  if (cardId.startsWith('androidtv_card_')) return true;
  if (cardId.startsWith('car_card_')) return true;
  if (cardId.startsWith('nordpool_card_')) return true;
  if (cardId.startsWith('todo_card_')) return true;
  return false;
}

/**
 * Determine whether a card should be hidden in view mode based on entity availability.
 */
export function isCardHiddenByLogic(cardId, { activePage, getCardSettingsKey, cardSettings, entities }) {
  if (cardId === 'media_player') {
    return true;
  }

  if (cardId.startsWith('media_group_')) {
    const settingsKey = getCardSettingsKey(cardId);
    const groupSettings = cardSettings[settingsKey] || cardSettings[cardId] || {};
    const selectedIds = Array.isArray(groupSettings.mediaIds) ? groupSettings.mediaIds : [];
    const hasEntities = selectedIds.some(id => entities[id]);
    return !hasEntities;
  }

  if (activePage === 'settings' && !['car'].includes(cardId) && !cardId.startsWith('light_') && !cardId.startsWith('media_player')) {
      return !entities[cardId];
  }

  const isSpecialCard = cardId === 'car' || 
    cardId.startsWith('media_group_') || 
    cardId.startsWith('weather_temp_') || 
    cardId.startsWith('calendar_card_') || 
    cardId.startsWith('climate_card_') || 
    cardId.startsWith('cost_card_') || 
    cardId.startsWith('androidtv_card_') || 
    cardId.startsWith('car_card_') ||
    cardId.startsWith('nordpool_card_') ||
    cardId.startsWith('todo_card_');

  if (!isSpecialCard && !entities[cardId]) {
     if (cardId.startsWith('light_') || cardId.startsWith('light.')) return false;
     return true;
  }

  return false;
}

/**
 * Check if a page is a media/sonos page.
 */
export function isMediaPage(pageId, pageSettings) {
  if (!pageId) return false;
  const settings = pageSettings[pageId];
  return settings?.type === 'media' || settings?.type === 'sonos' || pageId.startsWith('media') || pageId.startsWith('sonos');
}
