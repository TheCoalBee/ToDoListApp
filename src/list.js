export const lists = (() => {
    const items = [];
    const addList = (list) => { items.push(list) };
    const removeList = (list) => { items.splice(getIndex(list), 1)};

    const getItem = (index) => { return items[index] };
    const getItems = () => { return items };
    const getIndex = (id)  => {
        for (let i = 0; i < items.length; i++) {
            if (items[i].id == id) {
                return i;
            }
        }
    };
    return { addList, removeList, getItem, getItems, getIndex };
})();

const list = (title) => {
    const items = [];
    const id = Math.floor(100000 + Math.random() * 900000);
    const addItem = (item) => {items.push(item)};
    const removeItem = (item) => items.splice(getIndex(item.id), 1);

    const getItem = (index) => { return items[index] };
    const getItems = () => { return items };
    const getIndex = (id) => {
        for (let i = 0; i < items.length; i++) {
            if (items[i].id == id) {
                return i;
            }
        }
    };
    return { title, id, addItem, removeItem, getItem, getItems, getIndex};
};

const listItem = (title, description, dueDate, priority) => {
    let complete = false;
    const id = Math.floor(100000 + Math.random() * 900000);
    const toggleComplete = () => { complete = !complete };
    const getComplete = () => { return complete };
    return { title, id, description, dueDate, priority, toggleComplete, getComplete };
}

export function createList(title) {
    return list(title);
}

export function createListItem(title, description, dueDate, priority) {
    return listItem(title, description, dueDate, priority);
}