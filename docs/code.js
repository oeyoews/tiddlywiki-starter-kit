/**
 * @description: tw-typed is a tw api declaration for typescript, it also works for javascript
 *
 */

// wiki api
const wiki = $tw.wiki;

// some methods
$tw.utils.copyToClipboard();

// get/add/set/delete/search
wiki.getTiddler().fields;
wiki.getTiddlerData();
wiki.getTiddlerText();
wiki.addTiddler();
wiki.setText();
wiki.deleteTiddler();
wiki.filterTiddlers('[!is[system]]');
wiki.getTiddlersWithTag(tag);
$tw.wiki.getTiddlersAsJson(title);

wiki.setTiddlerData(title, data, fields, options);

// dom
$tw.utils.domMaker; // createElement

// ui
$tw.notifier(); // send notification
$tw.modal.display(title); // show dialog
