---
title: '美丽的公主和它的27个React_自定义_Hook-腾讯云开发者社区-腾讯云'
tags: ['剪藏']
type: 'text/markdown'
created: 'Fri Dec 01 2023 14:54:11 GMT+0000 (GMT)'
creator: '太微搜藏'
modifier: '太微搜藏'
url: 'https://cloud.tencent.com/developer/article/2351473?areaId=106001'
---

# 美丽的公主和它的27个React_自定义_Hook-腾讯云开发者社区-腾讯云

> ❝希望是厄运的忠实的姐妹。——普希金 ❞

大家好，我是**「柒八九」**。

## **前言**

在上一篇[git 原理](https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzg3NjU2OTE1Mw%3D%3D%26mid%3D2247490000%26idx%3D1%26sn%3De6649234fb05559759610a7ce6ed4d74%26scene%3D21%23wechat_redirect&source=article&objectId=2351473)中我们在**「前置知识点」**中随口提到了`Hook`。其中，就有我们比较熟悉的`React Hook`。

![](https://developer.qcloudimg.com/http-save/yehe-9016259/e90fe07b25caa1fcb59f0a6de0333d89.png)

而针对`React Hook`而言，除了那些让人眼花缭乱的**「内置 hook」**。其实，它最大的魅力还是**「自定义 hook」**。

所以，今天我们就来讲几个，我们平时开发中可能会用到的`自定义hook`。（文章内容可能有些长，请大家耐心观看，也可以先收藏后享用哦 😊）

当然，其实业界已经有很好的开源库，功能也强大的很多。（例如：ahooks）。但是它有一些让人诟病的问题，首先，有些功能其实我们在开发中不经常使用，并且引入了第三方库，反而使我们项目变得**「臃肿」**;其次，在开发中，我有一个比较执拗的做法，也就是别人的永远都是别人的。**「只有自己真正懂了，才是自己的」**。所以，大部分的工具库，我都选择手搓。（当然，也还没到了**「固执己见」**的地步，有些合适的库还是会用的）

所以，今天这篇文章，就给大家罗列一些在开发中，可能会用到并且能帮助到大家的`自定义Hook`

好了，天不早了，干点正事哇。

![](https://developer.qcloudimg.com/http-save/yehe-9016259/cf7259e996ce26a4a69b872a73a1e5da.gif)

---

## **1. 前置知识点**

> ❝**「前置知识点」**，只是做一个概念的介绍，不会做深度解释。因为，这些概念在下面文章中会有出现，为了让行文更加的顺畅，所以将本该在文内的概念解释放到前面来。**「如果大家对这些概念熟悉，可以直接忽略」** 同时，由于阅读我文章的群体有很多，所以有些知识点可能**「我视之若珍宝，尔视只如草芥，弃之如敝履」**。以下知识点，请**「酌情使用」**。 ❞

### **React 内置 Hook**

以下是`React`提供的一些标准`内置Hooks`。你能相信，现在有`15`个之多，如果大家有需要，到时候也可以写一篇关于内置 hook 的文章。

如果想看更详细的解释可以移步官网

![](https://developer.qcloudimg.com/http-save/yehe-9016259/c01843d0a086b1983bb04867984bfd0f.png)

---

### **追根溯源**

在考虑使用`Hooks`之前，首先要考虑原生 JavaScript 函数。

> ❝在`JavaScript`编程语言中，函数是可重用的代码逻辑，用于执行重复的任务。函数是**「可组合的」**，这意味着你可以**「在另一个函数中调用一个函数并使用其输出」**。 ❞

在下图中，`someFunction()`函数组合（使用）了函数`a()`和`b()`。函数`b()`使用了函数`c()`。

![](https://developer.qcloudimg.com/http-save/yehe-9016259/c9eaad4d9bca7710d66d4de841311cad.png)

毫无疑问，`React`中的**「函数组件实际上就是普通的**`JavaScript`**函数」**！因此，**「如果函数具有组合性，React 组件也可以具有组合性」**。这意味着我们可以像下面的图像所示，**「将一个或多个组件组合（使用）到另一个组件中」**：

![](https://developer.qcloudimg.com/http-save/yehe-9016259/13c3e0f494b271b11c34bd148e34348f.png)

### **有状态组件 vs 无状态组件**

在`React`中，组件可以是有状态（`stateful`）或无状态（`stateless`）的。

* 一个有状态组件声明并管理本地状态。

* 一个无状态组件是一个纯函数，它没有本地状态和需要管理的副作用。

> ❝一个纯函数是一个**「没有副作用的函数」**。这意味着一个函数对于相同的输入始终返回相同的输出。 ❞

如果我们从函数组件中移除有状态和副作用逻辑，我们就得到了一个无状态组件。此外，有状态和副作用逻辑可以在应用程序的其他地方进行重复使用。因此，尽量将它们与组件隔离开来是有意义的。

![](https://developer.qcloudimg.com/http-save/yehe-9016259/15602a74f8fb298bf82b5ccff497adf9.png)

### **React Hooks 和 有状态逻辑**

通过`React Hooks`，我们可以将`状态逻辑`和`副作用`从函数组件中隔离出来。

> ❝`Hooks`是**「JavaScript 函数」**，通过将它们与组件隔离开来来**「管理状态行为和副作用」**。 ❞

因此，现在我们可以将所有`状态逻辑`隔离到 Hooks 中，并将它们用于组件中（因为 Hooks 本身也是函数，所以可以组合它们）。

![](https://developer.qcloudimg.com/http-save/yehe-9016259/8a0de162d6ba83b37bafa382c4c62c3e.png)

#### **状态逻辑**

它可以是任何需要在本地声明和管理状态变量的内容。

例如，用于获取数据并将数据管理在本地变量中的逻辑是有状态的。我们可能还希望在多个组件中重复使用获取数据的逻辑。

以前，`状态逻辑`只能在类组件中使用生命周期方法来实现。但是，有了`React Hooks`，开发人员现在可以在函数组件中直接利用状态和其他 React 功能。

`Hooks`提供了一种轻松地在多个组件之间重复使用有状态逻辑的方式，提高了代码的可重用性并减少了复杂性。它们使开发人员能够将复杂的组件拆分成更小、更易管理的部分，从而产生更清晰和更易维护的代码。

像`useState`和`useEffect`这样的`Hooks`允许开发人员轻松地管理组件状态并处理副作用。由于其简单性和灵活性，`React Hooks`已成为构建现代、高效和可扩展的`React`应用程序的必备工具。

---

## **3. React 自定义 Hook**

`React自定义Hooks`是**「可重复使用的函数」**，允许开发人员以可重复使用的方式抽象和封装复杂的逻辑，**「用于共享非可视逻辑的 Hooks 模式」**

> ❝自定义`Hook`是通过组合现有的`React Hooks`或其他自定义`Hooks`来创建的。 ❞

它们允许开发人员从组件中**「提取通用逻辑，并在应用程序的不同部分之间共享它」**。自定义`Hooks`遵循使用`use`前缀的命名约定，这允许它们利用`React`的`Hooks`规则的优势。

通过创建自定义`Hooks`，开发人员可以模块化和组织他们的代码，使其更易读、易维护和易测试。

这些`Hooks`可以封装任何类型的逻辑，如 API 调用、表单处理、状态管理，甚至是抽象外部库。

我们采用`Vite`构建一个`React-TS`版本的项目。（`yarn create vite my-vue-app --template react-ts`）

并且在`src`文件下，新增`hooks`文件夹，以存储下面我们定义的`自定义hook`。然后我们通过配置`alias`可以在组件中随意引入。即`import xx from @hooks/xxx`

前面我们讲过**「自定义 Hooks 是通过组合现有的 React Hooks 或其他自定义 Hooks 来创建的」**，所以下文中会有自定义 hook 的嵌套现象，大家在阅读的时候，需要甄别代码。（推荐大家还是自己弄一个小项目，自己实践一下）。

还有一点，由于篇幅所限，下面的`hook`不做过多的解读。我们用了`ts`，想必通过直接阅读代码，也能比较清晰的了解代码含义和限制。

### **3.1 useArray**

```
import { useState, Dispatch, SetStateAction } from "react";

export type ArrayReturnType<T> {
  array: T[];
  set: Dispatch<SetStateAction<T[]>>;
  push: (element: T) => void;
  filter: (callback: (value: T, index: number, array: T[]) => boolean) => void;
  update: (index: number, newElement: T) => void;
  remove: (index: number) => void;
  clear: () => void;
}

export default function useArray<T>(defaultValue: T[]): ArrayReturnType<T> {
  const [array, setArray] = useState<T[]>(defaultValue);

  function push(element: T) {
    setArray((a) => [...a, element]);
  }

  function filter(callback: (value: T, index: number, array: T[]) => boolean) {
    setArray((a) => a.filter(callback));
  }

  function update(index: number, newElement: T) {
    setArray((a) => [
      ...a.slice(0, index),
      newElement,
      ...a.slice(index + 1, a.length),
    ]);
  }

  function remove(index: number) {
    setArray((a) => [...a.slice(0, index), ...a.slice(index + 1, a.length)]);
  }

  function clear() {
    setArray([]);
  }

  return { array, set: setArray, push, filter, update, remove, clear };
}
```

`useArray`hook 利用`React`的`useState`hook 来初始化和管理数组状态。它返回一个带有以下函数的对象：

* `push(element)`: 将指定的元素添加到数组中。

* `filter(callback)`: 根据提供的回调函数对数组进行筛选，删除不满足条件的元素。

* `update(index, newElement)`: 用`newElement`替换指定索引处的元素。

* `remove(index)`: 从数组中移除指定索引处的元素。

* `clear()`: 清空数组，将其设置为空数组。

使用`useArray`钩子，我们可以轻松地向数组中添加、更新、移除、筛选和清除元素，而无需处理复杂的逻辑。

```
import React from "react";
import useArray, { ArrayReturnType } from "@hooks/useArray";

// 在组件中使用（这里的使用方式不在赘述）
 const { array, set, push, remove, filter, update, clear }: ArrayReturnType<number> = useArray([
    1, 2, 3, 4, 5, 6,
  ]); 
// 在组件中定义回掉函数，处理相关逻辑
```

---

### **3.2 useAsync**

```
import { useCallback, useEffect, useState } from "react";

export type AsyncReturn<T> = {
  loading: boolean;
  error?: Error | null;
  value?: T;
};

export default function useAsync<T>(
  callback: () => Promise<T>,
  dependencies: unknown[] = []
): AsyncReturn<T> {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();
  const [value, setValue] = useState<T | undefined>();

  const callbackMemoized = useCallback(() => {
    setLoading(true);
    setError(undefined);
    setValue(undefined);
    callback()
      .then((result) => setValue(result))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [...dependencies]);

  useEffect(() => {
    callbackMemoized();
  }, [callbackMemoized]);

  return { loading, error, value };
}
```

`useAsync钩子`接受一个**「执行异步操作的回调函数」**以及一个可选的依赖数组。它返回一个带有三个属性的对象：

1. `loading`属性指示操作是否正在进行中

1. `error`属性保存在过程中遇到的任何错误消息

1. `value`属性包含异步操作的解析值

`useAsync`使用`useCallback`来**「记忆回调函数」**。这确保**「只有在依赖项发生变化时才会重新创建回调，防止不必要的重新渲染，并优化性能」**。此外，该钩子使用`useState`和`useEffect`钩子来管理加载状态，并在必要时调用记忆化的回调函数。

#### **使用场景**

无论我们是从 API 获取数据、执行计算还是处理表单提交，这个自定义钩子都简化了在`React`组件中**「管理异步操作」**。

```
import React from "react";
import useAsync, { AsyncReturn } from "@hooks/useAsync";

export default function AsyncComponent() {
  const { loading, error, value }: AsyncReturn<string> = useAsync(() => {
    return new Promise<string>((resolve, reject) => {
      // 这里可以替换成正式场景
      const success = false;
      setTimeout(() => {
        success ? resolve("成功了") : reject("失败了");
      }, 1000);
    });
  });

  return (
    <div>
      <div>Loading: {loading.toString()}</div>
      <div>{error}</div>
      <div>{value}</div>
    </div>
  );
}
```

---

### **3.3 useEventListener**

```
import { RefObject, useEffect, useRef } from "react";

type EventCallback = (e: Event) => void;

export default function useEventListener(
  eventType: string,
  callback: EventCallback,
  element: RefObject<HTMLElement> | EventTarget | null = window
) {
  const callbackRef = useRef<EventCallback | null>(null);
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (element == null) return;
    if (
      !(element instanceof EventTarget) &&
      (element as RefObject<HTMLElement>).current == null
    )
      return;
    const handler = (e: Event) => {
      if (callbackRef.current) {
        callbackRef.current(e);
      }
    };
    if ((element as RefObject<HTMLElement>).current) {
      (element as RefObject<HTMLElement>).current?.addEventListener(
        eventType,
        handler
      );
    } else {
      (element as EventTarget).addEventListener(eventType, handler);
    }

    return () => {
      if ((element as RefObject<HTMLElement>).current) {
        (element as RefObject<HTMLElement>).current?.removeEventListener(
          eventType,
          handler
        );
      } else {
        (element as EventTarget).removeEventListener(eventType, handler);
      }
    };
  }, [eventType, element]);
}
```

使用`useEventListener`我们可以指定`事件类型`、`回调函数`，甚至要附加`事件侦听器的元素`(可以是`ref`也可以是`dom`)。这允许我们根据特定需求定制事件处理，提高了代码的可重用性。

该钩子还利用`useRef钩子`来**「维护对回调函数的稳定引用」**。这确保了在组件的生命周期中即使回调函数发生变化，也**「使用最新版本的回调」**。这种动态行为使我们能够精确处理事件并响应应用程序状态的变化。

#### **使用场景**

`useEventListener钩子`可以在各种情况下使用。无论我们需要捕获`键盘事件`、`监听滚动事件`或与`用户输入交互`，这个钩子都可以胜任。

```
import { useState } from "react";
import useEventListener from "@hooks/useEventListener";
export default function EventListenerComponent() {
  const [key, setKey] = useState<string>("");
  useEventListener("keydown", (e: Event) => {
    if (e instanceof KeyboardEvent) {
      setKey(e.key);
    }
  });
  return <div> {key} </div>;
}
```

上面示例中，`useEventListener`利用这个钩子来跟踪用户按下的最后一个键。

---

### **3.4 useClickOutside**

```
// 复用了上面的useEventListener钩子
import useEventListener from "@hooks/useEventListener";
import React from "react";

export default function useClickOutside(
  ref: React.RefObject<HTMLElement>,
  cb: (e: MouseEvent) => void,
  triggerRef?: React.RefObject<HTMLElement>
) {
  useEventListener(
    "click",
    (e) => {
      if (
        ref.current == null ||
        ref.current.contains(e.target as Node) ||
        triggerRef.current?.contains(e.target as Node)
      )
        return;
      cb(e as unknown as MouseEvent);
    },
    document
  );
}
```

`useClickOutside钩子`简化了检测**「点击事件是否发生在指定组件之外的过程」**。通过利用`useEventListener钩子`，它**「在**`document级别`**监听点击事件」**，允许我们在发生在提供的组件引用之外的点击时触发回调函数。

只需将钩子导入到我们的组件中，并传递**「所需组件的引用」**和**「回调函数」**，还有一个可选项-`triggerRef`。

#### **使用场景**

`useClickOutside`的潜在应用场景是无限的。在实现`唤起弹窗`、`下拉菜单`或任何在用户与其之外的任何元素交互时应该关闭的元素时，它特别有用。

下面示例中，我们特意将`button`放置在`Modal`之外，想必这也符合大家平时开发的模式。（所以，我们单独处理`button`的点击，也就是需要有一个`triggerRef`）。其实，我们完全可以将`button`放置在`modal`内部，做一个**「主动唤起」**的处理。（这在之前的文章中有介绍过，这里就不做展示了）

```
import { useRef, useState } from "react";
import useClickOutside from "@hooks/useClickOutside";

export default function ClickOutsideComponent() {
  const [open, setOpen] = useState<boolean>(false);
  const modalRef: React.RefObject<HTMLDivElement> = useRef(null);
  const triggerRef: React.RefObject<HTMLButtonElement> = useRef(null);
  
  useClickOutside(
    modalRef,
    () => {
      if (open) setOpen(false);
    },
    triggerRef
  );

  return (
    <>
      <button onClick={() => setOpen(true)} ref={triggerRef}>
        打开弹窗
      </button>
      <div
        ref={modalRef}
        style={{
          display: open ? "block" : "none",
          backgroundColor: "blue",
          color: "white",
          width: "100px",
          height: "100px",
          position: "absolute",
          top: "calc(50% - 50px)",
          left: "calc(50% - 50px)",
        }}
      >
        <span>我是一个萌萌哒的弹窗</span>
      </div>
    </>
  );
}
```

上面的情况，利用该钩子来切换弹窗的可见性。

* 点击`button`时候，弹窗开启，将`open`状态设置为`true`

* 当用户在弹窗外点击 (排除`button`) 时，提供的回调函数将`open`状态设置为`false`，关闭窗口。

---

### **3.5 useCookie**

```
import { useState, useCallback } from "react";
import Cookies from "js-cookie";

type CookieHookReturn<T> = [
  T | null,
  (newValue: T, options?: Cookies.CookieAttributes) => void,
  () => void
];

export default function useCookie<T>(
  name: string,
  defaultValue: T
): CookieHookReturn<T> {
  const [value, setValue] = useState<T | null>(() => {
    const cookie = Cookies.get(name);
    if (cookie) return JSON.parse(JSON.stringify(cookie));
    Cookies.set(name, JSON.stringify(defaultValue));
    return defaultValue;
  });

  const updateCookie = useCallback(
    (newValue: T, options?: Cookies.CookieAttributes) => {
      Cookies.set(name, JSON.stringify(newValue), options);
      setValue(newValue);
    },
    [name]
  );

  const deleteCookie = useCallback(() => {
    Cookies.remove(name);
    setValue(null);
  }, [name]);

  return [value, updateCookie, deleteCookie];
}
```

在初始化时，`useCookie`会检索具有指定名称的`Cookie`值。

* 如果`Cookie`存在，它将返回其值；

* 否则，它将`Cookie`设置为提供的默认值。

这个自定义钩子的一个主要优点是能够更新`Cookie`值。由`useCookie`返回的`updateCookie`函数允许我们修改`Cookie`的值。通过使用新值和**「可选的选项」**（如过期时间或路径）调用此函数，我们可以立即更新`Cookie`。此外，该钩子方便地更新状态，使我们的应用程序**「与修改后的 Cookie 保持同步」**。

在需要删除`Cookie`的情况下，`deleteCookie`函数就派上用场了。只需调用此函数，它将从浏览器中删除指定的`Cookie`。该钩子会负责更新状态，确保我们的应用程序反映了`Cookie`的删除。

#### **使用场景**

`useCookie`可以在各种情境中使用。在处理`用户信息`、`身份验证令牌`或需要`跨不同会话保持的数据`时，它特别有用。

```
import useCookie from "@hooks/useCookie"

export default function CookieComponent() {
  const [value, update, remove] = useCookie<string>("name", "前端柒八九");

  return (
    <>
      <div>{value}</div>
      <button onClick={() => update("789")}>修改cookie</button>
      <button onClick={remove}>移除cookie</button>
    </>
  );
}
```

---

### **3.6 useCopyToClipboard**

```
import { useState } from "react";
import copy from "copy-to-clipboard";

interface Options {
  debug?: boolean;
  message?: string;
  format?: string;
  onCopy?: (clipboardData: object) => void;
}

type CopyToClipboardHookReturn = [
  (text: string, options?: Options) => void,
  { value: string | null; success: boolean | null }
];

export default function useCopyToClipboard(): CopyToClipboardHookReturn {
  const [value, setValue] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);

  const copyToClipboard = (text: string, options?: Options) => {
    const result = copy(text, options);
    if (result) setValue(text);
    setSuccess(result);
  };

  return [copyToClipboard, { value, success }];
}
```

在`React`中**「文本复制」**是一个常见并且繁琐的事情。五星上将，`麦克阿瑟`说，我们需要一个自定义 hook - `useCopyToClipboard`来简化这个过程。

`useCopyToClipboard`钩子利用了`React`的`useState钩子`，以及`copy-to-clipboard`库，以实现其功能。通过调用这个自定义钩子，我们可以获得两个关键功能：`copyToClipboard`和相应的`状态变量`。

`copyToClipboard`函数接受两个参数：要复制的文本和可选的配置选项。

* 当复制成功时，提供的文本将被设置为当前值，成功状态将设置为`true`。

* 相反，如果复制失败，成功状态将保持为`false`。

#### **使用场景**

`useCopyToClipboard钩子`可以在各种情境中使用。它在需要复制文本，如 URL、可分享内容或用户生成的数据的情况下特别有用。

```
import useCopyToClipboard from "@hooks/useCopyToClipboard";
import { useRef } from "react";

export default function CopyToClipboardComponent() {
  const [copyToClipboard, { success, value }] = useCopyToClipboard();
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <button onClick={() => copyToClipboard(String(inputRef.current?.value))}>
        {success ? "复制过了" : "未复制"}
      </button>
      <input type="text" ref={inputRef} />
      复制的值-{value}
    </>
  );
}
```

---

### **3.7 useStorage**

```
import { useCallback, useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, defaultValue: T | (() => T)) {
  return useStorage(key, defaultValue, window.localStorage);
}

export function useSessionStorage<T>(key: string, defaultValue: T | (() => T)) {
  return useStorage(key, defaultValue, window.sessionStorage);
}

function useStorage<T>(
  key: string,
  defaultValue: T | (() => T),
  storageObject: Storage
): [T, React.Dispatch<React.SetStateAction<T>>, () => void] {
  const [value, setValue] = useState<T>(() => {
    const value = storageObject.getItem(key);
    if (value != null) return JSON.parse(value);
    if (typeof defaultValue === "function") {
      const value = (defaultValue as () => T)();
      return value;
    } else {
      return JSON.parse(JSON.stringify(defaultValue));
    }
  });
  useEffect(() => {
    if (value === undefined) return storageObject.removeItem(key);
    storageObject.setItem(key, JSON.stringify(value));
  }, [key, value, storageObject]);

  const remove = useCallback(() => {
    setValue(undefined as unknown as T);
  }, []);

  return [value, setValue, remove];
}
```

`useStorage钩子`提供两个便捷的功能：`useLocalStorage`和`useSessionStorage`。

* `useLocalStorage`，我们可以轻松地在浏览器的本地存储中存储和检索数据，

* `useSessionStorage`则提供了相同的功能，但是使用`会话存储`。

我们可以使用它来**「存储任何类型的数据」**，如字符串、数字，甚至复杂对象。此外，`useStorage`为我们处理数据的序列化和反序列化，因此我们不必担心将值转换为`JSON`格式或从`JSON`格式还原。

另一个优点是存储数据与组件状态之间的自动同步。每当存储的数据发生更改时，该钩子会相应地更新组件的状态。同样，当组件的状态发生更改时，该钩子会自动将新值持久化到存储中。这种双向同步确保我们的应用程序始终反映最新的数据，使其非常适合需要实时更新的场景。

`useStorage钩子`还提供了一个`remove`函数，允许我们在不再需要存储的值时轻松删除它们。在实现注销按钮或清除特定用户数据等功能时，此功能非常有用。

#### **使用场景**

我们可以在各种场景中使用`useStorage钩子`。例如，假设我们有一个设置面板，用户可以在其中自定义其偏好设置。通过使用`useLocalStorage`，我们可以轻松存储和检索这些设置，确保它们在重新加载页面时保持不变，甚至在用户关闭并重新打开浏览器时也是如此。

```
import { useSessionStorage, useLocalStorage } from "@hooks/useStorage";

export default function StorageComponent() {
  const [info, setInfo, removeInfo] = useSessionStorage<{ name: string }>(
    "info",
    {
      name: "front789",
    }
  );
  const [age, setAge, removeAge] = useLocalStorage<number>("age", 26);

  return (
    <div>
      <div>
        {info?.name} -{age}
      </div>
      <button onClick={() => setInfo({ name: "范美丽" })}>修改名称</button>
      <button onClick={() => setAge(18)}>修改年龄</button>
      <button onClick={removeInfo}>删除名称</button>
      <button onClick={removeAge}>删除年龄</button>
    </div>
  );
}
```

---

### **3.8 useMediaQuery**

```
import { useState, useEffect } from "react";
import useEventListener from "@hooks/useEventListener";

export default function useMediaQuery(mediaQuery: string)
: boolean {
  const [isMatch, setIsMatch] = useState<boolean>(false);
  const [mediaQueryList, setMediaQueryList] = 
        useState<MediaQueryList | null>(
          null
        );

  useEffect(() => {
    const list = window.matchMedia(mediaQuery);
    setMediaQueryList(list);
    setIsMatch(list.matches);
  }, [mediaQuery]);

  useEventListener(
    "change",
    (e) => setIsMatch((e as MediaQueryListEvent).matches),
    mediaQueryList
  );

  return isMatch;
}
```

`useMediaQuery钩子`允许我们根据给定的媒体查询**「动态更新用户界面」**。只需将所需的媒体查询作为参数传递，该钩子将返回一个`布尔值`，指示媒体查询是否与当前视口大小匹配。

使用该自定义钩子可以轻松地在整个应用程序中`实现响应式行为`。无论我们需要有条件地渲染组件、应用特定的样式，还是根据屏幕大小触发不同的功能，`useMediaQuery`都能满足我们的需求。

#### **使用场景**

这个钩子不仅限于特定的用例，它可以在各种场景中使用。例如，我们可以使用它动态调整导航菜单的布局，根据屏幕大小隐藏或显示某些元素，甚至可以根据可用空间优化数据的加载。`useMediaQuery钩子`赋予我们**「在不同设备和屏幕尺寸上提供提高用户体验的能力」**。

```
import useMediaQuery from "@hooks/useMediaQuery"

export default function MediaQueryComponent() {
    // 传人媒体查询条件
    const isLarge = useMediaQuery("(min-width: 200px)")
    return <div>视口超过查询条件了: {isLarge.toString()}</div>
}
```

---

### **3.9 useDarkMode**

```
import { useEffect } from "react";
import useMediaQuery from "@hooks/useMediaQuery";
import { useLocalStorage } from "@hooks/useStorage";

type UseDarkModeReturn = [boolean, (value: boolean) => void];

export default function useDarkMode(): UseDarkModeReturn {
  const [darkMode, setDarkMode] = useLocalStorage("useDarkMode", false);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const enabled = darkMode ?? prefersDarkMode;

  useEffect(() => {
    document.body.classList.toggle("dark-mode", enabled);
  }, [enabled]);

  const toggleDarkMode = (value: boolean) => {
    setDarkMode(value);
  };

  return [enabled, toggleDarkMode];
}
```

这个自定义钩子结合了另外两个方便的钩子`useMediaQuery`和`useStorage`，以提供一个快速切换应用**「深色模式」**的功能。它自动检测用户的首选颜色方案，并将深色模式状态保留在浏览器的本地存储中。

`useDarkMode钩子`在启用深色模式时**「动态更新 HTML body 的类」**，以应用`dark-mode`样式。这种方法确保了在所有组件中的一致性，而无需手动进行类的操作。

body.css

```
body.dark-mode {
    background-color: #333;
}
```

我们可以在各种情境中使用`useDarkMode钩子`。无论我们是无论构建博客、还是电商平台，`深色模式`都可以提升用户体验，减轻眼部压力，并延长设备电池寿命。

#### **使用场景**

通过点击`切换 Dark Mode`按钮，我们可以立即在浅色和深色主题之间切换。按钮的外观会动态改变，反映当前的模式。

```
import useDarkMode from "@hooks/useDarkMode";
import "./body.css";

export default function DarkModeComponent() {
  const [darkMode, setDarkMode] = useDarkMode();
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      style={{
        border: `1px solid ${darkMode ? "white" : "black"}`,
        background: "none",
        color: darkMode ? "white" : "black",
      }}
    >
      切换 Dark Mode
    </button>
  );
}
```

---

### **3.10 useTimeout**

```
import { useCallback, useEffect, useRef } from "react";

type TimeoutHookReturn = {
  reset: () => void;
  clear: () => void;
};

export default function useTimeout(callback: () => void, delay: number): TimeoutHookReturn {
  const callbackRef = useRef<() => void>(callback);
  const timeoutRef = useRef<number | undefined>();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const set = useCallback(() => {
    timeoutRef.current = setTimeout(() => callbackRef.current(), delay);
  }, [delay]);

  const clear = useCallback(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    set();
    return clear;
  }, [delay, set, clear]);

  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  return { reset, clear };
}
```

`useTimeout钩子`封装了在 React 组件中设置、清除和重置超时的逻辑。它接受两个参数：回调函数和延迟持续时间（以毫秒为单位）。每当指定的延迟时间过去时，将执行提供的回调函数。

这个自定义钩子的一个重要优点是，它确保即使在组件重新渲染期间更改，回调函数仍然保持最新状态。通过使用 `useRef` 来存储回调引用，该钩子保证始终调用最新版本的函数。

此外，`useTimeout钩子`通过使用 `useCallback` 来记忆 `set` 和 `clear` 函数，优化了性能。这意味着只有在它们的依赖项更改时才重新创建这些函数，从而防止不必要的渲染，提高了效率。

#### **使用场景**

`useTimeout 钩子`可以在需要定时操作的各种场景中使用。例如，在倒计时组件中，以轻松地实现在特定持续时间后重置的计时器。

```
import { useState } from "react";
import useTimeout from "@hooks/useTimeout";

export default function TimeoutComponent() {
  const [count, setCount] = useState(10);
  const { clear, reset } = useTimeout(() => setCount(789), 1000);
  return (
    <div>
      <div>{count}</div>
      <button onClick={() => setCount((c) => c + 1)}>数据+1</button>
      <button onClick={clear}>清除定时器</button>
      <button onClick={reset}>设定回调函数，将数字设置为789</button>
    </div>
  );
}
```

---

### **3.11 useDebounce**

```
import { useEffect, DependencyList } from "react";
import useTimeout from "@hooks/useTimeout";

export default function useDebounce(
  callback: () => void,
  delay: number,
  dependencies: DependencyList
) {
  const { reset, clear } = useTimeout(callback, delay);

  useEffect(reset, [...dependencies, reset]);
  useEffect(clear, [clear]);
}
```

`useDebounce钩子`内部利用`useTimeout钩子`来延迟执行回调函数，直到指定的延迟时间已过。通过这样做，它**「防止了由于快速输入更改或重复事件引起的频繁更新」**，从而实现更流畅的交互和减少资源消耗。

`useDebounce`通过将`回调函数`、`延迟持续时间`以及任何依赖项包装在这个自定义钩子中，我们可以轻松实现**「防抖功能」**，而无需使组件代码混乱不堪。该钩子负责管理超时并在必要时清除它，确保仅在指定的延迟时间和最新的依赖项后触发回调。

#### **使用场景**

这个自定义钩子在需要处理**「用户输入」**的情况下特别有用，比如搜索栏或表单字段，我们希望延迟执行某个操作，直到用户完成输入或交互。它还可用于优化网络请求，确保仅在用户停止输入或选择选项后发送请求。

```
import { useState } from "react";
import useDebounce from "@hooks/useDebounce";

export default function DebounceComponent() {
  const [count, setCount] = useState(10);
  useDebounce(() => alert(`触发回掉，并获取最新的值${count}`), 1000, [count]);
  return (
    <div>
      <div>{count}</div>
      <button onClick={() => setCount((c) => c + 1)}>数字+1</button>
    </div>
  );
}
```

每当用户点击`数字+1`按钮时，计数状态会更新。但是，我们不会立即弹出计数值，而是使用`useDebounce`来防抖回调函数。只有在延迟 1 秒后，计数值才会弹出，有效地防止了在快速点击按钮时弹出过多的输出。

---

### **3.12 useToggle**

```
import { useState } from "react";

export default function useToggle(defaultValue: boolean) {
  const [value, setValue] = useState(defaultValue);

  function toggleValue(value: boolean | undefined) {
    setValue((currentValue) =>
      typeof value === "boolean" ? value : !currentValue
    );
  }

  return [value, toggleValue] as const;
}
```

`useToggle` 只需一行代码，我们就可以使用默认值初始化状态。`toggleValue` 函数使我们能够轻松地在 `true` 和 `false` 之间切换状态，或者我们可以直接传递一个布尔值来将状态设置为所需的值。这种多功能性使 `useToggle` 成为各种需要切换或改变状态的场景的理想选择。

#### **使用场景**

使用 `useToggle` 钩子来管理切换按钮的状态。通过简单的单击，按钮的状态在 `true` 和 `false` 之间切换。此外，该钩子提供了按钮，允许直接将值设置为 `true` 或 `false`，以满足特定用例。

```
import useToggle from "@hooks/useToggle";

export default function ToggleComponent() {
  const [value, toggleValue] = useToggle(false);
  return (
    <div>
      <div>{value.toString()}</div>
      <button onClick={() => toggleValue(!value)}>状态切换</button>
      <button onClick={() => toggleValue(true)}>直接设置为true</button>
      <button onClick={() => toggleValue(false)}>直接设置为false</button>
    </div>
  );
}
```

---

### **3.13 useRenderCount**

```
import { useEffect, useRef } from "react";

export default function useRenderCount(): number {
  const count = useRef(1);
  useEffect(() => {
    count.current++;
  });
  return count.current;
}
```

`useRenderCount钩子`利用了 React 的`useEffect`和`useRef`钩子来**「计算渲染次数」**。每次渲染都会增加计数，为我们提供关于组件渲染频率的实时反馈。

它提供了一种清晰而简洁的方式来监视渲染行为，这对性能优化和调试非常重要。

#### **使用场景**

这个多功能的钩子可以应用在各种场景中。例如，当我们开发一个展现出意外渲染模式的复杂组件时，`useRenderCount`可以通过显示准确的渲染次数来帮助我们定位问题。它还对于衡量某些优化或重构技巧的影响非常有用。

```
import useRenderCount from "@hooks/useRenderCount";
import useToggle from "@hooks/useToggle";

export default function RenderCountComponent() {
  const [boolean, toggle] = useToggle(false);
  const renderCount = useRenderCount();
  return (
    <>
      <div>{boolean.toString()}</div>
      <div>组件渲染次数：{renderCount}</div>
      <button onClick={() => toggle(!boolean)}>状态切换</button>
    </>
  );
}
```

---

### **3.14 useDebugInformation**

```
import { useEffect, useRef } from "react";
import useRenderCount from "@hooks/useRenderCount";

type ChangedProps = Record<string, { previous: unknown; current: unknown }>;

type DebugInformationResult = {
  count: number;
  changedProps: ChangedProps;
  timeSinceLastRender: number;
  lastRenderTimestamp: number;
};

export default function useDebugInformation(
  componentName: string,
  props: Record<string, unknown>
): DebugInformationResult {
  const count = useRenderCount();
  const changedProps = useRef<ChangedProps>({});
  const previousProps = useRef(props);
  const lastRenderTimestamp = useRef(Date.now());
  const propKeys = Object.keys({ ...props, ...previousProps.current });

  changedProps.current = propKeys.reduce((obj, key) => {
    if (props[key] === previousProps.current[key]) return obj;
    return {
      ...obj,
      [key]: { previous: previousProps.current[key], current: props[key] },
    };
  }, {});

  const info: DebugInformationResult = {
    count,
    changedProps: changedProps.current,
    timeSinceLastRender: Date.now() - lastRenderTimestamp.current,
    lastRenderTimestamp: lastRenderTimestamp.current,
  };

  useEffect(() => {
    previousProps.current = props;
    lastRenderTimestamp.current = Date.now();
    console.log("[debug-info]", componentName, info);
  });

  return info;
}
```

在**「调试 React 组件时，获取有关渲染和属性更改的详细信息可以非常有用」**。此时`useDebugInformation`自定义钩子派上用场的地方。这个钩子为开发人员提供了有关其组件行为的宝贵见解，并有助于识别性能瓶颈或意外的渲染模式。

`useDebugInformation`让我们可以获得大量的调试数据。该钩子跟踪**「渲染次数」**、**「更改的属性」**、**「自上次渲染以来的时间」**以及**「上次渲染的时间戳」**。这些全面的信息使我们能够更有效地分析组件行为，并在优化应用程序时做出明智的决策。

#### **使用场景**

`useDebugInformation`钩子可以应用在各种情境中。例如，我们正在开发一个复杂的表单组件，其中某些属性会触发更新或影响渲染。通过使用`useDebugInformation`，我们可以轻松地监视这些属性对组件性能的影响以及是否发生不必要的重新渲染。此外，当调查特定组件为什么没有如预期般更新或在性能关键的应用程序中微调优化时，这个钩子也可能非常有价值。

通过将**「组件名称」**和**「属性」**传递给钩子，我们可以获得一个包含所有相关调试数据的`info对象`。然后，可以将该对象显示或记录以进行进一步分析。

```
import useDebugInformation from "@hooks/useDebugInformation";
import useToggle from "@hooks/useToggle";
import { useState } from "react";

export default function DebugInformationComponent() {
  const [boolean, toggle] = useToggle(false);
  const [count, setCount] = useState(0);
  return (
    <>
      <ChildComponent boolean={boolean} count={count} />
      <button onClick={() => toggle(!boolean)}>切换状态</button>
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>
        数字+1
      </button>
    </>
  );
}
function ChildComponent(props) {
  const info = useDebugInformation("ChildComponent", props);
  return (
    <>
      <div>{props.boolean.toString()}</div>
      <div>{props.count}</div>
      <div>{JSON.stringify(info, null, 2)}</div>
    </>
  );
}
```

---

### **3.15 useGeolocation**

```
import { useState, useEffect } from "react";

type GeolocationOptions = PositionOptions;

type GeolocationHookReturn = {
  loading: boolean;
  error: GeolocationPositionError | null;
  data: GeolocationCoordinates;
};

export default function useGeolocation(
  options?: GeolocationOptions
): GeolocationHookReturn {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<GeolocationPositionError | null>(null);
  const [data, setData] = useState<GeolocationCoordinates>(
    {} as GeolocationCoordinates
  );

  useEffect(() => {
    const successHandler = (e: GeolocationPosition) => {
      setLoading(false);
      setError(null);
      setData(e.coords);
    };

    const errorHandler = (e: GeolocationPositionError) => {
      setError(e);
      setLoading(false);
    };

    navigator.geolocation.getCurrentPosition(
      successHandler,
      errorHandler,
      options
    );

    const id = navigator.geolocation.watchPosition(
      successHandler,
      errorHandler,
      options
    );

    return () => navigator.geolocation.clearWatch(id);
  }, [options]);

  return { loading, error, data };
}
```

`useGeolocation`钩子利用了 React 的`useState`和`useEffect`钩子来管理加载、错误和**「地理位置数据」**的状态。它接受一个可选的`options`参数，以自定义地理位置行为，允许我们根据特定需求微调准确性和其他设置。

该钩子自动处理加载状态，当获取地理位置数据时更新它，并在过程中出现任何问题时设置错误状态。

`useGeolocation`钩子还包含了`Geolocation` API 的`watchPosition`方法，它可以**「连续监视用户的位置」**。这在需要实时更新用户位置的情况下很有用，比如在跟踪应用程序或交互地图中。

#### **使用场景**

数据对象包含`纬度`和`经度`值，允许我们轻松地在 UI 上显示用户的位置。`加载变量`通知我们地理位置检索的当前状态，错误变量在适用时提供任何错误消息。

```
import useGeolocation from "@hooks/useGeolocation"

export default function GeolocationComponent() {
    const {
        loading,
        error,
        data: { latitude, longitude },
    } = useGeolocation()
    return (
        <>
            <div>加载状态: {loading.toString()}</div>
            <div>加载是否失败: {error?.message}</div>
            <div>
                纬度:{latitude} x 经度:{longitude}
            </div>
        </>
    )
}
```

---

### **3.16 useHover**

```
import { useState, RefObject } from "react";
import useEventListener from "@hooks/useEventListener";

export default function useHover(ref: RefObject<HTMLElement>): boolean {
  const [hovered, setHovered] = useState<boolean>(false);
  useEventListener("mouseover", () => setHovered(true), ref);
  useEventListener("mouseout", () => setHovered(false), ref);

  return hovered;
}
```

这个钩子利用了 React 的`useState`和`useEventListener`钩子，用于**「跟踪鼠标悬停状态」**。通过简单地将一个`ref`传递给`useHover`钩子，我们可以开始接收准确的鼠标悬停事件。该钩子监听`mouseover`和`mouseout`事件，并相应地更新悬停状态。

#### **使用场景**

`useHover`可以在各种情况下使用。无论我们需要在悬停时突出显示元素、触发其他操作或动态更改样式，这个自定义钩子都能胜任。

```
import { useRef } from "react";
import useHover from "@hooks/useHover";

export default function HoverComponent() {
  const elementRef = useRef<HTMLDivElement>(null);
  const hovered = useHover(elementRef);

  return (
    <section>
      <div
        ref={elementRef}
        style={{
          backgroundColor: hovered ? "blue" : "red",
          width: "100px",
          height: "100px",
          position: "absolute",
          top: "calc(50% - 50px)",
          left: "calc(50% - 50px)",
        }}
      >
        {hovered ? "我处于hover状态" : "正常状态"}
      </div>
    </section>
  );
}
```

通过将`useHover`钩子应用于`elementRef`，div 的背景颜色在悬停状态下动态变为蓝色或红色。

---

### **3.17 useLongPress**

```
import useEventListener from "@hooks/useEventListener";
import useTimeout from "@hooks/useTimeout";
import useEffectOnce from "@hooks/useEffectOnce";
import { RefObject } from "react";

type LongPressCallback = () => void;
type LongPressOptions = { delay?: number };

export default function useLongPress(
  ref: RefObject<HTMLElement>,
  cb: LongPressCallback,
  { delay = 250 }: LongPressOptions = {}
) {
  const { reset, clear } = useTimeout(cb, delay);

  useEffectOnce(clear);
  useEventListener("mousedown", reset, ref);
  useEventListener("touchstart", reset, ref);
  useEventListener("mouseup", clear, ref);
  useEventListener("mouseleave", clear, ref);
  useEventListener("touchend", clear, ref);
}
```

通过利用这个钩子，开发人员可以轻松地在其 React 应用程序中的任何元素上定义**「长按操作」**。只需几行代码，这个钩子就会处理跟踪长按持续时间和触发相关回调函数。

#### **使用场景**

无论我们正在开发触摸敏感的用户界面、实现上下文菜单或创建自定义手势，这个钩子都证明是一个有价值的工具。从移动应用到复杂的 Web 界面，都有用武之地。

```
import { useRef } from "react";
import useLongPress from "@hooks/useLongPress";

export default function LongPressComponent() {
  const elementRef = useRef<HTMLDivElement>(null);
  useLongPress(elementRef, () => alert("触发回调"));
  return (
    <>
      <div
        ref={elementRef}
        style={{
          backgroundColor: "red",
          width: "100px",
          height: "100px",
          position: "absolute",
          top: "calc(50% - 50px)",
          left: "calc(50% - 50px)",
        }}
      >
        我是一个待测试的元素
      </div>
    </>
  );
}
```

---

### **3.18 useOnlineStatus**

```
import { useState } from "react";
import useEventListener from "@hooks/useEventListener";

export default function useOnlineStatus(): boolean {
  const [online, setOnline] = useState<boolean>(navigator.onLine);

  useEventListener("online", () => setOnline(navigator.onLine));
  useEventListener("offline", () => setOnline(navigator.onLine));

  return online;
}
```

我们可以轻松地访问**「用户的在线状态」**。该钩子内部使用`navigator.onLine`属性来确定初始的在线状态，并在用户的连接状态发生变化时动态更新它。

它返回一个布尔值，指示用户当前是在线还是离线。然后，我们可以利用这些信息来为用户提供实时反馈或根据他们的在线状态做出决策。

#### **使用场景**

`useOnlineStatus`钩子可以在各种情境中找到应用。例如，我们可以通过在用户失去互联网连接时显示提示来提高用户体验，以便他们采取适当的行动。此外，我们可以根据用户的在线状态有条件地渲染某些组件或触发特定的行为。

```
import useOnlineStatus from "@hooks/useOnlineStatus"

export default function OnlineStatusComponent() {
    const online = useOnlineStatus()
    return <div>用户是否在线{online.toString()}</div>
}
```

---

### **3.19 useOnScreen**

```
import { useEffect, useState, RefObject } from "react";

export default function useOnScreen(
  ref: RefObject<HTMLElement>,
  rootMargin?: string = "0px"
): boolean {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (ref.current == null) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current == null) return;
      observer.unobserve(ref.current);
    };
  }, [ref, rootMargin]);

  return isVisible;
}
```

`useOnScreen`钩子充分利用了`Intersection Observer` API 的强大功能，只需简单地提供一个引用到我们想要监视的元素，`useOnScreen`会在该元素进入或离开视口时通知我们。

#### **使用场景**

我们可以在我们希望触发动画、延迟加载图像或在用户滚动时加载额外内容的情况下，使用这个 Hook。

要使用这个钩子，首先将其导入到我们的组件文件中。然后，使用`useRef`钩子创建一个引用，以定位所需的元素。将引用作为`useOnScreen`钩子的第一个参数传递，我们还可以提供一个可选的`rootMargin`值来调整可见阈值。

```
import { useRef } from "react";
import useOnScreen from "@hooks/useOnScreen";

export default function OnScreenComponentComponent() {
  const headerTwoRef = useRef<HTMLHeadingElement>(null);
  const visible = useOnScreen(headerTwoRef, "-100px");
  return (
    <div>
      <h1>Header</h1>
      <div>
        修改此元素的高度，使页面可滚动，在滚动过程中，可查看待验证元素的可见性
      </div>
      <h1 ref={headerTwoRef}>待验证元素 {visible && "(Visible)"}</h1>
      <div>...</div>
    </div>
  );
}
```

---

### **3.20 usePrevious**

```
import { useRef } from "react";

export default function usePrevious<T>(value: T): T | undefined {
  const currentRef = useRef<T | undefined>(value);
  const previousRef = useRef<T | undefined>();

  if (currentRef.current !== value) {
    previousRef.current = currentRef.current;
    currentRef.current = value;
  }

  return previousRef.current;
}
```

通过使用`useRef`，这个钩子可以高效地存储当前值和上一个值，并在值更改时更新它们。通过比较当前值和上一个值，我们可以轻松地检测和响应组件数据的变化。

例如，我们可以利用`usePrevious`来比较和可视化数据的变化，跟踪状态转换，或实现撤销/重做功能。此外，在处理表单、动画和任何需要访问以前值的情况下，它都可能对我们的应用程序逻辑至关重要。

#### **使用场景**

```
import { useState } from "react";
import usePrevious from "@hooks/usePrevious";

export default function PreviousComponent() {
  const [count, setCount] = useState(0);
  const previousCount = usePrevious(count);
  return (
    <div>
      <div>当前视图的值: {count}</div>
      <div>之前视图的值(初始化时为空):{previousCount}</div>
      <button onClick={() => setCount((currentCount) => currentCount + 1)}>
        数字+1
      </button>
    </div>
  );
}
```

---

### **3.21 useScript**

```
import useAsync from "@hooks/useAsync";

export default function useScript(url: string) {
  return useAsync(() => {
    const script = document.createElement("script");
    script.src = url;
    script.async = true;
    return new Promise<void>((resolve, reject) => {
      script.addEventListener("load", () => resolve());
      script.addEventListener("error", () => reject());
      document.body.appendChild(script);
    });
  }, [url]);
}
```

`useScript`它具备**「异步处理脚本加载的能力」**。通过将脚本的`async`属性设置为`true`，确保它不会阻塞应用程序的渲染。特别是在处理较大的脚本或较慢的网络连接时，有很大用处。

#### **使用场景**

`useScript`可以用于各种情景。例如，我们可以加载外部库，如`jQuery`，从而能够利用其强大的功能，而不会增加捆绑文件的体积。此外，我们还可以加载分析脚本或应用程序动态行为所需的任何其他脚本。

```
import useScript from "@hooks/useScript";

export default function ScriptComponent() {
  const { loading, error } = useScript(
    "https://code.jquery.com/jquery-3.6.0.min.js"
  );
  if (loading) return <div>资源加载中...</div>;
  if (error) return <div>资源加载失败😡</div>;
  return <div>显示当前视图的宽度{window.$(window).width()}</div>;
}
```

注意：在使用处会有一个 TS 错误。我们需要在项目中弄一个 index.d.ts 然后需要对进行定义

```
declare interface Window {
  $: any;
}
```

该钩子返回加载状态和错误状态，可以用于相应地显示加载中的旋转图标或错误消息。一旦脚本成功加载，组件将使用`jQuery`显示当前窗口宽度。

---

### **3.22 useStateWithHistory**

```
import { useCallback, useRef, useState, Dispatch, SetStateAction } from "react";

type HistoryAction<T> = {
  history: T[];
  pointer: number;
  back: () => void;
  forward: () => void;
  go: (index: number) => void;
};

type StateWithHistoryReturn<T> = [
  T,
  Dispatch<SetStateAction<T>>,
  HistoryAction<T>
];

function useStateWithHistory<T>(
  defaultValue: T,
  capacity: number = 10
): StateWithHistoryReturn<T> {
  const [value, setValue] = useState<T>(defaultValue);
  const historyRef = useRef<T[]>([value]);
  const pointerRef = useRef<number>(0);

  const set = useCallback(
    (v: SetStateAction<T>) => {
      const resolvedValue =
        typeof v === "function" ? (v as (prevState: T) => T)(value) : v;

      if (historyRef.current[pointerRef.current] !== resolvedValue) {
        if (pointerRef.current < historyRef.current.length - 1) {
          historyRef.current.splice(pointerRef.current + 1);
        }

        historyRef.current.push(resolvedValue);

        while (historyRef.current.length > capacity) {
          historyRef.current.shift();
        }

        pointerRef.current = historyRef.current.length - 1;
      }

      setValue(resolvedValue);
    },
    [capacity, value]
  );

  const back = useCallback(() => {
    if (pointerRef.current <= 0) return;
    pointerRef.current--;
    setValue(historyRef.current[pointerRef.current]);
  }, []);

  const forward = useCallback(() => {
    if (pointerRef.current >= historyRef.current.length - 1) return;
    pointerRef.current++;
    setValue(historyRef.current[pointerRef.current]);
  }, []);

  const go = useCallback((index: number) => {
    if (index < 0 || index > historyRef.current.length - 1) return;
    pointerRef.current = index;
    setValue(historyRef.current[pointerRef.current]);
  }, []);

  const historyAction: HistoryAction<T> = {
    history: historyRef.current,
    pointer: pointerRef.current,
    back,
    forward,
    go,
  };

  return [value, set, historyAction];
}

export default useStateWithHistory;
```

#### **useStateWithHistory 的优势**

* 自动历史跟踪：`useStateWithHistory`自动跟踪我们设置的值，允许我们在需要时访问**「完整的历史记录」**。

* 高效的内存使用：该钩子利用**「容量参数」**(支持动态传人)，确保历史记录不会无限增长。我们可以定义要保留的历史值的最大数量，防止过多的内存消耗。

* 时间旅行功能：通过`back()`、`forward()`和`go()`函数，我们可以轻松地浏览记录的历史。在以前的状态之间来回切换，或直接**「跳到特定索引」**，实现强大的撤销/重做或逐步操作功能。

#### **何时使用 useStateWithHistory**

* 表单管理：通过提供一种简化处理表单输入的方式，可以跟踪更改，还原以前的值或重做修改，从而简化处理表单输入的过程。

* 撤销/重做功能：轻松实现应用程序中的撤销/重做功能。跟踪状态更改，允许用户轻松地在其操作之间来回导航。

* 逐步导航：使用`useStateWithHistory`构建交互式指南或教程，用户可以在不同步骤之间导航，同时保留其进度。

#### **使用场景**

```
import useStateWithHistory from "@hooks/useStateWithHistory";

export default function StateWithHistoryComponent() {
  const [count, setCount, { history, pointer, back, forward, go }] =
    useStateWithHistory(1);
  return (
    <div>
      <div>当前指针所指位置的数值:{count}</div>
      <div>History的所有值{history.join(", ")}</div>
      <div>指针指向的Index(从0开始):{pointer}</div>
      <button onClick={() => setCount((currentCount) => currentCount * 2)}>
        将之前的数据数值翻倍后，插入到History
      </button>
      <button onClick={() => setCount((currentCount) => currentCount + 1)}>
        将之前的数据数值+1后，插入到History
      </button>
      <button onClick={back}>回退</button>
      <button onClick={forward}>前进</button>
      <button onClick={() => go(2)}>指向第二步</button>
    </div>
  );
}
```

---

### **3.23 useStateWithValidation**

```
import { useState, useCallback } from "react";

export default function useStateWithValidation<T>(
  validationFunc: (value: T) => boolean,
  initialValue: T
): [T, (nextState: T | ((prevState: T) => T)) => void, boolean] {
  const [state, setState] = useState<T>(initialValue);
  const [isValid, setIsValid] = useState(() => validationFunc(state));

  const onChange = useCallback(
    (nextState: T | ((prevState: T) => T)) => {
      const value =
        typeof nextState === "function"
          ? (nextState as (prevState: T) => T)(state)
          : nextState;
      setState(value);
      setIsValid(validationFunc(value));
    },
    [validationFunc, state]
  );

  return [state, onChange, isValid];
}
```

`useStateWithValidation`钩子结合了 React 的`useState`和`useCallback`钩子，它接受两个参数：

* 一个验证函数 (用于确定当前状态是否被视为有效。)

* 一个初始值

#### **使用场景**

我们可以传递适合我们特定需求的**「任何验证函数」**。无论是检查字符串的长度，确保数字值在特定范围内，还是执行更复杂的验证，`useStateWithValidation`都可以满足我们的需求。

```
import useStateWithValidation from "@hooks/useStateWithValidation";

export default function StateWithValidationComponent() {
  const [username, setUsername, isValid] = useStateWithValidation<string>(
    (name) => name.length > 5,
    "前端柒八九"
  );

  return (
    <>
      <div>输入框内容是否大于5: {isValid.toString()}</div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
    </>
  );
}
```

在这个示例中，使用`useStateWithValidation`钩子来管理用户名的状态。验证函数检查用户名的长度是否大于 5 个字符，`isValid`变量反映了当前输入的有效性。

---

### **3.24 useTranslation**

```
import { useLocalStorage } from "@hooks/useStorage";
import * as translations from "./translations";

type TranslationFunction = (key: string) => string | undefined;

export default function useTranslation(lang: string, fallbackLang: string) {
  const [language, setLanguage] = useLocalStorage<string>("language", lang);
  const [fallbackLanguage, setFallbackLanguage] = useLocalStorage<string>(
    "fallbackLanguage",
    fallbackLang
  );

  const translate: TranslationFunction = (key) => {
    const keys = key.split(".");
    return (
      getNestedTranslation(language, keys) ??
      getNestedTranslation(fallbackLanguage, keys) ??
      key
    );
  };

  return {
    language,
    setLanguage,
    fallbackLanguage,
    setFallbackLanguage,
    t: translate,
  };
}

function getNestedTranslation(
  language: string,
  keys: string[]
): string | undefined {
  return keys.reduce((obj, key) => {
    return obj?.[key];
  }, translations[language]);
}
```

我们可以定义一组语言集合（`translations`文件夹中）

#### **en.json**

```
{
  "hi": "Hello",
  "bye": "Goodbye",
  "nested": {
    "value": "front789"
  }
}
```

#### **zh.json**

```
{
  "hi": "你好",
  "bye": "再见👋",
  "nested": {
    "value": "前端柒八九"
  }
}
```

并在`index.js`中导出

```
export * as en from "./en.json";
export * as zh from "./zh.json";
```

它会自动保存用户选择的语言和回退语言，因此用户每次访问我们的应用时都会看到他们喜好的语言内容。

该钩子利用了 `useStorage` 库的 `useLocalStorage` 钩子来持久保存语言设置。这确保即使用户刷新页面或导航离开并返回，他们的语言偏好也将得以保留。

当然，市面上也有很多优秀的库。例如`react-i18next`。这个就看大家的实际情况，酌情使用了。

#### **使用场景**

我们将能够访问当前语言、设置语言、回退语言以及设置回退语言的功能。此外，该钩子还提供了一个便捷的翻译函数 `t`，它以`key`作为输入并返回相应的翻译值。

无论我们正在构建多语言网站、国际化应用程序，还是仅需要支持 UI 组件的翻译，该钩子都将简化流程并使我们的代码更易维护。

```
import useTranslation from "@hooks/useTranslation";

export default function TranslationComponent() {
  const { language, setLanguage, fallbackLanguage, setFallbackLanguage, t } =
    useTranslation("zh", "en");
  return (
    <>
      <div>使用{language}</div>
      <div>{t("hi")}</div>
      <div>{t("bye")}</div>
      <div>{t("nested.value")}</div>
      <button onClick={() => setLanguage("zh")}>切换中文</button>
      <button onClick={() => setLanguage("en")}>切换英文</button>
      <div>喜好的语音{fallbackLanguage}</div>
      <button onClick={() => setFallbackLanguage("zh")}>
        切换到喜好的语言
      </button>
    </>
  );
}
```

---

### **3.25 useUpdateEffect**

```
import { useEffect, useRef } from "react";

type EffectHookType = typeof useEffect;
const createUpdateEffect: (effect: EffectHookType) => EffectHookType =
  (effect) => (callback, deps) => {
    const isMounted = useRef(false);

    // 处理刷新
    effect(() => {
      return () => {
        isMounted.current = false;
      };
    }, []);

    effect(() => {
      if (!isMounted.current) {
        isMounted.current = true;
      } else {
        return callback();
      }
    }, deps);
  };
export default createUpdateEffect(useEffect);
```

`useUpdateEffect` 钩子旨在**「仅在初始渲染后执行回调函数」**。这种行为在我们希望基于状态更改执行操作，同时**「跳过初始执行」**时特别有用。通过利用 `useRef` 钩子，`useUpdateEffect` 跟踪首次渲染，并在该阶段跳过回调。

#### **使用场景**

这个自定义钩子可以在各种场景中使用。例如，我们有一个计数器组件，每当计数更改时需要显示警报，但要排除初始渲染。

```
import { useState } from "react";
import useUpdateEffect from "@hooks/useUpdateEffect";

export default function UpdateEffectComponent() {
  const [count, setCount] = useState(10);
  useUpdateEffect(() => alert(count), [count]);
  return (
    <div>
      <div>{count}</div>
      <button onClick={() => setCount((c) => c + 1)}>数字+1</button>
    </div>
  );
}
```

---

### **3.26 useWindowSize**

```
import { useState } from "react";
import useEventListener from "@hooks/useEventListener";

type WindowSize = {
  width: number;
  height: number;
};

export default function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEventListener("resize", () => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  });

  return windowSize;
}
```

使用`useWindowSize`我们就可以**「访问包含窗口当前宽度和高度的对象」**,使我们能够专注于构建动态和响应式界面。

此包还包括 `useEventListener` 钩子，它智能地**「侦听窗口调整大小事件」**。每当窗口大小更改时，`useWindowSize` 更新状态以反映最新的尺寸，触发消耗组件的重新渲染。

#### **使用场景**

`useWindowSize` 钩子可以用于各种场景。在构建适应不同屏幕尺寸的响应式布局时，它特别有用。借助此钩子，我们可以根据可用的窗口空间轻松调整组件的样式、布局或内容。此外，它使我们能够根据窗口尺寸动态渲染或隐藏元素，优化图像加载或执行依赖于窗口尺寸的任何其他行为。

```
import useWindowSize from "@hooks/useWindowSize";

export default function WindowSizeComponent() {
  const { width, height } = useWindowSize();
  return (
    <div>
      {width} x {height}
    </div>
  );
}
```

---

### **3.27 useDeepCompareEffect**

```
import { useRef, useEffect, DependencyList } from "react";
import isEqual from "lodash/fp/isEqual";

type EffectHookType = typeof useEffect;
type CreateUpdateEffect = (hook: EffectHookType) => EffectHookType;

export const createDeepCompareEffect: CreateUpdateEffect =
  (effect) => (callback, deps) => {
    const ref = useRef<DependencyList>();
    const signalRef = useRef<number>(0);

    if (deps === undefined || !isEqual(deps, ref.current)) {
      ref.current = deps;
      signalRef.current += 1;
    }

    effect(callback, [signalRef.current]);
  };

export default createDeepCompareEffect(useEffect);
```

在 React 中管理依赖关系是一件很棘手的事情，尤其是在处理复杂的数据结构或嵌套对象时。为了解决默认`useEffect`钩子的限制，`useDeepCompareEffect`确保**「仅当依赖关系发生深层更改时才触发效果回调」**，它使用`lodash`的`isEqual`函数进行准确的比较。

它能够防止不必要的重新渲染。通过在当前依赖项和先前依赖项之间执行深层比较，该钩子智能地确定是否应触发效果，从而在`浅层比较`无法胜任的情况下实现了性能优化。

#### **使用场景**

这个自定义钩子在处理复杂的状态对象时特别有用，比如当你有深层嵌套的数据结构或需要跟踪多个相互关联的状态时。它使你能够定义准确反映你想要跟踪的特定更改的依赖关系，确保只有在绝对必要时才执行效果。

```
import React, { useEffect, useState, useRef } from "react";
import useDeepCompareEffect from "@hooks/useDeepCompareEffect";

export default function DeepCompareEffectComponent() {
  const [age, setAge] = useState<number>(0);
  const [otherCount, setOtherCount] = useState<number>(0);
  const useEffectCountRef = useRef<HTMLSpanElement>(null);
  const useDeepCompareEffectCountRef = useRef<HTMLSpanElement>(null);
  const person = { age: age, name: "Sergey" };

  useEffect(() => {
    if (useEffectCountRef.current) {
      useEffectCountRef.current.textContent = (
        parseInt(useEffectCountRef.current.textContent || "0") + 1
      ).toString();
    }
  }, [person]);

  useDeepCompareEffect(() => {
    if (useDeepCompareEffectCountRef.current) {
      useDeepCompareEffectCountRef.current.textContent = (
        parseInt(useDeepCompareEffectCountRef.current.textContent || "0") + 1
      ).toString();
    }
  }, [person]);

  return (
    <div>
      <div>
        useEffect被触发的次数: <span ref={useEffectCountRef}>0</span>
      </div>
      <div>
        useDeepCompareEffect被触发的次数:
        <span ref={useDeepCompareEffectCountRef}>0</span>
      </div>
      <div>不相干的值: {otherCount}</div>
      <div>{JSON.stringify(person)}</div>
      <button onClick={() => setAge((currentAge) => currentAge + 1)}>
        修改监听对象中的值
      </button>
      <button onClick={() => setOtherCount((count) => count + 1)}>
        修改和监听对象无关的值
      </button>
    </div>
  );
}
```
