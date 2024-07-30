<div class="mr-2 flex flex-col overflow-y-hidden rounded-md transition-all duration-75 min-h-[50px] bg-[#f5f5ee]">
	<!-- title -->
	<div class="flex p-2 items-center gap-2 mx-4">
		<el-tag effect="dark" :type="tags[type]">
			<div v-html="icons[type]" class="inline align-top"></div>
			{{upperedType}}
		</el-tag>
		<el-tag :type="tags[type]" effect="plain" round> {{data.length}} </el-tag>
	</div>
	<!-- devmode -->
	<div v-if="devMode"> {{data}} </div>
	<!-- items -->
	<VueDraggable v-model="data" animation="150" ghostClass="ghost" group="people" @update="$emit('onUpdate')"
		@add="$emit('onAdd')" target=".list1" @remove="$emit('remove')">
		<div class="flex flex-col py-2 grow relative h-[500px] mb-4 overflow-y-auto list1 mx-4">
			<template v-if="data.length">
				<div v-for="({name, id}) in data" :key="id"
					class="relative rounded-md shadow-sm overflow-visible mb-2 shrink-0 flex-col bg-white  cursor-move">
					<div class="pt-2 pb-3 rounded-sm px-4 ">
						<div class="p-4">
							{{name}}
						</div>
					</div>
				</div>
			</template>
			<!-- TODO: 添加图片， 按钮 -->
			<div class="flex items-start justify-center my-auto list1" v-else>
				<el-empty :description="emptyTips[type]"></el-empty>
			</div>
		</div>
	</VueDraggable>

	<!-- <button class="flex py-2 w-full px-4 gap-4 h-10">添加</button> -->
</div>