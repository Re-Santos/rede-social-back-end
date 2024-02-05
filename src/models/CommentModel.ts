export class CommentModel {
  constructor(
    public id: string,
    public user_id: string,
    public post_id: string,
    public content: string,
    public likes: number,
    public dislikes: number,
    public created_at: string,
    public updated_at: string
  ) {}
}


  