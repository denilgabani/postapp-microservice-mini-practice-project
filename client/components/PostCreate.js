const PostCreate = () => {
  return (
    <div>
      <h3>Create Post</h3>
      <div className="flex-col">
        <label for="createpost">Title</label>
        <input type="text" id="createpost" />
        <button>Submit</button>
      </div>
    </div>
  );
};

export default PostCreate;
