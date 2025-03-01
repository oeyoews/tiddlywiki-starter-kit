<div class="comments-container">
	<div class="new-comment">
		<textarea @keyup.enter="handleAddComment" v-model="newComment" placeholder="写下你的评论..."
			class="w-full p-2 border rounded"></textarea>
		<div class="flex justify-end">
			<button @click="handleAddComment" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
				发表评论
			</button>
		</div>
	</div>

	<div class="comments-list mt-4">
		<div v-for="comment in comments" :key="comment.created" class="comment-item border-b py-4">
			<div class="flex justify-between items-start">
				<div class="comment-content">
					<div v-if="editingComment !== comment.created">
						{{ comment.text }}
					</div>
					<div v-else>
						<textarea v-model="editText" class="w-full p-2 border rounded"></textarea>
						<button @click="handleEditComment"
							class="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
							保存
						</button>
					</div>
				</div>
				<div class="comment-actions">
					<button v-if="editingComment !== comment.created" @click="startEditing(comment)"
						class="text-blue-500 hover:text-blue-700 mr-2">
						编辑
					</button>
					<button @click="handleDeleteComment(comment.created)" class="text-red-500 hover:text-red-700">
						删除
					</button>
				</div>
			</div>
			<div class="comment-meta text-sm text-gray-500 mt-2">
				{{ comment.author }} · {{getTime(comment.created)}}
			</div>
		</div>
	</div>
</div>