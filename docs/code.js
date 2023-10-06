/*\
title: docs/code.js
type: application/javascript
description: tw-typed is a tw api declaration for typescript, it also works for javascript;下面是插件开发中经常使用到的一些方法
\*/

// wiki api
const wiki = $tw.wiki;

// some methods
$tw.utils.copyToClipboard();

// get/add/set/delete/search
wiki.getTiddler().fields;
wiki.getTiddlerData();
wiki.getTiddlerText();
wiki.addTiddler();
wiki.setText(title, key, null, value);
wiki.deleteTiddler();
wiki.filterTiddlers('[!is[system]]');
wiki.getTiddlersWithTag(tag);
$tw.wiki.getTiddlersAsJson(title);

wiki.setTiddlerData(title, data, fields, options);

// dom
$tw.utils.domMaker; // createElement 

// ui
$tw.notifier(); // send notification
$tw.modal.display(title); // show a dialog

// widget
this.getVariable('currentTiddler'); 获取当前条目名称
