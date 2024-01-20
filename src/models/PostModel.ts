
export class PostModel {
  constructor(
    public id: string,
    public creator_id: string,
    public content: string,
    public comments: number,
    public likes: number,
    public dislikes: number,
    public created_at: string,
    public updated_at: string
  ) {}
}

