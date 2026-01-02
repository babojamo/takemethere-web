'use client';
import React, { useState, createContext, useRef, useEffect } from 'react';
import { LayoutState, ChildContainerProps, LayoutConfig, LayoutContextProps } from '@/types';
import { Toast, ToastMessage } from 'primereact/toast';
import { AxiosError } from 'axios';
import { RESPONSE_SERVICE_UNAVAILABLE } from '@/app/constants/messages';
export const LayoutContext = createContext({} as LayoutContextProps);

export const LayoutProvider = ({ children }: ChildContainerProps) => {
  const toastRef = useRef<Toast>(null);

  const show = (severity: ToastMessage['severity'], summary: string, detail: string) => {
    toastRef.current?.show({
      severity,
      summary,
      detail,
      life: 3000
    });
  };

  const showSuccess = (detail: string): void => {
    show('success', 'Success', detail);
  };

  const showWarning = (detail: string, summary: string = 'Warning'): void => {
    show('warn', summary, detail);
  };

  const showError = (detail: string): void => {
    show('error', 'Error', detail);
  };

  const showApiError = (error?: AxiosError, summary: string = 'Contact administrator') => {
    const data: any = error?.response?.data;
    if (error?.response?.status !== RESPONSE_SERVICE_UNAVAILABLE) {
      show('error', summary, data?.message ?? `${error}` ?? 'Something went wrong.');
    }
  };

  const [layoutConfig, setLayoutConfig] = useState<LayoutConfig>({
    ripple: false,
    inputStyle: 'outlined',
    menuMode: 'static',
    colorScheme: 'light',
    theme: 'lara-light-blue',
    scale: 14
  });

  const [layoutState, setLayoutState] = useState<LayoutState>({
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    profileSidebarVisible: false,
    configSidebarVisible: false,
    staticMenuMobileActive: false,
    menuHoverActive: false
  });

  const onMenuToggle = () => {
    if (isOverlay()) {
      setLayoutState((prevLayoutState) => ({ ...prevLayoutState, overlayMenuActive: !prevLayoutState.overlayMenuActive }));
    }

    if (isDesktop()) {
      setLayoutState((prevLayoutState) => ({ ...prevLayoutState, staticMenuDesktopInactive: !prevLayoutState.staticMenuDesktopInactive }));
    } else {
      setLayoutState((prevLayoutState) => ({ ...prevLayoutState, staticMenuMobileActive: !prevLayoutState.staticMenuMobileActive }));
    }
  };

  const onThemeToogle = () => {
    setLayoutConfig((prevLayoutConfig) => ({
      ...prevLayoutConfig,
      theme: prevLayoutConfig.theme === 'lara-light-blue' ? 'lara-dark-blue' : 'lara-light-blue'
    }));
  };

  const showProfileSidebar = () => {
    setLayoutState((prevLayoutState) => ({ ...prevLayoutState, profileSidebarVisible: !prevLayoutState.profileSidebarVisible }));
  };

  const isOverlay = () => {
    return layoutConfig.menuMode === 'overlay';
  };

  const isDesktop = () => {
    return window.innerWidth > 991;
  };

  const value: LayoutContextProps = {
    layoutConfig,
    setLayoutConfig,
    layoutState,
    setLayoutState,
    onMenuToggle,
    onThemeToogle,
    showProfileSidebar,
    showSuccess,
    showWarning,
    showError,
    showApiError
  };

  useEffect(() => {
    const themeLink = document.getElementById('theme-css') as HTMLLinkElement | null;
    if (themeLink) {
      themeLink.href = `/themes/${layoutConfig.theme}/theme.css`;
    }
  }, [layoutConfig.theme]);

  return (
    <LayoutContext.Provider value={value}>
      <Toast ref={toastRef} />

      {children}
    </LayoutContext.Provider>
  );
};
