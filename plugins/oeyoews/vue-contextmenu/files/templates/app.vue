<template>
	<el-dialog v-model="dialogVisible" title="标签" width="500" align-center destroy-on-close>
		<el-tag style="margin-left: 4px;" v-if="tags.length > 0" v-for="tag in tags" :key="tag" closable
			:disable-transitions="false" @close="handleClose(tag)"> {{ tag }} </el-tag>
		<el-input v-if="inputVisible" ref="InputRef" v-model="newTag" size="small" @keyup.enter="handleAddTag"
			@blur="handleAddTag" />
		<el-button v-else class="" size="small" @click="showInput"> + New Tag </el-button>
		<template #footer>
			<div class="dialog-footer">
				<el-button @click="dialogVisible = false">Cancel</el-button>
				<el-button type="primary" @click="handleConfirm">
					Confirm
				</el-button>
			</div>
		</template>
	</el-dialog>

</template>