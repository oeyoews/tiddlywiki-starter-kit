```html 
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Index 18</title>
    <script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio"></script>
    <script>
      tailwind.config = { corePlugins: { preflight: true } };
    </script>
  </head>
  <body>
    <form class="fixed left-1/2 -translate-x-1/2 bottom-4 w-2/5 border rounded">
      <textarea
        row="1"
        type="text"
        overflow="hidden"
        placeholder="search"
        name="name"
        class="w-full border-none rounded resize-none bg-transparent focus:ring-0"
        style="overflow-y: hidden; height: 50px; max-height: 200px"
      ></textarea>
    </form>

    <form
      class="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl fixed top-1/2 left-1/2 -translate-x-1/2 w-2/5 -translate-y-1/2"
    >
      <div
        class="relative flex h-full flex-1 items-stretch md:flex-col"
        role="presentation"
      >
        <div
          class="flex flex-col w-full py-[10px] flex-grow md:py-4 md:pl-4 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded shadow-xs dark:shadow-xs"
        >
          <textarea
            id="prompt-textarea"
            tabindex="0"
            data-id="root"
            rows="1"
            placeholder="Send a message"
            class="m-0 w-full resize-none border-0 bg-transparent p-0 pr-10 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:pr-12 pl-3 md:pl-0"
            style="max-height: 200px; height: 30px; overflow-y: hidden"
          ></textarea>
        </div>
        <div>
          <div
            class="h-full flex ml-1 md:w-full md:m-auto md:mb-4 gap-0 md:gap-2 justify-center"
          >
            <div class="grow"></div>
          </div>
        </div>
      </div>
    </form>
  </body>
</html>
```