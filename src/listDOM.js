import { lists, createList, createListItem } from './list';

export function createListDOM(list) {
    deleteListDOM();
    
    const container = document.createElement('div');
    const title = document.createElement('h1');
    const items = document.createElement('div');
    const description = document.createElement('div');
    const completedTasks = document.createElement('p');
    const listBtns = document.createElement('div');
    const addItem = document.createElement('button');
    const deleteList = document.createElement('button');

    container.id = list.id;
    container.classList.add('list');
    title.classList.add('list-title');
    items.classList.add('list-items');
    description.classList.add('list-description');
    completedTasks.classList.add('list-completed-tasks');
    listBtns.classList.add('list-btns');
    addItem.classList.add('list-add-item');
    deleteList.classList.add('list-delete');

    title.textContent = list.title;
    completedTasks.textContent = updateCompletedDOM(list);
    addItem.innerHTML = '<i class="fa-solid fa-fw fa-plus"></i> Add item';
    deleteList.innerHTML = '<i class="fa-solid fa-fw fa-xmark"></i> delete list';

    for (let i = 0; i < list.getItems().length; i++) {
        const item = createListItemDOM(list.getItem(i));
        items.append(item);
    }   

    addItem.addEventListener('click', () => {
        document.body.append(createListItemFormDOM(list));
    });

    deleteList.addEventListener('click', () => {
        deleteListDOM();
        lists.removeList(list);
        updateSideBarDOM();
    });

    listBtns.append(addItem, deleteList);
    description.append(completedTasks, listBtns);
    container.append(title, description, items);
    return container;
}

function deleteListDOM() {
    let lists = document.getElementsByClassName('list');
    for (let i = 0; i < lists.length; i++) {
        lists[i].remove();
    }
}

export function createListItemDOM(listItem) {
    const item = document.createElement('div');
    const complete = document.createElement('div');
    const title = document.createElement('h1');
    const description = document.createElement('p');
    const dueDate = document.createElement('p');
    const priority = document.createElement('p');
    const deleteBtn = document.createElement('button');

    item.classList.add('item');
    if (listItem.getComplete()) {
        complete.classList.add('complete');
    } else {
        complete.classList.add('incomplete');
    }
    title.classList.add('item-title');
    description.classList.add('item-description');
    dueDate.classList.add('item-due-date');
    priority.classList.add('item-priority');
    deleteBtn.classList.add('delete-item');

    title.textContent = listItem.title;
    description.textContent = listItem.description;
    dueDate.textContent = listItem.dueDate;
    priority.textContent = listItem.priority;
    deleteBtn.innerHTML = '<i class="fa-solid fa-fw fa-xmark"></i>';

    complete.addEventListener('click', () => {
        const listDOM = document.getElementsByClassName('list')[0];
        const list = lists.getItem(lists.getIndex(listDOM.id));
        listItem.toggleComplete();
        complete.classList.toggle('complete');
        complete.classList.toggle('incomplete');
        listDOM.getElementsByClassName('list-completed-tasks')[0].textContent = updateCompletedDOM(list);
    });

    deleteBtn.addEventListener('click', () => {
        const listDOM = document.getElementsByClassName('list')[0];
        const list = lists.getItem(lists.getIndex(listDOM.id));
        item.remove();
        console.log(list, listItem);
        list.removeItem(listItem);
        listDOM.getElementsByClassName('list-completed-tasks')[0].textContent = updateCompletedDOM(list);
    });

    item.append(complete, title, description, dueDate, priority, deleteBtn);
    return item;
}

export function createListFormDOM() {
    const container = document.createElement('div');
    const form = document.createElement('form');
    const header = document.createElement('header');
    const titleLabel = document.createElement('label');
    const title = document.createElement('input');
    const btns = document.createElement('div');
    const submitBtn = document.createElement('input');
    const cancelBtn = document.createElement('input');

    container.id = "list-form-container";
    container.classList.add('form-container');
    form.id = "list-form";
    form.classList.add('form');
    header.classList.add('header');
    titleLabel.classList.add('form-input-label');
    title.classList.add('form-input');
    btns.classList.add('form-btns');
    submitBtn.classList.add('form-submit');
    cancelBtn.classList.add('form-cancel');

    header.textContent = "New list";
    titleLabel.textContent = "Title";
    title.placeholder = "Saturday list";
    submitBtn.value = "Submit";
    cancelBtn.value = "Cancel";

    submitBtn.type = "submit";
    cancelBtn.type = "button";
    title.required = true;

    form.onsubmit = (e) => e.preventDefault();

    form.addEventListener('submit', () => {
        const newList = createList(""+title.value);

        lists.addList(newList);
        const newListDOM = createListDOM(newList);

        document.body.append(newListDOM);

        updateSideBarDOM();
        container.remove();
    })

    cancelBtn.addEventListener('click', () => {
        container.remove();
    })

    btns.append(submitBtn, cancelBtn);
    form.append(header, titleLabel, title, btns);
    container.append(form);
    return container;
}

