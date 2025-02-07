import { observer } from "mobx-react-lite";
import { useStore } from "../../store/store";

export const Reviews = observer(() => {
  const store = useStore();
  const { getReviews } = store;
  return (
    <div>
      <h2>Rewiews</h2>
      <ul>
        {getReviews.length !== 0 ? (
          getReviews.map(({ id, description }) => (
            <li key={id}>
              <p>{description}</p>
            </li>
          ))
        ) : (
          <h2>Відгуків нема</h2>
        )}
      </ul>
    </div>
  );
});
