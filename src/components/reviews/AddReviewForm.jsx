import { useStore } from "../../store/store";

export const AddReview = () => {
  const store = useStore();
  const submit = (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;

    store.setReviews(comment);
    e.target.reset();
  };
  return (
    <form action="" onSubmit={submit} className="form-comment">
      <label htmlFor="">Comment</label>
      <textarea
        minLength={1}
        maxLength={300}
        required
        cols="30"
        rows="10"
        name="comment"
      ></textarea>
      <button type="submit">Add comment</button>
    </form>
  );
};
