<div class="prose prose-indigo max-w-none prose-img:my-0 !dark:prose-invert prose-a:no-underline prose-h2:mt-4 prose-blockquote:not-italic">

<$image source={{{ [[][https://img.shields.io/badge/Version-]] [<currentTiddler>get[version]] [[-red?style=social]] +[join[]]}}} />
<$image source={{{ [[][https://img.shields.io/badge/Files-]] [<currentTiddler>plugintiddlers[]count[]] [[-red?style=social]] +[join[]]}}} />
<img src="https://img.shields.io/badge/Tailwindcss-3.2.7-38bdf8?style=social">
<img alt="GitHub file size in bytes" src="https://img.shields.io/github/size/oeyoews/neotw/plugins/oeyoews/tiddlywiki-tailwindcss/files/styles.min.css?style=social">

{{$:/plugins/oeyoews/tiddlywiki-tailwindcss/docs/index}}

<$transclude tiddler="$:/plugins/oeyoews/tiddlywiki-tailwindcss/docs/header" mode="inline"/>

## Use Tailwindcss On Tiddlywiki

> [online view](https://oeyoews.github.io/neotw)

### Just use tailwindcss

```wikitext
tags: $:/tags/RawMarkup
title: tailwindcss

<script src="https://cdn.tailwindcss.com"></script>

<script>
    tailwind.config = {
      corePlugins: {
         preflight: false,
      },
    }
</script>
```

* if you just want to use tailwindcss no tailwindcss plugin and components, this method is connvent, it just have 348kb

## Usage

> Just use tailwindcss as usual

## Links

- https://tailblocks.cc/

## NOTE

- tailwindcss use line-gradient need config on your config file
  > https://stackoverflow.com/questions/71120394/is-there-a-way-to-adjust-the-angle-of-the-linear-gradient-in-tailwind-css
- tailwindcss not support text-shadow officially, but you can custom it on your tailwindcss
- Since TiddlyWiki always wraps content in `<p>` tags, it can be difficult to accurately identify the actual `<p>` tags, making it impossible to use `prose-p:indent-8` for automatic paragraph indentation.
- Do not add custom classes by default to keep the CSS file small.
- Enable the `important` flag by default.
- Disable `preflight` and use only the `base` styles. https://tailwindcss.com/docs/preflight to compatible tiddlywiki, just use tailwindcss/base to support some css variables

## Extensions

- base tailwindcss to makr tag color manager
- make theme support theme and dark
- add div box
- switch primary color dynamic

## TODO

- [ ] Use a script to output all supported TailwindCSS classes.
- [ ] use @config commands
- [ ] Use the `theme` feature of TailwindCSS to support dynamic switching of the primary palette.
- [ ] Ensure that the Markdown and TiddlyWiki heading styles are consistent.
- [ ] Fix the hover style, which currently has some issues.
- [ ] Build a lightweight version of TiddlyWiki with only the necessary TailwindCSS styles (no documentation).
- [ ] Combine the Prose classes into a single file for easier packaging.
- [ ] Set up precode and hr elements to use appropriate styles (not the `code` element directly).
- [x] Support importing custom.styles.css
- [ ] To support TailwindUI, (purchase a license and include the necessary files in your project).
- [ ] (To support DaisyUI, install the package and configure it in your project)
- [ ] Configure your IDE for TailwindCSS using a plugin or extension.
- [ ] Overwrite TiddlyWiki's default palette with a TailwindCSS preset using the `theme.colors` object in your `tailwind.config.js` file.
  > https://www.freecodecamp.org/news/how-to-build-a-dark-mode-switcher-with-tailwind-css-and-flowbite/
- [ ] Watch for changes and automatically compile the CSS file using a task runner or module bundler.
- [ ] Add forms to your project using the `forms` plugin of TailwindCSS.
- [ ] Read the "Refactoring UI" book or watch the videos to improve your UI design skills.
- [ ] Use Prose to add a view template, possibly using cascading techniques. Note any bugs you encounter.
- [ ] Use ModernDev to support TailwindCSS in your project.

  - [ ] Use browser-sync or another tool to automatically refresh the browser when changes are made.
    <!-- * link style not work -->
    <!-- * prose conflict span code symbol, and code blog style have seem questions -->
    <!-- * user sorter -->
    <!-- > https://tailwindcss.com/blog/automatic-class-sorting-with-prettier -->

- https://tailwindcss.com/docs/installation/play-cdn
- https://tailwind.wyz.xyz/docs/installation
- https://www.youtube.com/watch?v=GEYkwfYytAM&list=RDCMUCOe-8z68tgw9ioqVvYM4ddQ&start_radio=1&rv=GEYkwfYytAM&t=15

</div>
