<template>
  <div>
    <div v-for="link in links" :key="link.id" class="link-card">
      <h3>{{ link.name }}</h3>
      <p>{{ link.url }}</p>
      <button @click="editLink(link.id)">Edit</button>
      <button @click="deleteLink(link.id)">Delete</button>
    </div>
    <div class="form">
      <input v-model="form.name" placeholder="Link Name" />
      <input v-model="form.url" placeholder="Link URL" />
      <button @click="saveLink">Save</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: [],
      form: {
        id: null,
        name: '',
        url: ''
      }
    };
  },
  methods: {
    loadLinks() {
      // Suppose "fetchLinks" is a method to get links from a backend
      this.fetchLinks().then((links) => {
        this.links = links;
      });
    },
    fetchLinks() {
      // This should be replaced with an actual API call
      return Promise.resolve([
        { id: 1, name: 'Link 1', url: 'http://example.com' },
        { id: 2, name: 'Link 2', url: 'http://example.net' }
      ]);
    },
    saveLink() {
      if (this.form.id === null) {
        // Add new link logic here
        alert('Adding link...');
      } else {
        // Update existing link logic here
        alert('Updating link...');
      }
      // Reset form after save
      this.resetForm();
    },
    editLink(id) {
      const link = this.links.find((link) => link.id === id);
      this.form = { ...link }; // Copy the link data to the form
    },
    deleteLink(id) {
      // Delete link logic here
      alert('Deleting link...');
      this.loadLinks(); // Reload links to reflect changes
    },
    resetForm() {
      this.form = { id: null, name: '', url: '' };
    }
  },
  mounted() {
    this.loadLinks();
  }
};
</script>
