import { t } from "mobx-state-tree";

export const RatingModel = t.model("VideoList", {
  id: t.string,
  videoId: t.string,
  userChecked: t.maybeNull(t.union(t.literal(0), t.literal(1))),
  ratings: t.array(t.number),
});
