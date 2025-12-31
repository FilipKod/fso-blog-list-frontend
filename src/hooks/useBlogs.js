import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { useNavigate } from "react-router";
import blogService from "../services/blogs";
import { NotificationActionsContext } from "../contexts/notificationContext";

function useBlogs() {
  const queryClient = useQueryClient();
  const context = useContext(NotificationActionsContext);
  const navigate = useNavigate();

  const query = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    // staleTime: 30 * 1000,
  });

  const createPostMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      context.setNotification("new post added", "ok", 5);
    },
    onError: (error) => {
      const message = error.response.data.error;
      context.setNotification(message, "error", 5);
    },
  });

  const likePostMutation = useMutation({
    mutationFn: (blog) => {
      const newLikedPost = {
        ...blog,
        likes: blog.likes + 1,
      };

      return blogService.update(newLikedPost);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onMutate: (newBlog) => {
      queryClient.cancelQueries({ queryKey: ["blogs"] });

      const prevBlogs = queryClient.getQueryData(["blogs"]);

      queryClient.setQueryData(["blogs"], (old) =>
        old.map((post) =>
          post.id === newBlog.id ? { ...post, likes: post.likes + 1 } : post
        )
      );

      return { prevBlogs };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: async (blog) => {
      // eslint-disable-next-line no-alert
      const confirmed = window.confirm(
        `Remove blog ${blog.title} by ${blog.author.name}`
      );

      if (confirmed) {
        await blogService.remove(blog.id);

        navigate("/");

        setTimeout(() => {
          context.setNotification(`post ${blog.title} removed`, "ok", 5);
        }, 100);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  const newCommentMutation = useMutation({
    mutationFn: async ({ postId, commentData }) => {
      const postWithNewComment = await blogService.createComment(
        postId,
        commentData
      );

      context.setNotification("new comment added", "ok", 5);

      return postWithNewComment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: (error) => {
      context.setNotification(error.response.data.error, "error", 5);
    },
  });

  return {
    data: query.data,
    createPostMutation,
    likePostMutation,
    deletePostMutation,
    newCommentMutation,
  };
}

export default useBlogs;
