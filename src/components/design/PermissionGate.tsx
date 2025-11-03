import { useEffect, useState } from "react";
import AudioPermission from "@/components/AudioPermission";

interface PermissionGateProps {
	children: React.ReactNode;
}

const PermissionGate = ({ children }: PermissionGateProps) => {
	const [granted, setGranted] = useState(false);
	useEffect(() => {
		// Attempt to detect if speechSynthesis can speak without an explicit click.
		// If not, we will show the permission screen.
		if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
			// Heuristic: if already has voices loaded, assume prior interaction.
			const voices = window.speechSynthesis.getVoices();
			if (voices && voices.length > 0) {
				setGranted(true);
			}
		}
	}, []);

	if (!granted) {
		return <AudioPermission onGrantPermission={() => setGranted(true)} />;
	}

	return <>{children}</>;
};

export default PermissionGate;


