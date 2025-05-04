
import { useEffect, useState } from "react";
import { useNoticeStore } from "@/store/noticeStore";
import NoticeCard from "@/components/NoticeCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCheck, ChevronDown, RefreshCcw, Search, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Notices = () => {
  const { notices, fetchNotices, markAsRead, isLoadingNotices, unreadCount } = useNoticeStore();
  const [filteredNotices, setFilteredNotices] = useState(notices);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchNotices();
  }, [fetchNotices]);

  useEffect(() => {
    let result = [...notices];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        notice =>
          notice.title.toLowerCase().includes(term) ||
          notice.content.toLowerCase().includes(term) ||
          notice.orgName.toLowerCase().includes(term) ||
          (notice.tags && notice.tags.some(tag => tag.toLowerCase().includes(term)))
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      
      if (sortOrder === "newest") {
        return dateB - dateA;
      } else if (sortOrder === "oldest") {
        return dateA - dateB;
      } else if (sortOrder === "unread") {
        return a.isRead === b.isRead ? 0 : a.isRead ? 1 : -1;
      } else if (sortOrder === "priority") {
        const priorityMap = { high: 3, medium: 2, low: 1 };
        const priorityA = priorityMap[a.priority || "low"];
        const priorityB = priorityMap[b.priority || "low"];
        return priorityB - priorityA;
      }
      return 0;
    });

    setFilteredNotices(result);
  }, [notices, searchTerm, sortOrder]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchNotices();
    setIsRefreshing(false);
  };

  const handleMarkAllAsRead = async () => {
    if (unreadCount === 0) return;
    
    const unreadNotices = notices.filter(notice => !notice.isRead);
    const promises = []
    for (const notice of unreadNotices) {
      promises.push(markAsRead(notice._id))
    }
    await Promise.allSettled(promises)
    
    toast({
      title: "All notices marked as read",
      description: `${unreadCount} notices have been marked as read`,
    });
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const renderSkeletons = () => {
    return Array(6)
      .fill(0)
      .map((_, idx) => (
        <Card key={idx} className="p-6">
          <Skeleton className="h-6 w-2/3 mb-3" />
          <Skeleton className="h-4 w-1/3 mb-6" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </Card>
      ));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notices</h1>
          <p className="text-muted-foreground">
            View and manage all your notices
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="gap-2"
          >
            <RefreshCcw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleMarkAllAsRead}
            disabled={unreadCount === 0}
            className="gap-2"
          >
            <CheckCheck className="h-4 w-4" />
            Mark All Read
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search notices..."
            className="pl-10 pr-10"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground"
              onClick={clearSearch}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              Sort By
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuRadioGroup value={sortOrder} onValueChange={setSortOrder}>
              <DropdownMenuRadioItem value="newest">Newest First</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="oldest">Oldest First</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="unread">Unread First</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="priority">Priority</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {isLoadingNotices ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {renderSkeletons()}
        </div>
      ) : filteredNotices.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredNotices.map(notice => (
            <NoticeCard key={notice._id} notice={notice} />
          ))}
        </div>
      ) : (
        <Card className="p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">No notices found</h3>
          <p className="text-muted-foreground">
            {searchTerm
              ? "No notices match your search criteria"
              : "You don't have any notices yet"}
          </p>
        </Card>
      )}
    </div>
  );
};

export default Notices;
