/**
 * Centralized screen state types
 * Auto-managed: Add new screens here and they'll be available everywhere
 */
export type ScreenType = 
  | 'AUDIO_PERMISSION'
  | 'ONBOARDING'
  | 'HOME'
  | 'QUIZ_SELECTION'
  | 'QUIZ'
  | 'MENGENAL_SUKU_KATA'
  | 'RESULTS'
  | 'SETTINGS'
  | 'HISTORY'
  | 'INSTALL'
  | 'PRIVACY_POLICY'
  | 'ABOUT';

/**
 * Helper to check if a string is a valid screen type
 */
export function isValidScreenType(value: string): value is ScreenType {
  const validScreens: ScreenType[] = [
    'AUDIO_PERMISSION',
    'ONBOARDING',
    'HOME',
    'QUIZ_SELECTION',
    'QUIZ',
    'MENGENAL_SUKU_KATA',
    'RESULTS',
    'SETTINGS',
    'HISTORY',
    'INSTALL',
    'PRIVACY_POLICY',
    'ABOUT'
  ];
  return validScreens.includes(value as ScreenType);
}

