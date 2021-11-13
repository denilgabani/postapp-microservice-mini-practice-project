const CommentCreate = () => {
  return (
    <div className="flex-col">
      <label for="createcomment">Comments </label>
      <input type="text" id="createcomment" />
      <button>Submit</button>
    </div>
  );
};

export default CommentCreate;
