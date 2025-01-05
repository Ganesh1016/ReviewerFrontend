import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

const recentReviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    initials: "SJ",
    image: "/placeholder.svg",
    date: "2 hours ago",
    rating: "4.5 ★",
    text: "Great service and friendly staff!",
  },
  {
    id: 2,
    name: "Michael Chen",
    initials: "MC",
    image: "/placeholder.svg",
    date: "5 hours ago",
    rating: "5.0 ★",
    text: "Excellent product quality, will definitely return!",
  },
  {
    id: 3,
    name: "Emma Wilson",
    initials: "EW",
    image: "/placeholder.svg",
    date: "1 day ago",
    rating: "4.0 ★",
    text: "Good experience overall, but delivery was a bit slow.",
  },
  // Add more reviews as needed
];

export function ReviewList() {
  return (
    <ScrollArea className="h-[400px] pr-4">
      <div className="space-y-4">
        {recentReviews.map((review) => (
          <div
            key={review.id}
            className="flex items-start space-x-4 rounded-lg border p-3 transition-colors hover:bg-muted/50"
          >
            <Avatar>
              <AvatarImage src={review.image} alt={review.name} />
              <AvatarFallback>{review.initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{review.name}</p>
                <span className="text-sm text-[#4562d9]">{review.rating}</span>
              </div>
              <p className="text-sm text-muted-foreground">{review.text}</p>
              <p className="text-xs text-muted-foreground">{review.date}</p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
