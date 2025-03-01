const { ref, onMounted } = window.Vue;

const pluginTitle = '$:/plugins/oeyoews/neotw-comments';
const getTemplate = require('../../neotw-vue3/getTemplate.js');

module.exports = {
  props: {
    tiddler: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const comments = ref([]);
    const newComment = ref('');
    const editingComment = ref(null);
    const editText = ref('');

    const {
      getComments,
      addComment,
      deleteComment,
      editComment,
      getTime,
    } = require('../lib.js');

    const loadComments = () => {
      comments.value = getComments(props.tiddler);
    };

    const handleAddComment = () => {
      if (!newComment.value.trim()) return;
      // TODO: author
      addComment(props.tiddler, 'oeyoews', newComment.value);
      newComment.value = '';
      loadComments();
    };

    const handleDeleteComment = (timestamp) => {
      deleteComment(props.tiddler, timestamp);
      loadComments();
    };

    const startEditing = (comment) => {
      editingComment.value = comment.created;
      editText.value = comment.text;
    };

    const handleEditComment = () => {
      if (!editText.value.trim()) return;
      editComment(props.tiddler, editingComment.value, editText.value);
      editingComment.value = null;
      loadComments();
    };

    onMounted(() => {
      loadComments();
    });

    return {
      comments,
      newComment,
      editingComment,
      editText,
      getTime,
      handleAddComment,
      handleDeleteComment,
      startEditing,
      handleEditComment,
    };
  },

  template: getTemplate(`${pluginTitle}/templates/commentList.vue`),
};
