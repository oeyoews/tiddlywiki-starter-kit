<div class="mr-2 flex flex-col overflow-y-hidden rounded-md transition-all duration-75 min-h-[50px] bg-[#f5f5ee] ">
	<!-- title -->
	<div class="flex p-2 items-center gap-2 mx-4">
		<el-tag effect="dark" :type="tags[type]" class="font-semibold">
			<div v-html="icons[type]" class="inline align-top"></div>
			{{upperedType}}
		</el-tag>
		<el-tag :type="tags[type]" class="aspect-square" size="default" effect="dark" round> {{data.length}} </el-tag>
		<div class="ml-auto">
			<!-- NOTE: emit 自定义事件不要和vue-draggable 冲突 add update remove -->
			<el-button type="plain" @click="$emit('show', type)" size='small' v-if="isTODO">add</el-button>
		</div>
	</div>
	<!-- devmode -->
	<div v-if="devMode"> {{data}} </div>
	<!-- items -->
	<VueDraggable v-model="data" animation="150" ghostClass="ghost" group="people" @update="$emit('onUpdate')"
		@add="$emit('onAdd')" :target="`.${type}`" @remove="$emit('onRemove')">
		<div class="flex flex-col py-2 grow relative min-h-[500px] max-h-[calc(100vh-50px)] mb-4 overflow-y-auto list1 mx-4"
			:class="type">
			<template v-if="data.length">
				<div v-for="(item) in data" :key="item.id"
					class="relative rounded-md shadow-sm overflow-visible mb-2 shrink-0 flex-col cursor-move"
					:class="[ colorful ? colors[type] : 'bg-white' ]" @dblclick="$emit('editItem', item, type)">
					<div class="pt-2 pb-3 rounded-sm px-3 ">
						<div class="py-4 line-clamp-2" v-html="item.name">
						</div>
					</div>
				</div>
			</template>
			<!-- TODO: 添加图片， 按钮 -->
			<div class="flex items-start justify-center my-auto" :class="type" v-else>
				<el-empty :description="emptyTips[type]"></el-empty>
			</div>
		</div>
	</VueDraggable>

</div>