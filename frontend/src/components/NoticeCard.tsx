
import { formatDistanceToNow } from "date-fns";
import { Notice, useNoticeStore } from "@/store/noticeStore";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useUIStore } from "@/store/uiStore";

interface NoticeCardProps {
  notice: Notice;
  isPreview?: boolean;
}

const NoticeCard = ({ notice, isPreview = false }: NoticeCardProps) => {
  const navigate = useNavigate();
  const { toggleNoticeModal } = useUIStore();
  const { selectNotice } = useNoticeStore()

  const handleCardClick = () => {
    if (isPreview) return;
    toggleNoticeModal(true);
    // selectNotice(notice._id)
    navigate(`/notices/${notice._id}`);
  };

  const getPriorityColor = (priority: string = 'medium') => {
    switch (priority) {
      case 'high':
        return 'bg-destructive/10 text-destructive';
      case 'medium':
        return 'bg-amber-500/10 text-amber-700 dark:text-amber-400';
      case 'low':
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (error) {
      return "Recently";
    }
  };

  const truncateContent = (content: string = '', length = 80) => {
    if (content.length <= length) return content;
    return content.substring(0, length) + '...';
  };

  return (
    <Card 
      className={`overflow-hidden transition-all duration-200 hover:shadow-md ${
        !notice.isRead && !isPreview ? 'bg-primary/5 border-primary/20' : ''
      } ${isPreview ? 'cursor-default' : 'cursor-pointer'}`}
      onClick={handleCardClick}
    >
      <CardHeader className="pb-2 relative">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg pr-6">
            {notice.title}
          </CardTitle>
          {!notice.isRead && !isPreview && (
            <Badge variant="default" className="absolute top-3 right-3 h-2 w-2 p-0 rounded-full animate-pulse" />
          )}
        </div>
        <CardDescription className="flex items-center justify-between mt-1">
          <span className="text-xs">{notice.orgName}</span>
          <span className="text-xs">{formatDate(notice.createdAt)}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-sm text-muted-foreground">
          {truncateContent(notice.content, isPreview ? 40 : 120)}
        </p>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between items-center">
        <div className="flex flex-wrap gap-2">
          {notice.priority && (
            <Badge variant="outline" className={getPriorityColor(notice.priority)}>
              {notice.priority}
            </Badge>
          )}
          {notice.tags && notice.tags.length > 0 && !isPreview && (
            <Badge variant="outline" className="bg-secondary/10">
              {notice.tags[0]}
            </Badge>
          )}
        </div>
        {isPreview && (
          <Button 
            size="sm" 
            variant="outline"
            className="text-xs"
            onClick={() => toggleNoticeModal(true)}
          >
            View
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default NoticeCard;
