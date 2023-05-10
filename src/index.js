import './style.css';
import { lists, createList, createListItem } from './list';
import { createListDOM, createListItemDOM, createListFormDOM, createListItemFormDOM, createSideBarDOM } from './listDOM';

const list1 = createList('Saturday list');
const list2 = createList('Sunday list');

const listItem1 = createListItem('Task 1', "description", "due date", "priority");
const listItem2 = createListItem('Task 2', "description", "due date", "priority");

list1.addItem(listItem1);
list1.addItem(listItem2);

lists.addList(list1);
lists.addList(list2);

const sidebar = createSideBarDOM();

document.body.append(sidebar);

const listDOM1 = createListDOM(list1);

document.body.append(listDOM1);