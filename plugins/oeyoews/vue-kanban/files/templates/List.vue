<div
	class="m-2 flex flex-col overflow-y-hidden rounded-md transition-all duration-75 min-h-[500px] bg-[#f5f5ee] max-h-[calc(100vh-30px)]">
	<!-- title -->
	<div class="flex p-2 items-center gap-2 mx-3 mt-2">
		<el-badge :value="data.items.length" :type="tags[type]" :max='99' size="large">
			<el-tag disable-transitions effect="dark" :type="tags[type]" class="font-semibold" size="large">
				<div v-html="icons[type]" class="inline align-top"></div>
				{{upperedType}}
			</el-tag>
		</el-badge>
		<div class="ml-auto" v-if="isTODO">
			<!-- NOTE: emit 自定义事件不要和vue-draggable 冲突 add update remove -->
			<el-button type="success" @click="$emit('showDialog', type)" size='default' v-html="icons.plus"></el-button>
			<el-button type="primary" @click="$emit('kanbanFullscreen')" size='default' v-html="icons.fullscreen">
			</el-button>
		</div>
	</div>
	<!-- items -->
	<div class="relative mt-2">
		<!-- emptyTips -->
		<div class="absolute bottom-0 my-auto w-full" v-if="!data.items.length">
			<el-empty :description="emptyTips[type]"></el-empty>
		</div>
		<!-- :targetd="`.${type}`" -->
		<!-- draggable items -->
		<VueDraggable v-model="data.items" animation="150" ghostClass="kanban-ghost" group="kanban" :forceFallback
			@update="$emit('onUpdate', $event)" @add="$emit('onAdd', $event)" @remove="$emit('onRemove', $event)"
			class="flex flex-col grow min-h-[400px] max-h-[calc(100vh-100px)] mb-4 overflow-y-auto mx-4" :class="type">
			<div v-for="(item) in data.items" :key="`${type}-${item.id}`"
				class="relative rounded-md shadow-sm overflow-visible mb-2 shrink-0 flex-col cursor-move"
				:class="[ colorful ? colors[type] : 'bg-white' ]" @dblclick="$emit('editItem', item, type)"
				@contextmenu.prevent.stop="$emit('deleteItem', item, type)">
				<div class="pt-2 pb-3 rounded-sm px-3 ">
					<div class="pt-4 pb-6 line-clamp-2" v-html="item.name">
					</div>
				</div>
			</div>
		</VueDraggable>
	</div>
</div>