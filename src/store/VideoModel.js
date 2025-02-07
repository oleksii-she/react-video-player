import { t } from "mobx-state-tree";

export const VideoModel = t.model("VideoList", {
  id: t.string,
  sources: t.array(
    t.model({
      src: t.string,
      type: t.optional(t.string, ""),
    })
  ),
  name: t.optional(t.string, ""),
  poster: t.optional(t.string, ""),
});
