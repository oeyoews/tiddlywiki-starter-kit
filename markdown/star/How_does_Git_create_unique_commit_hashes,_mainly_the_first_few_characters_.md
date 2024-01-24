---
title: 'How_does_Git_create_unique_commit_hashes,_mainly_the_first_few_characters_'
tags: ['剪藏']
type: 'text/markdown'
created: 'Thu Nov 09 2023 02:49:35 GMT+0000 (GMT)'
creator: '太微搜藏'
modifier: '太微搜藏'
url: 'https://stackoverflow.com/questions/34764195/how-does-git-create-unique-commit-hashes-mainly-the-first-few-characters'
---

# How_does_Git_create_unique_commit_hashes,_mainly_the_first_few_characters_

Apr. 2017: Beware that after the all [shattered.io episode](https://stackoverflow.com/a/42450327/6309) (where a SHA1 collision was achieved by Google), the 20-byte format won’t be there forever.2017 年 4 月：请注意，在 All [shattered.io](http://shattered.io) 事件（Google 实现了 SHA1 冲突）之后，20 字节格式不会永远存在。

A first step for that is to replace `unsigned char sha1[20]` which is hard-code all over the Git codebase by a generic object whose definition might change in the future (SHA2?, [Blake2](https://en.wikipedia.org/wiki/BLAKE_(hash_function)), …) 第一步是用一个通用对象替换 `unsigned char sha1[20]` 整个 Git 代码库中的硬编码对象，该对象的定义将来可能会发生变化（SHA2？、Blake2 等）

See [commit e86ab2c](https://github.com/git/git/commit/e86ab2c1cd60ec4b9214e5cd8450a474fa175f5c) (21 Feb 2017) by [brian m. carlson (`bk2204`)](https://github.com/bk2204).请参阅 Brian M. Carlson（ ）提交 e86ab2c（ `bk2204` 2017 年 2 月 21 日）。

> Convert the remaining uses of `unsigned char [20]` to `struct object_id`.将 的 `unsigned char [20]` 剩余用法转换为 `struct object_id` 。

That is an example of an ongoing effort started with [commit 5f7817c](https://github.com/git/git/commit/5f7817c85d4b5f65626c8f49249a6c91292b8513) (13 Mar 2015) by [brian m. carlson (`bk2204`)](https://github.com/bk2204), for v2.5.0-rc0, in [`cache.h`](https://github.com/git/git/blob/b14f27f91770e0f99f64135348977a0ce1c7993a/cache.h#L65-L71):这是由 Brian M. Carlson（ `bk2204` ）为 v2.5.0-rc0 提交 5f7817c（2015 年 3 月 13 日）开始的持续努力的一个例子 `cache.h` ：

```
/* The length in bytes and in hex digits of an object name (SHA-1 value). */
#define GIT_SHA1_RAWSZ 20
#define GIT_SHA1_HEXSZ (2 * GIT_SHA1_RAWSZ)

struct object_id {
    unsigned char hash[GIT_SHA1_RAWSZ];
};
```

And don’t forget that, even with SHA1, the 4 first characters are no longer enough to guarantee uniqueness, as I explain in “[How much of a git sha is *generally* considered necessary to uniquely identify a change in a given codebase?](https://stackoverflow.com/a/21015031/6309)”.别忘了，即使使用 SHA1，前 4 个字符也不足以保证唯一性，正如我在“通常认为需要多少 git sha 来唯一标识给定代码库中的更改？

---

**Update Dec. 2017** with Git 2.16 (Q1 2018): this effort to support an alternative SHA is underway: see “[Why doesn’t Git use more modern SHA?](https://stackoverflow.com/a/47838703/6309)”.2017 年 12 月使用 Git 2.16 更新（2018 年第 1 季度）：支持替代 SHA 的工作正在进行中：请参阅“为什么 Git 不使用更现代的 SHA？

You will be able to use another hash: SHA1 is no longer the only one for Git.您将能够使用另一个哈希值：SHA1 不再是 Git 的唯一哈希值。

**Update 2018-2019**: the choice has been made in Git 2.19+: **[SHA-256](https://github.com/git/git/commit/0ed8d8da374f648764758f13038ca93af87ab800)**.2018-2019 更新：在 Git 2.19+ 中做出了选择：SHA-256。\

See “[**hash-function-transition**](https://github.com/git/git/blob/041f5ea1cf987a4068ef5f39ba0a09be85952064/Documentation/technical/hash-function-transition.txt)”.请参阅“hash-function-transition”。

This is not yet active (meaning git 2.21 is still using SHA1), but the code is being done to support in the future SHA-256.这还没有激活（这意味着 git 2.21 仍在使用 SHA1），但代码正在用于支持未来的 SHA-256。

---

With Git 2.26 (Q1 2020), the work goes on, and uses "struct `object_id"` for replacing use of "`char *sha1`"在 Git 2.26（2020 年第 1 季度）中，工作仍在继续，并使用“struct `object_id"` 来替换” ” `char *sha1`

See [commit 2fecc48](https://github.com/git/git/commit/2fecc48cade44529dff2594eadfb294643cdc24d), [commit 6ac9760](https://github.com/git/git/commit/6ac9760a30683a24e80a7aefe30e383046e810f0), [commit b99b6bc](https://github.com/git/git/commit/b99b6bcc57faf5c989fc18c3b8d4d92df3407cec), [commit 63f4a7f](https://github.com/git/git/commit/63f4a7fc0107ec240f48605a4d4f8e41b91caa41), [commit e31c710](https://github.com/git/git/commit/e31c71083abef5dbe4b4112a1a1a24a90ce587f3), [commit 500e4f2](https://github.com/git/git/commit/500e4f236606684467b0b34b86e319dfa40747c4), [commit f66d4e0](https://github.com/git/git/commit/f66d4e025059b734ba8da40ec059bb0fb8991306), [commit a93c141](https://github.com/git/git/commit/a93c141ddef25dc999fff73c590b42d3af606ff3), [commit 3f83fd5](https://github.com/git/git/commit/3f83fd5e44c1f038c8a7033cb77399e9ef4f43a9), [commit 0763671](https://github.com/git/git/commit/0763671b8e0b3ef873df13c741a911b809e6813d) (24 Feb 2020) by [Jeff King (`peff`)](https://github.com/peff).请参阅 Jeff King（ `peff` ）的 commit 2fecc48、commit 6ac9760、commit b99b6bc、commit 63f4a7f、commit e31c710、commit 500e4f2、commit f66d4e0、commit a93c141、commit 3f83fd5、commit 0763671（2020 年 2 月 24 日）。\

(Merged by [Junio C Hamano – `gitster` –](https://github.com/gitster) in [commit e8e7184](https://github.com/git/git/commit/e8e71848ea866d7dc34eacffc20b9c3826ae29a1), 05 Mar 2020)

> ## [`packfile`](https://github.com/git/git/commit/2fecc48cade44529dff2594eadfb294643cdc24d): drop `nth_packed_object_sha1()``packfile` ：落 `nth_packed_object_sha1()`
> 
> 
> Signed-off-by: Jeff King

> Once upon a time, `nth_packed_object_sha1()` was the primary way to get the oid of a packfile’s index position.曾几何时， `nth_packed_object_sha1()` 是获取 packfile 索引位置 oid 的主要方法。\
> 
> But these days we have the more type-safe `nth_packed_object_id()` wrapper, and all callers have been converted.但是现在我们有了类型更安全 `nth_packed_object_id()` 的包装器，并且所有调用者都已转换。

> Let’s drop the “`sha1`” version (turning the safer wrapper into a single function) so that nobody is tempted to introduce new callers.让我们去掉“ `sha1` ”版本（将更安全的包装器变成单个函数），这样就不会有人想引入新的调用者。

---

With Git 2.29 (Q4 2020), the “`sha1` to `oid`” rename continues…在 Git 2.29（2020 年第 4 季度）中，“ `sha1` 到 `oid` ”重命名仍在继续。

See [commit a46d1f7](https://github.com/git/git/commit/a46d1f732192a8621ead7ea5c4a3ca391ad881cb), [commit fb07bd4](https://github.com/git/git/commit/fb07bd42975bcbfbc29d4a3ef1bff1039a469336), [commit cfaf9f0](https://github.com/git/git/commit/cfaf9f05c6174b520082036c0f1439adf9c4fbf7), [commit ef2d554](https://github.com/git/git/commit/ef2d5547fa342197befd4be599438d7a7fa41e04), [commit 962dd7e](https://github.com/git/git/commit/962dd7ebc3e76afc2c896d377c319f8140966303), [commit 8f7e3de](https://github.com/git/git/commit/8f7e3de0970c419688f23f505b5cb7a9690d9b09), [commit b1f1ade](https://github.com/git/git/commit/b1f1ade87be595b5854c82850658c80465fdb16b) (27 Sep 2020) by [Martin Ågren (`none`)](https://github.com/none).参见 Martin Ågren（ ）的 commit a46d1f7，commit fb07bd4，commit cfaf9f0，commit ef2d554，commit 962dd7e，commit 8f7e3de，commit b1f1ade（ `none` 2020 年 9 月 27 日）。\

(Merged by [Junio C Hamano – `gitster` –](https://github.com/gitster) in [commit 07601b5](https://github.com/git/git/commit/07601b5b360264a74f94d74640999ea19cf61517), 05 Oct 2020)

> ## [`wt-status`](https://github.com/git/git/commit/b1f1ade87be595b5854c82850658c80465fdb16b): replace sha1 mentions with oid`wt-status` ：将 SHA1 提及替换为 OID
> 
> 
> Signed-off-by: Martin Ågren

> `abbrev_sha1_in_line()` uses a `struct `object_id` oid` and should be fully prepared to handle non-SHA1 object ids. Rename it to `abbrev_oid_in_line()`.`abbrev_sha1_in_line()` 使用 `struct `object_id `oid` ，并且应为处理非 SHA1 对象 ID 做好充分准备。将其重命名为 `abbrev_oid_in_line()` .
> 
> 
> A few comments in `wt_status_get_detached_from()` mention “sha1”. The variable they refer to was renamed in [e86ab2c1cd](https://github.com/git/git/commit/e86ab2c1cd60ec4b9214e5cd8450a474fa175f5c) ("wt-status: convert to struct `object_id",` 2017-02-21, Git v2.13.0-rc0). Update the comments to reference “`oid`” instead.提到“sha1”的 `wt_status_get_detached_from()` 几条评论。他们引用的变量在 e86ab2c1cd 中重命名（“wt-status：转换为结构 `object_id",` 2017-02-21，Git v2.13.0-rc0）。将注释更新为引用“ `oid` ”。
