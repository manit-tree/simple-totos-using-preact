import { signal } from "@preact/signals";
import './app.css';

let items = signal([
  {"id":"1", "title":"Learn Python"},
  {"id":"2", "title":"Hang out with friends"},
  {"id":"3", "title":"Read a book"},
  {"id":"4", "title":"Watching a movie"}
])

export function App() {
  let add_item = (item) => {
    let id = (new Date()).getTime() + '';
    items.value = [...items.value, {"id":id, "title":item}];
  }

  let handleChange = (evt) => {
    item.value = evt.target.value;
  }

  let handleKeydown = (evt) => {
    let input = evt.target;

    if (evt.key == 'Enter') {
      let item = input.value.trim();

      if (item) {
        add_item(item);
        input.value = '';
      }
    }
  }

  let remove_item = (evt) => {
    evt.preventDefault();

    let el = evt.target;
    let id = el.closest('li').getAttribute('data-id');

    items.value = items.value.filter(item => {
      return item.id != id;
    })
  }

  return (
    <main>
      <h1>Todos</h1>
      <input type="text" onChange={handleChange} onkeydown={handleKeydown}></input>
      <ul class="todos">
        {items.value.map(item => (
          <li data-id={item.id}><span class="value">{item.title}</span> <a href="#" onClick={remove_item}>x</a></li>
        ))}
      </ul>
    </main>
  )
}
