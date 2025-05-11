import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import BottomNav from "./BottomNav";
import { useAuthStore } from "@/store/authStore";
import { useNoticeStore } from "@/store/noticeStore";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useUIStore } from "@/store/uiStore";
import NoticeDetail from "./NoticeDetail";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children?: React.ReactNode;
  requiresAuth?: boolean;
}

const Layout = ({ children, requiresAuth = false }: LayoutProps) => {
  const { isAuthenticated } = useAuthStore();
  const { initWebSocket, disconnectWebSocket, initEventSource, disconnectEventSource, currentNoticeId, selectNotice } = useNoticeStore();
  const { isNoticeModalOpen, toggleNoticeModal } = useUIStore();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    if (requiresAuth && !isAuthenticated) {
      navigate("/login");
    }
  }, [requiresAuth, isAuthenticated, navigate]);
  
  useEffect(() => {
    if (isAuthenticated) {
      // initWebSocket();
      initEventSource();
    }
    
    return () => {
      // disconnectWebSocket();
      disconnectEventSource();
    };
  }, [isAuthenticated, initEventSource, disconnectEventSource]);

  // Extract the notice ID from the URL path if we're on a notice detail page
  const noticeId = location.pathname.match(/\/notices\/(.+)/)?.[1];
  if (noticeId && noticeId !== currentNoticeId) {
    selectNotice(noticeId);
    toggleNoticeModal(true);
  }
  console.log('Current notice id', currentNoticeId)
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container py-6 pb-24 md:pb-6">
        {children || <Outlet />}
      </main>
      
      {isAuthenticated && <BottomNav />}
      
      <Dialog open={isNoticeModalOpen} onOpenChange={toggleNoticeModal}>
        <DialogContent className="sm:max-w-3xl">
          <NoticeDetail noticeId={currentNoticeId} onClose={() => toggleNoticeModal(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Layout;
