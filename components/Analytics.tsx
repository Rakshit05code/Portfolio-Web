'use client';

import { useEffect } from 'react';
import { analytics } from '@/lib/firebase';
import { logEvent } from 'firebase/analytics';

export default function Analytics() {
  useEffect(() => {
    const initAnalytics = async () => {
      const analyticsInstance = await analytics;
      if (analyticsInstance) {
        logEvent(analyticsInstance, 'page_view', {
          page_title: document.title,
          page_path: window.location.pathname,
        });
      }
    };

    initAnalytics();
  }, []);

  return null; // This component doesn't render anything
}
