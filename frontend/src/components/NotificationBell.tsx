
import { Bell } from "lucide-react";
import { useNoticeStore } from "@/store/noticeStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import NoticeCard from "./NoticeCard";
import { useUIStore } from "@/store/uiStore";

const NotificationBell = () => {
  const { notices, unreadCount, markAsRead, currentNotice } = useNoticeStore();
  const { toggleNoticeModal } = useUIStore();
  const navigate = useNavigate();

  const handleViewAll = () => {
    navigate("/notices");
  };

  const handleNoticeClick = (id: string) => {
    toggleNoticeModal(true);
    navigate(`/notices/${id}`);
  };

  const recentNotices = notices
    .slice(0, 5)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-[10px]"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between p-4">
          <span className="font-medium">Notifications</span>
          {unreadCount > 0 && (
            <Badge variant="secondary">{unreadCount} unread</Badge>
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="max-h-80 overflow-auto p-2">
          {recentNotices.length > 0 ? (
            recentNotices.map((notice) => (
              <DropdownMenuItem key={notice._id} className="p-0 focus:bg-transparent">
                <div className="w-full p-1" onClick={() => handleNoticeClick(notice._id)}>
                  <NoticeCard notice={notice} isPreview={true} />
                </div>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="text-center p-4 text-sm text-muted-foreground">
              No notifications
            </div>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <div className="p-2">
          <Button variant="outline" className="w-full" onClick={handleViewAll}>
            View all notifications
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationBell;
