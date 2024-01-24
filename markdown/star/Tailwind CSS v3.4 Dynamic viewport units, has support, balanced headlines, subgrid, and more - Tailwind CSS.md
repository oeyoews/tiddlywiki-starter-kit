---
title: 'Tailwind CSS v3.4 Dynamic viewport units, has support, balanced headlines, subgrid, and more - Tailwind CSS'
tags: ['剪藏']
type: 'text/markdown'
created: 'Wed Dec 20 2023 08:08:32 GMT+0000 (GMT)'
creator: '太微搜藏'
modifier: '太微搜藏'
url: 'https://tailwindcss.com/blog/tailwindcss-v3-4'
---

# Tailwind CSS v3.4 Dynamic viewport units, has support, balanced headlines, subgrid, and more - Tailwind CSS

There’s nothing like building [a major new product](https://twitter.com/steveschoger/status/1732143245696639167) for finding all the features you wish you had in your own tools, so we capitalized on some of that inspiration and turned it into this — Tailwind CSS v3.4.

As always the improvements range from things you’ve been angry about for years, to supporting CSS features you’ve never even heard of and probably can’t even use at work.

* [**Dynamic viewport units:**](https://tailwindcss.com/blog/tailwindcss-v3-4#dynamic-viewport-units) Full-height elements that actually work on mobile.

* [**New `:has()` variant**:](https://tailwindcss.com/blog/tailwindcss-v3-4#new-has-variant) Style parent elements based on their children.

* [**Style children with the `*` variant**:](https://tailwindcss.com/blog/tailwindcss-v3-4#style-children-with-the-variant) We’ll probably regret giving you this one.

* [**New `size-*` utilities**:](https://tailwindcss.com/blog/tailwindcss-v3-4#new-size-utilities) Set width and height at the same time, finally.

* [**Balanced headlines with `text-wrap` utilities**:](https://tailwindcss.com/blog/tailwindcss-v3-4#balanced-headlines-with-text-wrap-utilities) No more max-width tweaking or responsive line breaks.

* [**Subgrid support**:](https://tailwindcss.com/blog/tailwindcss-v3-4#subgrid-support) That grid feature you struggle to understand, finally in Tailwind CSS.

* [**Extended min-width, max-width, and min-height scales**:](https://tailwindcss.com/blog/tailwindcss-v3-4#extended-min-width-max-width-and-min-height-scales) Now `min-w-12` is a real class.

* [**Extended opacity scale**:](https://tailwindcss.com/blog/tailwindcss-v3-4#extended-opacity-scale) For those moments when neither 60% or 70% were quite right.

* [**Extended `grid-rows-*` scale**:](https://tailwindcss.com/blog/tailwindcss-v3-4#extended-grid-rows-scale) Might as well make it match the column scale.

* [**New `forced-colors` variant**:](https://tailwindcss.com/blog/tailwindcss-v3-4#new-forced-colors-variant) Easily fine-tune your site for forced colors mode.

* [**New `forced-color-adjust` utilities**:](https://tailwindcss.com/blog/tailwindcss-v3-4#new-forced-color-adjust-utilities) For even more forced colors fine-tuning.

All the good stuff is in that list, but check out the [release notes](https://github.com/tailwindlabs/tailwindcss/releases/tag/v3.4.0) for a couple more details that weren’t exciting enough to earn a spot in this post.

Upgrade your projects by installing the latest version of `tailwindcss` from npm:

```
$ npm install tailwindcss@latest
```

Or try out all of the new features on [Tailwind Play](https://play.tailwindcss.com/), right in your browser.

---

## Dynamic viewport units

When the `vh` unit was added to browsers we all got so excited — finally a way to build full-height application layouts and stuff without drilling `height: 100%` through 17 layers of DOM! But mobile devices and their damn disappearing menu bars spoiled all the fun, effectively making the `vh` unit just a cruel reminder of a future that could’ve been so great.

Well we’ve got a new future now — `dvh`, `lvh`, and `svh` are designed to accommodate that disappearing browser chrome and Tailwind CSS v3.4 supports them out of the box:

Scroll up and down in the viewport to hide/show the browser UI

```
<div class="h-dvh">
  <!-- ... -->
</div>
```

We’ve added the following new classes by default:

| `h-svh`     | `height: 100svh`     |
|-------------|----------------------|
| `h-lvh`     | `height: 100lvh`     |
| `h-dvh`     | `height: 100dvh`     |
| `min-h-svh` | `min-height: 100svh` |
| `min-h-lvh` | `min-height: 100lvh` |
| `min-h-dvh` | `min-height: 100dvh` |
| `max-h-svh` | `max-height: 100svh` |
| `max-h-lvh` | `max-height: 100lvh` |
| `max-h-dvh` | `max-height: 100dvh` |

If you need other values, you can always use arbitrary values too like `min-h-[75dvh]`.

Browser support is [pretty great](https://caniuse.com/viewport-unit-variants) for these nowadays, so unless you need to support Safari 14 you can start using these right away.

---

## New `:has()` variant

The [`:has()` pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/:has) is the most powerful thing that’s been added to CSS since flexbox. For the first time ever, you can style an element based on its *children*, not just based on its parents. It even makes it possible to style based on subsequent siblings.

Here’s an example where the parent gets a colored ring if the radio button inside of it is checked:

```
<label class="has-[:checked]:ring-indigo-500 has-[:checked]:text-indigo-900 has-[:checked]:bg-indigo-50 ..">
  <svg fill="currentColor">
    <!-- ... -->
  </svg>
  Google Pay
  <input type="radio" class="accent-indigo-500 ..." />
</label>
```

I feel like I’ve found a new use-case for `:has()` every week while working on this new UI kit we’ve been building for the last few months, and it’s replaced a crazy amount of JavaScript in our code.

For example, our text inputs are pretty complicated design-wise and require a little wrapper element to build. Without `:has()`, we had no way of styling the wrapper based on things like the `:disabled` state of the input, but now we can:

This one is pretty bleeding edge but as of literally today it’s now supported in the latest version of all major browsers. Give it a few weeks for any Firefox users to install today’s update and we should be able to go wild with it.

---

## Style children with the `*` variant

Here’s one people have wanted for literally ever — a way to style children from the parent using utility classes.

We’ve added a new `*` variant that targets direct children, letting you do stuff like this:

```
<div>
  <h2>Categories:<h2>
  <ul class="*:rounded-full *:border *:border-sky-100 *:bg-sky-50 *:px-2 *:py-0.5 dark:text-sky-300 dark:*:border-sky-500/15 dark:*:bg-sky-500/10 ...">
    <li>Sales</li>
    <li>Marketing</li>
    <li>SEO</li>
    <!-- ... -->
  </ul>
</div>
```

Generally I’d recommend just styling the children directly, but this can be useful when you don’t control those elements or need to make a conditional tweak because of the context the element is used in.

It can be composed with other variants too, for instance `hover:*:underline` will style any child when the child is hovered.

Here’s a cool way we’re using that to conditionally add layout styles to different child elements in the new UI kit we’re working on:

See that crazy `data-[slot=description]:*:mt-4` class? It first targets all direct children (that’s the `*:` part), then filters them down to just items with a `data-slot="description"` attribute using `data-[slot=description]`.

This makes it easy to target only specific children, without having to drop all the way down to a raw arbitrary variant.

Looking forward to seeing all the horrible stuff everyone does to make me regret adding this feature.

---

## New `size-*` utilities

You’re sick of typing `h-5 w-5` every time you need to size an avatar, you know it and I know it.

In Tailwind CSS v3.4 we’ve finally added a new `size-*` utility that sets width and height at the same time:

We’ve wanted to add this forever but have always been hung up on the exact name — `size-*` felt like so much to type compared to `w-*` or `h-*` and `s-*` felt way too cryptic.

After using it for a few weeks though I can say decisively that even with the longer name, it’s way better than separate width and height utilities. Super convenient, especially if you’re combining it with variants or using a complex arbitrary value.

---

## Balanced headlines with `text-wrap` utilities

How much time have you spent fiddling with `max-width` or inserting responsive line breaks to try and make those little section headings wrap nicely on your landing pages? Well now you can spend zero time on it, because the browser can do it for you with `text-wrap: balance`:

```
<article>
  <h3 class="text-balance ...">Beloved Manhattan soup stand closes<h3>
  <p>New Yorkers are facing the winter chill...</p>
</article>
```

We’ve also added `text-pretty` which tries to avoid orphaned words at the end of paragraphs using `text-wrap: pretty`:

```
<article class="text-pretty ...">
  <h3>Beloved Manhattan soup stand closes<h3>
  <p>New Yorkers are facing the winter chill...</p>
</article>
```

The nice thing about these features is that even if someone visits your site with an older browser, they’ll just fallback to the regular wrapping behavior so it’s totally safe to start using these today.

---

## Subgrid support

Subgrid is a fairly recent CSS feature that lets an element sort of inherit the grid columns or rows from its parent, make it possible to place its child elements in the parent grid.

We’re using subgrid in the new UI kit we’re working on for example in [dropdown menus](https://twitter.com/adamwathan/status/1717576154008240615), so that if any item has an icon, all of the other items are indented to keep the text aligned:

When none of the items have an icon, the first column shrinks to 0px and the text is aligned all the way to left.

Check out the [MDN documentation on subgrid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Subgrid) for a full primer — it’s a bit of a tricky feature to wrap your head around at first, but once it clicks it’s a game-changer.

---

## Extended min-width, max-width, and min-height scales

We’ve finally extended the `min-width`, `max-width`, and `min-height` scales to include the full spacing scale, so classes like `min-w-12` are actually a real thing now:

We should’ve just done this for v3.0 but never really got around to it — I’m sorry and you’re welcome.

---

## Extended opacity scale

We’ve also extended the opacity scale to include every step of 5 out of the box:

Hopefully that means a few less arbitrary values in your markup. I’m coming for you next 2.5%.

---

## Extended `grid-rows-*` scale

We’ve also bumped the baked-in number of grid rows from 6 to 12 because why not:

Maybe we’ll get even crazier and bump it to 16 in the next release.

---

## New `forced-colors` variant

Ever heard of [forced colors mode](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors)? Your site probably looks pretty bad in it.

Well now you can’t blame us at least, because Tailwind CSS v3.4 includes a `forced-colors` variant for adjusting styles for forced colors mode:

It’s really useful for fine-tuning totally custom controls, especially combined with arbitrary values and a working knowledge of [CSS system colors](https://developer.mozilla.org/en-US/docs/Web/CSS/system-color).

---

## New `forced-color-adjust` utilities

We’ve also added new `forced-color-adjust-auto` and `forces-color-adjust-none` utilities to control how forced colors mode affects your design:

These should be used pretty sparingly, but they can be useful when it’s critical that something is rendered in a specific color no matter what, like choosing the color of something someone is buying in an online store.

To learn more about all this forced colors stuff, I recommend reading [“Forced colors explained: A practical guide”](https://polypane.app/blog/forced-colors-explained-a-practical-guide/) on the Polypane blog — by far the most useful post I’ve found on this topic.

---

If you’ve been paying close attention, you might be wondering about [Oxide](https://youtu.be/CLkxRnRQtDE?t=2146), the engine improvements we previewed at [Tailwind Connect](https://tailwindcss.com/blog/2023-07-18-tailwind-connect-2023-recap) this summer.

We’d originally slated those improvements for v3.4, but we have a few things still to iron out and so many of these other improvements had been piling up that we felt it made sense to get it all out the door instead of holding it back. The Oxide stuff is still coming, and will be the headlining improvement for the next Tailwind CSS release in the new year.

In the mean time, dig in to Tailwind CSS v3.4 by updating to the latest version with npm:

```
$ npm install tailwindcss@latest
```

With `:has()` and the new `*` variant, your HTML is about get more out of control than ever.
