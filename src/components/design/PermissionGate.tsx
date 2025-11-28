import { useEffect, useState, useRef } from "react";
import AudioPermission from "@/components/AudioPermission";
import { isNative } from "@/utils/platform";
import { logger } from "@/utils/logger";

interface PermissionGateProps {
	children: React.ReactNode;
}

const PermissionGate = ({ children }: PermissionGateProps) => {
	const [granted, setGranted] = useState(false);
	const [isChecking, setIsChecking] = useState(true);
	const grantedRef = useRef(false);
	
	useEffect(() => {
		// On native platforms, skip permission screen (Capacitor handles permissions)
		if (isNative()) {
			setGranted(true);
			setIsChecking(false);
			grantedRef.current = true;
			return;
		}
		
		// Web platform: Attempt to detect if speechSynthesis can speak without an explicit click.
		// If not, we will show the permission screen.
		if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
			// Check if voices are already loaded (indicates prior user interaction)
			const checkVoices = () => {
			const voices = window.speechSynthesis.getVoices();
			if (voices && voices.length > 0) {
					logger.debug('Voices already loaded, granting permission');
					grantedRef.current = true;
				setGranted(true);
					setIsChecking(false);
					return true;
				}
				return false;
			};
			
			// Immediate check
			if (checkVoices()) {
				return;
			}
			
			// Wait for voices to load with timeout
			let timeoutId: ReturnType<typeof setTimeout> | null = null;
			let voicesChangedHandler: (() => void) | null = null;
			
			const cleanup = () => {
				if (timeoutId !== null) {
					clearTimeout(timeoutId);
					timeoutId = null;
				}
				if (voicesChangedHandler !== null) {
					window.speechSynthesis.onvoiceschanged = null;
					voicesChangedHandler = null;
				}
			};
			
			// Set up listener for voices loading
			voicesChangedHandler = () => {
				if (checkVoices()) {
					cleanup();
				}
			};
			window.speechSynthesis.onvoiceschanged = voicesChangedHandler;
			
			// Timeout after 2 seconds - if voices haven't loaded, show permission screen
			timeoutId = setTimeout(() => {
				if (!grantedRef.current) {
					logger.debug('Voices not loaded after timeout, showing permission screen');
					setIsChecking(false);
					cleanup();
				}
			}, 2000);
			
			// Cleanup on unmount
			return () => {
				cleanup();
			};
		} else {
			// SpeechSynthesis not available, show permission screen anyway
			setIsChecking(false);
		}
	}, []); // Empty dependency array - only run once on mount

	// Show loading state while checking
	if (isChecking) {
		return null; // Or a loading spinner if preferred
	}

	if (!granted) {
		return <AudioPermission onGrantPermission={() => setGranted(true)} />;
	}

	return <>{children}</>;
};

export default PermissionGate;