export function createListItemFormDOM(list) {
    const container = document.createElement('div');
    const form = document.createElement('form');
    const header = document.createElement('h1');
    const titleLabel = document.createElement('label');
    const title = document.createElement('input');
    const descriptionLabel = document.createElement('label');
    const description = document.createElement('textarea');
    const dueDateLabel = document.createElement('label');
    const dueDate = document.createElement('input');
    const priorityLabel = document.createElement('label');
    const priority = document.createElement('input');
    const btns = document.createElement('div');
    const submitBtn = document.createElement('input');
    const cancelBtn = document.createElement('input');

    container.id = "item-form-container"
    form.id = 'item-form';
    container.classList.add('form-container');
    form.classList.add('form');
    header.classList.add('header');
    titleLabel.classList.add('form-input-label');
    title.classList.add('form-input');
    descriptionLabel.classList.add('form-input-label');
    description.classList.add('form-input');
    dueDateLabel.classList.add('form-input-label');
    dueDate.classList.add('form-input');
    priorityLabel.classList.add('form-input-label');
    priority.classList.add('form-input');
    btns.classList.add('form-btns');
    submitBtn.classList.add('form-submit');
    cancelBtn.classList.add('form-cancel');

    header.textContent = "New item";
    titleLabel.textContent = "Title";
    title.placeholder = "Take out the trash";
    descriptionLabel.textContent = "Description";
    description.placeholder = "Description of to-do item here...";
    dueDateLabel.textContent = "Due Date";
    dueDate.placeholder = "10/20/2023";
    priorityLabel.textContent = "Priority";
    priority.placeholder = "!!!";
    submitBtn.value = "Submit";
    cancelBtn.value = "Cancel";

    submitBtn.type = "submit";
    cancelBtn.type = "button";
    title.required = true;

    form.onsubmit = (e) => e.preventDefault();

    form.addEventListener('submit', () => {
        const newItem = createListItem(title.value, description.value, dueDate.value, priority.value);
        const newItemDOM = createListItemDOM(newItem);
        const listDOM = document.getElementById(""+list.id);
        const listItemsDOM = listDOM.getElementsByClassName('list-items');
        const completedTasks = listDOM.getElementsByClassName('list-completed-tasks')[0];

        list.addItem(newItem);

        listItemsDOM[0].append(newItemDOM);

        completedTasks.textContent = updateCompletedDOM(list);

        container.remove();
    })

    cancelBtn.addEventListener('click', () => {
        container.remove();
    })

    btns.append(submitBtn, cancelBtn);
    form.append(header, titleLabel, title, descriptionLabel, description, dueDateLabel, dueDate, priorityLabel, priority, btns);
    container.append(form);
    return container;
}

export function createSideBarDOM() {
    const sidebar = document.createElement('div');
    const links = document.createElement('div');
    const addList = document.createElement('button');

    if (document.getElementById('sidebar') != null) {
        document.getElementById('sidebar').remove();
    }

    for (let i = 0; i < lists.getItems().length; i++) {
        const link = document.createElement('button');

        link.classList.add('link');

        link.textContent = lists.getItem(i).title;

        link.addEventListener('click', () => {
            document.body.append(createListDOM(lists.getItem(i)));
        })

        links.append(link);
    }

    sidebar.id = "sidebar";
    links.id = 'links';
    addList.id = 'add-list';

    addList.innerHTML = '<i class="fa-solid fa-fw fa-plus"></i> New list';

    addList.addEventListener('click', () => {
        document.body.append(createListFormDOM());
    });

    sidebar.append(links, addList);
    return sidebar;
}

function updateSideBarDOM() {
    const links = document.getElementById('links');
    links.innerHTML = "";

    for (let i = 0; i < lists.getItems().length; i++) {
        const link = document.createElement('button');

        link.classList.add('link');

        link.textContent = lists.getItem(i).title;

        link.addEventListener('click', () => {
            document.body.append(createListDOM(lists.getItem(i)));
        })

        links.append(link);
    }
}

function updateCompletedDOM(list) {
    let complete = 0;
    const total = list.getItems().length;
    for (let i = 0; i < list.getItems().length; i++) {
        console.log(list.getItem(i));
        if (list.getItem(i).getComplete()) {
            complete++;
        }
    }
    if (total == 0) return "No items added";
    if (complete !== total) {
        return `${complete}/${total} completed`;
    } 
    return `All items completed`;
}