<template>
	<el-dialog v-model="dialogVisible" :title="t('tags')" width="500" destroy-on-close>
		<el-select v-model="tags" multiple filterable allow-create default-first-option :reserve-keyword="false"
			:placeholder="t('tags')" style="width: 100%">
			<template #label="{ label, value }">
				<div style="display: flex; align-items: center">
					<span v-html="tagIcon"></span>
					<span style="margin-left: 4px;">{{ value }}</span>
				</div>
			</template>
			<el-option v-for="item in allTags" :key="item" :label="item" :value="item" />
		</el-select>

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