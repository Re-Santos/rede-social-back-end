
import { Comment } from "./Comment";

export interface Post {
  id: string;
  creatorId: string;
  content: string;
  comments: Comment[];
  likes: number;
  dislikes: number;
  createdAt: string;
  updatedAt: string;
}
