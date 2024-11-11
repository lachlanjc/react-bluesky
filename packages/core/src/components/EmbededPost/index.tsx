import { useMemo } from "react";
import type { PostType } from "../../api";
import type { PostComponents } from "../../types";
import { PostContainer } from "../PostContainer";
import { PostBody } from "./PostBody";
import { PostEmbed } from "./PostEmbed";
import { PostHeader } from "./PostHeader";
import { PostInfo } from "./PostInfo";

export type EmbededPost = {
  content: PostType;
  components?: Omit<PostComponents, "PostNotFound">;
};

export function EmbededPost({ content: postContent, components }: EmbededPost) {
  // useMemo does nothing for RSC but it helps when the component is used in the client (e.g by SWR)
  const content = useMemo(() => postContent, [postContent]);

  console.log(content);

  return (
    <PostContainer>
      <PostHeader content={content} components={components} />
      <PostBody content={content} />
      {content.embed && (
        <PostEmbed
          content={content.embed}
          link={`https://bsky.app/profile/${
            content.author.handle
          }/post/${content.uri.split("/").pop()}`}
        />
      )}
      <PostInfo content={content} />
    </PostContainer>
  );
}
