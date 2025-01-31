// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { axiosInstance } from "../lib/axios";
// import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Share2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import PostAction from "./PostAction";

const Post = ({ post }) => {
	// const { postId } = useParams();

	// const { data: authUser } = useQuery({ queryKey: ["authUser"] });
	// const isOwner = authUser?._id === post.author?._id;
	// const isLiked = post?.likes.includes(authUser?._id || 1);

	// const queryClient = useQueryClient();

	// const { mutate: deletePost, isPending: isDeletingPost } = useMutation({
	// 	mutationFn: async () => {
	// 		await axiosInstance.delete(`/posts/delete/${post?._id}`);
	// 	},
	// 	onSuccess: () => {
	// 		queryClient.invalidateQueries({ queryKey: ["posts"] });
	// 		toast.success("Post deleted successfully");
	// 	},
	// 	onError: (error) => {
	// 		toast.error(error.message);
	// 	},
	// });

	// const { mutate: likePost, isPending: isLikingPost } = useMutation({
	// 	mutationFn: async () => {
	// 		await axiosInstance.post(`/posts/${post._id}/like`);
	// 	},
	// 	onSuccess: () => {
	// 		queryClient.invalidateQueries({ queryKey: ["posts"] });
	// 		queryClient.invalidateQueries({ queryKey: ["post", postId] });
	// 	},
	// });

	// const handleDeletePost = () => {
	// 	if (!window.confirm("Are you sure you want to delete this post?")) return;
	// 	deletePost();
	// };

	// const handleLikePost = async () => {
	// 	if (isLikingPost) return;
	// 	likePost();
	// };

	return (
		<div className='bg-secondary rounded-lg shadow mb-4'>
			<div className='p-4'>
				<div className='flex items-center justify-between mb-4'>
					<div className='flex items-center'>
						<Link to={`/profile/${post?.author?.username}`}>
							<img
								src={post?.author?.profilePicture || "/avatar.png"}
								alt={post?.author?.name}
								className='size-10 rounded-full mr-3'
							/>
						</Link>

						<div>
							<Link to={`/profile/${post?.author?.username}`}>
								<h3 className='font-semibold'>{post?.author?.name}</h3>
							</Link>
							<p className='text-xs text-info'>{post?.author?.headline}</p>
							<p className='text-xs text-info'>
								{/* {formatDistanceToNow(new Date(post?.createdAt), { addSuffix: true })} */}
							</p>
						</div>
					</div>
					{/* {isOwner && (
						<button onClick={handleDeletePost} className='text-red-500 hover:text-red-700'>
							{isDeletingPost ? <Loader size={18} className='animate-spin' /> : <Trash2 size={18} />}
						</button>
					)} */}
				</div>
				<p className='mb-4'>{post?.content}</p>
				{post?.image && <img src={post?.image} alt='Post content' className='rounded-lg w-full mb-4' />}

				<div className='flex justify-between text-info'>
					{/* <PostAction
						icon={<ThumbsUp size={18} className={isLiked ? "text-blue-500  fill-blue-300" : ""} />}
						text={`Like (${post.likes.length})`}
						onClick={handleLikePost}
					/> */}
					<PostAction icon={<Share2 size={18} />} text='Compartilhar' />
				</div>
			</div>
		</div>
	);
};
export default Post;
