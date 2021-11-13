import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const PostList = () => {
  return (
    <div className="card">
      <h3>First Post</h3>
      <ul>
        <CommentList />
      </ul>
      <CommentCreate />
    </div>
  );
};

export default PostList;
