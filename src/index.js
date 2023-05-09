import './style.css';

const list = (title) => {
    const items = [];
    const addItem = (item) => {items.push(item)};
    const removeItem = (item) => items.splice(getIndex(item), 1);

    const getItem = (index) => { return items[index] };
    const getItems = () => { return items };
    const getIndex = (item) => {
        for (let i = 0; i < items.length; i++) {
            if (items[i].title == item) {
                return i;
            }
            return "Item not found";
        }
    }
    return { title, addItem, removeItem, getItem, getItems, getIndex};
};

const listItem = (title, description, dueDate, priority) => {
    let complete = false;
    return { title, description, dueDate, priority, complete };
}

const task = listItem("Title", "Desc", "DueDate", "Priority");
