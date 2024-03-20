module.exports = {
  name: 'Header',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  template: `
  <h2> {{ channel.title }}</h2>
  <table>
        <tr>
          <td>
            Updated
          </td>
          <td>
            {{ channel.update }}
          </td>
        </tr>
        <tr v-show="channel.link">
          <td>
            Link
          </td>
          <td>
            <a :href="channel.link" target="_blank">
              {{ channel.link }}
            </a>
          </td>
        </tr>
        <tr v-show="channel.description">
          <td>
            Description
          </td>
          <td>
            {{ channel.description }}
          </td>
        </tr>
      </table>`
};
