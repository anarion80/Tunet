import { useState } from 'react';

/**
 * Custom hook to manage all modal states in the application
 * Centralizes modal state management to reduce clutter in main component
 * 
 * @returns {Object} Modal states and their setter functions
 */
export function useModals() {
  // Entity/card-specific modals
  const [showNordpoolModal, setShowNordpoolModal] = useState(null);
  const [showCostModal, setShowCostModal] = useState(null);
  const [activeClimateEntityModal, setActiveClimateEntityModal] = useState(null);
  const [showLightModal, setShowLightModal] = useState(null);
  const [activeCarModal, setActiveCarModal] = useState(null);
  const [showPersonModal, setShowPersonModal] = useState(null);
  const [showAndroidTVModal, setShowAndroidTVModal] = useState(null);
  const [showVacuumModal, setShowVacuumModal] = useState(false);
  const [showSensorInfoModal, setShowSensorInfoModal] = useState(null);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [showTodoModal, setShowTodoModal] = useState(null);
  const [showRoomModal, setShowRoomModal] = useState(null);
  const [showWeatherModal, setShowWeatherModal] = useState(null);

  // Media modal state
  const [activeMediaModal, setActiveMediaModal] = useState(null);
  const [activeMediaGroupKey, setActiveMediaGroupKey] = useState(null);
  const [activeMediaGroupIds, setActiveMediaGroupIds] = useState(null);
  const [activeMediaSessionSensorIds, setActiveMediaSessionSensorIds] = useState(null);
  const [activeMediaId, setActiveMediaId] = useState(null);

  // Configuration/management modals
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showAddPageModal, setShowAddPageModal] = useState(false);
  const [showHeaderEditModal, setShowHeaderEditModal] = useState(false);
  const [showEditCardModal, setShowEditCardModal] = useState(null);
  const [showStatusPillsConfig, setShowStatusPillsConfig] = useState(false);

  // Helper to check if any modal is open
  const hasOpenModal = () => {
    return !!(
      showNordpoolModal ||
      showCostModal ||
      activeClimateEntityModal ||
      showLightModal ||
      activeCarModal ||
      showAndroidTVModal ||
      showVacuumModal ||
      showAddCardModal ||
      showConfigModal ||
      showEditCardModal ||
      showSensorInfoModal ||
      activeMediaModal ||
      showStatusPillsConfig ||
      showPersonModal ||
      showCalendarModal ||
      showTodoModal ||
      showRoomModal ||
      showWeatherModal
    );
  };

  // Close all modals at once
  const closeAllModals = () => {
    setShowNordpoolModal(null);
    setShowCostModal(null);
    setActiveClimateEntityModal(null);
    setShowLightModal(null);
    setActiveCarModal(null);
    setShowPersonModal(null);
    setShowAndroidTVModal(null);
    setShowVacuumModal(false);
    setShowSensorInfoModal(null);
    setShowCalendarModal(false);
    setShowTodoModal(null);
    setShowRoomModal(null);
    setShowWeatherModal(null);
    setActiveMediaModal(null);
    setActiveMediaGroupKey(null);
    setActiveMediaGroupIds(null);
    setActiveMediaSessionSensorIds(null);
    setActiveMediaId(null);
    setShowAddCardModal(false);
    setShowConfigModal(false);
    setShowAddPageModal(false);
    setShowHeaderEditModal(false);
    setShowEditCardModal(null);
    setShowStatusPillsConfig(false);
  };

  return {
    // Entity modals
    showNordpoolModal,
    setShowNordpoolModal,
    showCostModal,
    setShowCostModal,
    activeClimateEntityModal,
    setActiveClimateEntityModal,
    showLightModal,
    setShowLightModal,
    activeCarModal,
    setActiveCarModal,
    showPersonModal,
    setShowPersonModal,
    showAndroidTVModal,
    setShowAndroidTVModal,
    showVacuumModal,
    setShowVacuumModal,
    showSensorInfoModal,
    setShowSensorInfoModal,
    showCalendarModal,
    setShowCalendarModal,
    showTodoModal,
    setShowTodoModal,
    showRoomModal,
    setShowRoomModal,
    showWeatherModal,
    setShowWeatherModal,

    // Media modals
    activeMediaModal,
    setActiveMediaModal,
    activeMediaGroupKey,
    setActiveMediaGroupKey,
    activeMediaGroupIds,
    setActiveMediaGroupIds,
    activeMediaSessionSensorIds,
    setActiveMediaSessionSensorIds,
    activeMediaId,
    setActiveMediaId,

    // Configuration modals
    showAddCardModal,
    setShowAddCardModal,
    showConfigModal,
    setShowConfigModal,
    showAddPageModal,
    setShowAddPageModal,
    showHeaderEditModal,
    setShowHeaderEditModal,
    showEditCardModal,
    setShowEditCardModal,
    showStatusPillsConfig,
    setShowStatusPillsConfig,

    // Helper functions
    hasOpenModal,
    closeAllModals,
  };
}
